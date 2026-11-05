"""Select 2000 verified addressed buildings with continuous radial falloff.

Run: python3 scripts/select-partner-buildings.py
The checked-in candidate data contain OSM addresses and roof polygons,
including courtyard holes. No live network or district lookup is needed.
"""
import json,math,random
from collections import defaultdict,Counter
from pathlib import Path
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'data/partner-building-candidates.json').read_text())
rng=random.Random(20261106);grid=defaultdict(list)
for r in records:
 r['eastKm']=(r['lng']-37.6173)*111.32*math.cos(math.radians(55.7558))
 r['northKm']=(r['lat']-55.7558)*111.32
 r['distanceKm']=math.hypot(r['eastKm'],r['northKm'])
 grid[(math.floor(r['eastKm']),math.floor(r['northKm']))].append(r)
for r in records:
 x,y=r['eastKm'],r['northKm'];gx,gy=math.floor(x),math.floor(y);density=0
 # A smooth local kernel corrects for available building density. The grid
 # accelerates neighbour lookup; it never defines quotas or selection areas.
 for ix in range(gx-2,gx+3):
  for iy in range(gy-2,gy+3):
   for other in grid[(ix,iy)]:
    d2=(x-other['eastKm'])**2+(y-other['northKm'])**2
    if d2<=4:density+=math.exp(-d2/0.72)
 weight=math.exp(-r['distanceKm']/7)/max(1,density)
 r['sampleKey']=-math.log(max(rng.random(),1e-12))/weight
selected=sorted(records,key=lambda r:r['sampleKey'])[:2000];rng.shuffle(selected)
assert len(selected)==2000,'Not enough verified addressed buildings'
fields=['lng','lat','address','buildingId']
(root/'locations.js').write_text('// Addressed OSM building interiors, verified 2026-11-05. ODbL 1.0.\n// Continuous radial falloff; no administrative or distance-band quotas.\n// Prototype locations do not assert actual branch occupancy.\nconst PARTNER_LOCATIONS = '+json.dumps([{k:r[k] for k in fields} for r in selected],ensure_ascii=False,separators=(',',':'))+';\n')
(root/'tests/building-footprints.json').write_text(json.dumps({r['buildingId']:r['roofPolygon'][0] for r in selected},separators=(',',':')))
(root/'tests/building-roofs.json').write_text(json.dumps({r['buildingId']:r['roofPolygon'] for r in selected},separators=(',',':')))
print('Selected',len(selected),'unique addressed buildings from',len(records),'verified candidates')
print('Distance histogram (diagnostic only):',sorted(Counter(int(r['distanceKm']//4)*4 for r in selected).items()))
