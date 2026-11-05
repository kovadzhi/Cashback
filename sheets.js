/* Map and sheet coordinates share the same active viewport (below the 88 px header). */
const sheetState={selected:null,returnCamera:null,listExpanded:false,detailExpanded:false,listKey:'',drag:null,frame:0,focusReturn:null};
const sheetElements={};
const HEADER_HEIGHT=88,LIST_MAP_HEIGHT=570,DETAIL_MAP_HEIGHT=228;
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
function setSheetPosition(kind,top,{centerSelected=false}={}){
 const sheet=kind==='detail'?sheetElements.detail:sheetElements.offers;
 sheet.style.top=top+'px';
 if(kind==='list'&&sheetState.selected)return;
 const mapHeight=Math.max(0,top-HEADER_HEIGHT);
 sheetElements.wrap.style.setProperty('--active-map-height',mapHeight+'px');
 sheetElements.wrap.classList.toggle('map-covered',mapHeight<164);
 if(map){
  map.resize();
  if(centerSelected&&sheetState.selected&&mapHeight>0){
   const p=sheetState.selected;
   // Existing selected-marker artwork is anchored at its dot, 45 px below its visual centre.
   map.easeTo({center:[p.lng,p.lat],offset:[0,45],duration:0});
  }
 }
}
function layoutSheets(){
 setSheetPosition('list',sheetState.listExpanded?expandedSheetTop('list'):normalSheetTop('list'));
 if(sheetState.selected)setSheetPosition('detail',sheetState.detailExpanded?expandedSheetTop('detail'):normalSheetTop('detail'),{centerSelected:true});
 const grip=sheetElements.offers.querySelector('.sheet-grip');
 grip.setAttribute('aria-expanded',String(sheetState.listExpanded));
 grip.setAttribute('aria-label',sheetState.listExpanded?'Свернуть список предложений':'Развернуть список предложений');
}
function visiblePartnerOffers(){
 if(!mapReady||!map)return [];
 const width=map.getContainer().clientWidth,height=map.getContainer().clientHeight;
 const byPartner=new Map();
 for(const p of getRenderPoints()){
  const pt=map.project([p.lng,p.lat]);
  if(pt.x<0||pt.x>width||pt.y<0||pt.y>height)continue;
  const key=p.name.trim().toLocaleLowerCase('ru-RU');
  const distance=(pt.x-width/2)**2+(pt.y-height/2)**2;
  const current=byPartner.get(key);
  if(!current||distance<current.distance||(distance===current.distance&&p.pinId<current.p.pinId))byPartner.set(key,{p,distance});
 }
 return [...byPartner.values()].sort((a,b)=>b.p.partnerWeight-a.p.partnerWeight||a.distance-b.distance||a.p.pinId-b.p.pinId).map(item=>item.p);
}
function refreshOfferList(){
 if(!sheetElements.list||sheetState.selected||sheetState.drag||sheetState.listExpanded)return;
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
 if(sheetState.listExpanded){
  // Keep the user's expanded position while the viewport changes. Changing its height here
  // would change map bounds and cause a list/viewport feedback loop.
  sheetElements.offers.style.top=Math.max(HEADER_HEIGHT,parseFloat(sheetElements.offers.style.top)||HEADER_HEIGHT)+'px';
 }
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
 const pt=map.project([p.lng,p.lat]);
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
 if(mapReady)map.easeTo({center:[p.lng,p.lat],zoom:Math.max(14,map.getZoom()),offset:[0,45],duration:350});
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
function attachSheetGesture(sheet,kind){
 const scroll=sheet.querySelector('.sheet-scroll');
 sheet.addEventListener('pointerdown',event=>{
  if(event.button!==0||event.target.closest('button:not(.sheet-grip)'))return;
  const handle=event.target.closest('.sheet-grip,.detail-heading');
  // Content scroll keeps its native behaviour. Dragging starts from the grip/header,
  // or from content at the very top when moving down.
  const fromContent=!handle;
  if(fromContent&&scroll.scrollTop>0)return;
  sheetState.drag={kind,pointerId:event.pointerId,startY:event.clientY,startX:event.clientX,
   startTop:parseFloat(sheet.style.top)||normalSheetTop(kind),lastY:event.clientY,lastTime:performance.now(),velocity:0,
   moved:false,fromContent,wasExpanded:sheetState[kind==='detail'?'detailExpanded':'listExpanded']};
  if(handle)sheet.setPointerCapture(event.pointerId);
 });
 sheet.addEventListener('pointermove',event=>{
  const drag=sheetState.drag;if(!drag||drag.pointerId!==event.pointerId)return;
  const dy=event.clientY-drag.startY,dx=event.clientX-drag.startX;
  if(!drag.moved){
   if(Math.abs(dy)<6||Math.abs(dx)>Math.abs(dy))return;
   if(drag.fromContent&&dy<0){sheetState.drag=null;return;}
   drag.moved=true;sheet.setPointerCapture(event.pointerId);sheet.classList.add('dragging');
  }
  event.preventDefault();
  const now=performance.now();drag.velocity=(event.clientY-drag.lastY)/Math.max(1,now-drag.lastTime);drag.lastY=event.clientY;drag.lastTime=now;
  // A detail sheet may be dismissed downward; a list always retains its active state.
  const limit=kind==='detail'?sheetElements.wrap.clientHeight:normalSheetTop(kind);
  const top=Math.max(expandedSheetTop(kind),Math.min(limit,drag.startTop+dy));
  setSheetPosition(kind,top,{centerSelected:kind==='detail'});
 });
 function finish(event,cancelled=false){
  const drag=sheetState.drag;if(!drag||drag.pointerId!==event.pointerId)return;
  sheetState.drag=null;sheet.classList.remove('dragging');
  if(sheet.hasPointerCapture(event.pointerId))sheet.releasePointerCapture(event.pointerId);
  if(!drag.moved)return;
  sheet.dataset.suppressClick='true';setTimeout(()=>delete sheet.dataset.suppressClick,0);
  if(cancelled){layoutSheets();render();return;}
  const dy=event.clientY-drag.startY;
  const current=parseFloat(sheet.style.top);
  if(kind==='detail'&&!drag.wasExpanded&&(dy>64||(dy>20&&drag.velocity>.6))){closeSelectedOffer();return;}
  const key=kind==='detail'?'detailExpanded':'listExpanded';
  const min=expandedSheetTop(kind),normal=normalSheetTop(kind);
  sheetState[key]=dy< -35?true:dy>35?false:current<(min+normal)/2;
  layoutSheets();render();
 }
 sheet.addEventListener('pointerup',event=>finish(event));
 sheet.addEventListener('pointercancel',event=>finish(event,true));
 const handle=kind==='detail'?sheet.querySelector('.detail-heading'):sheet.querySelector('.sheet-grip');
 if(kind==='list')handle.addEventListener('click',()=>{if(!sheet.dataset.suppressClick)toggleSheet(kind);});
 else{
  handle.tabIndex=0;handle.setAttribute('aria-label','Потяните, чтобы развернуть или свернуть предложение');
  handle.addEventListener('keydown',event=>{
   if(event.target!==handle)return;
   if(event.key==='ArrowUp'){sheetState.detailExpanded=true;layoutSheets();}
   if(event.key==='ArrowDown'){sheetState.detailExpanded=false;layoutSheets();}
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
 window.addEventListener('resize',()=>{layoutSheets();render();});
 layoutSheets();
}
function connectSheetsToMap(){
 map.on('move',()=>{scheduleOfferRefresh();});
 map.on('moveend',()=>{renderSelectedMarker();refreshOfferList();});
 map.on('resize',scheduleOfferRefresh);
 render();
}
