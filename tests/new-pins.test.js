async function runNewPinTests(check,settle){
 await newDotColorsReady;
 map.stop();map.jumpTo({center:USER_LOCATION,zoom:13});await settle();
 document.getElementById('newLogicToggle').checked=true;
 const layer=document.getElementById('markers');
 const make=(id,x,y,weight,name=brands[id%brands.length][0])=>({
  ...points[0],pinId:10000+id,id:10000+id,name,partnerWeight:weight,selected:false,...map.unproject([x,y])
 });
 const sameTile=Array.from({length:16},(_,i)=>make(i,80,80,100-i));
 const z=getQuadkeyZoom(map.getZoom());
 const plan=getNewTilePlan(sameTile,z);
 check('Новая логика: пять максимальных весов каждого тайла',plan.logos.map(p=>p.partnerWeight).join()==='100,99,98,97,96');
 check('Новая логика: 11 оставшихся точек образуют кластер',plan.clusters.length===1&&plan.clusters[0].count===11&&plan.dots.length===0);
 const ten=getNewTilePlan(sameTile.slice(0,15),z);
 check('Новая логика: ровно 10 оставшихся точек не кластеризуются',ten.clusters.length===0&&ten.dots.length===10);
 check('Новая логика: выбранная точка исключена из тайлов',getNewTilePlan(sameTile.map(p=>({...p,selected:true})),z).logos.length===0);
 check('Новая логика: перестановка исходных точек не меняет результат',getNewTilePlan(sameTile.slice().reverse(),z).logos.map(p=>p.pinId).join()===plan.logos.map(p=>p.pinId).join());
 const fixture=Array.from({length:6},(_,i)=>make(i,60,65+i*90,100-i));
 fixture.push(make(20,270,155,100,fixture[0].name),make(21,270,245,100,fixture[0].name));
 layer.innerHTML='';renderNewTilePins(layer,fixture);
 const state=id=>layer.querySelector(`[data-pin-id="${10000+id}"]`)?.dataset.state;
 check('Новая логика: шесть партнёров раскрыты с текстом',layer.querySelectorAll('[data-state="expanded"]').length===6);
 check('Новая логика: повтор партнёра — один логотип, остальные точки',state(0)==='expanded'&&state(20)==='compact'&&state(21)==='dot');
 const safePins=[...layer.querySelectorAll('.marker:not(.partner-dot),.cluster')].map(el=>newPinSafeRect(el.getBoundingClientRect()));
 check('Новая логика: безопасные зоны по 8 px не пересекаются',safePins.every((a,i)=>safePins.slice(i+1).every(b=>!newPinRectsOverlap(a,b))));
 const stableNodes=new Map([...layer.querySelectorAll('.marker')].map(el=>[el.dataset.pinId,{el,img:el.querySelector('img')}]));
 for(let i=0;i<10;i++)renderNewTilePins(layer,fixture);
 check('Новая логика: повторный рендер сохраняет DOM пинов и логотипов',[...layer.querySelectorAll('.marker')].every(el=>stableNodes.get(el.dataset.pinId)?.el===el&&stableNodes.get(el.dataset.pinId)?.img===el.querySelector('img')));
 check('Новая логика: нет видимых измерительных элементов',!layer.querySelector('.new-pin-staging'));
 check('Новая логика: точки сразу имеют 16 px и полную непрозрачность',[...layer.querySelectorAll('.partner-dot')].every(el=>Math.abs(el.getBoundingClientRect().width-16)<.1&&getComputedStyle(el).opacity==='1'));
 check('Новая логика: рендер не запускает анимации точек и ширины',[...layer.querySelectorAll('.marker')].every(el=>getComputedStyle(el).animationName==='none'&&getComputedStyle(el.querySelector('.pill')).transitionDuration==='0s'));
 // All four edges: an in-viewport anchor is insufficient for a text label.
 const {clientWidth:viewportWidth,clientHeight:viewportHeight}=getActiveMapSize();
 const fullyInside=el=>{
  const rect=el.getBoundingClientRect(),viewport=layer.getBoundingClientRect();
  return rect.left>=viewport.left&&rect.top>=viewport.top&&rect.right<=viewport.right&&rect.bottom<=viewport.bottom;
 };
 for(const [edge,x,y] of [['right',viewportWidth-8,65],['left',5,65],['top',270,5],['bottom',270,viewportHeight-5]]){
  const edgePin=make(40,x,y,300,'Boundary fixture');
  renderNewTilePins(layer,[edgePin,...fixture.slice(0,6)]);
  check(`Новая логика: граница ${edge} оставляет высокий вес логотипом`,state(40)==='compact');
  check(`Новая логика: граница ${edge} передаёт текст следующему весу`,layer.querySelectorAll('[data-state="expanded"]').length===6&&fixture.slice(0,6).every(p=>layer.querySelector(`[data-pin-id="${p.pinId}"]`)?.dataset.state==='expanded'));
  check(`Новая логика: все текстовые пины внутри вьюпорта (${edge})`,[...layer.querySelectorAll('[data-state="expanded"]')].every(fullyInside));
 }
 renderNewTilePins(layer,[make(40,viewportWidth-8,65,300,fixture[0].name),...fixture.slice(0,6)]);
 check('Новая логика: другой пин того же партнёра может получить текст',state(40)==='compact'&&state(0)==='expanded');
 // The first six nominal text candidates collide. Lower weights must still
 // be tried until at least four real, non-overlapping labels are on screen.
 const crowded=Array.from({length:6},(_,i)=>make(50+i,60,65,300-i,'High '+i));
 const replacements=Array.from({length:5},(_,i)=>make(60+i,60,200+i*90,90-i,'Lower '+i));
 renderNewTilePins(layer,[...crowded,...replacements]);
 const actualText=[...layer.querySelectorAll('[data-state="expanded"]')];
 check('Новая логика: коллизии высоких весов не мешают раскрыть минимум четыре пина',actualText.length>=4);
 check('Новая логика: максимальный вес сохраняет текстовый приоритет',state(50)==='expanded');
 check('Новая логика: свободные текстовые места получают меньшие веса',actualText.filter(el=>Number(el.dataset.pinId)>=10060).length>=3);
 check('Новая логика: добранные текстовые пины полностью внутри вьюпорта',actualText.every(fullyInside));
 const replacementRects=[...layer.querySelectorAll('.marker:not(.partner-dot),.cluster')].map(el=>newPinSafeRect(el.getBoundingClientRect()));
 check('Новая логика: добор текста сохраняет безопасные зоны',replacementRects.every((rect,i)=>replacementRects.slice(i+1).every(other=>!newPinRectsOverlap(rect,other))));
 // Force a fourth text pin to come from below the tile's top five.
 const fullTile=getVisibleTiles(z).find(tile=>{
  const a=projectActive(tileToLngLat(tile.x,tile.y,z)),b=projectActive(tileToLngLat(tile.x+1,tile.y+1,z));
  return a.x<=60&&b.x>=60&&a.y>25&&b.y<viewportHeight-25;
 });
 const tileTop=projectActive(tileToLngLat(fullTile.x,fullTile.y,z)).y;
 const reserveHigh=Array.from({length:6},(_,i)=>make(100+i,60,tileTop+60,400-i,'Blocked '+i));
 const reservePoint=make(110,60,tileTop+140,100,'Reserve');
 const reserveScene=[...reserveHigh,reservePoint,make(111,60,55,90,'Free A'),make(112,60,viewportHeight-40,80,'Free B')];
 check('Новая логика: резервный кандидат исходно не входит в пять логотипов тайла',getNewTilePlan(reserveScene,z).dots.some(p=>p.pinId===reservePoint.pinId));
 renderNewTilePins(layer,reserveScene);
 check('Новая логика: резерв ниже пяти лидеров добирает четвёртый текстовый пин',layer.querySelectorAll('[data-state="expanded"]').length>=4&&state(110)==='expanded');
 check('Новая логика: резервный добор не теряет и не дублирует точки',newPinMotion.scene.representedIds.size===reserveScene.length);
 const clusterReserveScene=[...reserveScene,...Array.from({length:9},(_,i)=>make(120+i,60,tileTop+60,70-i,'Cluster filler '+i))];
 renderNewTilePins(layer,clusterReserveScene);
 check('Новая логика: четвёртый текст может получить участник кластера',layer.querySelectorAll('[data-state="expanded"]').length>=4&&state(110)==='expanded');
 const clusterRepresented=newPinMotion.scene.representedIds.size;
 check('Новая логика: выделение текста из кластера сохраняет точное число точек',clusterRepresented===clusterReserveScene.length);
 const ample=Array.from({length:8},(_,i)=>make(80+i,60,65+i*70,150-i,'Rank '+i));
 renderNewTilePins(layer,ample);
 check('Новая логика: добор сохраняет верхний лимит шесть',layer.querySelectorAll('[data-state="expanded"]').length===6);
 check('Новая логика: при свободном месте текст получают шесть наивысших весов',ample.slice(0,6).every(p=>layer.querySelector(`[data-pin-id="${p.pinId}"]`)?.dataset.state==='expanded'));
 renderNewTilePins(layer,[make(70,viewportWidth-8,65,300,'Repeated'),make(71,viewportWidth-8,155,299,'Repeated'),make(72,60,245,298,'Repeated')]);
 check('Новая логика: после добора у партнёра остаётся один текст, один логотип и точки',state(70)==='compact'&&state(71)==='dot'&&state(72)==='expanded');
 const highest=make(30,60,65,200),lower=make(31,60,65,190);
 layer.innerHTML='';renderNewTilePins(layer,[lower,highest]);
 check('Новая логика: коллизию выигрывает максимальный вес',state(30)==='expanded'&&state(31)==='dot');
 const transitioning=layer.querySelector('[data-pin-id="10031"]');
 renderNewTilePins(layer,[{...lower,lng:map.unproject([60,250]).lng,lat:map.unproject([60,250]).lat},highest]);
 check('Новая логика: смена точки на полный пин сохраняет узел и восстанавливает логотип',state(31)==='expanded'&&layer.querySelector('[data-pin-id="10031"]')===transitioning&&transitioning.querySelector('img')?.getAttribute('src')===lower.logo);
 renderNewTilePins(layer,[lower,highest]);
 check('Новая логика: смена полного пина на точку сразу даёт 16 px',state(31)==='dot'&&Math.abs(transitioning.getBoundingClientRect().width-16)<.1&&getComputedStyle(transitioning).opacity==='1');
 check('Уменьшение пина до точки сопровождается анимацией',matchMedia('(prefers-reduced-motion: reduce)').matches||document.querySelector('.new-pin-collapse-ghost')?.getAnimations().some(a=>a.playState==='running'));
 layer.innerHTML='';renderNewTilePins(layer,[highest,make(32,60,110,180)]);
 check('Новая логика: зазор учитывает 8 px с каждой стороны обоих пинов',state(30)==='expanded'&&state(32)==='dot');
 layer.innerHTML='';renderNewTilePins(layer,sameTile);
 check('Новая логика: возвращён обычный тайловый кластер с точным составом',layer.querySelector('.new-tile-cluster')?.dataset.memberIds.split(',').length===11,JSON.stringify(newPinMotion.scene.records.filter(r=>r.kind==='cluster').map(r=>({key:r.key,pt:r.pt,count:r.members.length,connected:r.el.isConnected}))));
 const cluster=layer.querySelector('.new-tile-cluster');
 const before=cluster?.style.cssText;
 for(let i=0;i<20;i++)map.fire('move');
 check('Новая логика: движение не пересоздаёт кластер и не меняет его якорь',cluster?.isConnected&&cluster.style.cssText===before);
 const clusterSafe=[...layer.querySelectorAll('.marker:not(.partner-dot),.cluster')].map(el=>newPinSafeRect(el.getBoundingClientRect()));
 check('Новая логика: кластеры также не накладываются на пины',clusterSafe.every((a,i)=>clusterSafe.slice(i+1).every(b=>!newPinRectsOverlap(a,b))));
 check('Новая логика: цвета получены для всех 147 партнёров',newPartnerDotColors.size===147&&[...newPartnerDotColors.values()].every(color=>/^#[0-9a-f]{6}$/i.test(color)));
 check('Новая логика: разные фоны дают разные цвета точек',new Set(newPartnerDotColors.values()).size>10);
 // Real data at several zooms: preserve every point in complete visible tiles.
 for(const zoom of [10,12,14,17,22]){
  map.jumpTo({zoom,center:zoom>=17?[points[0].lng,points[0].lat]:USER_LOCATION});render();await settle();
  const visible=new Set(getVisibleTiles(getQuadkeyZoom(map.getZoom())).map(t=>t.key));
  const expected=points.filter(p=>{const tile=lngLatToTile(p.lng,p.lat,getQuadkeyZoom(map.getZoom()));return visible.has(tileToQuadkey(tile.x,tile.y,getQuadkeyZoom(map.getZoom())));}).length;
  const activeIds=new Set(points.filter(p=>{const tile=lngLatToTile(p.lng,p.lat,getQuadkeyZoom(map.getZoom()));return visible.has(tileToQuadkey(tile.x,tile.y,getQuadkeyZoom(map.getZoom())));}).map(p=>String(p.pinId)));
  const actual=[...newPinMotion.scene.representedIds].filter(id=>activeIds.has(id)).length;
  check(`Новая логика: все точки учтены на зуме ${zoom}`,expected===actual,`${actual}/${expected}`);
 }
 map.jumpTo({center:USER_LOCATION,zoom:11});render();await settle();
 const clusterToClick=layer.querySelector('.new-tile-cluster');
 const zoomBefore=map.getZoom();clusterToClick?.click();await settle();
 check('Новая логика: клик по тайловому кластеру приближает карту',!!clusterToClick&&map.getZoom()>zoomBefore+.9);
 document.getElementById('newLogicToggle').checked=false;map.jumpTo({center:USER_LOCATION,zoom:11});render();
 check('Выключение новой логики возвращает исходные кластеры',!layer.querySelector('.new-tile-cluster')&&!!layer.querySelector('.cluster'));
 const toggle=document.getElementById('newLogicToggle');
 for(const zoom of [11.35,13.8,16.25]){
  toggle.checked=false;map.jumpTo({center:[37.64,55.76],zoom});render();
  const centerBefore=map.getCenter().toArray(),zoomBefore=map.getZoom();
  let events=0;const moved=()=>events++;map.on('move',moved);
  toggle.checked=true;toggle.onchange();await settle();map.off('move',moved);
  check(`Переключение логики сохраняет камеру на зуме ${zoom}`,events===0&&Math.abs(map.getZoom()-zoomBefore)<1e-8&&map.getCenter().toArray().every((value,i)=>Math.abs(value-centerBefore[i])<1e-8));
 }
 document.getElementById('newLogicToggle').checked=true;map.jumpTo({center:USER_LOCATION,zoom:12});render();await settle();
}
