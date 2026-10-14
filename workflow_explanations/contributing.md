# Contributing packages

[中文](contributing.zh-CN.md) · [Index](README.md)

Reusable packages are welcome. Submit a pull request with the exported `*.workflow-package.json` under its platform directory and all usage notes under `workflow_explanations/`. Keep upstream attribution and license notices, describe dependencies and intended tasks, and add a catalogue entry for Codex packages. Run `node scripts/check-packages.mjs`.

Examples and comparison results are optional. Report cost/time honestly and provide outputs for readers to compare quality. Keep credentials, machine paths, conversations and development logs out of submissions.

Gallery previews and full-page links use the measured artifact paths and content hashes in `results.json`. Update both when replacing an output; preserve the original HTML bytes. Run `node scripts/check-gallery-artifacts.mjs` and `node scripts/build-gallery.mjs` for gallery changes. Check a direct link with a non-default topic in the browser, since the initial preview must match the selected topic on both sides. The build versions JavaScript and CSS by content to avoid stale assets after deployment.
