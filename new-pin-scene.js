/* Logical tile cache and visible DOM are separate. Camera frames only project
   cached records, cull them, and resolve monotonic state changes using numbers. */
function newPinCacheTiles(z){
 const visible=getVisibleTiles(z),tiles=new Map(visible.map(tile=>[tile.key,tile]));
 const limit=Math.ceil(tileGridSize(z));
 for(const tile of visible)for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){
  const x=tile.x+dx,y=tile.y+dy;
  if(x<0||y<0||x>=limit||y>=limit)continue;
  const key=getTileKey(x,y,z);
  if(!tiles.has(key))tiles.set(key,{x,y,z,key});
 }
 return [...tiles.values()];
}
function createNewPinElement(p,state='expanded'){
 const el=document.createElement('div');el.className='marker new-tile-pin';
 el.dataset.pinId=String(p.pinId);el.dataset.state=state;el.style.width='max-content';
 el.title=`${p.name} · ${p.cashLabel||`Кэшбэк ${p.cash}%`} · Вес ${p.partnerWeight}`;
 el.onclick=()=>selectPoint(p);
 const pill=document.createElement('div');pill.className='pill';el.append(pill);
 if(state==='dot'){
  el.classList.add('partner-dot');pill.style.width='16px';
  pill.style.backgroundColor=newPartnerDotColors.get(p.name)||p.color;el.style.zIndex='4';
 }else{
  const wrap=document.createElement('span');wrap.className='logo-wrap';
  const logo=document.createElement('span');logo.className='logo';
  const image=document.createElement('img');image.src=p.logo;image.alt=p.name;
  logo.append(image);wrap.append(logo);pill.append(wrap);
  const copy=document.createElement('span');copy.className='pin-copy';
  for(const [className,text] of [['name',p.name],['cash',p.cashLabel||`Кэшбэк ${p.cash}%`]]){
   const span=document.createElement('span');span.className=className;span.textContent=text;copy.append(span);
  }
  pill.append(copy);el.style.zIndex='1000';
  if(state==='compact'){el.classList.add('compact','new-logic-compact');pill.style.width='28px';}
 }
 return el;
}
function registerNewPinScene(layer,source,virtual){
 const old=newPinMotion.scene,sourceById=new Map(source.map(p=>[String(p.pinId),p])),records=[];
 for(const el of layer.querySelectorAll('.new-tile-pin,.new-tile-cluster')){
  if(el.classList.contains('new-tile-cluster')){
   const members=el.dataset.memberIds.split(','),p=members.map(id=>sourceById.get(id)).filter(Boolean).reduce((best,p)=>!best||compareNewPinWeight(p,best)<0?p:best,null);
   const mini=el.classList.contains('new-mini-cluster');
   records.push({key:'tile:'+el.dataset.clusterKey,kind:'cluster',el,p,members,lng:Number(el.dataset.lng),lat:Number(el.dataset.lat),state:'cluster',width:mini?parseFloat(el.style.width):36,height:mini?28:36,hidden:el.dataset.layoutHidden==='true'});
  }else{
   const p=sourceById.get(el.dataset.pinId),state=el.dataset.state,measured=el.getBoundingClientRect();
   records.push({key:'pin:'+el.dataset.pinId,kind:'pin',el,p,lng:p.lng,lat:p.lat,state,width:measured.width,height:measured.height});
  }
 }
 for(const item of virtual.values()){
  const p=item.p,key='pin:'+p.pinId,state=item.state;
  records.push({key,kind:'pin',p,lng:p.lng,lat:p.lat,state,width:state==='dot'?16:28,height:state==='dot'?16:28,el:old?.byKey.get(key)?.el||null});
 }
 records.sort((a,b)=>compareNewPinWeight(a.p,b.p));
 const byKey=new Map(records.map(record=>[record.key,record]));
 const representedIds=new Set(records.flatMap(record=>record.kind==='cluster'?record.members:[String(record.p.pinId)]));
 newPinMotion.scene={layer,records,byKey,sourceById,representedIds};
 updateNewPinFrame(false);
}
function newPinRecordRect(record){
 const {pt,state,width,height}=record;
 const left=pt.x-(record.kind==='cluster'?width/2:state==='dot'?8:18),top=pt.y-height/2;
 return {left,top,right:left+width,bottom:top+height};
}
function newPinRectVisible(rect,width,height){return rect.right>1&&rect.left<width-1&&rect.bottom>1&&rect.top<height-1;}
function applyNewPinRecordState(record,state){
 record.state=state;record.width=state==='dot'?16:28;record.height=record.width;
 pinDisplayState.set(String(record.p.pinId),state);
 if(!record.el)return;
 const el=record.el,pill=el.querySelector('.pill');
 el.classList.remove('compact','new-logic-compact','partner-dot');
 el.dataset.state=state;
 if(state==='dot'){
  el.classList.add('partner-dot');pill.replaceChildren();pill.style.width='16px';
  pill.style.backgroundColor=newPartnerDotColors.get(record.p.name)||record.p.color;el.style.zIndex='4';
 }else{pill.style.backgroundColor='';if(!pill.querySelector('img'))pill.replaceChildren(...createNewPinElement(record.p,'compact').querySelector('.pill').childNodes);el.classList.add('compact','new-logic-compact');pill.style.width='28px';}
}
function updateNewPinFrame(constrain=newPinMotion.active||map.isMoving(),settleEdges=false){
 const scene=newPinMotion.scene;if(!scene)return;
 const {layer,records,sourceById}=scene,width=layer.clientWidth,height=layer.clientHeight;
 const viewport={left:0,top:0,right:width,bottom:height},occupied=[];
 const selected=layer.querySelector('.marker.selected');
 if(selected){
  const p=sourceById.get(selected.dataset.pinId);
  if(p?.selected){
   const pt=projectActive([p.lng,p.lat]);selected.style.left=pt.x+'px';selected.style.top=pt.y+'px';
   occupied.push(newPinSafeRect({left:pt.x-30,right:pt.x+30,top:pt.y-75,bottom:pt.y+5}));
  }
 }
 for(const record of records){
  if(record.kind==='pin'&&record.p.selected){record.el?.remove();continue;}
  let before=null;
  const downgrade=state=>{if(!before&&record.el?.isConnected)before={...record,clone:record.el.cloneNode(true)};applyNewPinRecordState(record,state);};
  record.pt=projectActive([record.lng,record.lat]);
  let rect=newPinRecordRect(record);
  if(settleEdges&&record.state==='expanded'&&!newPinInsideViewport(rect,viewport)){downgrade('compact');rect=newPinRecordRect(record);}
  if(!newPinRectVisible(rect,width,height)||record.hidden){record.el?.remove();continue;}
  if(constrain&&record.state!=='dot'){
   const collides=()=>occupied.some(other=>newPinRectsOverlap(other,newPinSafeRect(rect)));
   if(record.kind==='cluster'&&collides()){record.hidden=true;record.el?.remove();continue;}
   if(record.kind==='pin'&&collides()){
    if(record.state==='expanded'){downgrade('compact');rect=newPinRecordRect(record);}
    if(collides()){downgrade('dot');rect=newPinRecordRect(record);}
   }
  }
  // Downgrading changes both size and anchor offset; cull the final shape.
  if(!newPinRectVisible(rect,width,height)){record.el?.remove();continue;}
  if(record.state!=='dot')occupied.push(newPinSafeRect(rect));
  if(!record.el)record.el=createNewPinElement(record.p,record.state);
  const el=record.el;
  // A detached record may have been compacted before it re-entered the screen.
  if(record.kind==='pin'&&el.dataset.state!==record.state)applyNewPinRecordState(record,record.state);
  const desiredWidth=record.width+'px';if(el.style.width!==desiredWidth)el.style.width=desiredWidth;
  const left=record.pt.x+'px',top=record.pt.y+'px';
  if(el.style.left!==left)el.style.left=left;if(el.style.top!==top)el.style.top=top;
  if(el.parentElement!==layer)layer.append(el);
  if(before)animateNewPinDowngrade(before,record,scene);
 }
 positionNewPinTransitions();
}
