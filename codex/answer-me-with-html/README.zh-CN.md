# Answer me with HTML

[English](README.md) · [下载安装包](answer-me-with-html.workflow-package.json) · [实验对照](experiments/README.zh-CN.md)

转化自 [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html)。原 Skill 覆盖结构化 Markdown、单文件 HTML 图解、配音视频、配置、清理与更新。本包保留这些路线、原有运行工具及完整可移植运行资源；[上游 MIT 声明](UPSTREAM-LICENSE.txt)同时保存在目录和内嵌资源中。

发布修订：`7f1a372c03a0ce70dbd4218da10d965feed74dcd139dda7e1f8412043b46c093`。安装包含 34 个节点、75 份运行资源及内嵌的 0.4.7 CLI，不包含私有转换源 Skill 或实验答案。

Main 选择请求路线并做语义验收；声明的 Host 工具执行渲染、原有写作检查、指定产物观察与交付。经过实验的网页／视频制作路线保留配置好的临时 Main worker；多个独立网页可走显式批量路线。这是经过编辑的具体转化成果，不代表所有新生成工作流都采用同样的执行器布局。

视频路线可复用已有稿件、播放器 HTML 和配音；文本重写可以单独评估，不生成语音。新配音和 MP4 导出仍是可选择的原能力，由接收端提供语音配置及对应媒体依赖。安装包**不含语音凭据**，导入不会调用配音服务。需要 Node.js 20 或更高版本；工作台在执行前处理选中路线的媒体及运行依赖。

可用请求：用 HTML 图解 TCP；一次制作三个独立网页；用给定稿件和已有英文配音制作讲解视频；只重写视频讲解稿。

解释成本或速度前请阅读[实验说明](experiments/README.zh-CN.md)。已测修订早于最终发布修订；最终复用／文本实验没有证明新付费配音全线合格。
