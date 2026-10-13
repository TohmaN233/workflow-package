import assert from 'node:assert/strict';
import {cp, mkdir, readFile, readdir, rm, stat, writeFile} from 'node:fs/promises';
import {dirname, relative, resolve, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '_site');
// Only this fixed, generated directory can be replaced.
assert.equal(relative(root, output), '_site');
await rm(output, {recursive: true, force: true});
await mkdir(resolve(output, 'workflow_explanations/experiments'), {recursive: true});
for (const directory of ['gallery', 'examples']) {
  await cp(resolve(root, 'workflow_explanations', directory),
    resolve(output, 'workflow_explanations', directory), {recursive: true});
}
await cp(resolve(root, 'workflow_explanations/experiments/results.json'),
  resolve(output, 'workflow_explanations/experiments/results.json'));
await cp(resolve(root, 'LICENSE'), resolve(output, 'LICENSE'));
await cp(resolve(root, 'codex/answer-me-with-html/UPSTREAM-LICENSE.txt'),
  resolve(output, 'workflow_explanations/UPSTREAM-LICENSE.txt'));
await writeFile(resolve(output, '.nojekyll'), '');
await writeFile(resolve(output, 'index.html'), `<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="refresh" content="0;url=workflow_explanations/gallery/">
<title>Skill vs Workflow · Comparisons</title>
<a href="workflow_explanations/gallery/">Open the comparison gallery / 打开对照展示</a>
<script>location.replace('workflow_explanations/gallery/' + location.search + location.hash);</script></html>
`);

let files = 0, links = 0;
async function check(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) { await check(path); continue; }
    files++;
    if (!entry.name.endsWith('.html')) continue;
    const text = await readFile(path, 'utf8');
    for (const match of text.matchAll(/\b(?:href|src|poster)\s*=\s*["']([^"']+)["']/g)) {
      const url = match[1];
      if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(url)) continue;
      assert(!url.startsWith('/'), `Use portable relative URLs: ${url}`);
      const target = resolve(dirname(path), decodeURIComponent(url.split(/[?#]/)[0]));
      const local = relative(output, target);
      assert(local !== '..' && !local.startsWith('..' + sep), `Link outside site: ${url}`);
      const info = await stat(target);
      if (info.isDirectory()) await stat(resolve(target, 'index.html'));
      links++;
    }
  }
}
await check(output);
console.log(`PASS gallery build: ${files} files, ${links} local links; original examples copied unchanged`);
