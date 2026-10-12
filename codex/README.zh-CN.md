# Codex 工作流包

[English](README.md) · [总目录](../README.zh-CN.md)

需要 [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow)及对应包的依赖配置。

| 安装包 | 下载 | 证据 |
| --- | --- | --- |
| [Answer me with HTML](answer-me-with-html/README.zh-CN.md) | [JSON](https://raw.githubusercontent.com/TohmaN233/workflow-package/main/codex/answer-me-with-html/answer-me-with-html.workflow-package.json) | [三组对照](answer-me-with-html/experiments/README.zh-CN.md) |
| [GitHub README generator](github-readme-generator/README.zh-CN.md) | [JSON](https://raw.githubusercontent.com/TohmaN233/workflow-package/main/codex/github-readme-generator/github-readme-generator.workflow-package.json) | [改动与功能验证](github-readme-generator/README.zh-CN.md) |

在工作台选择 **安装 Workflow**，打开下载的 JSON。也可通过 `workflow_install_workflow_package` 的 `package_path` 或 HTTPS URL 安装。[catalog.json](catalog.json)提供包摘要与文件摘要；远程安装的可选 `expected_sha256` 使用**文件**摘要。安装包的版本与插件发布版本分别维护。

运行前通过工作台完成依赖设置。Provider 和本地程序由接收端配置；本仓库不分发凭据、本机路径、用户配置或实验会话。若已有同 ID 工作流，应按安装器提示处理冲突，不会静默覆盖。
