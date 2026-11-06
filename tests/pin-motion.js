window.runPinMotion=async function(scenario,capture){
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const layer=document.getElementById('markers');
 await newDotColorsReady;
 map.stop();document.getElementById('newLogicToggle').checked=true;
 map.jumpTo({center:USER_LOCATION,zoom:11});render();await wait(300);
 if(scenario==='selected'){selectPoint(visiblePartnerOffers()[0]);await wait(650);}
 const frozenRevision=newPinMotion.revision;
 const motionStates=new Map([...layer.querySelectorAll('.new-tile-pin')].map(el=>[el.dataset.pinId,el.dataset.state]));
 const clusterAnchors=new Map([...layer.querySelectorAll('.new-tile-cluster')].map(el=>[el.dataset.clusterKey,[el.dataset.lng,el.dataset.lat,el.dataset.memberIds].join('|')]));
 const levels={dot:0,compact:1,expanded:2};
 let promotions=0,clusterMoves=0,movingLayouts=0;
 const before=new Map([...layer.querySelectorAll('.marker:not(.selected)')].map(el=>[el.dataset.pinId,el]));
 let running=true,frames=0,samples=0,started=performance.now(),snapshotIndex=0;
 const errors=[],snapshots=[],targets=[0,32,300];
 function snapshot(time){
  const clone=document.documentElement.cloneNode(true);
  clone.querySelectorAll('script,canvas').forEach(el=>el.remove());
  clone.querySelector('#newLogicToggle').setAttribute('checked','');
  const originals=layer.querySelectorAll('.marker'),copies=clone.querySelectorAll('#markers .marker');
  originals.forEach((el,i)=>{
   const pill=el.querySelector('.pill'),copy=copies[i],style=getComputedStyle(el),pillStyle=getComputedStyle(pill);
   copy.style.setProperty('animation','none','important');copy.style.opacity=style.opacity;copy.style.transform=style.transform;
   copy.querySelector('.pill').style.setProperty('transition','none','important');
   copy.querySelector('.pill').style.setProperty('width',pillStyle.width,'important');
  });
  return {time,html:'<!doctype html>'+clone.outerHTML};
 }
 function sample(now){
  frames++;
  if(newPinMotion.active){
   if(newPinMotion.revision!==frozenRevision)movingLayouts++;
   for(const el of layer.querySelectorAll('.new-tile-pin')){const old=motionStates.get(el.dataset.pinId);if(old&&levels[el.dataset.state]>levels[old])promotions++;motionStates.set(el.dataset.pinId,el.dataset.state);}
   for(const el of layer.querySelectorAll('.new-tile-cluster')){const old=clusterAnchors.get(el.dataset.clusterKey);if(old&&old!==[el.dataset.lng,el.dataset.lat,el.dataset.memberIds].join('|'))clusterMoves++;}
   for(const ghost of document.querySelectorAll('.new-pin-transition-ghost')){const pt=projectActive([Number(ghost.dataset.anchorLng),Number(ghost.dataset.anchorLat)]);if((Math.abs(parseFloat(ghost.style.left)-pt.x)>.1||Math.abs(parseFloat(ghost.style.top)-pt.y)>.1)&&errors.length<100)errors.push({frame:frames,kind:'transition anchor drift'});}
   if(document.querySelector('.new-pin-collapse-ghost')&&errors.length<100)errors.push({frame:frames,kind:'moving ghost'});
  }
  for(const el of layer.querySelectorAll('.marker:not(.selected)')){
   const pill=el.querySelector('.pill'),rect=pill.getBoundingClientRect(),style=getComputedStyle(el),pillStyle=getComputedStyle(pill);
   const state=el.dataset.state;
   const clipped=state==='expanded'&&!newPinInsideViewport(el.getBoundingClientRect(),layer.getBoundingClientRect());
   const target=state==='dot'?16:state==='compact'?28:parseFloat(pill.style.width);
   samples++;
   if((clipped||Math.abs(rect.width-target)>.6||Number(style.opacity)<.999||pillStyle.transitionDuration.split(',').some(s=>parseFloat(s)>0)||style.animationName!=='none')&&errors.length<100){
    errors.push({frame:frames,id:el.dataset.pinId,state,clipped,width:rect.width,target,opacity:style.opacity,animation:style.animationName,transition:pillStyle.transitionDuration});
   }
  }
  if(capture&&snapshotIndex<targets.length&&now-started>=targets[snapshotIndex])snapshots.push(snapshot(targets[snapshotIndex++]));
  if(running)requestAnimationFrame(sample);
 }
 if(scenario==='redraw')render();
 if(scenario==='pan')map.panBy([120,70],{duration:380});
 if(scenario==='pan-back')map.panBy([-160,-90],{duration:380});
 if(scenario==='zoom-in')map.zoomTo(12,{duration:380});
 if(scenario==='zoom-out')map.zoomTo(10,{duration:380});
 if(scenario==='fractional')map.zoomTo(11.49,{duration:380});
 if(scenario==='reverse'){map.panBy([140,80],{duration:450});setTimeout(()=>{map.stop();map.panBy([-90,-30],{duration:220});},120);}
 if(scenario==='cluster')layer.querySelector('.new-tile-cluster')?.click();
 if(scenario==='selected')map.panBy([90,35],{duration:380});
 if(scenario==='toggle'){document.getElementById('newLogicToggle').checked=false;render();document.getElementById('newLogicToggle').checked=true;render();}
 requestAnimationFrame(sample);await wait(1000);running=false;await wait(30);
 let comparable=0,retained=0;
 for(const el of layer.querySelectorAll('.marker:not(.selected)'))if(before.has(el.dataset.pinId)){comparable++;if(before.get(el.dataset.pinId)===el)retained++;}
 if(document.querySelector('.new-pin-transition-ghost'))errors.push({kind:'unfinished transition'});
 if(promotions||clusterMoves||movingLayouts)errors.push({kind:'unstable layout',promotions,clusterMoves,movingLayouts});
 return {scenario,promotions,clusterMoves,movingLayouts,frames,samples,errors,snapshots,comparable,retained};
};
