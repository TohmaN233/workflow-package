import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {dirname,resolve,relative,isAbsolute} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const hash=data=>createHash('sha256').update(data).digest('hex');
const canonical=value=>Array.isArray(value)?'['+value.map(canonical).join(',')+']'
 :value&&typeof value==='object'?'{'+Object.keys(value).sort().map(key=>JSON.stringify(key)+':'+canonical(value[key])).join(',')+'}'
 :JSON.stringify(value);
const json=async path=>JSON.parse(await readFile(path,'utf8'));
const catalogue=await json(resolve(root,'codex/catalog.json'));
const engineIndex=process.argv.indexOf('--engine');
let validate;
if(engineIndex!==-1){
 assert(process.argv[engineIndex+1],'--engine requires a source repository path');
 ({validateWorkflowPackage:validate}=await import(pathToFileURL(resolve(process.argv[engineIndex+1],
  'plugins/codex-agents-workflow/control-plane/lib/workflow-package.mjs')).href));
}
for(const item of catalogue.packages){
 const file=resolve(root,item.path),raw=await readFile(file),bundle=JSON.parse(raw);
 assert.equal(hash(raw),item.file_sha256,`${item.name}: file digest`);
 const {package_sha256,...payload}=bundle;
 assert.equal(hash(canonical(payload)),package_sha256,`${item.name}: package digest`);
 assert.equal(package_sha256,item.package_sha256);
 const {revision_hash,...snapshot}=payload.snapshot;
 assert.equal(hash(canonical(snapshot)),revision_hash,`${item.name}: revision digest`);
 assert.equal(revision_hash,item.workflow_revision_hash);
 assert.equal(payload.format,'codex.workflow.package');
 assert.equal(payload.package.id,item.id);
 assert.equal(payload.package.version,item.package_version);
 assert.deepEqual(payload.dependencies,item.dependencies);
 const paths=new Set();
 const manifest=[];
 for(const object of payload.objects){
  assert(!paths.has(object.path),'Duplicate resource');paths.add(object.path);
  assert(!isAbsolute(object.path)&&!object.path.split(/[\\/]/).includes('..'),'Portable resource path');
  assert(!object.path.toLowerCase().startsWith('source/'),'Private authoring source');
  const bytes=Buffer.from(object.content_base64,'base64');
  assert.equal(bytes.length,object.bytes);assert.equal(hash(bytes),object.sha256);
  assert(!/(?:G:[/\\]Baiduyun|C:[/\\]Users[/\\]tgy23|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|sk-proj-[A-Za-z0-9_-]{30,})/.test(bytes.toString()),'Private path or credential');
  manifest.push({path:object.path,sha256:object.sha256,bytes:object.bytes});
 }
 manifest.sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
 assert.deepEqual(manifest,payload.snapshot.resources);
 assert.equal(paths.size,item.resource_count);
 const nodes=payload.snapshot.workflow.nodes,ids=new Set(nodes.map(n=>n.id));
 assert.equal(ids.size,nodes.length);assert.equal(nodes.length,item.node_count);
 for(const edge of payload.snapshot.workflow.edges)assert(ids.has(edge.source)&&ids.has(edge.target),'Unknown edge endpoint');
 if(validate)validate(bundle);
 console.log(`PASS ${item.name}: ${nodes.length} nodes, ${paths.size} resources${validate?', official engine validator':''}`);
}

function cost(arm,pricing){
 const u=arm.usage??arm;
 return ((u.input_tokens-u.cached_input_tokens)*(pricing.input??pricing.fresh_input_per_million)
  +u.cached_input_tokens*(pricing.cached_input??pricing.cached_input_per_million)
  +u.output_tokens*(pricing.output??pricing.output_per_million))/1e6;
}
const metrics=await json(resolve(root,'codex/answer-me-with-html/experiments/metrics.json'));
for(const arm of [...Object.values(metrics.single_html.baseline),...metrics.single_html.workflow_samples])
 assert(Math.abs(cost(arm,metrics.single_html.pricing_usd_per_million)-arm.cost_usd)<1e-9,'Single HTML cost');
for(const arm of [metrics.three_html_one_conversation.skill,metrics.three_html_one_conversation.workflow])
 assert(Math.abs(cost(arm,metrics.three_html_one_conversation.pricing_usd_per_million)-arm.cost_usd)<1e-9,'Batch HTML cost');
for(const stage of ['reuse','text'])for(const side of ['skill','workflow']){
 const arm=metrics.video[stage][side];
 assert(Math.abs(cost(arm,metrics.video.pricing_usd_per_million)-arm.cost_usd)<1e-9,'Video/text cost');
}
async function docs(directory){
 for(const entry of await readdir(directory,{withFileTypes:true})){
  if(entry.name==='.git')continue;
  const path=resolve(directory,entry.name);
  if(entry.isDirectory()){await docs(path);continue;}
  if(!entry.name.endsWith('.md'))continue;
  const content=await readFile(path,'utf8');
  for(const match of content.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)){
   const target=match[1].split('#')[0];
   if(!target||/^[a-z]+:/i.test(target))continue;
   const file=resolve(dirname(path),decodeURIComponent(target));
   assert(!relative(root,file).startsWith('..'),'Link outside package repository');
   await readFile(file);
  }
 }
}
await docs(root);
console.log('PASS historical cost arithmetic and local document links');
