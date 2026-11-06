async function runNewPinArtifactTests(check,settle){
 const wait=ms=>new Promise(r=>setTimeout(r,ms)),layer=document.getElementById('markers');
 map.stop();map.jumpTo({center:USER_LOCATION,zoom:13});await settle();
 const make=(id,x,y,weight,name)=>{const b=brands[id%brands.length];return {...points[0],id:960000+id,pinId:960000+id,name:name||b[0],logo:b[5],partnerWeight:weight,selected:false,...unprojectActive([x,y])};};
 const low=make(40,70,220,100),high=make(41,70,220,500);
 renderNewTilePins(layer,[low]);await wait(350);renderNewTilePins(layer,[high,low]);
 const tween=[...newPinTransitions].find(item=>item.hide?.dataset.pinId===String(low.pinId));
 let round=true,white=true,fades=false;
 if(tween){
  const surface=tween.shell.querySelector('.pill');
  const dot=tween.ghost.querySelector('.new-pin-transition-dot');
  for(const part of [.05,.2,.4,.6,.8,.95]){
   for(const a of tween.ghost.getAnimations({subtree:true})){a.pause();a.currentTime=320*part;}
   const box=dot.getBoundingClientRect(),style=getComputedStyle(surface);
   round&&=Math.abs(box.width-box.height)<.01&&Math.abs(box.width-16)<.01;
   white&&=style.backgroundColor==='rgb(255, 255, 255)';
   const alpha=Number(style.boxShadow.match(/rgba\([^)]*,\s*([\d.]+)\)/)?.[1]);
   fades||=alpha>0&&alpha<.1;
  }
  const dotBefore=dot.getBoundingClientRect();
  const current=tween.ghost.getBoundingClientRect(),surfaceHeight=surface.getBoundingClientRect().height;
  const record=newPinMotion.scene.byKey.get('pin:'+low.pinId);
  animateNewPinDowngrade({...record,state:'expanded',clone:tween.shell.cloneNode(true)},record,newPinMotion.scene);
  const retargeted=[...newPinTransitions].find(item=>item.hide===record.el);
  const resumed=retargeted.ghost.getBoundingClientRect(),dotAfter=retargeted.ghost.querySelector('.new-pin-transition-dot').getBoundingClientRect();
  check('Прерывание: цветная точка не скачет при смене цели',Math.abs(dotBefore.left-dotAfter.left)<.05&&Math.abs(dotBefore.top-dotAfter.top)<.05);
  check('Прерывание: смена цели продолжает текущий размер и позицию',Math.abs(current.left-resumed.left)<.05&&Math.abs(current.top-resumed.top)<.05&&Math.abs(current.width-resumed.width)<.05&&Math.abs(surfaceHeight-retargeted.shell.querySelector('.pill').getBoundingClientRect().height)<.05);
  const before=retargeted.ghost.getBoundingClientRect(),clock=retargeted.animation.currentTime;
  beginNewPinMotion();const after=retargeted.ghost.getBoundingClientRect();
  check('Прерывание: новый жест не меняет текущую геометрию',Math.abs(before.left-after.left)<.01&&Math.abs(before.top-after.top)<.01&&Math.abs(before.width-after.width)<.01);
  check('Прерывание: часы анимации и DOM продолжаются',newPinTransitions.has(retargeted)&&clock===retargeted.animation.currentTime&&retargeted.ghost.isConnected);
 }
 check('Сворачивание: цветная точка всегда круглая 16×16',!!tween&&round);
 check('Сворачивание: растянутая часть остаётся белой',!!tween&&white);
 check('Сворачивание: тень имеет промежуточную прозрачность',!!tween&&fades);
 clearNewPinTransitions();newPinMotion.active=false;
 // An expanded pin crossing the edge remains expanded until moveend.
 const edge=make(42,75,160,300);renderNewTilePins(layer,[edge]);await wait(350);
 let outsideExpanded=false,settledCompact=false;
 const observe=()=>{const el=layer.querySelector(`[data-pin-id="${edge.pinId}"]`);if(el&&!newPinInsideViewport(el.getBoundingClientRect(),layer.getBoundingClientRect()))outsideExpanded||=el.dataset.state==='expanded';};
 const stopped=()=>{settledCompact=layer.querySelector(`[data-pin-id="${edge.pinId}"]`)?.dataset.state==='compact';};
 map.on('move',observe);map.once('moveend',stopped);map.panBy([-220,0],{duration:260,easing:t=>t});await wait(300);map.off('move',observe);
 check('Край: текст не сворачивается во время движения',outsideExpanded);
 check('Край: необходимое сворачивание выполняется в moveend',settledCompact);await settle();
 map.jumpTo({center:USER_LOCATION,zoom:13});await settle();
 const leaders=Array.from({length:6},(_,i)=>make(i,60,60+i*90,600-i));
 const name=leaders[0].name;
 const secondary=make(60,320,120,599,name),repeat=make(61,300,260,100,name);
 const neighbours=[make(62,300,270,99),make(63,300,280,98)];
 renderNewTilePins(layer,[...leaders,secondary,repeat,...neighbours]);await wait(350);
 const members=[...layer.querySelectorAll('.new-mini-cluster')].flatMap(el=>el.dataset.memberIds.split(','));
 check('Мини-кластеры: текст и отдельный логотип партнёра сохранены',layer.querySelector(`[data-pin-id="${leaders[0].pinId}"]`)?.dataset.state==='expanded'&&layer.querySelector(`[data-pin-id="${secondary.pinId}"]`)?.dataset.state==='compact');
 check('Мини-кластеры: представленный партнёр исключён целиком',!members.includes(String(secondary.pinId))&&!members.includes(String(repeat.pinId)));
 check('Мини-кластеры: остальные партнёры могут объединяться',members.includes(String(neighbours[0].pinId))&&members.includes(String(neighbours[1].pinId)));
 renderNewTilePins(layer,[...leaders.slice(1),secondary,repeat,...neighbours]);await wait(350);
 check('Мини-кластеры: после исчезновения текста партнёр снова допустим',[...layer.querySelectorAll('.new-mini-cluster')].some(el=>el.dataset.memberIds.split(',').includes(String(repeat.pinId))));
 render();await settle();
}
