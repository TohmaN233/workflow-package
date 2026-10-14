import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createContext,runInContext} from 'node:vm';
import {resolve} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const html=await readFile(resolve(root,'workflow_explanations/gallery/index.html'),'utf8');
const script=await readFile(resolve(root,'workflow_explanations/gallery/app.js'),'utf8');
const data=JSON.parse(await readFile(resolve(root,'workflow_explanations/experiments/results.json'),'utf8'));
const elements=new Map();
class Element {
  constructor(attributes={}){this.attributes={...attributes};this.dataset={};this.children=[];this.textContent='';this.committedDocument=null;}
  getAttribute(key){return this.attributes[key]??null;}
  setAttribute(key,value){this.attributes[key]=String(value);}
  removeAttribute(key){delete this.attributes[key];}
  get src(){return this.getAttribute('src');}
  set src(value){this.setAttribute('src',value);}
  set href(value){this.setAttribute('href',value);}
  get href(){return this.getAttribute('href');}
  append(...children){this.children.push(...children);}
  replaceChildren(...children){this.children=[...children];}
  querySelector(){return new Element();}
  querySelectorAll(){return [];}
  addEventListener(){}
  scrollIntoView(){}
  cloneNode(){return new Element(this.attributes);}
  replaceWith(next){
    elements.set(this.getAttribute('id'),next);
    // A fresh browsing context cannot retain an older iframe document.
    next.committedDocument=next.getAttribute('src');
  }
}
for(const id of ['skill-preview','workflow-preview']){
  const tag=html.match(new RegExp('<iframe\\b[^>]*\\bid="'+id+'"[^>]*>'))?.[0];assert(tag,'Missing preview frame');
  const attributes=Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  assert(!attributes.src,'Initial HTML must not load TCP before the selected fragment/data is known');
  elements.set(id,new Element(attributes));
}
const element=id=>{if(!elements.has(id))elements.set(id,new Element({id}));return elements.get(id);};
const document={documentElement:{},getElementById:element,querySelector:element,querySelectorAll:()=>[],createElement:()=>new Element()};
const window={location:{hash:'#video?topic=git&lang=zh-CN'},addEventListener(){},history:{pushState(){}}};
const context=createContext({document,window,console,URLSearchParams,structuredClone,fetch:()=>new Promise(()=>{}),fixture:data});
runInContext(script,context);
assert.equal(element('workflow-preview').getAttribute('src'),null,'No speculative preview navigation before measured data');
runInContext('state.data=fixture;renderAll()',context);
function expected(topic,arm){const record=data.three_html_one_conversation.artifacts.find(a=>a.topic===topic&&a.arm===arm);return record.path+'?v='+record.sha256;}
for(const arm of ['skill','workflow']){
  const frame=element(arm+'-preview');assert.equal(frame.getAttribute('src'),expected('git',arm));
  assert.equal(frame.committedDocument,expected('git',arm),'Selected topic must own the actual browsing context');
  assert.equal(element(arm+'-artifact-link').href,frame.getAttribute('src'),'Open link and preview must select identical bytes');
}
const prior=element('workflow-preview');runInContext('state.lang="en";renderAll()',context);
assert.equal(element('workflow-preview'),prior,'Changing language must not reload an unchanged artifact');
runInContext('state.topic="cache";renderAll()',context);
assert.notEqual(element('workflow-preview'),prior,'Topic changes must not retain the old browsing context');
assert.equal(element('workflow-preview').committedDocument,expected('cache','workflow'));
const cacheFrame=element('workflow-preview');
runInContext('state.data=structuredClone(fixture);state.data.three_html_one_conversation.artifacts.find(a=>a.topic==="cache"&&a.arm==="workflow").sha256="a".repeat(64);renderAll()',context);
assert.notEqual(element('workflow-preview'),cacheFrame,'New content at the same filename must refresh its browsing context');
assert(element('workflow-preview').src.endsWith('?v='+'a'.repeat(64)));
console.log('PASS gallery artifact lifecycle: deep-link topic, delayed data, source hashes, language stability, topic change and same-path content refresh');
