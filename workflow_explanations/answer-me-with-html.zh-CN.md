# Answer me with HTML

[English](answer-me-with-html.md) · [下载 Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [对照结果](experiments/results.zh-CN.md)

转化自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html)，保留[原 Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md)及 [MIT 许可证](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt)来源。保留结构化 Markdown、单文件 HTML、配音视频、配置、清理和更新路线，以及原有运行工具。

Main 选择请求路线并做语义验收；Host 工具执行原有渲染／写作检查与产物交付。独立网页支持并行批量路线，制作使用临时 Main worker。

HTML 写作节点用已有材料和知识完成一般概念讲解。只有用户要求来源、内容依赖当前或特定版本信息，或存在影响结论的事实不确定性时，才进行外部调查。这一任务边界写在单页和批量制作共用的写作参考中，不移除工具，也不限制内容深度。

结构化输入已明确提供独立网页请求及共同要求时，Host 直接绑定该计划；自由文本或混合路线请求仍由 Main 判断。Main 验收完整稿件和诊断，不重复读取制作节点的渲染语法指南。

视频支持新稿件、已有配音／播放器资产、MP4 或 WebM 导出，以及仅重写文本。已有音频可复用，无需调用语音服务。新配音使用接收端配置的 Provider 与凭据，也支持明确选中的本地 OpenAI 兼容语音服务。两种视频文件导出都需要 Node.js 22+ 和 Chrome，只有 MP4 需要 FFmpeg；HTML 和播放器页面需要 Node.js 20+。

请求示例：用 HTML 图解 TCP；一次制作三个独立讲解网页；用已有稿件和英文配音制作视频；仅重写稿件。可查看[六个 HTML 成品](examples/html/index.html)和[带双语字幕的视频 A/B](examples/video/comparison.html)。

包内含 41 个节点、130 个运行资源，以及上游原样打包的 [CLI 0.5.2](https://github.com/QingYunA/answer-me-with-html/tree/v0.5.2)。新增 ER 图、结构变更标记、决策与 Reply/Remark 反馈、真实代码和图片引用、离线数学公式、自动／paper／用户主题、多语言与 RTL 页面，以及 WebM 导出。成功页面重试时会替换上一份产物。原安装方式更新路线增加了 DSH。

上游元描述鼓励的使用范围比正文决策节更宽。本次保留正文的具体路由规则，以及视频必须明确请求的条件。服务器仍由用户启动；只有接收端实际提供 DSH present 工具时，才调用它呈现产物。

安装包 **1.1.1** 导出 0.5.2 单页试验实际使用的修订，业务节点和全部运行资源与 1.1.0 保持一致。新增[实测与并排产物](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=zh-CN)：输入减少 5.57%，成本增加 21.92%，耗时增加 39.47%。本路线只有一个制作 worker。隔离更有价值的长聊天场景未在本轮测量，Main 仍携带自己的会话。旧 0.4.7 网页与视频数据保留为历史证据，不代表当前包的性能；0.5.2 也经过真实无语音 MP4／WebM 导出检查，没有购买新配音。

## 适用范围与局限性

缓存命中与 LLM 随机性可能使某次 Workflow 的成本或耗时高于 Skill；过细的节点划分和串行交接也会累积机械开销。不过，在长聊天中隔离网页制作所需材料，以及在复杂任务中并行独立阶段，更有发挥工作流价值的空间。本轮新会话单页数据没有测量长聊天收益，不能据此给出节省比例。
