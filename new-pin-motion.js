/* The new pin layout is frozen through a camera gesture and its inertia. */
const NEW_PIN_SETTLE_DELAY=180;
const NEW_PIN_REVEAL_MARGIN=16;
const newPinMotion={active:false,timer:0,hasLayout:false,revision:0,settles:0,preferredText:new Set(),scene:null};
function newPinModeEnabled(){return document.getElementById('newLogicToggle').checked;}
function clearNewPinGhosts(){
 clearNewPinTransitions();document.querySelectorAll('.new-pin-collapse-ghost').forEach(el=>el.remove());}
function resetNewPinMotion(){
 clearTimeout(newPinMotion.timer);newPinMotion.timer=0;
 newPinMotion.active=false;newPinMotion.hasLayout=false;newPinMotion.preferredText.clear();newPinMotion.scene=null;
 clearNewPinGhosts();
}
function beginNewPinMotion(){
 if(!newPinModeEnabled())return;
 clearTimeout(newPinMotion.timer);newPinMotion.timer=0;
 if(!newPinMotion.active)newPinMotion.preferredText=new Set([...document.querySelectorAll('.new-tile-pin[data-state="expanded"]')].map(el=>el.dataset.pinId));
 newPinMotion.active=true;
 // Existing tweens continue at their current time and follow the camera.
 positionNewPinTransitions();
}
function settleNewPinMotion(){
 if(!newPinModeEnabled()){resetNewPinMotion();return;}
 clearTimeout(newPinMotion.timer);newPinMotion.active=true;
 if(newPinMotion.scene&&!map.isMoving())updateNewPinFrame(true,true);
 newPinMotion.timer=setTimeout(()=>{
  newPinMotion.timer=0;
  if(!newPinModeEnabled()){resetNewPinMotion();return;}
  if(map.isMoving()){settleNewPinMotion();return;}
  newPinMotion.active=false;newPinMotion.settles++;
  render();newPinMotion.preferredText.clear();
 },NEW_PIN_SETTLE_DELAY);
}
function constrainNewPinsDuringMotion(){
 if(newPinModeEnabled())updateNewPinFrame(true);
}
