/* Final layout stays measurable/clickable. Inert transition copies carry only
   the temporary visuals and are cancelled before a new camera gesture. */
const newPinTransitions=new Set();
const NEW_PIN_TWEEN={duration:320,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'};
function clearNewPinTransitions(){
 for(const item of [...newPinTransitions])item.finish();
 document.querySelectorAll('.new-pin-animation-layer').forEach(el=>el.remove());
}
function captureNewPinTransitions(layer){
 clearNewPinTransitions();
 const scene=newPinMotion.scene,result=new Map();
 for(const el of layer.querySelectorAll('.new-tile-pin,.new-tile-cluster')){
  const key=newTileNodeKey(el),record=scene?.byKey.get(key);if(!record)continue;
  result.set(key,{...record,clone:el.cloneNode(true),members:record.members?.slice()});
 }
 return result;
}
function newPinTransitionGeometry(item){
 return {width:item.width,height:item.height,offset:item.kind==='cluster'?item.width/2:item.state==='dot'?8:18};
}
function newPinAnimationHost(layer){
 let host=layer.parentElement.querySelector('.new-pin-animation-layer');
 if(!host){host=document.createElement('div');host.className='new-pin-animation-layer';host.setAttribute('aria-hidden','true');layer.parentElement.append(host);}
 host.style.cssText=`position:absolute;pointer-events:none;overflow:hidden;z-index:3;left:${layer.offsetLeft}px;top:${layer.offsetTop}px;width:${layer.clientWidth}px;height:${layer.clientHeight}px`;
 return host;
}
function positionNewPinTransitions(){
 for(const item of newPinTransitions){
  const pt=projectActive([item.lng,item.lat]);item.ghost.style.left=pt.x+'px';item.ghost.style.top=pt.y+'px';
 }
}
function animateNewPinVisual(template,from,to,host,hide=null,merge=false){
 const ghost=template.cloneNode(true);ghost.classList.remove('new-tile-pin','new-tile-cluster');
 ghost.classList.add('new-pin-transition-ghost');ghost.removeAttribute('data-pin-id');ghost.removeAttribute('data-cluster-key');
 ghost.removeAttribute('role');ghost.removeAttribute('tabindex');ghost.removeAttribute('aria-label');ghost.setAttribute('aria-hidden','true');
 ghost.dataset.anchorLng=String(to.lng);ghost.dataset.anchorLat=String(to.lat);
 ghost.style.pointerEvents='none';ghost.style.visibility='visible';ghost.style.margin='0';ghost.style.overflow='hidden';
 const a=newPinTransitionGeometry(from),b=newPinTransitionGeometry(to);
 const start=projectActive([from.lng,from.lat]),end=projectActive([to.lng,to.lat]);
 ghost.style.left=end.x+'px';ghost.style.top=end.y+'px';ghost.style.width=b.width+'px';ghost.style.height=b.height+'px';
 host.append(ghost);
 // Visibility is applied only to the live visual, never its geometry/hit target.
 if(hide)hide.style.visibility='hidden';
 const shrinking=from.state==='expanded'&&to.state!=='expanded'||to.state==='dot';
 const split=from.split;
 const frames=split?[
  {width:'16px',height:'16px',transform:`translate(${start.x-end.x-8}px,${start.y-end.y-8}px)`,opacity:1},
  {width:'16px',height:'16px',transform:'translate(-8px,-8px)',opacity:1,offset:.62},
  {width:b.width+'px',height:b.height+'px',transform:`translate(${-b.offset}px,${-b.height/2}px)`,opacity:1}
 ]:merge?[
  {width:a.width+'px',height:a.height+'px',transform:`translate(${start.x-end.x-a.offset}px,${start.y-end.y-a.height/2}px)`,opacity:1},
  {width:'16px',height:'16px',transform:`translate(${start.x-end.x-8}px,${start.y-end.y-8}px)`,opacity:1,offset:.38},
  {width:'16px',height:'16px',transform:'translate(-8px,-8px)',opacity:0}
 ]:[
  {width:a.width+'px',height:a.height+'px',transform:`translate(${start.x-end.x-a.offset}px,${start.y-end.y-a.height/2}px)`,opacity:from.absent?0:1},
  {width:b.width+'px',height:b.height+'px',transform:`translate(${-b.offset}px,${-b.height/2}px)`,opacity:to.absent?0:1}
 ];
 const animation=ghost.animate(frames,NEW_PIN_TWEEN),children=[animation];
 const pill=ghost.querySelector('.pill');
 if(pill){
  // Inline important compact rules must not pin the animated copy at 28 px.
  ghost.classList.remove('partner-dot','compact','new-logic-compact');
  pill.style.setProperty('min-width','0','important');pill.style.setProperty('padding','0','important');
  pill.style.display='flex';pill.style.border='0';pill.style.overflow='hidden';pill.style.borderRadius='52px';
  children.push(pill.animate(split?[
   {width:'16px',height:'16px'},
   {width:'16px',height:'16px',offset:.62},
   {width:b.width+'px',height:(to.state==='expanded'?36:b.height)+'px'}
  ]:merge?[
   {width:a.width+'px',height:a.height+'px'},
   {width:'16px',height:'16px',offset:.38},
   {width:'16px',height:'16px'}
  ]:[{width:a.width+'px',height:(from.state==='expanded'?36:a.height)+'px'},{width:b.width+'px',height:(to.state==='expanded'?36:b.height)+'px'}],NEW_PIN_TWEEN));
  if(from.state==='dot'||to.state==='dot'||merge){
   const colour=newPartnerDotColors.get(merge?from.p?.name:to.p?.name||from.p?.name)||'#428BF9';
   children.push(pill.animate(split?[{backgroundColor:colour},{backgroundColor:colour,offset:.62},{backgroundColor:to.state==='dot'?colour:'#fff'}]:[{backgroundColor:from.state==='dot'?colour:'#fff'},{backgroundColor:to.state==='dot'||merge?colour:'#fff'}],NEW_PIN_TWEEN));
  }
 }
 for(const child of ghost.querySelectorAll('.logo-wrap,.pin-copy,.new-mini-avatar,.cluster-count')){
  const copy=child.classList.contains('pin-copy'),fadeOut=merge||shrinking&&(copy||to.state==='dot');
  const fadeIn=!fadeOut&&(from.state==='dot'||from.absent||copy&&from.state!=='expanded');
  if(fadeOut||fadeIn)children.push(child.animate(split?[{opacity:0,transform:'scale(.45)'},{opacity:0,transform:'scale(.45)',offset:.62},{opacity:1,transform:'scale(1)'}]:fadeOut?[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.45)'}]:[{opacity:0,transform:'scale(.45)'},{opacity:1,transform:'scale(1)'}],{...NEW_PIN_TWEEN,duration:merge?120:320}));
 }
 if(pill&&to.state!=='dot'&&!merge){
  const wrap=ghost.querySelector('.logo-wrap'),logo=ghost.querySelector('.logo');
  if(wrap&&logo){
   const startSize=from.state==='expanded'?32:from.state==='compact'?24:12,endSize=to.state==='expanded'?32:24;
   children.push(logo.animate([{width:startSize+'px',height:startSize+'px',flexBasis:startSize+'px'},{width:endSize+'px',height:endSize+'px',flexBasis:endSize+'px'}],NEW_PIN_TWEEN));
   children.push(wrap.animate([{width:(startSize+2)+'px',height:(startSize+4)+'px',flexBasis:(startSize+2)+'px'},{width:(endSize+2)+'px',height:(endSize+4)+'px',flexBasis:(endSize+2)+'px'}],NEW_PIN_TWEEN));
  }
 }
 const item={ghost,lng:to.lng,lat:to.lat,hide,finish(){if(!newPinTransitions.delete(item))return;children.forEach(a=>a.cancel());ghost.remove();if(hide)hide.style.visibility='';if(!host.children.length)host.remove();}};
 newPinTransitions.add(item);animation.finished.then(()=>item.finish(),()=>item.finish());
 return item;
}
function animateNewPinTransitions(before,scene){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||newPinMotion.active||map.isMoving())return;
 const oldOwners=new Map();for(const item of before.values())if(item.kind==='cluster')for(const id of item.members)oldOwners.set(id,item);
 const nextOwners=new Map();for(const item of scene.records)if(item.kind==='cluster')for(const id of item.members)nextOwners.set(id,item);
 const host=newPinAnimationHost(scene.layer);
 for(const record of scene.records){
  if(!record.el?.isConnected)continue;
  const old=before.get(record.key);
  if(record.kind==='cluster'){
   if(old&&old.members.join(',')===record.members.join(','))continue;
   for(const id of record.members){
    const pin=before.get('pin:'+id);if(!pin)continue;
    animateNewPinVisual(pin.clone,pin,{...record,state:'dot',width:16,height:16},host,null,true);
   }
   const from=old||{...record,state:'dot',width:16,height:16,absent:true};
   animateNewPinVisual(record.el,from,record,host,record.el);
  }else{
   const owner=oldOwners.get(String(record.p.pinId));
   if(old&&old.state===record.state&&!owner)continue;
   const from=owner?{...record,lng:owner.lng,lat:owner.lat,state:'dot',width:16,height:16,split:true}:old||{...record,state:'dot',width:16,height:16,absent:true};
   if(!old&&!owner&&record.state==='dot')continue;
   const template=record.state==='dot'&&old?old.clone:record.el;
   animateNewPinVisual(template,from,record,host,record.el);
  }
 }
 // Unclustered pins disappearing at the next plan also collapse to a point.
 for(const old of before.values())if(old.kind==='pin'&&!scene.byKey.has(old.key)&&!nextOwners.has(String(old.p.pinId))&&old.state!=='dot'){
  animateNewPinVisual(old.clone,old,{...old,state:'dot',width:16,height:16,absent:true},host);
 }
 if(!host.children.length)host.remove();
}

function animateNewPinDowngrade(before,record,scene){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 for(const item of [...newPinTransitions])if(item.hide===record.el)item.finish();
 animateNewPinVisual(before.clone,before,record,newPinAnimationHost(scene.layer),record.el);
}
