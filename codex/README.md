# Codex packages

[中文](README.zh-CN.md) · [Catalogue](../README.md)

Requires [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow) and the package's configured dependencies.

| Package | Download | Evidence |
| --- | --- | --- |
| [Answer me with HTML](answer-me-with-html/README.md) | [JSON](https://raw.githubusercontent.com/TohmaN233/workflow-package/main/codex/answer-me-with-html/answer-me-with-html.workflow-package.json) | [Three comparisons](answer-me-with-html/experiments/README.md) |
| [GitHub README generator](github-readme-generator/README.md) | [JSON](https://raw.githubusercontent.com/TohmaN233/workflow-package/main/codex/github-readme-generator/github-readme-generator.workflow-package.json) | [Changes and functional qualification](github-readme-generator/README.md) |

In the workbench, choose **Install Workflow** and select the downloaded JSON. The same files can be installed through `workflow_install_workflow_package` using `package_path` or their HTTPS URLs. [catalog.json](catalog.json) records package and file digests; the optional remote `expected_sha256` is the **file** digest. Package versions are separate from the plugin release version.

Install dependencies through the workbench's dependency setup before starting a Run. Providers and local executables are configured on the receiving host; credentials, machine paths, user configuration and experiment conversations are not distributed here. Existing same-ID Workflows require the installer's explicit conflict resolution; installation does not silently overwrite them.
