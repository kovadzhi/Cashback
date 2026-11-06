async function runNewPinAnchorTests(check,settle){
 const layer=document.getElementById('markers'),wait=ms=>new Promise(r=>setTimeout(r,ms));
 map.stop();map.jumpTo({center:USER_LOCATION,zoom:13});await settle();newPinMotion.active=false;
 renderNewTilePins(layer,[]);clearNewPinTransitions();
 const pt={x:150,y:220},origin=layer.getBoundingClientRect();
 const p={...points[0],pinId:950000,id:950000,selected:false,...unprojectActive([pt.x,pt.y])};
 const place=state=>{
  const el=createNewPinElement(p,state);el.style.left=pt.x+'px';el.style.top=pt.y+'px';layer.append(el);
  const box=el.getBoundingClientRect();el.style.width=box.width+'px';
  return {key:'pin:'+p.pinId,kind:'pin',p,lng:p.lng,lat:p.lat,state,width:box.width,height:box.height,el};
 };
 const centre=el=>{const r=el.getBoundingClientRect();return {x:r.left+r.width/2-origin.left,y:r.top+r.height/2-origin.top};};
 const fixed=el=>{const c=centre(el);return Math.abs(c.x-pt.x)<.06&&Math.abs(c.y-pt.y)<.06;};
 for(const state of ['dot','compact','expanded']){
  const r=place(state);check(`Якорь: неподвижный ${state} центрирован по логотипу`,fixed(r.el.querySelector(state==='dot'?'.pill':'.logo')));r.el.remove();
 }
 const pairs=[['dot','compact'],['compact','dot'],['dot','expanded'],['expanded','dot'],['compact','expanded'],['expanded','compact'],['none','expanded'],['expanded','none'],['none','dot'],['dot','none']];
 for(const [fromState,toState] of pairs){
  const from=place(fromState==='none'?'dot':fromState),to=place(toState==='none'?'dot':toState);
  from.absent=fromState==='none';to.absent=toState==='none';
  const template=to.state==='dot'?from.el:to.el;
  const item=animateNewPinVisual(template,from,to,newPinAnimationHost(layer),to.el);
  from.el.remove();let logoFixed=true,dotFixed=true;
  for(const ms of [0,40,80,160,240,300,320]){
   for(const animation of item.ghost.getAnimations({subtree:true})){animation.pause();animation.currentTime=ms;}
   const logo=item.shell.querySelector('.logo');if(logo)logoFixed&&=fixed(logo);
   dotFixed&&=fixed(item.ghost.querySelector('.new-pin-transition-dot'));
  }
  check(`Якорь: ${fromState} → ${toState} без сдвига на семи кадрах`,logoFixed&&dotFixed);
  item.finish();to.el.remove();
 }
 // Paint-order checks use the actual shared browser stacking context, with
 // a deliberately adversarial DOM order. Hit testing is enabled only here.
 const full=place('expanded'),compact=place('compact'),dot=place('dot');
 const hit=()=>document.elementFromPoint(origin.left+pt.x,origin.top+pt.y);
 check('Слои: текст выше логотипа и точки независимо от DOM',full.el.contains(hit()));
 full.el.remove();
 check('Слои: логотип выше точки независимо от DOM',compact.el.contains(hit()));
 const fullRecord={...full,el:full.el};
 const expanding=animateNewPinVisual(full.el,{...dot,state:'dot'},fullRecord,newPinAnimationHost(layer));
 expanding.ghost.style.setProperty('pointer-events','auto','important');
 check('Слои: собственная точка рисуется под оболочкой',expanding.ghost.firstElementChild.classList.contains('new-pin-transition-dot'));
 check('Слои: раскрытие в текст поднимает анимацию сразу',expanding.ghost.contains(hit()));
 expanding.finish();layer.append(full.el);
 const collapsing=animateNewPinVisual(full.el,fullRecord,{...dot,state:'dot'},newPinAnimationHost(layer));
 collapsing.ghost.style.setProperty('pointer-events','auto','important');
 let staysBelow=true;
 for(const ms of [0,40,160,300]){for(const a of collapsing.ghost.getAnimations({subtree:true})){a.pause();a.currentTime=ms;}staysBelow&&=full.el.contains(hit());}
 check('Слои: анимированная точка не перекрывает текст',staysBelow);
 collapsing.finish();full.el.remove();compact.el.remove();
 const other={...p,pinId:p.pinId+1,name:points[1].name,logo:points[1].logo};
 const mini=createNewMiniCluster([p,other]);layer.append(mini);
 const pointTween=animateNewPinVisual(dot.el,{...dot,absent:true},dot,newPinAnimationHost(layer));
 pointTween.ghost.style.setProperty('pointer-events','auto','important');
 check('Слои: мини-кластер выше анимированной точки',mini.contains(hit()));
 pointTween.finish();mini.remove();
 const miniRecord={kind:'cluster',state:'cluster',p,lng:p.lng,lat:p.lat,width:46,height:28};
 const miniTween=animateNewPinVisual(mini,{...miniRecord,state:'dot',width:16,height:16},miniRecord,newPinAnimationHost(layer));
 miniTween.ghost.style.setProperty('pointer-events','auto','important');
 check('Слои: появляющийся мини-кластер сразу выше точки',miniTween.ghost.contains(hit()));
 layer.append(full.el);
 check('Слои: анимация мини-кластера остаётся ниже текста',full.el.contains(hit()));
 full.el.remove();miniTween.finish();
 const hidden=animateNewPinVisual(full.el,fullRecord,{...dot,absent:true},newPinAnimationHost(layer));
 hidden.ghost.style.setProperty('pointer-events','auto','important');
 check('Слои: исчезающий пин находится под точкой',dot.el.contains(hit()));
 hidden.finish();mini.remove();dot.el.remove();
 clearNewPinTransitions();render();await wait(350);await settle();
}
