# Answer me with HTML

[English](answer-me-with-html.md) · [下载 Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [对照结果](experiments/results.zh-CN.md)

转化自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html)，保留[原 Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md)及 [MIT 许可证](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt)来源。保留结构化 Markdown、单文件 HTML、配音视频、配置、清理和更新路线，以及原有运行工具。

Main 选择请求路线并做语义验收；Host 工具执行原有渲染／写作检查与产物交付。独立网页支持并行批量路线，制作使用临时 Main worker。

HTML 写作节点用已有材料和知识完成一般概念讲解。只有用户要求来源、内容依赖当前或特定版本信息，或存在影响结论的事实不确定性时，才进行外部调查。这一任务边界写在单页和批量制作共用的写作参考中，不移除工具，也不限制内容深度。

结构化输入已明确提供独立网页请求及共同要求时，Host 直接绑定该计划；自由文本或混合路线请求仍由 Main 判断。Main 验收完整稿件和诊断，不重复读取制作节点的渲染语法指南。

批量传递保留原文：Host 将原始任务中除 `pages` 外的全部字段作为 `common_task` 送入共享前缀，每页完整原始对象作为 `original_page` 只交给对应 worker。自由文本总请求同样完整保留；Main 提取的 `batch_context` 仅作补充，不能替代或缩减原始要求。长输入使用完整文件交付，不截断。原始稿件经过渲染和汇合后仍须保持一致；内容是否充分由 Main 依据完整原始请求做语义验收。

显式启动 Workflow 已确定要制作产物，不再判断环境里的 Skill 是否应自动触发。路由、Host 接口和制作节点已移除 `always_on`／`behavior`；网页根据任务复杂度规划内容，短问题也可能需要完整的技术讲解。验收检查机制、适用条件和必要子问题，不把字数、面板数或渲染成功当作内容覆盖。原有工具和 STE 修正流程保持完整，没有新增 Host 内容校验。

视频支持新稿件、已有配音／播放器资产、MP4 或 WebM 导出，以及仅重写文本。已有音频可复用，无需调用语音服务。新配音使用接收端配置的 Provider 与凭据，也支持明确选中的本地 OpenAI 兼容语音服务。两种视频文件导出都需要 Node.js 22+ 和 Chrome，只有 MP4 需要 FFmpeg；HTML 和播放器页面需要 Node.js 20+。

请求示例：用 HTML 图解 TCP；一次制作三个独立讲解网页；用已有稿件和英文配音制作视频；仅重写稿件。可查看[六个 HTML 成品](examples/html/index.html)和[带双语字幕的视频 A/B](examples/video/comparison.html)。

包内含 **41 个节点、141 个运行资源**，以及上游原样打包的 [CLI 0.5.3](https://github.com/QingYunA/answer-me-with-html/tree/v0.5.3)。保留 ER 图、结构变更、决策与 Reply/Remark 反馈、源码与图片、离线公式、自动／paper／用户主题、多语言与 RTL、WebM 导出、成功重试替换和 DSH 更新。0.5.3 增加主题目录的安装／列表／更新／移除、comic／manga／pop 主题支持、图示样式参数、内置漫画字体、Reply 控件改进和 `close_after_reply`。Main worker 节点与路线保持不变；现有配置 Host 调用原主题 CLI，并保留覆盖自定义主题需要用户同意的条件。

视频和文件导出仍须明确请求；配置、清理、更新、已有资产复用和局部修改保留各自路线。服务器仍由用户启动；只有接收端实际提供 DSH present 工具时，才调用它呈现产物。

安装包 **1.1.5** 分发上游 0.5.3，配套 CAW **1.2.2**。本次发布与已验收的同版本 Luna/max 三页实验使用相同的 Workflow revision，保留完整原始输入、原有工具与共享前缀制作。与 Skill 相比，该样本输入减少 61.59%、耗时减少 30.46%，API 等价成本增加 0.90%；质量复核未发现实质性回归，但可选细节和布局不同，单一样本不代表普遍保证。见[三页对比](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#batch?lang=zh-CN)。[Pi 版本](answer-me-with-html-pi.zh-CN.md)也已提供安装包、前端可视化截图和三页成品，仅作产物对比；[历史单页实验](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=zh-CN)保留原数据。

## 适用范围与局限性

缓存命中与 LLM 随机性可能使某次 Workflow 的成本或耗时高于 Skill；过细的节点划分和串行交接也会累积机械开销。不过，在长聊天中隔离网页制作所需材料，以及在复杂任务中并行独立阶段，更有发挥工作流价值的空间。本轮新会话单页数据没有测量长聊天收益，不能据此给出节省比例。
