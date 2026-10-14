# Answer me with HTML

[English](answer-me-with-html.md) · [下载 Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [对照结果](experiments/results.zh-CN.md)

转化自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html)，保留[原 Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md)及 [MIT 许可证](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt)来源。保留结构化 Markdown、单文件 HTML、配音视频、配置、清理和更新路线，以及原有运行工具。

Main 选择请求路线并做语义验收；Host 工具执行原有渲染／写作检查与产物交付。独立网页支持并行批量路线，制作使用临时 Main worker。

HTML 写作节点用已有材料和知识完成一般概念讲解。只有用户要求来源、内容依赖当前或特定版本信息，或存在影响结论的事实不确定性时，才进行外部调查。这一任务边界写在单页和批量制作共用的写作参考中，不移除工具，也不限制内容深度。

结构化输入已明确提供独立网页请求及共同要求时，Host 直接绑定该计划；自由文本或混合路线请求仍由 Main 判断。Main 验收完整稿件和诊断，不重复读取制作节点的渲染语法指南。

视频支持新稿件、已有配音／播放器资产、MP4 或 WebM 导出，以及仅重写文本。已有音频可复用，无需调用语音服务。新配音使用接收端配置的 Provider 与凭据，也支持明确选中的本地 OpenAI 兼容语音服务。两种视频文件导出都需要 Node.js 22+ 和 Chrome，只有 MP4 需要 FFmpeg；HTML 和播放器页面需要 Node.js 20+。

请求示例：用 HTML 图解 TCP；一次制作三个独立讲解网页；用已有稿件和英文配音制作视频；仅重写稿件。可查看[六个 HTML 成品](examples/html/index.html)和[带双语字幕的视频 A/B](examples/video/comparison.html)。

包内含 **41 个节点、140 个运行资源**，以及上游原样打包的 [CLI 0.5.3](https://github.com/QingYunA/answer-me-with-html/tree/v0.5.3)。保留 ER 图、结构变更、决策与 Reply/Remark 反馈、源码与图片、离线公式、自动／paper／用户主题、多语言与 RTL、WebM 导出、成功重试替换和 DSH 更新。0.5.3 增加主题目录的安装／列表／更新／移除、comic／manga／pop 主题支持、图示样式参数、内置漫画字体、Reply 控件改进和 `close_after_reply`。Main worker 节点与路线保持不变；现有配置 Host 调用原主题 CLI，并保留覆盖自定义主题需要用户同意的条件。

上游元描述鼓励的使用范围比正文决策节更宽。本次保留正文的具体路由规则，以及视频必须明确请求的条件。服务器仍由用户启动；只有接收端实际提供 DSH present 工具时，才调用它呈现产物。

安装包 **1.1.2** 分发上游 0.5.3，配套 CAW **1.2.2**。十项实际原 CLI／Host 配置检查通过；上游配置／主题／Reply 测试为 46 项通过、9 项依赖浏览器而跳过。此次更新没有调用模型或付费配音。已有[单页实验](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=zh-CN)和新增的 [Luna/max 三页对照](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#batch?lang=zh-CN)保留原来的 0.5.2 渲染器与实测产物；三页样本输入减少 44.92%、耗时减少 22.48%，Standard API 等价成本增加 25.88%。历史样本不冒充 0.5.3 性能，实际测试版本与当前分发包分别记录。

## 适用范围与局限性

缓存命中与 LLM 随机性可能使某次 Workflow 的成本或耗时高于 Skill；过细的节点划分和串行交接也会累积机械开销。不过，在长聊天中隔离网页制作所需材料，以及在复杂任务中并行独立阶段，更有发挥工作流价值的空间。本轮新会话单页数据没有测量长聊天收益，不能据此给出节省比例。
