# Workflow Package

[中文](README.zh-CN.md) · [Codex Agents Workflow](https://github.com/TohmaN233/codex-agents-workflow) · [Project site](https://tgy233.top/tgypage/caw/)

Reusable Workflow packages, kept separate from their execution engines and default configuration.

**[See Skill vs Workflow in your browser →](https://tohman233.github.io/workflow-package/)** Compare six interactive HTML outputs side by side, play the video examples, and explore the recorded time, token use and API-equivalent cost. The gallery includes single-page results where Workflow has no consistent advantage.

**The Workflow itself is a `*.workflow-package.json` file.** All usage notes, comparisons and output examples live in [workflow_explanations](workflow_explanations/README.md).

New [0.5.2 fresh-conversation single-page comparison](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=en): fewer input tokens, higher cost and time, with Main/worker cost and phase timing. Isolating unrelated history in a long chat is an important use case, not measured in this trial.

| Platform | Workflow | Download | Explanation |
| --- | --- | --- | --- |
| Codex | Answer me with HTML | [Package JSON](codex/answer-me-with-html/answer-me-with-html.workflow-package.json) | [HTML diagrams, batch pages, video and asset reuse](workflow_explanations/answer-me-with-html.md) |
| Codex | GitHub README generator | [Package JSON](codex/github-readme-generator/github-readme-generator.workflow-package.json) | [README and optional multilingual repository documentation](workflow_explanations/github-readme-generator.md) |
| Pi | No package yet | — | [Platform status](workflow_explanations/platforms.md) |

Install [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow), open its workbench, choose **Install Workflow**, and select a downloaded package JSON. See the [LLM-executable installation and dependency procedure](workflow_explanations/install.md).

The [comparison results and examples](workflow_explanations/experiments/results.md) cover HTML and video. The README package has personal extensions and functional checks, with no Skill-versus-Workflow benchmark. Contributions of reusable packages are welcome; see [how to contribute](workflow_explanations/contributing.md).

The HTML/video package uses Main workers primarily to make comparisons with the original Skill easier; production nodes can also use subagents with lower-cost models, while Main handles orchestration and acceptance.

Original Skills are credited in the explanations; their license notices stay beside the packages and inside the bundles. Repository-authored documentation is [MIT licensed](LICENSE).
