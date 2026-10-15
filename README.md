# Workflow Package

[中文](README.zh-CN.md) · [Codex Agents Workflow](https://github.com/TohmaN233/codex-agents-workflow) · [Project site](https://tgy233.top/tgypage/caw/)

Reusable Workflow packages, kept separate from their execution engines and default configuration.

**[See Skill vs Workflow in your browser →](https://tohman233.github.io/workflow-package/)** Compare interactive HTML outputs side by side, play the video examples, and explore the recorded time, token use and API-equivalent cost.

**The Workflow itself is a `*.workflow-package.json` file.** All usage notes, comparisons and output examples live in [workflow_explanations](workflow_explanations/README.md).

New [0.5.2 fresh-conversation single-page comparison](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=en): explore ER diagrams, real source, offline formulas and feedback. Isolating tasks within long chats and parallelizing independent stages are important use cases; measurements and cache/coordination limitations are explained at the end of the gallery.

| Platform | Workflow | Download | Explanation |
| --- | --- | --- | --- |
| Codex | Answer me with HTML | [Package JSON](codex/answer-me-with-html/answer-me-with-html.workflow-package.json) | [HTML diagrams, batch pages, video and asset reuse](workflow_explanations/answer-me-with-html.md) |
| Codex | GitHub README generator | [Package JSON](codex/github-readme-generator/github-readme-generator.workflow-package.json) | [Write, update and organize repository documentation in the requested languages](workflow_explanations/github-readme-generator.md) |
| Pi | Answer me with HTML | [Package JSON](pi/answer-me-with-html/answer-me-with-html.pi-caw.json) | [Pi setup, pi-web visualization and three-page outputs](workflow_explanations/answer-me-with-html-pi.md) |

Install [Codex Agents Workflow 1.2.2](https://github.com/TohmaN233/codex-agents-workflow), open its workbench, choose **Install Workflow**, and select a downloaded package JSON. See the [LLM-executable installation and dependency procedure](workflow_explanations/install.md).

The [comparison results and examples](workflow_explanations/experiments/results.md) cover HTML and video. The README package has personal extensions and functional checks, with no Skill-versus-Workflow benchmark. Contributions of reusable packages are welcome; see [how to contribute](workflow_explanations/contributing.md).

The HTML/video package uses Main workers primarily to make comparisons with the original Skill easier; production nodes can also use subagents with lower-cost models, while Main handles orchestration and acceptance.

Original Skills are credited in the explanations; their license notices stay beside the packages and inside the bundles. Repository-authored documentation is [MIT licensed](LICENSE).

Current packages: Codex HTML 1.1.5, README 1.0.1 and Pi HTML 1.0.0. The batch gallery shows the accepted same-source 0.5.3 Skill/Codex pair and a separate Pi three-page delivery; Pi is compared by output only.
