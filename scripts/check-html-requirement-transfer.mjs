import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,mkdtemp,rm} from 'node:fs/promises';
import {resolve,join,dirname,relative,isAbsolute} from 'node:path';
import {tmpdir} from 'node:os';
import {pathToFileURL} from 'node:url';
import {isDeepStrictEqual} from 'node:util';

// Exercise the shipped Host adapter, not a second model-written projection.
const packagePath=resolve(process.argv[2]??'codex/answer-me-with-html/answer-me-with-html.workflow-package.json');
const bundle=JSON.parse(await readFile(packagePath,'utf8'));
const temporaryRoot=await mkdtemp(join(tmpdir(),'html-requirement-transfer-'));
try {
  for(const object of bundle.objects){
    const file=resolve(temporaryRoot,object.path),local=relative(temporaryRoot,file);
    assert(local&&!isAbsolute(local)&&!local.startsWith('..'),'Resource escaped test directory');
    await mkdir(dirname(file),{recursive:true});
    await writeFile(file,Buffer.from(object.content_base64,'base64'));
  }
  const adapter=name=>join(temporaryRoot,'workflow-assets/host-adapter',name);
  const assets={observe:adapter('observe.mjs'),cli:join(temporaryRoot,'workflow-assets/scripts/am.mjs'),
    helpers:adapter('source-helpers.mjs'),capture:adapter('capture-cli.mjs'),produce:adapter('produce-file.mjs'),
    entry:adapter('production-entry.mjs'),contract:adapter('render-contract.mjs'),native_adapter:adapter('native-source-adapter.cjs')};
  const {prepareBatch}=await import(pathToFileURL(adapter('batch-pages.mjs')).href);
  const original={request:'COMMON-BEGIN\nPreserve every supplied fact, qualification and example.\n'+'共同要求（不是摘要）\n'.repeat(800)+'COMMON-END',
    materials:{facts:['fact A','fact B'],qualification:{unless:'condition C'}},
    terminology:{term:'exact spelling'},opening:'no_open',settings:{theme:'paper'},pages:[
      {request:'PAGE-A-ONLY: explain mechanism A',materials:{example:'retain the complete worked example'},settings:{theme:'blueprint'}},
      {request:'PAGE-B-ONLY: explain mechanism B',notes:['retain exception B',{'nested':'retain detail B'}]}
    ]};
  const before=structuredClone(original);
  const prepared=await prepareBatch({task:original,mode:'page_batch',pages:[],batch_context:'A deliberately incomplete routing summary'},assets,temporaryRoot);
  const {pages,...expectedCommon}=original;
  assert(isDeepStrictEqual(prepared.common_task,expectedCommon),'Original common requirements were dropped or replaced by a routing summary');
  assert.deepEqual(original,before,'Preparation mutated the original request');
  for(const [index,page] of prepared.pages.entries()){
    assert.deepEqual(page.original_page,pages[index],'Original page requirements must survive normalization without overwrites');
    assert(!JSON.stringify(page).includes('fact A'),'Common source material was duplicated in an item instead of remaining in the shared prefix');
    assert(!JSON.stringify(page).includes(index===0?'PAGE-B-ONLY':'PAGE-A-ONLY'),'Sibling task leaked into an isolated item');
  }
  assert.equal(prepared.manifest.pages[0].task.settings.theme,'blueprint');
  assert.equal(prepared.manifest.pages[1].task.settings.theme,'paper');
  const workflow=bundle.snapshot.workflow;
  const writer=workflow.nodes.find(node=>node.id==='batch_pages');
  assert.equal(writer.input_bindings.common_task,'/nodes/batch_prepare/output/common_task');
  assert.deepEqual(writer.fanout.shared_prefix.common_inputs,['common_task'],'Common original must be shared once before fan-out');
  const schema=workflow.nodes.find(node=>node.id==='batch_prepare').outputs_schema;
  assert(schema.required.includes('common_task'));
  assert(schema.properties.pages.items.required.includes('original_page'));
  const tool=workflow.host_tools.find(tool=>tool.id==='am_batch_prepare');
  assert.deepEqual(tool.output_schema,schema,'Host and node output contracts diverged');

  const engineFlag=process.argv.indexOf('--engine');
  if(engineFlag!==-1){
    assert(process.argv[engineFlag+1],'--engine requires an engine source repository');
    const library=resolve(process.argv[engineFlag+1],'plugins/codex-agents-workflow/control-plane/lib');
    const {sharedPrefixInputProjection}=await import(pathToFileURL(join(library,'execution/host-main-fanout.mjs')).href);
    const {prepareHostMainContext}=await import(pathToFileURL(join(library,'execution/node-input-materials.mjs')).href);
    const envelope={node_id:writer.id,workspace:temporaryRoot,prompt_template:writer.prompt_template,
      inputs:{common_task:prepared.common_task,pages:prepared.pages},resources:[],context_projection:{references:[]}};
    const projection=sharedPrefixInputProjection(envelope,prepared.pages,writer.fanout.shared_prefix);
    assert(isDeepStrictEqual(projection.common.common_task,expectedCommon),'Engine altered the shared original request');
    const common=await prepareHostMainContext({directory:join(temporaryRoot,'common-context'),envelope:{...envelope,inputs:projection.common}});
    const manifest=JSON.parse(await readFile(common.preparation_path,'utf8'));
    const commonInput=manifest.inputs.find(input=>input.name==='common_task');
    assert.equal(commonInput.delivery,'file','Long originals must use complete file delivery rather than clipping');
    const compiledCommon=JSON.parse(common.prompt.split('\nInputs:\n')[1]);
    assert(compiledCommon.common_task.includes(JSON.stringify(commonInput.path)),'Shared prompt omitted the usable address of its full input');
    assert(isDeepStrictEqual(JSON.parse(await readFile(commonInput.path,'utf8')),expectedCommon),'Common materialized input lost content');
    const small={request:'SHARED-EXACT: retain condition C, example D and exception E.'};
    const inline=await prepareHostMainContext({directory:join(temporaryRoot,'inline-common-context'),envelope:{...envelope,inputs:{common_task:small}}});
    assert(inline.prompt.includes(JSON.stringify(small.request)),'Short common original was omitted from the shared prompt');
    for(const [index,inputs] of projection.items.entries()){
      assert(!Object.hasOwn(inputs,'common_task'),'Shared task was copied into every item');
      const item=await prepareHostMainContext({directory:join(temporaryRoot,'item-context-'+index),envelope:{...envelope,prompt_template:'',inputs}});
      assert(item.prompt.includes(pages[index].request),'Assigned original request missing from actual compiled context');
      assert(!item.prompt.includes(pages[1-index].request),'Sibling request reached the worker context');
      assert.deepEqual(inputs.pages[0].original_page,pages[index]);
    }
    console.log('PASS actual engine shared-prefix projection and compiled worker context; long common input delivered whole, individual tasks stay isolated');
  }

  // Cover the changed checker projection and join using the original renderer,
  // without model calls, browsing, TTS or an experiment rerun.
  const {renderWorkerProposal}=await import(pathToFileURL(adapter('worker-render.mjs')).href);
  const {observeBatch}=await import(pathToFileURL(adapter('batch-pages.mjs')).href);
  const markdown='---\ntitle: Transfer regression fixture\nlang: en\n---\n\n## Mechanism\nKeep the original request.\n\n## Conditions\nKeep the supplied conditions.\n\n## Example\nKeep the supplied example.\n';
  const results=[];
  for(const page of prepared.pages){
    const result={markdown};
    const check=await renderWorkerProposal({inputs:{manifest:prepared.manifest,pages:[page]},output:result},{workspace:resolve(temporaryRoot,page.workspace)});
    assert.equal(check.complete,true);
    results.push(result);
  }
  const observed=await observeBatch({manifest:prepared.manifest,results},assets,temporaryRoot);
  assert.equal(observed.observed_valid,true);
  assert.equal(observed.semantic_products.length,2);
  assert(observed.semantic_products.every(product=>product.semantic_source.text===markdown),'Rendered manuscript changed in transit');
  console.log('PASS original rendering, changed completion projection and batch join preserve the supplied manuscript');

  // A free-form request still reaches every branch verbatim; inferred plans are
  // supplementary assignments and cannot replace the user's original prose.
  const freeform='FREEFORM-BEGIN\nCreate two pages; both must retain the following caveat: EXCEPTION-Z.\nFREEFORM-END';
  const inferred=await prepareBatch({task:freeform,mode:'page_batch',batch_context:'incomplete',pages:[{request:'inferred A'},{request:'inferred B'}]},assets,temporaryRoot);
  assert.deepEqual(inferred.common_task,{request:freeform});
  assert.deepEqual(inferred.pages.map(page=>page.original_page),[{request:'inferred A'},{request:'inferred B'}]);
  console.log('PASS original common and per-page requirements survive the actual shipped adapter; shared-prefix binding, scoped assignments, nested data, long input and free-form requests');
} finally {
  assert(dirname(temporaryRoot)===resolve(tmpdir())&&temporaryRoot.includes('html-requirement-transfer-'),'Invalid cleanup target');
  await rm(temporaryRoot,{recursive:true});
}
