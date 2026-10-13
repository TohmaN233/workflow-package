# Workflow 说明

[English](README.md) · [安装包下载](../README.zh-CN.md)

这里统一保存安装包说明、对照结果和产物样例。导入首页链接的 JSON；此目录中的文件用于说明和展示。

- [LLM 安装步骤：依赖、导入与验收](install.zh-CN.md)
- [安装与平台](platforms.zh-CN.md)
- [Answer me with HTML](answer-me-with-html.zh-CN.md)
- [GitHub README generator](github-readme-generator.zh-CN.md)
- [最终对照结果](experiments/results.zh-CN.md)
- [在线对照展示：产物与实验数据](https://tohman233.github.io/workflow-package/)
- [六个可直接查看的 HTML 样例](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/)
- [视频 A/B：英文配音、英中双语字幕](https://tohman233.github.io/workflow-package/workflow_explanations/examples/video/comparison.html)
- [贡献安装包](contributing.zh-CN.md)

静态展示页与这些说明读取[同一份结果 JSON](experiments/results.json)，直接发布已有样例，不重新生成产物，支持中英切换。本地预览：在仓库根目录运行 `node scripts/build-gallery.mjs`，用静态 HTTP 服务打开 `_site` 首页。`.github/workflows/pages.yml` 从 `main` 构建并发布到 GitHub Pages，安装包 JSON 仍在仓库中维护。
