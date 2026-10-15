# Workflow explanations

[中文](README.zh-CN.md) · [Package downloads](../README.md)

This is the common home for package instructions, comparisons and examples. Import the JSON linked from the repository homepage; the files here are documentation and produced examples.

- [Installation procedure for an LLM: dependencies, import and verification](install.md)
- [Installation and platforms](platforms.md)
- [Answer me with HTML](answer-me-with-html.md)
- [Answer me with HTML for Pi, including pi-web visualization](answer-me-with-html-pi.md)
- [GitHub README generator](github-readme-generator.md)
- [Final comparison results](experiments/results.md)
- [Live comparison gallery: outputs and recorded metrics](https://tohman233.github.io/workflow-package/)
- [Six rendered HTML examples](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/)
- [Video A/B, English audio and bilingual subtitles](https://tohman233.github.io/workflow-package/workflow_explanations/examples/video/comparison.html)
- [Contributing a package](contributing.md)

The static gallery reads [the same results JSON](experiments/results.json) as these notes and publishes existing examples without regenerating them. It supports English and Chinese. For a local preview, run `node scripts/build-gallery.mjs` at the repository root, serve `_site` with a static HTTP server, and open its homepage. `.github/workflows/pages.yml` deploys this build from `main` to GitHub Pages; package JSONs remain in the repository.
