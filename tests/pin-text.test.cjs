const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert/strict');
const context={};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.resolve(__dirname,'../pin-text.js'),'utf8')+';this.text=formatPinDetailText;this.number=formatPinBonusNumber;',context);
let passed=0;
function check(name,actual,expected){assert.equal(actual,expected,name);console.log('PASS: '+name);passed++;}
const nbsp='\u00a0';
for(const [input,output] of [[400,'400'],[1000,'1\u00a0000'],[1200,'1\u00a0200'],[1950,'1\u00a0950'],[2000,'2\u00a0000'],[1000000,'1\u00a0000\u00a0000']])check('Thousands '+input,context.number(input),output);
const cases=[
 ['Remove final sentence period','Первое предложение. Последнее предложение.','Первое предложение. Последнее предложение'],
 ['Preserve internal paragraph punctuation','Первая строка.\nВторая строка.\nТретья строка.','Первая строка.\nВторая строка.\nТретья строка'],
 ['User examples','на работу, об ассортименте и снаряжения.','на\u00a0работу, об\u00a0ассортименте и\u00a0снаряжения'],
 ['Consecutive link words','и с доставкой','и\u00a0с\u00a0доставкой'],
 ['Consecutive prepositions','Из-за дождя и по дороге','Из-за\u00a0дождя и\u00a0по\u00a0дороге'],
 ['Compound preposition','В связи с покупкой и в течение дня.','В\u00a0связи\u00a0с\u00a0покупкой и\u00a0в\u00a0течение\u00a0дня'],
 ['Offer condition and date','За покупки на кассе до 18 ноября','За\u00a0покупки на\u00a0кассе до\u00a018 ноября'],
 ['Address abbreviation','Москва, ул. Большая, д. 12','Москва, ул. Большая, д.\u00a012'],
 ['Address without original space','Москва, д.6','Москва, д.\u00a06'],
 ['Preserve capital abbreviation','Москва, Д. 12','Москва, Д.\u00a012'],
 ['Preserve building suffix','д. 12 к3 с2','д.\u00a012 к3 с2'],
 ['Final period before quote','Он сказал «Спасибо.»','Он сказал «Спасибо»'],
 ['Final period after quote','Магазин «Ромашка».','Магазин «Ромашка»'],
 ['Preserve punctuation inside brand','М.Косметик','М.Косметик'],
 ['Do not match word fragments','Кофе, магазин, надёжный, работа','Кофе, магазин, надёжный, работа'],
 ['Preserve year','Компания основана в 1985 году.','Компания основана в\u00a01985 году'],
 ['Static about heading','О месте','О\u00a0месте'],
 ['Preserve explicit paragraphs','Товары.\nНа выбор.','Товары.\nНа\u00a0выбор'],
 ['Empty text',null,'']
];
for(const [name,input,expected] of cases){check(name,context.text(input),expected);check('Idempotent: '+name,context.text(context.text(input)),expected);}
check('NBSP code point',nbsp.codePointAt(0),160);
console.log(`${passed} checks passed`);
