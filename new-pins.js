/* Only the new-logic switch uses this tile/ranking pipeline. */
const newPartnerDotColors=new Map();
const newDotColorsReady=Promise.all(brands.map(brand=>new Promise(resolve=>{
 const image=new Image();
 image.onload=()=>{
  // Sample the outer ring of the circular logo, away from its central lettering
  // and transparent corners. The most frequent colour is its background.
  const canvas=document.createElement('canvas');canvas.width=canvas.height=40;
  const context=canvas.getContext('2d',{willReadFrequently:true});
  context.drawImage(image,0,0,40,40);
  const pixels=context.getImageData(0,0,40,40).data,buckets=new Map();
  for(let y=0;y<40;y++)for(let x=0;x<40;x++){
   const radius=Math.hypot(x-19.5,y-19.5),i=(y*40+x)*4;
   if(radius<12||radius>17||pixels[i+3]<230)continue;
   const rgb=[pixels[i],pixels[i+1],pixels[i+2]];
   const key=rgb.map(value=>Math.round(value/16)).join(',');
   const bucket=buckets.get(key)||{count:0,sum:[0,0,0]};
   bucket.count++;rgb.forEach((value,k)=>bucket.sum[k]+=value);buckets.set(key,bucket);
  }
  const background=[...buckets.values()].sort((a,b)=>b.count-a.count)[0];
  newPartnerDotColors.set(brand[0],background?
   '#'+background.sum.map(value=>Math.round(value/background.count).toString(16).padStart(2,'0')).join(''):brand[2]);
  resolve();
 };
 image.onerror=()=>{newPartnerDotColors.set(brand[0],brand[2]);resolve();};
 image.src=brand[5];
}))).then(()=>{
 if(brands.length&&mapReady&&document.getElementById('newLogicToggle').checked)render();
});

function compareNewPinWeight(a,b){
 return (Number(b.partnerWeight)||0)-(Number(a.partnerWeight)||0)||Number(a.pinId)-Number(b.pinId);
}
function getNewTilePlan(source,tileZoom){
 const visibleTiles=getVisibleTiles(tileZoom);
 const buckets=new Map(visibleTiles.map(tile=>[tile.key,{...tile,items:[]}]));
 for(const p of source){
  if(p.selected)continue;
  const t=lngLatToTile(p.lng,p.lat,tileZoom);
  buckets.get(tileToQuadkey(t.x,t.y,tileZoom))?.items.push(p);
 }
 const logos=[],dots=[],clusters=[];
 for(const tile of buckets.values()){
  tile.items.sort(compareNewPinWeight);
  logos.push(...tile.items.slice(0,5));
  const remainder=tile.items.slice(5);
  if(remainder.length>10)clusters.push({...tile,items:remainder,count:remainder.length});
  else dots.push(...remainder);
 }
 return {logos,dots,clusters,visibleTiles};
}
function newPinSafeRect(rect){
 return {left:rect.left-8,top:rect.top-8,right:rect.right+8,bottom:rect.bottom+8};
}
function newPinRectsOverlap(a,b){
 return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
}
function repositionNewTileClusters(){
 document.querySelectorAll('.new-tile-cluster').forEach(el=>{
  const pt=projectActive([Number(el.dataset.lng),Number(el.dataset.lat)]);
  el.style.left=pt.x+'px';el.style.top=pt.y+'px';
 });
}
function renderNewTilePins(layer,source){
 const z=getQuadkeyZoom(map.getZoom()),plan=getNewTilePlan(source,z);
 const size=getActiveMapSize();
 const inViewport=p=>{
  const pt=projectActive([p.lng,p.lat]);
  return pt.x>=0&&pt.x<=size.clientWidth&&pt.y>=0&&pt.y<=size.clientHeight;
 };
 const candidates=plan.logos.slice().sort(compareNewPinWeight);
 // Select six distinct partners from the tile winners in the active viewport.
 // Collisions may demote a winner; lower-ranked pins do not take its text slot.
 const expandedIds=new Set(),expandedPartners=new Set();
 for(const p of candidates.filter(inViewport)){
  if(expandedPartners.has(p.name))continue;
  if(expandedPartners.size===6)break;
  expandedPartners.add(p.name);expandedIds.add(p.pinId);
 }
 const partnerLogoIds=new Set(),secondaryPartners=new Set();
 for(const p of candidates.filter(inViewport)){
  if(!expandedPartners.has(p.name)||expandedIds.has(p.pinId)||secondaryPartners.has(p.name))continue;
  secondaryPartners.add(p.name);partnerLogoIds.add(p.pinId);
 }
 const occupied=[],entries=[];
 let expanded=0,compact=0,dots=0,clustered=0;
 // Preserve the existing selected marker and its entire tail safety zone.
 const selected=source.find(p=>p.selected);
 if(selected){
  const pt=projectActive([selected.lng,selected.lat]);
  occupied.push(newPinSafeRect({left:pt.x-30,right:pt.x+30,top:pt.y-75,bottom:pt.y+5}));
 }
 function marker(p){
  const pt=projectActive([p.lng,p.lat]),el=document.createElement('div');
  el.className='marker';el.dataset.pinId=String(p.pinId);
  el.style.left=pt.x+'px';el.style.top=pt.y+'px';
  const pill=document.createElement('div');pill.className='pill';
  const wrap=document.createElement('span');wrap.className='logo-wrap';
  const logo=document.createElement('span');logo.className='logo';
  const image=document.createElement('img');image.src=p.logo;image.alt=p.name;
  logo.append(image);wrap.append(logo);pill.append(wrap);
  const copy=document.createElement('span');copy.className='pin-copy';
  for(const [className,text] of [['name',p.name],['cash',p.cashLabel||`Кэшбэк ${p.cash}%`]]){
   const span=document.createElement('span');span.className=className;span.textContent=text;copy.append(span);
  }
  pill.append(copy);el.append(pill);el.title=`${p.name} · ${p.cashLabel||`Кэшбэк ${p.cash}%`} · Вес ${p.partnerWeight}`;
  el.onclick=()=>selectPoint(p);layer.append(el);
  return {p,el,pt};
 }
 function dot(entry){
  const {p,el}=entry;
  el.classList.remove('compact','new-logic-compact');el.classList.add('partner-dot');
  el.querySelector('.pill').style.width='16px';
  el.querySelector('.pill').style.backgroundColor=newPartnerDotColors.get(p.name)||p.color;
  el.style.zIndex='4';el.dataset.state='dot';pinDisplayState.set(String(p.pinId),'dot');dots++;
 }
 for(const p of candidates)entries.push({...marker(p),type:'pin'});
 for(const tile of plan.clusters){
  const mean=tile.items.reduce((sum,p)=>({lng:sum.lng+p.lng/tile.count,lat:sum.lat+p.lat/tile.count}),{lng:0,lat:0});
  const el=document.createElement('div');el.className='cluster new-tile-cluster';
  el.dataset.clusterKey=tile.key;el.dataset.memberIds=tile.items.map(p=>p.pinId).join(',');
  const count=document.createElement('span');count.className='cluster-count';
  const text=document.createElement('span');text.className='cluster-count-text';text.textContent=tile.count>99?'99+':String(tile.count);
  count.append(text);el.append(count);el.title=`Кластер · ${tile.count} точек · тайл ${tile.key}`;
  el.onclick=()=>map.easeTo({center:[mean.lng,mean.lat],zoom:Math.min(MAX_MAP_ZOOM,map.getZoom()+1),duration:350});
  layer.append(el);entries.push({type:'cluster',p:tile.items[0],el,tile,mean});
 }
 // All pin sizes and clusters compete by weight; dots never reserve space.
 entries.sort((a,b)=>compareNewPinWeight(a.p,b.p));
 for(const entry of entries){
  const {p,el}=entry;
  if(entry.type==='cluster'){
   const {tile,mean}=entry;
   const nw=projectActive(tileToLngLat(tile.x,tile.y,z)),se=projectActive(tileToLngLat(tile.x+1,tile.y+1,z));
   const positions=[projectActive([mean.lng,mean.lat]),...tile.items.map(p=>projectActive([p.lng,p.lat]))];
   // Keep the cluster inside its geographic tile if its centroid is occupied.
   for(let y=nw.y+26;y<=se.y-26;y+=26)for(let x=nw.x+26;x<=se.x-26;x+=26)positions.push({x,y});
   const pt=positions.find(pt=>!occupied.some(rect=>newPinRectsOverlap(rect,newPinSafeRect({left:pt.x-18,right:pt.x+18,top:pt.y-18,bottom:pt.y+18}))));
   if(pt){
    const lngLat=unprojectActive([pt.x,pt.y]);el.dataset.lng=lngLat.lng;el.dataset.lat=lngLat.lat;
    el.style.left=pt.x+'px';el.style.top=pt.y+'px';el.style.zIndex='500';
    occupied.push(newPinSafeRect({left:pt.x-18,right:pt.x+18,top:pt.y-18,bottom:pt.y+18}));clustered+=tile.count;
   }else{
    // No room for a cluster: retain its members as dots rather than overlap pins.
    el.remove();tile.items.forEach(p=>dot(marker(p)));
   }
   continue;
  }
  if(expandedPartners.has(p.name)&&!expandedIds.has(p.pinId)&&!partnerLogoIds.has(p.pinId)){
   dot(entry);continue;
  }
  const fullRect=el.getBoundingClientRect();
  el.querySelector('.pill').style.width=fullRect.width+'px';
  let state=expandedIds.has(p.pinId)?'expanded':'compact';
  function fits(){return !occupied.some(rect=>newPinRectsOverlap(rect,newPinSafeRect(el.getBoundingClientRect())));}
  if(state==='expanded'&&!fits())state='compact';
  if(state==='compact'){
   el.classList.add('compact','new-logic-compact');el.querySelector('.pill').style.width='28px';
  }
  if(!fits()){dot(entry);continue;}
  occupied.push(newPinSafeRect(el.getBoundingClientRect()));
  el.dataset.state=state;pinDisplayState.set(String(p.pinId),state);
  el.style.zIndex='1000';state==='expanded'?expanded++:compact++;
 }
 plan.dots.forEach(p=>dot(marker(p)));
 document.getElementById('shown').textContent=expanded+compact+dots;
 document.getElementById('compactCount').textContent=compact;
 document.getElementById('hiddenCount').textContent=clustered;
 document.getElementById('tileSummary').textContent=`Новая логика · тайлов: ${plan.visibleTiles.length} · раскрытых: ${expanded} · логотипов: ${compact} · точек: ${dots} · в кластерах: ${clustered}`;
}
