# Installation and platforms

[中文](platforms.zh-CN.md) · [Index](README.md)

Codex packages require [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow). In the workbench, choose **Install Workflow** and select the downloaded `*.workflow-package.json`. The `workflow_install_workflow_package` tool also accepts `package_path` or an HTTPS URL.

[codex/catalog.json](../codex/catalog.json) records file/package integrity and dependencies. The remote installer's optional `expected_sha256` is the file digest. Package versions are separate from the engine release.

Before launch, complete dependency setup in the workbench. Answer me with HTML requires Node.js 20+ and the selected media route's dependencies; the README generator requires the enabled `native-luna` Provider. Speech credentials and local Provider configuration belong to the receiving host. Importing a package does not make speech requests. Resolve same-ID conflicts through the installer.

`pi/` is reserved for future Pi packages. No Pi implementation is published yet; Codex packages cannot be imported into Pi as-is.
