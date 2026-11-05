// Run with Node.js and sharp available through NODE_PATH or node_modules.
const fs=require('fs'),path=require('path'),vm=require('vm'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const checkOnly=process.argv.includes('--check');
function backgroundFromPixels(data,width,height){
 const cx=(width-1)/2,cy=(height-1)/2,radius=Math.min(width,height)/2;
 const buckets=new Map();
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const distance=Math.hypot(x-cx,y-cy)/radius,i=(y*width+x)*4;
  // Avoid the transparent corners and central pictogram/lettering.
  if(distance<.60||distance>.85||data[i+3]<230)continue;
  const rgb=[data[i],data[i+1],data[i+2]],key=rgb.map(c=>Math.round(c/16)).join(',');
  if(!buckets.has(key))buckets.set(key,{count:0,colors:new Map()});
  const b=buckets.get(key),hex='#'+rgb.map(c=>c.toString(16).padStart(2,'0')).join('');
  b.count++;b.colors.set(hex,(b.colors.get(hex)||0)+1);
 }
 const dominant=[...buckets.values()].sort((a,b)=>b.count-a.count)[0];
 if(!dominant)throw Error('Logo has no opaque background samples');
 // Use a colour actually present in the logo, not a generated approximation.
 return [...dominant.colors.entries()].sort((a,b)=>b[1]-a[1])[0][0];
}
(async()=>{
 const file=path.join(root,'partners.js'),text=fs.readFileSync(file,'utf8'),context={};vm.createContext(context);vm.runInContext(text+';this.partners=PARTNERS;this.info=PARTNER_INFO',context);
 const colors=new Map();
 for(const p of context.partners){
  if(!colors.has(p.logo)){
   const {data,info}=await sharp(path.join(root,p.logo)).resize(128,128).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   colors.set(p.logo,backgroundFromPixels(data,info.width,info.height));
  }
  if(checkOnly&&p.color!==colors.get(p.logo))throw Error(`${p.name}: stored colour does not match logo background`);
  p.color=colors.get(p.logo);
 }
 if(checkOnly){console.log(`PASS: all ${context.partners.length} point colours match their displayed logo backgrounds`);return;}
 fs.writeFileSync(file,'// Archive names are normalized to NFC; offer data are prototype fixtures.\n// Point colours are sampled from the background ring of each displayed logo.\nconst PARTNERS = '+JSON.stringify(context.partners,null,1)+';\nconst PARTNER_INFO = '+JSON.stringify(context.info,null,1)+';\n');
 console.log(`Sampled ${colors.size} displayed logos for ${context.partners.length} partners`);
 const rows=context.partners.map((p,i)=>{
  const x=(i%7)*160,y=Math.floor(i/7)*88;
  const label=p.name.replaceAll('&','&amp;').replaceAll('<','&lt;');
  const buffer=fs.readFileSync(path.join(root,p.logo)),mime=p.logo.endsWith('.svg')?'image/svg+xml':'image/png';
  return `<g transform="translate(${x},${y})"><image href="data:${mime};base64,${buffer.toString('base64')}" x="5" y="3" width="48" height="48"/><circle cx="78" cy="27" r="12" fill="${p.color}" stroke="#aaa"/><text x="4" y="68" font-family="sans-serif" font-size="10">${label.slice(0,24)}</text><text x="100" y="31" font-family="monospace" font-size="10">${p.color}</text></g>`;
 });
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="${Math.ceil(rows.length/7)*88}"><rect width="100%" height="100%" fill="#f7f7f7"/>${rows.join('')}</svg>`;
 await sharp(Buffer.from(svg)).png().toFile(path.join(root,'tests/screenshots/logo-background-colors.png'));
})();
