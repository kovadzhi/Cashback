/* New-mode clusters always keep the arithmetic geographic centre of members. */
function newClusterMean(members){
 const mean=members.reduce((sum,p)=>({lng:sum.lng+p.lng,lat:sum.lat+p.lat}),{lng:0,lat:0});
 return {lng:mean.lng/members.length,lat:mean.lat/members.length};
}
function createNewMiniCluster(members){
 const unique=new Map();for(const p of members.slice().sort(compareNewPinWeight))if(!unique.has(p.name))unique.set(p.name,p);
 const partners=[...unique.values()];
 const el=document.createElement('div');el.className='cluster new-tile-cluster new-mini-cluster';
 el.dataset.clusterKey='mini:'+members.map(p=>p.pinId).sort((a,b)=>a-b).join('-');
 el.dataset.memberIds=members.map(p=>p.pinId).join(',');
 el.dataset.partnerCount=String(partners.length);
 el.style.width=(28+18*(partners.length-1))+'px';
 const mean=newClusterMean(members),pt=projectActive([mean.lng,mean.lat]);
 el.dataset.lng=mean.lng;el.dataset.lat=mean.lat;el.style.left=pt.x+'px';el.style.top=pt.y+'px';
 el.title=partners.map(p=>p.name).join(' · ');el.setAttribute('role','button');el.tabIndex=0;
 el.setAttribute('aria-label',`Приблизить ${members.length} точек: ${el.title}`);
 partners.forEach(p=>{
  const slot=document.createElement('span');slot.className='new-mini-avatar';
  const img=document.createElement('img');img.src=p.logo;img.alt=p.name;slot.append(img);el.append(slot);
 });
 el.onclick=()=>map.easeTo({center:[mean.lng,mean.lat],zoom:Math.min(MAX_MAP_ZOOM,map.getZoom()+1),duration:350});
 el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el.click();}};
 return el;
}
function buildNewMiniClusters(staging,source,occupied,virtual){
 const byId=new Map(source.map(p=>[String(p.pinId),p]));
 const viewport={left:0,top:0,right:staging.clientWidth,bottom:staging.clientHeight};
 const visibleStates=new Map();
 for(const el of staging.querySelectorAll('.new-tile-pin')){
  const state=el.dataset.state;if(state==='dot')continue;
  const p=byId.get(el.dataset.pinId),pt=projectActive([p.lng,p.lat]),w=state==='compact'?28:parseFloat(el.querySelector('.pill').style.width),h=state==='compact'?28:40;
  if(!newPinRectVisible({left:pt.x-18,right:pt.x-18+w,top:pt.y-h/2,bottom:pt.y+h/2},viewport.right,viewport.bottom))continue;
  if(!visibleStates.has(p.name))visibleStates.set(p.name,new Set());
  visibleStates.get(p.name).add(el.dataset.state);
 }
 const represented=name=>visibleStates.get(name)?.has('expanded')&&visibleStates.get(name)?.has('compact');
 const candidates=[...staging.querySelectorAll('.new-tile-pin:not([data-state="expanded"])')].filter(el=>!represented(byId.get(el.dataset.pinId).name)).map(el=>{
  const p=byId.get(el.dataset.pinId);return {p,el,pt:projectActive([p.lng,p.lat])};
 }).sort((a,b)=>compareNewPinWeight(a.p,b.p));
 const used=new Set();let grouped=0,compact=0,dots=0;
 for(const seed of candidates){
  if(used.has(seed))continue;
  const group=[],names=new Set();
  for(const item of candidates){
   if(used.has(item)||Math.hypot(item.pt.x-seed.pt.x,item.pt.y-seed.pt.y)>44)continue;
   if(!names.has(item.p.name)&&names.size===4)continue;
   group.push(item);names.add(item.p.name);
  }
  if(names.size<2)continue;
  const members=group.map(item=>item.p),mean=newClusterMean(members),pt=projectActive([mean.lng,mean.lat]);
  const width=28+18*(names.size-1),rect={left:pt.x-width/2,right:pt.x+width/2,top:pt.y-14,bottom:pt.y+14};
  if(!newPinInsideViewport(rect,{left:0,top:0,right:staging.clientWidth,bottom:staging.clientHeight}))continue;
  const memberElements=new Set(group.map(item=>item.el));
  const localSafe=newPinSafeRect(rect),origin=staging.getBoundingClientRect();
  const absoluteSafe={left:localSafe.left+origin.left,right:localSafe.right+origin.left,top:localSafe.top+origin.top,bottom:localSafe.bottom+origin.top};
  if(occupied.some(r=>!memberElements.has(r.owner?.el)&&newPinRectsOverlap(r,absoluteSafe)))continue;
  for(let i=occupied.length-1;i>=0;i--)if(memberElements.has(occupied[i].owner?.el))occupied.splice(i,1);
  const el=createNewMiniCluster(members);staging.append(el);
  occupied.push({...absoluteSafe,owner:{type:'cluster',el,p:members[0]}});
  for(const item of group){used.add(item);if(item.el.dataset.state==='compact')compact++;else dots++;item.el.remove();virtual.delete(item.p.pinId);}
  grouped+=members.length;
 }
 return {grouped,compact,dots};
}
