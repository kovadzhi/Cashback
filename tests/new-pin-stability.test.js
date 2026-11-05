async function runNewPinStabilityTests(check,settle){
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 const layer=document.getElementById('markers');
 document.getElementById('newLogicToggle').checked=true;
 map.stop();map.jumpTo({center:USER_LOCATION,zoom:12});render();await settle();
 const level={dot:0,compact:1,expanded:2};
 async function inspectGesture(name,action,duration=950){
  const revision=newPinMotion.revision,settles=newPinMotion.settles,listKey=sheetState.listKey;
  let listStable=true,onlyVisible=true;
  const pins=new Map(newPinMotion.scene.records.filter(r=>r.kind==='pin').map(r=>[String(r.p.pinId),{el:r.el,state:r.state}]));
  const clusters=new Map(newPinMotion.scene.records.filter(r=>r.kind==='cluster').map(r=>[r.key.slice(5),{el:r.el,lng:String(r.lng),lat:String(r.lat),members:r.members.join(',')}]));
  let running=true,frames=0,frozen=true,monotonic=true,anchors=true,members=true,identities=true,inside=true,overlaps=false,ghosts=false,details=[];
  function sample(){
   if(newPinMotion.active){
    frames++;frozen&&=newPinMotion.revision===revision;listStable&&=sheetState.listKey===listKey;
    ghosts||=!!document.querySelector('.new-pin-collapse-ghost');
    const viewport=layer.getBoundingClientRect(),rects=[];
    for(const el of layer.querySelectorAll('.new-tile-pin,.new-tile-cluster,.marker.selected')){
     if(el.classList.contains('new-tile-pin')){
      const old=pins.get(el.dataset.pinId);
      identities&&=!!old&&(!old.el||old.el===el);
      if(old){old.el=el;monotonic&&=level[el.dataset.state]<=level[old.state];old.state=el.dataset.state;}
      if(el.dataset.state==='expanded'&&!newPinInsideViewport(el.getBoundingClientRect(),viewport)){inside=false;if(details.length<2)details.push({kind:'outside',id:el.dataset.pinId,rect:el.getBoundingClientRect().toJSON()});}
     }
     if(el.classList.contains('new-tile-cluster')){
      const old=clusters.get(el.dataset.clusterKey);
      anchors&&=!!old&&old.lng===el.dataset.lng&&old.lat===el.dataset.lat;
      members&&=!!old&&old.members===el.dataset.memberIds;
      identities&&=!!old&&old.el===el;
     }
     const bounds=el.getBoundingClientRect();const shown=bounds.right>viewport.left&&bounds.left<viewport.right&&bounds.bottom>viewport.top&&bounds.top<viewport.bottom;if(!shown&&details.length<2)details.push({kind:'culled',id:el.dataset.pinId,key:el.dataset.clusterKey,bounds:bounds.toJSON(),viewport:viewport.toJSON()});onlyVisible&&=shown;
     if(el.dataset.state!=='dot'&&el.style.visibility!=='hidden')rects.push(newPinSafeRect(el.getBoundingClientRect()));
    }
    const collision=rects.some((rect,i)=>rects.slice(i+1).some(other=>newPinRectsOverlap(rect,other)));if(collision&&!overlaps&&details.length<2)details.push({kind:'overlap',rects});overlaps||=collision;
   }
   if(running)requestAnimationFrame(sample);
  }
  action();requestAnimationFrame(sample);await wait(duration);running=false;await wait(30);
  check(`${name}: нет общей перестройки во время жеста`,frames>0&&frozen,`${frames} frames`);
  check(`${name}: пины не раскрываются обратно в том же жесте`,monotonic);
  check(`${name}: географические якоря кластеров не скачут`,anchors&&members);
  check(`${name}: DOM пинов и кластеров сохранён`,identities);
  check(`${name}: текст полностью внутри вьюпорта`,inside,inside?'':JSON.stringify(details));
  check(`${name}: безопасные зоны не пересекаются`,!overlaps,overlaps?JSON.stringify(details):'');
  check(`${name}: нет неподвижных анимационных копий`,!ghosts);
  check(`${name}: шторка не меняется до итогового обновления`,listStable);
  check(`${name}: шторка и пины имеют одну версию данных`,sheetElements.list.dataset.mapRevision===String(newPinMotion.revision));
  check(`${name}: DOM содержит только видимые маркеры`,onlyVisible,onlyVisible?'':JSON.stringify(details));
  check(`${name}: один пересчёт после остановки`,!newPinMotion.active&&newPinMotion.settles===settles+1);
 }
 await inspectGesture('Стабильная панорама',()=>map.panBy([160,70],{duration:400}));
 await inspectGesture('Стабильное отдаление',()=>map.zoomTo(11,{duration:400}));
 await inspectGesture('Стабильное приближение',()=>map.zoomTo(12,{duration:400}));
 await inspectGesture('Прерванный жест',()=>{
  map.panBy([100,0],{duration:180});
  setTimeout(()=>map.panBy([-100,0],{duration:180}),240);
 },1050);
 const visibleText=[...layer.querySelectorAll('.new-tile-pin[data-state="expanded"]')];
 check('После остановки возвращается до шести текстовых пинов',visibleText.length<=6&&visibleText.length>0);
 check('После остановки кластерные скрытия сброшены',!layer.querySelector('[data-motion-hidden]'));
 check('Цветные точки не содержат скрытых логотипов',!layer.querySelector('.partner-dot img'));
 check('Логическая сцена не теряет точки при виртуализации',newPinMotion.scene.records.length>=layer.querySelectorAll('.new-tile-pin,.new-tile-cluster').length);
 const chosen=visiblePartnerOffers()[0];
 selectPoint(chosen);await settle();
 map.panBy([45,0],{duration:400});await wait(80);
 closeSelectedOffer();
 check('Закрытие карточки во время жеста сразу удаляет выбранный пин',!layer.querySelector('.marker.selected'));
 await settle();
 const initialTiles=getVisibleTiles(getQuadkeyZoom(map.getZoom()));
 const initialTop=Math.min(...initialTiles.map(tile=>projectActive(tileToLngLat(tile.x,tile.y,getQuadkeyZoom(map.getZoom()))).y));
 map.panBy([0,initialTop+40],{duration:0});await settle();
 const viewport=layer.getBoundingClientRect(),tiles=getVisibleTiles(getQuadkeyZoom(map.getZoom()));
 const corners=tiles.flatMap(tile=>[projectActive(tileToLngLat(tile.x,tile.y,tile.z??getQuadkeyZoom(map.getZoom()))),projectActive(tileToLngLat(tile.x+1,tile.y+1,tile.z??getQuadkeyZoom(map.getZoom())))]);
 const top=Math.min(...corners.map(p=>p.y)),bottom=Math.max(...corners.map(p=>p.y));
 const bufferY=bottom-viewport.height<108?bottom+12:top-12;
 const bufferPoint={...points[0],pinId:990001,id:990001,selected:false,...unprojectActive([viewport.width/2,bufferY])};
 renderNewTilePins(layer,getRenderPoints().concat(bufferPoint));
 check('Резервные точки хранятся данными и не создают DOM вне вьюпорта',newPinMotion.scene.representedIds.has('990001')&&!layer.querySelector('[data-pin-id="990001"]'));
 const makeEdge=(x)=>({...points[0],pinId:990002,id:990002,selected:false,...unprojectActive([x,80])});
 renderNewTilePins(layer,[makeEdge(60)]);
 const fullWidth=layer.querySelector('[data-pin-id="990002"]').getBoundingClientRect().width;
 const edgeX=layer.clientWidth-fullWidth+18-5;
 layer.innerHTML='';renderNewTilePins(layer,[makeEdge(edgeX)]);
 const edgeState=()=>layer.querySelector('[data-pin-id="990002"]').dataset.state;
 check('Гистерезис: у нового текста есть запас от границы',edgeState()==='compact');
 renderNewTilePins(layer,[makeEdge(edgeX-20)]);
 check('Гистерезис: текст раскрывается после входа в безопасную область',edgeState()==='expanded');
 renderNewTilePins(layer,[makeEdge(edgeX)]);
 check('Гистерезис: раскрытый текст сохраняется до фактической границы',edgeState()==='expanded');
 renderNewTilePins(layer,[makeEdge(edgeX+7)]);
 check('Гистерезис: за границей текст становится логотипом',edgeState()==='compact');
 document.getElementById('newLogicToggle').checked=false;render();
 check('Старый режим не использует стабилизацию новой логики',!newPinMotion.active&&!layer.querySelector('.new-tile-pin'));
 document.getElementById('newLogicToggle').checked=true;render();await settle();
}
