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
function newPinInsideViewport(rect,viewport){
 return rect.left>=viewport.left&&rect.top>=viewport.top&&rect.right<=viewport.right&&rect.bottom<=viewport.bottom;
}
function repositionNewTileClusters(){
 document.querySelectorAll('.new-tile-cluster').forEach(el=>{
  const pt=projectActive([Number(el.dataset.lng),Number(el.dataset.lat)]);
  el.style.left=pt.x+'px';el.style.top=pt.y+'px';
 });
 // Reassign text slots as a label crosses an edge during a gesture, before
 // the browser paints it clipped. Preserve the same keyed DOM commit path.
 const layer=document.getElementById('markers'),viewport=layer.getBoundingClientRect();
 if([...layer.querySelectorAll('.new-tile-pin[data-state="expanded"]')].some(el=>!newPinInsideViewport(el.getBoundingClientRect(),viewport)))renderNewTilePins(layer,getRenderPoints());
}
function newTileNodeKey(el){
 if(el.classList.contains('new-tile-pin'))return 'pin:'+el.dataset.pinId;
 if(el.classList.contains('new-tile-cluster'))return 'tile:'+el.dataset.clusterKey;
 return null;
}
function commitNewTilePins(layer,staging){
 const previous=new Map([...layer.children].map(el=>[newTileNodeKey(el),el]).filter(([key])=>key));
 const retained=new Set();
 for(const next of [...staging.children]){
  const current=previous.get(newTileNodeKey(next));
  if(!current){layer.append(next);retained.add(next);continue;}
  // Keep the marker and decoded logo in place. Apply only its final state;
  // no visible expanded measurement or opacity/width animation is exposed.
  current.className=next.className;current.style.cssText=next.style.cssText;
  for(const [name,value] of Object.entries(next.dataset))current.dataset[name]=value;
  current.title=next.title;current.onclick=next.onclick;
  const image=current.querySelector('img'),nextImage=next.querySelector('img');
  if(image&&nextImage&&image.getAttribute('src')!==nextImage.getAttribute('src')){
   image.src=nextImage.src;image.alt=nextImage.alt;
  }
  for(const selector of ['.pill','.name','.cash','.cluster-count-text']){
   const target=current.querySelector(selector),value=next.querySelector(selector);
   if(!target||!value)continue;
   target.style.cssText=value.style.cssText;
   if(selector!=='.pill'&&target.textContent!==value.textContent)target.textContent=value.textContent;
  }
  retained.add(current);
 }
 for(const el of [...layer.children])if(el!==staging&&!retained.has(el))el.remove();
 staging.remove();
}
function renderNewTilePins(layer,source){
 const staging=document.createElement('div');
 staging.className='new-pin-staging';
 staging.style.cssText='position:absolute;inset:0;visibility:hidden;pointer-events:none';
 staging.setAttribute('aria-hidden','true');layer.append(staging);
 const z=getQuadkeyZoom(map.getZoom()),plan=getNewTilePlan(source,z);
 const size=getActiveMapSize();
 const inViewport=p=>{
  const pt=projectActive([p.lng,p.lat]);
  return pt.x>=0&&pt.x<=size.clientWidth&&pt.y>=0&&pt.y<=size.clientHeight;
 };
 const candidates=plan.logos.slice().sort(compareNewPinWeight);
 const expandedPartners=new Set(),secondaryPartners=new Set();
 const compactByPartner=new Map();
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
  el.className='marker new-tile-pin';el.dataset.pinId=String(p.pinId);
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
  el.onclick=()=>selectPoint(p);staging.append(el);
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
 // Every tile winner may fill a text slot. A slot is consumed only after
 // viewport and collision checks succeed, so blocked high weights cannot
 // prevent lower weights from filling the minimum four (up to six) labels.
 const viewport=layer.getBoundingClientRect();
 const fullyInside=rect=>newPinInsideViewport(rect,viewport);
 for(const entry of entries)entry.fullRect=entry.el.getBoundingClientRect();
 function accept(entry,state){
  const {p,el}=entry;
  occupied.push({...newPinSafeRect(el.getBoundingClientRect()),owner:entry});
  if(state==='expanded'){
   expandedPartners.add(p.name);
   // A later, fully visible point may become this partner's primary. Retain
   // only its highest-ranked visible secondary logo; further repeats are dots.
   const earlier=(compactByPartner.get(p.name)||[]).filter(item=>item.el.dataset.state==='compact');
   const secondary=earlier.find(item=>inViewport(item.p));
   if(secondary)secondaryPartners.add(p.name);
   for(const item of earlier){
    if(item===secondary)continue;
    const index=occupied.findIndex(rect=>rect.owner===item);
    if(index>=0)occupied.splice(index,1);
    compact--;dot(item);
   }
  }else{
   if(!compactByPartner.has(p.name))compactByPartner.set(p.name,[]);
   compactByPartner.get(p.name).push(entry);
   if(expandedPartners.has(p.name))secondaryPartners.add(p.name);
  }
  el.dataset.state=state;pinDisplayState.set(String(p.pinId),state);
  el.style.zIndex='1000';state==='expanded'?expanded++:compact++;
 }
 for(const tile of plan.clusters){
  const mean=tile.items.reduce((sum,p)=>({lng:sum.lng+p.lng/tile.count,lat:sum.lat+p.lat/tile.count}),{lng:0,lat:0});
  const el=document.createElement('div');el.className='cluster new-tile-cluster';
  el.dataset.clusterKey=tile.key;el.dataset.memberIds=tile.items.map(p=>p.pinId).join(',');
  const count=document.createElement('span');count.className='cluster-count';
  const text=document.createElement('span');text.className='cluster-count-text';text.textContent=tile.count>99?'99+':String(tile.count);
  count.append(text);el.append(count);el.title=`Кластер · ${tile.count} точек · тайл ${tile.key}`;
  el.onclick=()=>map.easeTo({center:[mean.lng,mean.lat],zoom:Math.min(MAX_MAP_ZOOM,map.getZoom()+1),duration:350});
  staging.append(el);entries.push({type:'cluster',p:tile.items[0],el,tile,mean});
 }
 function placeCluster(entry,members){
  const {tile,el}=entry;
  const mean=members.reduce((sum,p)=>({lng:sum.lng+p.lng/members.length,lat:sum.lat+p.lat/members.length}),{lng:0,lat:0});
  const nw=projectActive(tileToLngLat(tile.x,tile.y,z)),se=projectActive(tileToLngLat(tile.x+1,tile.y+1,z));
  const positions=[projectActive([mean.lng,mean.lat]),...members.map(p=>projectActive([p.lng,p.lat]))];
  for(let y=nw.y+26;y<=se.y-26;y+=26)for(let x=nw.x+26;x<=se.x-26;x+=26)positions.push({x,y});
  const pt=positions.find(pt=>!occupied.some(rect=>newPinRectsOverlap(rect,newPinSafeRect({left:pt.x-18,right:pt.x+18,top:pt.y-18,bottom:pt.y+18}))));
  if(!pt)return false;
  const lngLat=unprojectActive([pt.x,pt.y]);el.dataset.lng=lngLat.lng;el.dataset.lat=lngLat.lat;
  el.style.left=pt.x+'px';el.style.top=pt.y+'px';el.style.zIndex='500';
  occupied.push({...newPinSafeRect({left:pt.x-18,right:pt.x+18,top:pt.y-18,bottom:pt.y+18}),owner:entry});
  return true;
 }
 // All pin sizes and clusters compete by weight; dots never reserve space.
 entries.sort((a,b)=>compareNewPinWeight(a.p,b.p));
 for(const entry of entries){
  const {p,el}=entry;
  if(entry.type==='cluster'){
   if(placeCluster(entry,entry.tile.items))clustered+=entry.tile.count;
   else{el.remove();entry.tile.items.forEach(p=>dot(marker(p)));}
   continue;
  }
  if(expandedPartners.has(p.name)&&(secondaryPartners.has(p.name)||!inViewport(p))){
   dot(entry);continue;
  }
  el.querySelector('.pill').style.width=entry.fullRect.width+'px';
  function fits(){return !occupied.some(rect=>newPinRectsOverlap(rect,newPinSafeRect(el.getBoundingClientRect())));}
  let state=expanded<6&&!expandedPartners.has(p.name)&&inViewport(p)&&fullyInside(entry.fullRect)&&fits()?'expanded':'compact';
  if(state==='compact'){
   el.classList.add('compact','new-logic-compact');el.querySelector('.pill').style.width='28px';
  }
  if(!fits()){dot(entry);continue;}
  accept(entry,state);
 }
 // The tile's five logo winners are the normal pool. If fewer than four
 // labels survived, promote lower-weight reserve points, including members
 // of clusters, without losing or double-counting any source point.
 const promoted=new Set();
 const reserves=plan.dots.concat(plan.clusters.flatMap(tile=>tile.items)).sort(compareNewPinWeight);
 for(const p of reserves){
  if(expanded>=4)break;
  if(expandedPartners.has(p.name)||!inViewport(p))continue;
  const entry={...marker(p),type:'pin'};
  entry.fullRect=entry.el.getBoundingClientRect();
  const ownCluster=entries.find(item=>item.type==='cluster'&&item.tile.items.some(member=>member.pinId===p.pinId));
  const blockers=occupied.filter(rect=>(!ownCluster||rect.owner!==ownCluster)&&newPinRectsOverlap(rect,newPinSafeRect(entry.fullRect)));
  // A reserve label may displace lower-weight logos, never a higher weight
  // or an already expanded offer. Dots do not reserve space.
  const blocked=blockers.some(rect=>!rect.owner||rect.owner.type!=='pin'||
   rect.owner.el.dataset.state!=='compact'||compareNewPinWeight(p,rect.owner.p)>=0);
  if(!fullyInside(entry.fullRect)||blocked){entry.el.remove();continue;}
  if(ownCluster){const index=occupied.findIndex(rect=>rect.owner===ownCluster);if(index>=0)occupied.splice(index,1);}
  for(const rect of blockers){
   occupied.splice(occupied.indexOf(rect),1);compact--;dot(rect.owner);
  }
  const previous=[...staging.querySelectorAll('.partner-dot')].find(el=>el.dataset.pinId===String(p.pinId));
  if(previous){previous.remove();dots--;}
  entry.el.querySelector('.pill').style.width=entry.fullRect.width+'px';
  accept(entry,'expanded');promoted.add(p.pinId);
 }
 for(const entry of entries.filter(item=>item.type==='cluster'&&item.el.isConnected)){
  const remaining=entry.tile.items.filter(p=>!promoted.has(p.pinId));
  if(remaining.length===entry.tile.count)continue;
  clustered-=entry.tile.count-remaining.length;
  const oldIndex=occupied.findIndex(rect=>rect.owner===entry);
  if(oldIndex>=0)occupied.splice(oldIndex,1);
  if(remaining.length<=10||!placeCluster(entry,remaining)){
   entry.el.remove();clustered-=remaining.length;
   const index=occupied.findIndex(rect=>rect.owner===entry);
   if(index>=0)occupied.splice(index,1);
   remaining.forEach(p=>dot(marker(p)));
  }else{
   entry.el.dataset.memberIds=remaining.map(p=>p.pinId).join(',');
   entry.el.querySelector('.cluster-count-text').textContent=remaining.length>99?'99+':String(remaining.length);
   entry.el.title=`Кластер · ${remaining.length} точек · тайл ${entry.tile.key}`;
  }
 }
 plan.dots.filter(p=>!promoted.has(p.pinId)).forEach(p=>dot(marker(p)));
 commitNewTilePins(layer,staging);
 document.getElementById('shown').textContent=expanded+compact+dots;
 document.getElementById('compactCount').textContent=compact;
 document.getElementById('hiddenCount').textContent=clustered;
 document.getElementById('tileSummary').textContent=`Новая логика · тайлов: ${plan.visibleTiles.length} · раскрытых: ${expanded} · логотипов: ${compact} · точек: ${dots} · в кластерах: ${clustered}`;
}
