import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const path = process.argv[2] ?? 'codex/answer-me-with-html/answer-me-with-html.workflow-package.json';
const bundle = JSON.parse(await readFile(resolve(path), 'utf8'));
const reference = 'workflow-assets/host-adapter/format-reference.md';
const resource = bundle.snapshot.resources.find(item => item.path === reference);
assert(resource, 'HTML writing reference must exist');
const object = bundle.objects.find(item => item.sha256 === resource.sha256);
const text = Buffer.from(object.content_base64, 'base64').toString('utf8');
assert.match(text, /Task scope:/, 'HTML production lacks a persistent task/research boundary');
assert.match(text, /Do not search or open external pages merely/, 'Optional research must not become a default production phase');
assert.match(text, /user requests sources or browsing/, 'Explicit research requests must retain tools');
assert.match(text, /current or version-specific facts/, 'Time-sensitive facts must remain verifiable');
assert.match(text, /concrete uncertainty/, 'Material factual uncertainty must remain investigable');
assert.match(text, /Preserve all requested content, useful depth, original tools and renderer repairs/, 'Task scope must not reduce work or remove tools');
assert.doesNotMatch(text, /short complete draft|keep the complete draft concise/, 'Converter-added content compression must not return');
for (const id of ['activity_011', 'batch_pages']) {
  const node = bundle.snapshot.workflow.nodes.find(item => item.id === id);
  assert(node?.resources.includes(reference), `${id}: research boundary must reach the actual writer`);
}
console.log('PASS persistent HTML task scope: both writers receive the boundary; genuine research and original production remain available');

const sourceText = name => Buffer.from(bundle.objects.find(item => item.path === name).content_base64, 'base64').toString('utf8');
const moduleFrom = text => import('data:text/javascript;base64,' + Buffer.from(text).toString('base64'));
const {declaredPageRoute} = await moduleFrom(sourceText('workflow-assets/host-adapter/declared-page-route.mjs'));
const {validateRouteDecision} = await moduleFrom(sourceText('workflow-assets/host-adapter/render-contract.mjs'));
const plan = {pages:[{request:'Explain one concept',output:'one.html'},{request:'Explain another concept',output:'two.html'}],batch_context:'Write in English'};
assert.equal(declaredPageRoute(plan,validateRouteDecision).resolved,true);
assert.equal(declaredPageRoute({...plan,mp4:true},validateRouteDecision).resolved,false);
assert.equal(declaredPageRoute({request:'Make two pages'},validateRouteDecision).resolved,false);
assert.equal(declaredPageRoute({pages:plan.pages},validateRouteDecision).resolved,false);
assert.throws(() => declaredPageRoute({...plan,pages:[]},validateRouteDecision));
const main = bundle.snapshot.workflow.nodes.find(item => item.id === 'main_acceptance');
assert(!main.resources.includes(reference),'Semantic acceptance must not replay the producer rendering guide');
assert.deepEqual(main.input_bindings.mode.coalesce,['/nodes/declared_page_route/output/decision/mode','/nodes/activity_001/output/mode']);
assert.deepEqual(bundle.snapshot.workflow.nodes.find(item => item.id === 'final').input_bindings.route_decision.coalesce,
  ['/nodes/declared_page_route/output/decision','/nodes/activity_001/output']);
console.log('PASS explicit plan binding and free-form Main route; acceptance retains full content without producer guide replay');

assert.doesNotMatch(text,/always[-_]on/,'Explicit Workflow invocation must not inherit ambient activation or small-page rules');
for(const node of bundle.snapshot.workflow.nodes) {
  assert(!/always[-_]on|\bbehavior\b/.test(JSON.stringify(node)),`${node.id}: obsolete activation must not reach a runtime node`);
}
for(const tool of bundle.snapshot.workflow.host_tools) {
  assert(!/always[-_]on|\bbehavior\b/.test(JSON.stringify([tool.input_schema,tool.output_schema])),`${tool.id}: obsolete activation must not remain in Host interfaces`);
}
const {resolveRenderContract,ROUTE_OUTPUT_SCHEMA}=await moduleFrom(sourceText('workflow-assets/host-adapter/render-contract.mjs'));
assert(!Object.hasOwn(ROUTE_OUTPUT_SCHEMA.properties,'behavior'));
const renderSelection={destination:{},opening:'inherit',overrides:{},panel:{}};
for(const opening of ['open','no_open']) {
  assert.equal(resolveRenderContract({task:{opening},mode:'page',render_selection:renderSelection,home:'.answer-me-with-html'}).opening,opening);
}
assert.deepEqual(Object.keys(declaredPageRoute(plan,validateRouteDecision).decision).sort(),['batch_context','mode','options','render_selection','selection']);
console.log('PASS explicit Workflow route: no ambient activation field, complexity-based writer planning, original opening settings retained');
