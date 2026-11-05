/* Map and sheet coordinates share the same active viewport (below the 44 px header). */
const sheetState={selected:null,returnCamera:null,listExpanded:false,detailExpanded:false,listKey:'',drag:null,frame:0,focusReturn:null,motionFrame:0,motionUntil:0,motionTimer:0,viewportHeight:null,viewportWidth:null};
const sheetElements={};
const HEADER_HEIGHT=44,LIST_MAP_HEIGHT=570,DETAIL_MAP_HEIGHT=228;
function normalSheetTop(kind){
 const height=sheetElements.wrap.clientHeight;
 // Preserve the Figma dimensions at standard phone sizes; retain a usable sheet on short displays.
 return HEADER_HEIGHT+Math.min(kind==='detail'?DETAIL_MAP_HEIGHT:LIST_MAP_HEIGHT,Math.max(0,height-HEADER_HEIGHT-96));
}
function sheetContentHeight(kind){
 return kind==='detail'?sheetElements.detail.querySelector('.detail-content').scrollHeight:
  24+sheetElements.categories.offsetHeight+(sheetElements.empty.hidden?sheetElements.list.scrollHeight:sheetElements.empty.scrollHeight);
}
function expandedSheetTop(kind){
 return Math.min(normalSheetTop(kind),Math.max(HEADER_HEIGHT,sheetElements.wrap.clientHeight-sheetContentHeight(kind)));
}
function getActiveMapSize(){
 const layer=document.getElementById('markers');
 return {clientWidth:layer.clientWidth,clientHeight:layer.clientHeight};
}
function projectActive(lngLat){const pt=map.project(lngLat);return {x:pt.x,y:pt.y-HEADER_HEIGHT};}
function unprojectActive(point){return map.unproject([point[0],point[1]+HEADER_HEIGHT]);}
function getActiveMapBounds(){
 const {clientWidth:w,clientHeight:h}=getActiveMapSize();
 const bounds=new maplibregl.LngLatBounds();
 for(const point of [[0,0],[w,0],[0,h],[w,h]])bounds.extend(unprojectActive(point));
 return bounds;
}
function getMapPadding(){
 const h=getActiveMapSize().clientHeight;
 return {top:HEADER_HEIGHT,bottom:Math.max(0,sheetElements.wrap.clientHeight-HEADER_HEIGHT-h),left:0,right:0};
}
function frontSheet(){return sheetState.selected?sheetElements.detail:sheetElements.offers;}
function sheetKind(){return sheetState.selected?'detail':'list';}
function isSheetAtMaximum(sheet,kind){
 return Math.abs(sheet.getBoundingClientRect().top-sheetElements.wrap.getBoundingClientRect().top-expandedSheetTop(kind))<1;
}
function updateSheetPresentation(){
 const sheet=frontSheet(),kind=sheetKind();
 const top=sheet.getBoundingClientRect().top-sheetElements.wrap.getBoundingClientRect().top;
 const dockTop=sheetState.drag?top:parseFloat(sheet.style.top);
 const docked=dockTop<=HEADER_HEIGHT+.5;
 sheetElements.wrap.classList.toggle('sheet-docked',docked);
 sheetElements.offers.classList.toggle('docked',sheet===sheetElements.offers&&docked);
 sheetElements.detail.classList.toggle('docked',sheet===sheetElements.detail&&docked);
 const grip=sheetElements.offers.querySelector('.sheet-grip');
 grip.inert=docked;grip.tabIndex=docked?-1:0;
 for(const [current,currentKind] of [[sheetElements.offers,'list'],[sheetElements.detail,'detail']]){
  const expanded=sheetState[currentKind==='detail'?'detailExpanded':'listExpanded'];
  const ready=current===sheet&&expanded&&!sheetState.drag&&performance.now()>=sheetState.motionUntil&&isSheetAtMaximum(current,currentKind);
  current.classList.toggle('scroll-ready',ready);
  if(ready)current.classList.remove('expanding');
 }
 const draggingUp=sheetState.drag&&sheetState.drag.moved&&sheetState.drag.lastY<sheetState.drag.startY;
 sheetElements.wrap.classList.toggle('controls-hidden',!!sheetState.selected||sheetState.listExpanded||!!draggingUp||top<normalSheetTop('list')-.5);
}
function updateActiveViewport(){
 const sheet=frontSheet();
 const top=sheet.getBoundingClientRect().top-sheetElements.wrap.getBoundingClientRect().top;
 const height=Math.max(0,top-HEADER_HEIGHT);
 const oldHeight=getActiveMapSize().clientHeight;
 sheetElements.wrap.style.setProperty('--active-map-height',height+'px');
 if(map){
  const width=getActiveMapSize().clientWidth;
  // Changing MapLibre padding stops an in-flight camera transition. Update it only
  // when viewport geometry changes, so idle sheet observers never cancel fitBounds.
  if(sheetState.viewportHeight!==height||sheetState.viewportWidth!==width){
   sheetState.viewportHeight=height;sheetState.viewportWidth=width;
   const padding=getMapPadding();
   if(sheetState.selected){const p=sheetState.selected;map.easeTo({padding,center:[p.lng,p.lat],offset:[0,45],duration:0});}
   else map.setPadding(padding);
  }
  if(Math.abs(oldHeight-height)>.5)render();
 }
 updateSheetPresentation();
}
function watchSheetMotion(){
 if(sheetState.motionFrame)return;
 function frame(){
  sheetState.motionFrame=0;updateActiveViewport();
  if(performance.now()<sheetState.motionUntil)sheetState.motionFrame=requestAnimationFrame(frame);
  else{updateSheetPresentation();scheduleOfferRefresh();}
 }
 sheetState.motionFrame=requestAnimationFrame(frame);
}
function setSheetPosition(kind,top,{centerSelected=false}={}){
 const sheet=kind==='detail'?sheetElements.detail:sheetElements.offers;
 sheet.style.top=top+'px';
 if(kind==='list'&&sheetState.selected)return;
 const expanded=sheetState[kind==='detail'?'detailExpanded':'listExpanded'];
 sheet.classList.remove('scroll-ready');sheet.classList.add('expanding');
 if(!expanded&&!sheetState.drag)sheet.querySelector('.sheet-scroll').scrollTop=0;
 if(sheetState.drag){updateActiveViewport();}
 else{
  sheetState.motionUntil=performance.now()+(matchMedia('(prefers-reduced-motion: reduce)').matches?0:300);
  updateActiveViewport();watchSheetMotion();
  clearTimeout(sheetState.motionTimer);
  sheetState.motionTimer=setTimeout(()=>{if(!sheetState.drag){updateActiveViewport();refreshOfferList();}},310);
 }
 if(centerSelected&&sheetState.selected&&map){
  const p=sheetState.selected;
  map.easeTo({center:[p.lng,p.lat],offset:[0,45],duration:0});
 }
}
function layoutSheets(){
 sheetElements.wrap.style.setProperty('--map-controls-top',(HEADER_HEIGHT+(normalSheetTop('list')-HEADER_HEIGHT)/2-82)+'px');
 setSheetPosition('list',sheetState.listExpanded?expandedSheetTop('list'):normalSheetTop('list'));
 if(sheetState.selected)setSheetPosition('detail',sheetState.detailExpanded?expandedSheetTop('detail'):normalSheetTop('detail'),{centerSelected:true});
 const grip=sheetElements.offers.querySelector('.sheet-grip');
 grip.setAttribute('aria-expanded',String(sheetState.listExpanded));
 grip.setAttribute('aria-label',sheetState.listExpanded?'Свернуть список предложений':'Развернуть список предложений');
}
function visiblePartnerOffers(){
 if(!mapReady||!map)return [];
 const {clientWidth:width,clientHeight:height}=getActiveMapSize();
 if(height<=0)return [];
 const byPartner=new Map();
 for(const p of getRenderPoints()){
  const pt=projectActive([p.lng,p.lat]);
  if(pt.x<0||pt.x>width||pt.y<0||pt.y>height)continue;
  const key=p.name.trim().toLocaleLowerCase('ru-RU');
  const distance=(pt.x-width/2)**2+(pt.y-height/2)**2;
  const current=byPartner.get(key);
  if(!current||distance<current.distance||(distance===current.distance&&p.pinId<current.p.pinId))byPartner.set(key,{p,distance});
 }
 return [...byPartner.values()].sort((a,b)=>b.p.partnerWeight-a.p.partnerWeight||a.distance-b.distance||a.p.pinId-b.p.pinId).map(item=>item.p);
}
function refreshOfferList(){
 if(!sheetElements.list||sheetState.selected||sheetState.drag||sheetState.listExpanded||performance.now()<sheetState.motionUntil)return;
 const offers=visiblePartnerOffers();
 const key=offers.map(p=>p.pinId+':'+p.cash).join(',');
 if(key===sheetState.listKey&&sheetElements.list.dataset.ready)return;
 sheetState.listKey=key;
 sheetElements.list.dataset.ready='true';
 const fragment=document.createDocumentFragment();
 for(const p of offers){
  const row=document.createElement('button');
  row.type='button';row.className='offer-row';row.dataset.pinId=p.pinId;row.dataset.weight=p.partnerWeight;
  row.setAttribute('aria-label',`${p.name}, кэшбэк ${p.cash}%`);
  const avatar=document.createElement('img');avatar.className='offer-avatar';avatar.src=p.logo;avatar.alt='';
  const copy=document.createElement('span');copy.className='offer-copy';
  const title=document.createElement('span');title.className='offer-title';
  const name=document.createElement('span');name.className='offer-name';name.textContent=p.name;
  const cash=document.createElement('span');cash.className='offer-cash';cash.textContent=p.cash+'%';
  title.append(name,cash);
  const terms=document.createElement('span');terms.className='offer-terms';terms.innerHTML='На одну покупку<br>До 5 апреля';
  const category=document.createElement('span');category.className='offer-category';category.textContent=PARTNER_INFO[p.name]?.[0]||p.category;
  copy.append(title,terms,category);row.append(avatar,copy);
  row.onclick=()=>selectPoint(p);fragment.append(row);
 }
 sheetElements.list.replaceChildren(fragment);
 sheetElements.empty.hidden=offers.length>0;
 sheetElements.list.hidden=!offers.length;

}
function scheduleOfferRefresh(){
 if(sheetState.frame)return;
 sheetState.frame=requestAnimationFrame(()=>{sheetState.frame=0;refreshOfferList();});
}
function renderSelectedMarker(){
 const p=sheetState.selected;
 if(!p||!mapReady)return;
 const layer=document.getElementById('markers');
 // Selected marker remains unique even if its point belonged to a Quadkey cluster.
 layer.querySelectorAll('.marker[data-pin-id]').forEach(el=>{
  if(el.dataset.pinId===String(p.pinId))el.remove();
 });
 const pt=projectActive([p.lng,p.lat]);
 const el=document.createElement('div');el.className='marker selected';el.dataset.pinId=p.pinId;
 el.style.left=pt.x+'px';el.style.top=pt.y+'px';el.title=p.name+' · Кэшбэк '+p.cash+'%';
 el.innerHTML=`<div class="pill"><span class="logo-wrap"><span class="logo"></span></span></div><span class="pin-tail"></span>`;
 const img=document.createElement('img');img.src=p.logo;img.alt=p.name;el.querySelector('.logo').append(img);
 el.onclick=()=>sheetElements.detail.focus({preventScroll:true});layer.append(el);
}
function selectPoint(p){
 if(!sheetState.selected){
  sheetState.returnCamera=map?{center:map.getCenter().toArray(),zoom:map.getZoom(),bearing:map.getBearing(),pitch:map.getPitch()}:null;
  sheetState.focusReturn=document.activeElement;
 }
 points.concat(goodsPoints).forEach(q=>q.selected=false);p.selected=true;
 sheetState.selected=p;sheetState.listExpanded=false;sheetState.detailExpanded=false;
 const info=PARTNER_INFO[p.name];
 document.getElementById('detailName').textContent=p.name;
 document.getElementById('detailCategory').textContent=info?.[0]||p.category;
 document.getElementById('detailAbout').textContent=info?.[1]||'';
 document.getElementById('detailCash').textContent='Кэшбэк '+p.cash+'%';
 const logo=document.getElementById('detailLogo');logo.src=p.logo;logo.alt=p.name;
 sheetElements.detail.hidden=false;sheetElements.detailScroll.scrollTop=0;
 sheetElements.wrap.classList.add('detail-open');
 sheetElements.offers.inert=true;sheetElements.offers.setAttribute('aria-hidden','true');
 layoutSheets();
 if(mapReady)map.easeTo({center:[p.lng,p.lat],zoom:Math.max(14,map.getZoom()),offset:[0,45],duration:0});
 render();document.getElementById('closeDetail').focus({preventScroll:true});
}
function closeSelectedOffer(){
 if(!sheetState.selected)return;
 const returnCamera=sheetState.returnCamera;
 points.concat(goodsPoints).forEach(p=>p.selected=false);
 sheetState.selected=null;sheetState.detailExpanded=false;sheetState.listExpanded=false;
 sheetElements.detail.hidden=true;sheetElements.wrap.classList.remove('detail-open');
 sheetElements.offers.inert=false;sheetElements.offers.removeAttribute('aria-hidden');
 sheetElements.offers.querySelector('.sheet-grip').focus({preventScroll:true});
 layoutSheets();
 if(mapReady&&returnCamera)map.easeTo({...returnCamera,duration:250});
 sheetState.returnCamera=null;render();
}
function toggleSheet(kind){
 const key=kind==='detail'?'detailExpanded':'listExpanded';
 sheetState[key]=!sheetState[key];layoutSheets();render();
}
function setSheetExpanded(kind,expanded){
 sheetState[kind==='detail'?'detailExpanded':'listExpanded']=expanded;layoutSheets();render();
}
function attachSheetGesture(sheet,kind){
 const scroll=sheet.querySelector('.sheet-scroll');
 sheet.addEventListener('transitionend',event=>{
  if(event.target===sheet&&event.propertyName==='top'&&!sheetState.drag){updateActiveViewport();scheduleOfferRefresh();}
 });
 // Wheel/trackpad input first opens the sheet. Native scrolling starts only at its maximum.
 sheet.addEventListener('wheel',event=>{
  if(sheet!==frontSheet()||!event.deltaY)return;
  if(!sheet.classList.contains('scroll-ready')){
   event.preventDefault();
   if(event.deltaY>0&&!sheetState[kind==='detail'?'detailExpanded':'listExpanded'])setSheetExpanded(kind,true);
  }else if(event.deltaY<0&&scroll.scrollTop<=0){
   event.preventDefault();setSheetExpanded(kind,false);
  }
 },{passive:false});
 sheet.addEventListener('keydown',event=>{
  if(!['ArrowDown','PageDown',' '].includes(event.key)||event.target.closest('button,input'))return;
  if(!sheet.classList.contains('scroll-ready')){event.preventDefault();setSheetExpanded(kind,true);}
 });
 scroll.addEventListener('scroll',()=>{
  const draggingAtMaximum=sheetState.drag?.kind===kind&&isSheetAtMaximum(sheet,kind);
  if(!sheet.classList.contains('scroll-ready')&&!draggingAtMaximum&&scroll.scrollTop)scroll.scrollTop=0;
 });
 sheet.addEventListener('click',event=>{
  if(sheet.dataset.suppressClick){event.preventDefault();event.stopImmediatePropagation();}
 },true);
 sheet.addEventListener('pointerdown',event=>{
  if(sheet!==frontSheet()||event.button!==0||event.target.closest('.detail-close'))return;
  const handle=event.target.closest('.sheet-grip,.detail-heading,.category-chips');
  const fromContent=!handle,ready=sheet.classList.contains('scroll-ready');
  if(fromContent&&ready&&scroll.scrollTop>0)return;
  sheetState.drag={kind,pointerId:event.pointerId,startY:event.clientY,startX:event.clientX,
   startTop:parseFloat(sheet.style.top)||normalSheetTop(kind),lastY:event.clientY,lastTime:performance.now(),velocity:0,
   moved:false,fromContent,wasReady:ready,wasExpanded:sheetState[kind==='detail'?'detailExpanded':'listExpanded']};
 });
 // Window listeners retain the gesture even when the pointer leaves a collapsed sheet.
 window.addEventListener('pointermove',event=>{
  const drag=sheetState.drag;if(!drag||drag.kind!==kind||drag.pointerId!==event.pointerId)return;
  const dy=event.clientY-drag.startY,dx=event.clientX-drag.startX;
  if(!drag.moved){
   if(Math.abs(dy)<6||Math.abs(dx)>Math.abs(dy))return;
   if(drag.fromContent&&drag.wasReady&&dy<0){sheetState.drag=null;return;}
   drag.moved=true;sheet.setPointerCapture(event.pointerId);sheet.classList.add('dragging');
  }
  if(event.cancelable)event.preventDefault();
  const now=performance.now();drag.velocity=(event.clientY-drag.lastY)/Math.max(1,now-drag.lastTime);drag.lastY=event.clientY;drag.lastTime=now;
  const limit=kind==='detail'?sheetElements.wrap.clientHeight:normalSheetTop(kind);
  const min=expandedSheetTop(kind),rawTop=drag.startTop+dy;
  const top=Math.max(min,Math.min(limit,rawTop));
  setSheetPosition(kind,top,{centerSelected:kind==='detail'});
  // A continued upward swipe may scroll only after the sheet has reached its maximum.
  if(rawTop<min)scroll.scrollTop=min-rawTop;
 },{passive:false});
 function finish(event,cancelled=false){
  const drag=sheetState.drag;if(!drag||drag.kind!==kind||drag.pointerId!==event.pointerId)return;
  sheetState.drag=null;sheet.classList.remove('dragging');
  if(sheet.hasPointerCapture(event.pointerId))sheet.releasePointerCapture(event.pointerId);
  if(!drag.moved)return;
  sheet.dataset.suppressClick='true';setTimeout(()=>delete sheet.dataset.suppressClick,0);
  if(cancelled){layoutSheets();render();return;}
  const dy=event.clientY-drag.startY,current=parseFloat(sheet.style.top);
  if(kind==='detail'&&!drag.wasExpanded&&(dy>64||(dy>20&&drag.velocity>.6))){closeSelectedOffer();return;}
  const min=expandedSheetTop(kind),normal=normalSheetTop(kind);
  setSheetExpanded(kind,dy< -35?true:dy>35?false:current<(min+normal)/2);
 }
 window.addEventListener('pointerup',event=>finish(event));
 window.addEventListener('pointercancel',event=>finish(event,true));
 const handle=kind==='detail'?sheet.querySelector('.detail-heading'):sheet.querySelector('.sheet-grip');
 if(kind==='list')handle.addEventListener('click',()=>{if(!sheet.dataset.suppressClick)toggleSheet(kind);});
 else{
  handle.tabIndex=0;handle.setAttribute('aria-label','Потяните, чтобы развернуть или свернуть предложение');
  handle.addEventListener('keydown',event=>{
   if(event.target!==handle)return;
   if(event.key==='ArrowUp')setSheetExpanded(kind,true);
   if(event.key==='ArrowDown')setSheetExpanded(kind,false);
  });
 }
}
function initSheets(){
 Object.assign(sheetElements,{
  wrap:document.querySelector('.mapwrap'),offers:document.getElementById('offersSheet'),detail:document.getElementById('detailSheet'),
  list:document.getElementById('offerList'),empty:document.getElementById('emptyState'),categories:document.querySelector('.category-chips'),
  offersScroll:document.getElementById('offersScroll'),detailScroll:document.getElementById('detailScroll')
 });
 for(const p of points){if(PARTNER_INFO[p.name])p.category=PARTNER_INFO[p.name][0];}
 document.getElementById('closeDetail').onclick=closeSelectedOffer;
 document.getElementById('newLogicToggle').onchange=()=>{
  if(!sheetState.selected&&!sheetState.listExpanded&&document.getElementById('newLogicToggle').checked)fitInitialNewLogicArea();
  render();
 };
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeSelectedOffer();});
 attachSheetGesture(sheetElements.offers,'list');attachSheetGesture(sheetElements.detail,'detail');
 window.addEventListener('resize',()=>{if(map)map.resize();layoutSheets();render();});
 layoutSheets();
}
function connectSheetsToMap(){
 map.on('move',()=>{scheduleOfferRefresh();});
 map.on('moveend',()=>{renderSelectedMarker();refreshOfferList();});
 map.on('resize',scheduleOfferRefresh);
 updateActiveViewport();
 render();
}
