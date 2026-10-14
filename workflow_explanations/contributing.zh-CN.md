# 贡献安装包

[English](contributing.md) · [说明索引](README.zh-CN.md)

欢迎提交通用工作流包。通过 PR 将导出的 `*.workflow-package.json` 放进对应平台目录，使用说明统一放到 `workflow_explanations/`。保留原来源与许可证，说明依赖和适用任务；Codex 包增加目录条目，并运行 `node scripts/check-packages.mjs`。

产物样例与对照结果可选。请如实报告成本／耗时，提供成品供读者自行比较质量。不要提交凭据、本机路径、会话或开发日志。

展示页的预览与完整页面链接从 `results.json` 读取实测产物路径和内容摘要。替换产物时同步更新这两项，HTML 保留原始字节。修改展示页后运行 `node scripts/check-gallery-artifacts.mjs` 和 `node scripts/build-gallery.mjs`，并在浏览器打开一个指定非默认主题的直达链接，核对两侧初始内容都对应选中主题。构建会按内容为 JavaScript 和 CSS 添加版本，避免部署后沿用旧资源。
