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
