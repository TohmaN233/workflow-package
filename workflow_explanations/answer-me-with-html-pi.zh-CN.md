# Pi 版 Answer me with HTML

[English](answer-me-with-html-pi.md) · [下载 Pi 安装包](../pi/answer-me-with-html/answer-me-with-html.pi-caw.json) · [三网页对比](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#batch?lang=zh-CN)

Pi 版 Answer me with HTML 运行在 [pi-CAW](https://github.com/TohmaN233/pi-CAW) 中。安装包 **1.0.0** 包含上游 v0.5.3 的渲染器、参考资料和 Host 适配器，共 **41 个节点、141 项资源**。它由转换自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) 的 Codex Workflow 适配而来，保留[原始 MIT 许可说明](../pi/answer-me-with-html/UPSTREAM-LICENSE.txt)。

发起会话负责主线编排和语义验收，制作 Main worker 使用独立上下文，互不依赖的网页可以并行制作。Host 工具负责准备输入、调用已有渲染器和收集产物。图中保留 HTML、视频、已有配音复用、文本重写、配置、清理和更新路线。

## 安装

1. 使用具备已验证能力的 pi-CAW Host：本包在**本地构建 0.5.10**、Node.js **22.19+** 和兼容 Pi SDK 上验证。这个引擎构建尚未公开发布；公开仓库目前标为 0.3.1，未通过本包验收。接收端若只有该公开旧版，应先报告缺少兼容引擎，不要试跑 Run。引擎基础安装方式见[安装说明](https://github.com/TohmaN233/pi-CAW#installation)。
2. 下载上方 Pi JSON，通过 pi-CAW 的 **安装 Workflow** 操作导入。[pi/catalog.json](../pi/catalog.json) 记录准确 revision、依赖和文件摘要。包内已有渲染器，无须另外安装原始 Skill。
3. Main 继承发起 Pi 会话的模型与思考档位；若存在显式子模型槽位，在 Workflow 的 **Models** 页配置，并在接收机器上补齐所选路线的依赖。
4. 普通 HTML 使用引擎已有 Node 即可。影片导出另需兼容 Chrome 的浏览器，MP4 还需要 FFmpeg；新配音使用接收机器自己的 TTS 配置。导入安装包不会发起配音请求。

Pi 安装应使用 Pi 自身的接口，不要替换成 Codex 引擎的 MCP 命令。另见[平台配置](platforms.zh-CN.md)和[共用依赖说明](install.zh-CN.md)。

## 基于 pi-web 的前端可视化

在作者自己使用的、基于 pi-web 的前端里，pi-CAW 搭配了完整的工作流可视化。下图可以查看节点完成进度、选中的并行制作节点、独立 worker 会话，以及对应的工具调用和回复。截图展示的是这套前端集成；其他 Pi Host 的呈现方式可能不同。

![作者基于 pi-web 的前端中的工作流可视化：节点进度、并行制作、独立会话与工具执行记录](images/pi-workflow-visualization.png)

## 成品对比

展示页已加入本次提供的 Pi 版 [TCP](examples/html/tcp-pi.html)、[Redis / Memcached](examples/html/cache-pi.html) 和 [Git merge / rebase](examples/html/git-pi.html)，可与原始 Skill、Codex Workflow 的产物一起查看。三份 Pi HTML 均按原字节复制。这是另一次运行的成品对比，不包含 Pi 的 token、成本或耗时比较。
