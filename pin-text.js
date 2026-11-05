/* Display-only typography for pin details. Partner records stay unchanged. */
const PIN_DETAIL_NBSP='\u00a0';
const PIN_DETAIL_LINK_WORDS=[
 'без','безо','близ','в','во','ввиду','вдоль','взамен','вместо','вне',
 'внутри','внутрь','возле','вокруг','вопреки','впереди','вроде','вслед',
 'вследствие','для','до','за','из','изо','из-за','из-под','к','ко','кроме',
 'меж','между','мимо','на','над','надо','наподобие','напротив','насчёт',
 'насчет','о','об','обо','около','от','ото','перед','передо','по','под',
 'подо','позади','помимо','поперёк','поперек','после','посреди','посредством',
 'при','про','против','путём','путем','ради','с','со','сверх','свыше',
 'сквозь','согласно','спустя','среди','у','через','и','а','но','или'
];
const PIN_DETAIL_COMPOUND_LINKS=[
 'в связи с','по отношению к','по сравнению с','в отличие от',
 'несмотря на','невзирая на','исходя из','в течение','в продолжение',
 'в заключение','в силу','в целях','в виде','за счёт','за счет',
 'по поводу','по причине','по мере','в зависимости от'
];
const PIN_DETAIL_GAP='[ \\t\\u00a0\\u202f]+';
const PIN_DETAIL_WORD_START='(?<![\\p{L}\\p{N}_-])';
const pinDetailCompoundPattern=new RegExp(PIN_DETAIL_WORD_START+'(?:'+
 PIN_DETAIL_COMPOUND_LINKS.map(phrase=>phrase.split(' ').join(PIN_DETAIL_GAP)).join('|')+
 ')'+PIN_DETAIL_GAP+'(?=\\S)','giu');
const pinDetailLinkPattern=new RegExp(PIN_DETAIL_WORD_START+'('+
 PIN_DETAIL_LINK_WORDS.join('|')+')'+PIN_DETAIL_GAP+'(?=\\S)','giu');

function formatPinBonusNumber(value){
 return String(value).replace(/\B(?=(\d{3})+(?!\d))/g,PIN_DETAIL_NBSP);
}
function formatPinDetailText(value){
 let text=String(value??'').trimEnd();
 text=text.replace(/(?<![\p{L}\p{N}_])д\.[ \t\u00a0\u202f]*(?=\d)/giu,match=>match.replace(/[ \t\u00a0\u202f]+$/g,'')+PIN_DETAIL_NBSP);
 text=text.replace(pinDetailCompoundPattern,match=>match.replace(/[ \t\u00a0\u202f]+/g,PIN_DETAIL_NBSP));
 text=text.replace(pinDetailLinkPattern,(_,word)=>word+PIN_DETAIL_NBSP);
 // Keep sentence punctuation inside the text and abbreviation dots.
 return text.replace(/\.(?=[»”"')\]]*$)/u,'');
}
function setPinDetailText(target,value){
 const element=typeof target==='string'?document.getElementById(target):target;
 const text=formatPinDetailText(value),fragment=document.createDocumentFragment();
 let offset=0;
 // Protect NBSP groups even in headings that allow emergency word wrapping.
 for(const match of text.matchAll(/\S+(?:\u00a0\S+)+/gu)){
  fragment.append(document.createTextNode(text.slice(offset,match.index)));
  const span=document.createElement('span');span.className='pin-detail-no-break';
  span.textContent=match[0];fragment.append(span);offset=match.index+match[0].length;
 }
 fragment.append(document.createTextNode(text.slice(offset)));element.replaceChildren(fragment);
}
