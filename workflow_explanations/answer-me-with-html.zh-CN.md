# Answer me with HTML

[English](answer-me-with-html.md) · [下载 Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [对照结果](experiments/results.zh-CN.md)

转化自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html)，保留[原 Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md)及 [MIT 许可证](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt)来源。保留结构化 Markdown、单文件 HTML、配音视频、配置、清理和更新路线，以及原有运行工具。

Main 选择请求路线并做语义验收；Host 工具执行原有渲染／写作检查与产物交付。独立网页支持批量路线。此包的已测制作路线使用临时 Main worker，这是这个包的编辑选择，不代表生成工作流的默认设置。

HTML 写作节点用已有材料和知识完成一般概念讲解。只有用户要求来源、内容依赖当前或特定版本信息，或存在影响结论的事实不确定性时，才进行外部调查。这一任务边界写在单页和批量制作共用的写作参考中，不移除工具，也不限制内容深度。

结构化输入已明确提供独立网页请求及共同要求时，Host 直接绑定该计划；自由文本或混合路线请求仍由 Main 判断。Main 验收完整稿件和诊断，不重复读取制作节点的渲染语法指南。

视频支持新稿件、已有配音／播放器资产、MP4 导出，以及仅重写文本。已有音频可复用，无需调用语音服务。新配音使用接收端配置的 Provider 与凭据。需要 Node.js 20+ 及所选媒体路线依赖。

请求示例：用 HTML 图解 TCP；一次制作三个独立讲解网页；用已有稿件和英文配音制作视频；仅重写稿件。可查看[六个 HTML 成品](examples/html/index.html)和[带双语字幕的视频 A/B](examples/video/comparison.html)。

包内含 36 个节点、76 个运行资源和 CLI 0.4.7。对照结果来自此前制作样本，不代表新付费配音或后续每项包改动都已得到性能验证。
