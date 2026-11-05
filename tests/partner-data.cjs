const fs=require('fs'),vm=require('vm');const dir=require('path').resolve(__dirname,'..')+'/';
let c={};vm.createContext(c);vm.runInContext(fs.readFileSync(dir+'partners.js','utf8')+fs.readFileSync(dir+'locations.js','utf8')+';this.data={partners:PARTNERS,info:PARTNER_INFO,locations:PARTNER_LOCATIONS}',c);
const {partners,info,locations}=c.data,footprints=JSON.parse(fs.readFileSync(dir+'tests/building-footprints.json'));const roofs=JSON.parse(fs.readFileSync(dir+'tests/building-roofs.json'));const candidates=new Map(JSON.parse(fs.readFileSync(dir+'data/partner-building-candidates.json')).map(p=>[p.buildingId,p]));let passed=0;
function check(name,ok){console.log((ok?'PASS: ':'FAIL: ')+name);if(!ok)process.exitCode=1;else passed++;}
function inside(x,y,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){let a=poly[i],b=poly[j];if((a[1]>y)!=(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
check('147 distinct archive partners',partners.length===147&&new Set(partners.map(p=>p.name)).size===147);
check('2000 distinct addresses and buildings',locations.length===2000&&new Set(locations.map(p=>p.address)).size===2000&&new Set(locations.map(p=>p.buildingId)).size===2000);
check('Every address and coordinate match the verified source building',locations.every(p=>{const source=candidates.get(p.buildingId);return source&&['lng','lat','address'].every(key=>p[key]===source[key]);}));
check('Every coordinate inside its addressed building footprint',locations.every(p=>inside(p.lng,p.lat,footprints[p.buildingId])));
check('Every point lies on a building roof, outside courtyard holes',locations.every(p=>{const rings=roofs[p.buildingId];return rings&&inside(p.lng,p.lat,rings[0])&&!rings.slice(1).some(ring=>inside(p.lng,p.lat,ring));}));
const distance=p=>Math.hypot((p.lng-37.6173)*111.32*Math.cos(55.7558*Math.PI/180),(p.lat-55.7558)*111.32);
const ranges=[[0,4],[4,8],[8,16]],density=ranges.map(([lo,hi])=>locations.filter(p=>distance(p)>=lo&&distance(p)<hi).length/(Math.PI*(hi*hi-lo*lo)));
check('Continuous centre-biased distribution without district labels',locations.every(p=>!('districtBand' in p))&&density[0]>density[1]&&density[1]>density[2]&&locations.some(p=>distance(p)>12));
check('Logo background colours retained in partner data',partners.find(p=>p.name==='Спортмастер').color==='#1551e5'&&partners.find(p=>p.name==='ВинЛаб').color==='#501a4a'&&partners.find(p=>p.name==='Вай мясо халяль').color==='#ffb74c');
check('Cashback domain',partners.every(p=>p.cash>=10&&p.cash<=40&&p.cash%5===0));
check('Maximum bonuses domain',partners.every(p=>p.maxBonuses>=400&&p.maxBonuses<=2000&&p.maxBonuses%50===0));
check('November dates and conditions',partners.every(p=>p.untilDay>=15&&p.untilDay<=30&&['За покупки на кассе','За одну покупку на кассе'].includes(p.condition)));
check('Opening hours',partners.every(p=>[20,21,22,23,0].includes(p.closingHour)));
check('Three description lines',partners.every(p=>info[p.name][1].split('\n').length>=3));
check('Every logo exists',partners.every(p=>fs.existsSync(dir+p.logo)));
check('Full Service sources',partners.filter(p=>p.service==='Full Service').every(p=>p.source.startsWith('https://')));
check('Full Service weights exceed Self Service',Math.min(...partners.filter(p=>p.service==='Full Service').map(p=>p.weight))>Math.max(...partners.filter(p=>p.service==='Self Service').map(p=>p.weight)));
const html=fs.readFileSync(dir+'index.html','utf8');for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);for(const name of ['partners.js','locations.js','new-pins.js','sheets.js','tests/prototype.test.js','tests/new-pins.test.js'])new vm.Script(fs.readFileSync(dir+name,'utf8'));
check('All JavaScript parses',true);console.log(`${passed} checks passed`);
