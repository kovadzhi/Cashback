async function runNewPinTests(check,settle){
 await newDotColorsReady;
 map.stop();map.jumpTo({center:USER_LOCATION,zoom:13});
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
 const highest=make(30,60,65,200),lower=make(31,60,65,190);
 layer.innerHTML='';renderNewTilePins(layer,[lower,highest]);
 check('Новая логика: коллизию выигрывает максимальный вес',state(30)==='expanded'&&state(31)==='dot');
 layer.innerHTML='';renderNewTilePins(layer,[highest,make(32,60,110,180)]);
 check('Новая логика: зазор учитывает 8 px с каждой стороны обоих пинов',state(30)==='expanded'&&state(32)==='dot');
 layer.innerHTML='';renderNewTilePins(layer,sameTile);
 check('Новая логика: возвращён обычный тайловый кластер с точным составом',layer.querySelector('.new-tile-cluster')?.dataset.memberIds.split(',').length===11);
 const cluster=layer.querySelector('.new-tile-cluster');
 const before=cluster?.style.cssText;
 for(let i=0;i<20;i++)map.fire('move');
 check('Новая логика: движение не пересоздаёт кластер и не меняет его якорь',cluster?.isConnected&&cluster.style.cssText===before);
 const clusterSafe=[...layer.querySelectorAll('.marker:not(.partner-dot),.cluster')].map(el=>newPinSafeRect(el.getBoundingClientRect()));
 check('Новая логика: кластеры также не накладываются на пины',clusterSafe.every((a,i)=>clusterSafe.slice(i+1).every(b=>!newPinRectsOverlap(a,b))));
 check('Новая логика: цвета получены для всех 47 логотипов',newPartnerDotColors.size===47&&[...newPartnerDotColors.values()].every(color=>/^#[0-9a-f]{6}$/i.test(color)));
 check('Новая логика: разные фоны дают разные цвета точек',new Set(newPartnerDotColors.values()).size>10);
 // Real data at several zooms: preserve every point in complete visible tiles.
 for(const zoom of [10,12,14,17,22]){
  map.jumpTo({zoom,center:zoom>=17?[points[0].lng,points[0].lat]:USER_LOCATION});render();
  const visible=new Set(getVisibleTiles(getQuadkeyZoom(map.getZoom())).map(t=>t.key));
  const expected=points.filter(p=>{const tile=lngLatToTile(p.lng,p.lat,getQuadkeyZoom(map.getZoom()));return visible.has(tileToQuadkey(tile.x,tile.y,getQuadkeyZoom(map.getZoom())));}).length;
  const actual=layer.querySelectorAll('.marker').length+[...layer.querySelectorAll('.new-tile-cluster')].reduce((sum,el)=>sum+el.dataset.memberIds.split(',').length,0);
  check(`Новая логика: все точки учтены на зуме ${zoom}`,expected===actual,`${actual}/${expected}`);
 }
 map.jumpTo({center:USER_LOCATION,zoom:11});render();await settle();
 const clusterToClick=layer.querySelector('.new-tile-cluster');
 const zoomBefore=map.getZoom();clusterToClick?.click();await settle();
 check('Новая логика: клик по тайловому кластеру приближает карту',!!clusterToClick&&map.getZoom()>zoomBefore+.9);
 document.getElementById('newLogicToggle').checked=false;map.jumpTo({center:USER_LOCATION,zoom:11});render();
 check('Выключение новой логики возвращает исходные кластеры',!layer.querySelector('.new-tile-cluster')&&!!layer.querySelector('.cluster'));
 document.getElementById('newLogicToggle').checked=true;map.jumpTo({center:USER_LOCATION,zoom:12});render();
}
