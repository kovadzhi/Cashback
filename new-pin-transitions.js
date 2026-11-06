/* Logical geometry is fixed immediately. Visual tweens retain their current
   frame across gestures and are reprojected without restarting their clocks. */
const newPinTransitions=new Set();
const NEW_PIN_TWEEN={duration:320,easing:'cubic-bezier(.2,.7,.2,1)',fill:'both'};
const NEW_PIN_SHADOW='0px 5px 20px 0px rgba(0,0,0,.10)';
const NEW_PIN_NO_SHADOW='0px 5px 20px 0px rgba(0,0,0,0)';
function clearNewPinTransitions(){
 for(const item of [...newPinTransitions])item.finish();
 document.querySelectorAll('.new-pin-animation-layer').forEach(el=>el.remove());
}
function captureNewPinTransitions(layer){
 const scene=newPinMotion.scene,result=new Map();
 for(const el of layer.querySelectorAll('.new-tile-pin,.new-tile-cluster')){
  const key=newTileNodeKey(el),record=scene?.byKey.get(key);if(!record)continue;
  const transition=[...newPinTransitions].find(item=>item.hide===el);
  result.set(key,{...record,...transition?.snapshot(),clone:transition?transition.shell.cloneNode(true):el.cloneNode(true),transition,members:record.members?.slice()});
 }
 return result;
}
function newPinTransitionGeometry(item){
 if(item.visual)return item.visual.geometry;
 return {width:item.width,height:item.height,offset:item.kind==='cluster'?item.width/2:item.state==='dot'?8:18,top:-item.height/2};
}
function newPinAnimationHost(layer){
 let host=layer.parentElement.querySelector('.new-pin-animation-layer');
 if(!host){host=document.createElement('div');host.className='new-pin-animation-layer';host.setAttribute('aria-hidden','true');layer.parentElement.append(host);}
 host.pinParent=layer.parentElement;
 host.style.cssText=`position:absolute;pointer-events:none;overflow:hidden;z-index:3;left:${layer.offsetLeft}px;top:${layer.offsetTop}px;width:${layer.clientWidth}px;height:${layer.clientHeight}px`;
 return host;
}
function positionNewPinTransitions(){
 for(const item of newPinTransitions)item.position();
}
function animateNewPinVisual(template,from,to,host,hide=null,merge=false){
 if(!host.isConnected)host.pinParent.append(host);
 const ghost=document.createElement('div');ghost.className='new-pin-transition-ghost';
 ghost.setAttribute('aria-hidden','true');ghost.dataset.anchorLng=to.lng;ghost.dataset.anchorLat=to.lat;
 const shell=template.cloneNode(true);shell.classList.remove('new-tile-pin','new-tile-cluster','partner-dot','compact','new-logic-compact');
 shell.classList.add('new-pin-transition-shell');
 for(const attr of ['data-pin-id','data-cluster-key','role','tabindex','aria-label'])shell.removeAttribute(attr);
 shell.style.cssText='position:absolute;left:0;top:0;transform:none;visibility:visible;pointer-events:none;box-shadow:none;overflow:visible;margin:0';
 const pill=shell.querySelector('.pill'),surface=pill||shell;
 surface.style.setProperty('min-width','0','important');surface.style.overflow='hidden';
 surface.style.backgroundColor='#fff';surface.style.border='0';
 const dot=document.createElement('span');dot.className='new-pin-transition-dot';
 dot.style.backgroundColor=newPartnerDotColors.get(merge?from.p?.name:to.p?.name||from.p?.name)||'#428BF9';
 ghost.append(shell,dot);host.append(ghost);if(hide)hide.style.visibility='hidden';
 const a=newPinTransitionGeometry(from),b=newPinTransitionGeometry(to),visual=from.visual;
 const fromDot=from.state==='dot',toDot=to.state==='dot'||merge,split=!!from.split;
 const startOpacity=visual?.opacity??(from.absent?0:1),endOpacity=to.absent||merge?0:1;
 const shape=(g,opacity)=>({width:g.width+'px',height:g.height+'px',opacity,transform:`translate(${-g.offset}px,${g.top}px)`});
 const circle={width:16,height:16,offset:8,top:-8};
 const geometry=split?[{...shape(circle,1)},{...shape(circle,1),offset:.62},shape(b,endOpacity)]:merge?[shape(a,startOpacity),{...shape(circle,1),offset:.38},shape(circle,0)]:[shape(a,startOpacity),shape(b,endOpacity)];
 const start=projectActive([from.lng,from.lat]),end=projectActive([to.lng,to.lat]);
 function framesAt(start,end){
  return geometry.map((frame,i)=>{
   let dx=0,dy=0;
   if(split&&i===0||merge&&i<2||!merge&&!split&&i===0){dx=start.x-end.x;dy=start.y-end.y;}
   const m=new DOMMatrix(frame.transform);return {...frame,transform:`translate(${m.m41+dx}px,${m.m42+dy}px)`};
  });
 }
 const animation=ghost.animate(framesAt(start,end),NEW_PIN_TWEEN),children=[animation];
 const height=(item,g)=>item.visual?.surfaceHeight??(item.state==='expanded'?36:g.height);
 const surfaceFrames=geometry.map((g,i)=>({width:g.width,height:((split?i===2:!merge&&i===1)?height(to,b):merge&&i===0||!split&&!merge&&i===0?height(from,a):parseFloat(g.height))+'px',offset:g.offset}));
 // Width is always a white shell. Colour lives exclusively in a round dot.
 children.push(surface.animate(surfaceFrames,NEW_PIN_TWEEN));
 const shellStart=visual?.shellOpacity??(fromDot?0:1),shellEnd=toDot?0:1;
 const shellFade=split?[{opacity:0},{opacity:0,offset:.62},{opacity:1}]:toDot?[{opacity:shellStart},{opacity:shellStart,offset:.35},{opacity:0,offset:merge?.38:.85},{opacity:0}]:[{opacity:shellStart},{opacity:1}];
 children.push(surface.animate(shellFade,NEW_PIN_TWEEN));
 const shadowStart=visual?.shadow??(fromDot?NEW_PIN_NO_SHADOW:NEW_PIN_SHADOW);
 children.push(surface.animate(split?[{boxShadow:NEW_PIN_NO_SHADOW},{boxShadow:NEW_PIN_NO_SHADOW,offset:.62},{boxShadow:NEW_PIN_SHADOW}]:[{boxShadow:shadowStart},{boxShadow:toDot?NEW_PIN_NO_SHADOW:NEW_PIN_SHADOW}],NEW_PIN_TWEEN));
 const dotStart=visual?.dotOpacity??(fromDot?1:0);
 children.push(dot.animate(split?[{opacity:1},{opacity:1,offset:.62},{opacity:toDot?1:0}]:toDot?[{opacity:dotStart},{opacity:dotStart,offset:merge?.2:.45},{opacity:1,offset:merge?.38:.85},{opacity:1}]:[{opacity:dotStart},{opacity:0,offset:.55},{opacity:0}],NEW_PIN_TWEEN));
 children.push(dot.animate(geometry.map((g,i)=>({left:(i===0&&visual?visual.dotLeft:-new DOMMatrix(g.transform).m41-8)+'px',top:(i===0&&visual?visual.dotTop:parseFloat(g.height)/2-8)+'px',offset:g.offset})),NEW_PIN_TWEEN));
 const logo=shell.querySelector('.logo'),wrap=shell.querySelector('.logo-wrap'),copy=shell.querySelector('.pin-copy');
 if(pill){
  pill.style.display='flex';pill.style.borderRadius='52px';
  const compactFrom=from.state==='compact',compactTo=to.state==='compact';
  children.push(pill.animate([{padding:visual?.padding??(compactFrom?'2px':'0px'),gap:visual?.gap??(compactFrom?'0px':'8px')},{padding:compactTo?'2px':'0px',gap:compactTo?'0px':'8px'}],NEW_PIN_TWEEN));
  if(logo&&wrap){
   const startSize=visual?.logoSize??(fromDot?12:compactFrom?24:32),endSize=toDot?12:compactTo?24:32;
   const dimensions=size=>({width:size+'px',height:size+'px',flexBasis:size+'px'});
   children.push(logo.animate([dimensions(startSize),dimensions(endSize)],NEW_PIN_TWEEN));
   const w1=compactFrom?24:startSize+2,h1=compactFrom?24:startSize+4,w2=compactTo?24:endSize+2,h2=compactTo?24:endSize+4;
   children.push(wrap.animate([{width:(visual?.wrapWidth??w1)+'px',height:(visual?.wrapHeight??h1)+'px',flexBasis:(visual?.wrapWidth??w1)+'px',padding:visual?.wrapPadding??(compactFrom?'0px':'2px 0px 2px 2px')},{width:w2+'px',height:h2+'px',flexBasis:w2+'px',padding:compactTo?'0px':'2px 0px 2px 2px'}],NEW_PIN_TWEEN));
  }
 }
 for(const child of shell.querySelectorAll('.logo-wrap,.pin-copy,.new-mini-avatar,.cluster-count')){
  const text=child===copy;
  const opacity=visual?(text?visual.textOpacity:visual.logoOpacity):fromDot||from.absent||text&&from.state!=='expanded'?0:1;
  const target=toDot||text&&to.state!=='expanded'?0:1;
  children.push(child.animate(split?[{opacity:0},{opacity:0,offset:.62},{opacity:target}]:[{opacity},{opacity:target}],NEW_PIN_TWEEN));
 }
 let camera='';
 const item={ghost,shell,hide,lng:to.lng,lat:to.lat,animation,
  position(){
   const p=projectActive([to.lng,to.lat]),q=projectActive([from.lng,from.lat]);
   ghost.style.left=p.x+'px';ghost.style.top=p.y+'px';
   const key=(q.x-p.x).toFixed(3)+','+(q.y-p.y).toFixed(3);
   if(key!==camera){animation.effect.setKeyframes(framesAt(q,p));camera=key;}
  },
  snapshot(){
   const style=getComputedStyle(ghost),matrix=new DOMMatrix(style.transform),surfaceStyle=getComputedStyle(surface);
   return {visual:{opacity:Number(style.opacity),surfaceHeight:parseFloat(surfaceStyle.height),geometry:{width:parseFloat(style.width),height:parseFloat(style.height),offset:-matrix.m41,top:matrix.m42},shellOpacity:Number(surfaceStyle.opacity),dotOpacity:Number(getComputedStyle(dot).opacity),dotLeft:parseFloat(getComputedStyle(dot).left),dotTop:parseFloat(getComputedStyle(dot).top),shadow:surfaceStyle.boxShadow,padding:surfaceStyle.padding,gap:surfaceStyle.gap,logoOpacity:shell.querySelector('.logo-wrap,.new-mini-avatar,.cluster-count')?Number(getComputedStyle(shell.querySelector('.logo-wrap,.new-mini-avatar,.cluster-count')).opacity):1,textOpacity:copy?Number(getComputedStyle(copy).opacity):0,logoSize:logo?parseFloat(getComputedStyle(logo).width):24,wrapWidth:wrap?parseFloat(getComputedStyle(wrap).width):24,wrapHeight:wrap?parseFloat(getComputedStyle(wrap).height):24,wrapPadding:wrap?getComputedStyle(wrap).padding:'0px'}};
  },
  finish(){if(!newPinTransitions.delete(item))return;children.forEach(a=>a.cancel());ghost.remove();if(item.hide)item.hide.style.visibility='';if(!host.children.length)host.remove();}
 };
 newPinTransitions.add(item);item.position();animation.finished.then(()=>item.finish(),()=>item.finish());return item;
}
function animateNewPinTransitions(before,scene){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||newPinMotion.active||map.isMoving())return;
 const oldOwners=new Map();for(const item of before.values())if(item.kind==='cluster')for(const id of item.members)oldOwners.set(id,item);
 const nextOwners=new Map();for(const item of scene.records)if(item.kind==='cluster')for(const id of item.members)nextOwners.set(id,item);
 const prior=new Set(newPinTransitions),kept=new Set();
 const host=newPinAnimationHost(scene.layer);
 for(const record of scene.records){
  if(!record.el?.isConnected)continue;
  const old=before.get(record.key);
  const unchanged=old&&(record.kind==='cluster'?old.members.join(',')===record.members.join(','):old.state===record.state);
  if(unchanged&&old.transition){old.transition.hide=record.el;record.el.style.visibility='hidden';kept.add(old.transition);continue;}
  old?.transition?.finish();
  if(record.kind==='cluster'){
   if(old&&old.members.join(',')===record.members.join(','))continue;
   for(const id of record.members){
    const pin=before.get('pin:'+id);if(!pin)continue;pin.transition?.finish();
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
 for(const old of before.values())if(old.kind==='cluster'&&!scene.byKey.has(old.key)){
  old.transition?.finish();
  animateNewPinVisual(old.clone,old,{...old,state:'dot',width:16,height:16,absent:true},host);
 }
 for(const item of prior)if(!kept.has(item))item.finish();
 if(!host.children.length)host.remove();
}

function animateNewPinDowngrade(before,record,scene){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 for(const item of [...newPinTransitions])if(item.hide===record.el){Object.assign(before,item.snapshot());before.clone=item.shell.cloneNode(true);item.finish();}
 animateNewPinVisual(before.clone,before,record,newPinAnimationHost(scene.layer),record.el);
}
