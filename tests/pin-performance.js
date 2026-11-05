window.measurePins=async function(zoom){
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 document.getElementById('newLogicToggle').checked=true;map.stop();map.jumpTo({center:USER_LOCATION,zoom});render();await wait(700);
 const layer=document.getElementById('markers'),times=[],layoutTimes=[];let listCalls=0,listChanges=0,listDuringMove=0;
 const originalReposition=repositionMapElements,originalList=refreshOfferList,originalRender=renderNewTilePins;
 repositionMapElements=function(...args){const start=performance.now();const result=originalReposition(...args);times.push(performance.now()-start);return result;};
 refreshOfferList=function(...args){listCalls++;const before=sheetState.listKey;const result=originalList(...args);if(sheetState.listKey!==before){listChanges++;if(newPinMotion.active||map.isMoving())listDuringMove++;}return result;};
 renderNewTilePins=function(...args){const start=performance.now();const result=originalRender(...args);layoutTimes.push(performance.now()-start);return result;};
 const domBefore=layer.querySelectorAll('.marker,.cluster').length;
 const viewport=layer.getBoundingClientRect();
 const offscreenBefore=[...layer.querySelectorAll('.marker,.cluster')].filter(el=>{const r=el.getBoundingClientRect();return r.right<=viewport.left||r.left>=viewport.right||r.bottom<=viewport.top||r.top>=viewport.bottom;}).length;
 const dotImages=layer.querySelectorAll('.partner-dot img').length;
 map.panBy([130,50],{duration:1000,easing:t=>t});await wait(1500);
 repositionMapElements=originalReposition;refreshOfferList=originalList;renderNewTilePins=originalRender;
 times.sort((a,b)=>a-b);const at=q=>Number((times[Math.min(times.length-1,Math.floor(times.length*q))]||0).toFixed(2));
 return {domBefore,offscreenBefore,dotImages,moveFrames:times.length,moveMedianMs:at(.5),moveP95Ms:at(.95),moveMaxMs:at(1),listCalls,listChanges,listDuringMove,layoutMaxMs:Number(Math.max(0,...layoutTimes).toFixed(2))};
};
