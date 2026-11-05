/* The new pin layout is frozen through a camera gesture and its inertia. */
const NEW_PIN_SETTLE_DELAY=180;
const NEW_PIN_REVEAL_MARGIN=16;
const newPinMotion={active:false,timer:0,hasLayout:false,revision:0,settles:0,preferredText:new Set()};
function newPinModeEnabled(){return document.getElementById('newLogicToggle').checked;}
function clearNewPinGhosts(){document.querySelectorAll('.new-pin-collapse-ghost').forEach(el=>el.remove());}
function resetNewPinMotion(){
 clearTimeout(newPinMotion.timer);newPinMotion.timer=0;
 newPinMotion.active=false;newPinMotion.hasLayout=false;newPinMotion.preferredText.clear();
 clearNewPinGhosts();
}
function beginNewPinMotion(){
 if(!newPinModeEnabled())return;
 clearTimeout(newPinMotion.timer);newPinMotion.timer=0;
 if(!newPinMotion.active)newPinMotion.preferredText=new Set([...document.querySelectorAll('.new-tile-pin[data-state="expanded"]')].map(el=>el.dataset.pinId));
 newPinMotion.active=true;
 // A copy in screen coordinates must never remain behind a moving map.
 clearNewPinGhosts();
}
function settleNewPinMotion(){
 if(!newPinModeEnabled()){resetNewPinMotion();return;}
 clearTimeout(newPinMotion.timer);newPinMotion.active=true;
 newPinMotion.timer=setTimeout(()=>{
  newPinMotion.timer=0;
  if(!newPinModeEnabled()){resetNewPinMotion();return;}
  if(map.isMoving()){settleNewPinMotion();return;}
  newPinMotion.active=false;newPinMotion.settles++;
  render();newPinMotion.preferredText.clear();
 },NEW_PIN_SETTLE_DELAY);
}
function constrainNewPinsDuringMotion(){
 if(!newPinModeEnabled())return;
 const layer=document.getElementById('markers'),viewport=layer.getBoundingClientRect();
 const pointById=new Map(getRenderPoints().map(p=>[String(p.pinId),p]));
 const entries=[...layer.querySelectorAll('.new-tile-pin,.new-tile-cluster,.marker.selected')].map(el=>{
  const members=el.dataset.memberIds?.split(',').map(id=>pointById.get(id)).filter(Boolean);
  const p=pointById.get(el.dataset.pinId)||members?.slice().sort(compareNewPinWeight)[0];
  return {el,p,selected:el.classList.contains('selected')};
 }).sort((a,b)=>Number(b.selected)-Number(a.selected)||
  compareNewPinWeight(a.p||{partnerWeight:0,pinId:0},b.p||{partnerWeight:0,pinId:0}));
 const occupied=[];
 const collides=el=>occupied.some(rect=>newPinRectsOverlap(rect,newPinSafeRect(el.getBoundingClientRect())));
 function downgrade(el,p,state){
  el.classList.remove('compact','new-logic-compact','partner-dot');
  const pill=el.querySelector('.pill');
  if(state==='compact'){
   el.classList.add('compact','new-logic-compact');pill.style.width='28px';
  }else{
   el.classList.add('partner-dot');pill.style.width='16px';
   pill.style.backgroundColor=newPartnerDotColors.get(p?.name)||p?.color||'#999999';
   el.style.zIndex='4';
  }
  el.dataset.state=state;pinDisplayState.set(el.dataset.pinId,state);
 }
 for(const {el,p,selected} of entries){
  if(selected){occupied.push(newPinSafeRect(el.getBoundingClientRect()));continue;}
  // A hidden cluster or a dot stays in that state until the one settled layout.
  if(el.dataset.motionHidden==='true'||el.dataset.state==='dot')continue;
  if(el.classList.contains('new-tile-cluster')){
   if(collides(el)){
    el.style.visibility='hidden';el.dataset.motionHidden='true';
   }else occupied.push(newPinSafeRect(el.getBoundingClientRect()));
   continue;
  }
  const clipped=el.dataset.state==='expanded'&&!newPinInsideViewport(el.getBoundingClientRect(),viewport);
  if(clipped||collides(el)){
   if(el.dataset.state==='expanded')downgrade(el,p,'compact');
   if(collides(el))downgrade(el,p,'dot');
  }
  if(el.dataset.state!=='dot')occupied.push(newPinSafeRect(el.getBoundingClientRect()));
 }
}
