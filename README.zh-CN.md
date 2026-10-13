# Workflow Package

[English](README.md) · [Codex Agents Workflow](https://github.com/TohmaN233/codex-agents-workflow) · [项目主页](https://tgy233.top/tgypage/caw/)

可复用的 Workflow 安装包，与执行引擎和默认配置分开维护。

**Workflow 本体是 `*.workflow-package.json` 文件。** 使用说明、对照结果和产物样例统一放在 [workflow_explanations](workflow_explanations/README.zh-CN.md)。

| 平台 | Workflow | 下载 | 说明 |
| --- | --- | --- | --- |
| Codex | Answer me with HTML | [安装包 JSON](codex/answer-me-with-html/answer-me-with-html.workflow-package.json) | [HTML 图解、批量网页、视频与资产复用](workflow_explanations/answer-me-with-html.zh-CN.md) |
| Codex | GitHub README generator | [安装包 JSON](codex/github-readme-generator/github-readme-generator.workflow-package.json) | [README 与可选的多语言仓库文档](workflow_explanations/github-readme-generator.zh-CN.md) |
| Pi | 暂无安装包 | — | [平台说明](workflow_explanations/platforms.zh-CN.md) |

安装 [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow)，打开工作台，选择 **安装 Workflow**，再打开下载的安装包 JSON。详见[安装与依赖](workflow_explanations/platforms.zh-CN.md)。

[对照结果和样例](workflow_explanations/experiments/results.zh-CN.md)覆盖 HTML 与视频；README 包只有个人扩展和功能验证，没有 Skill／Workflow 性能实验。欢迎贡献通用工作流包，见[贡献说明](workflow_explanations/contributing.zh-CN.md)。

HTML／视频包使用 Main worker，主要是为了便于和原 Skill 做对照实验；制作节点也可以改用 subagent 并选择更便宜的模型，Main 负责调度与验收。

说明中保留原 Skill 来源；原许可证放在安装包旁，并保留在包内。本仓库自写文档采用 [MIT 许可证](LICENSE)。
