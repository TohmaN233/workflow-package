# Skill 与 Workflow 对照

当前分发版本：HTML 包 1.1.3、上游 0.5.3、CAW 1.2.2。三页 Workflow 样本已更新为本次内容修订后的实际产物与计量；固定 Skill、历史单页和视频样本保持原记录。不同源版本分别标明。

[English](results.md) · [Workflow 安装包](../answer-me-with-html.zh-CN.md) · [数据](results.json) · [原 Skill](https://github.com/QingYunA/answer-me-with-html)

**[打开在线对照展示](https://tohman233.github.io/workflow-package/)**，直接查看 HTML 产物、视频样例与这些实验数据。

质量请自行对比下方 Skill 和 Workflow 产出的 HTML 与视频。两者均使用 LLM，输出具有随机性。

## 0.5.2：新会话制作一个网页

2026-10-14，双方均为 gpt-6.1-sol/high、上游 **0.5.2**，在独立的新会话中使用相同事实与源码输入。Skill 为固定样本，Workflow 完成工程预检后运行一次。安装包 **1.1.1** 导出本次实际使用的修订，保留相同的 41 个节点和 130 个运行资源。

| 方法 | 输入（含缓存） | 缓存输入 | 输出 | API 等价成本 | 完整交付秒数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 553,582 | 483,968 | 5,894 | $0.246565 | 146.169 |
| Workflow | 522,747 | 419,456 | 5,208 | $0.300608 | 203.863 |

输入减少 **5.57%**，成本增加 **21.92%**，耗时增加 **39.47%**。查看[在线实测](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=zh-CN)及原样交付的 [Skill 页面](../examples/html/run-052-skill.html)、[Workflow 页面](../examples/html/run-052-workflow.html)。ER 基数、真实代码嵌入与复制、离线公式、Reply/Remark 均已检查。Skill 使用 doc、Workflow 使用 sheet，都是原工具支持的模板；这不是盲评质量分数。

本路线只有一个 SDK Main worker 制作页面，Main 选择路线并验收。worker 输入 368,355、成本 **$0.159578**；Main 另有 154,392 输入、成本 **$0.141030**。未缓存输入为 Workflow **103,291**、Skill **69,614**：这一项多计 $0.067354，缓存输入和输出少计 $0.013311，净差额 **+$0.054043**。这些账目解释价格差额，不能单独证明缓存实现回归。

| Workflow 阶段 | 秒数 |
| --- | ---: |
| 启动与路线选择 | 15.102 |
| SDK 制作节点 | 166.068 |
| Host 观察、Main 语义验收与记录 | 16.938 |
| 最后回复 | 5.755 |

worker 本身已比 Skill 全程更慢。渲染命令约 1.2 秒；worker 时间还包含准备、模型响应、读取源码与检查。一个制作任务没有独立网页间的并行空间。

**隔离更有价值的场景，是在已经很长的聊天中提出网页请求。** 聚焦的任务材料让制作 worker 的多次调用不携带无关聊天历史；Main 仍保留自己的会话。这轮新会话试验没有测量这种收益，不宣称其节省比例。

金额包含业务 Main 与 SDK worker，推理 token 已计入输出，日志明确报告缓存写入为零。工程维护与较早的失败／开发尝试未计入这对最终样本，不将其作为整个优化过程的成本。测试引擎为 CAW **1.2** 加本地源码修订 f05f737 的终态完成返回修复；引擎与 Workflow 包分别维护。下方数据属于历史实验，不归属于当前 0.5.2 包。

## 分别运行单个网页

Workflow 数据为每种网页三次运行的均值，输入包含缓存 token。

| 主题 | Skill 输入 | Workflow 输入 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TCP | 258,219 | 179,048 | $0.137719 | $0.122378 | 70.725 | 92.107 |
| Redis／Memcached | 190,193 | 163,948 | $0.146736 | $0.113460 | 60.315 | 77.961 |
| Git merge／rebase | 148,276 | 156,893 | $0.110996 | $0.149621 | 79.219 | 77.962 |

单页在 token、成本和耗时上没有一致优势；TCP 与缓存任务的 Workflow 耗时更长。

## 一个对话制作三个网页

两种方法各在一个独立新对话中完成相同的 TCP、Redis／Memcached、Git merge／rebase 三页请求，均使用 `gpt-6-luna/max`。Skill 保留原 **0.5.2** 样本，Workflow 使用内容修订后的 **0.5.3** 包；Skill 未重跑，不能据此归因源版本的影响。每种方法展示一次成功交付，Workflow 包含 Main、一次共同前置、三路并行 worker 和全部修正。新稿件已核对关闭状态、缓存未命中／失效、选择条件及 Git 历史变化；不是盲评质量分数。

| 方法 | 输入（含缓存） | 缓存输入／命中率 | 输出 | API 等价成本 | 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 555,547 | 516,096 / 92.90% | 14,123 | $0.016168 | 185.155 |
| Workflow | 290,972 | 221,696 / 76.19% | 22,258 | $0.020274 | 158.158 |

本次 Workflow 输入 token 减少 **47.62%**，耗时降低 **14.58%**；标准 API 等价成本增加 **25.40%**（+$0.004106）。缓存命中率为 **76.19%**，Skill 为 **92.90%**；未缓存输入为 **69,276 / 39,451**，输出为 **22,258 / 14,123**。这解释了本次成本差额，不能只凭输入减少推断成本降低。

按 [OpenAI Luna 官方价格](https://developers.openai.com/api/docs/models/gpt-6-luna)，每百万 token：输入 $0.10、缓存输入 $0.01、缓存写入 $0.125、输出 $0.50。本对照单次请求均低于 272K 输入，缓存写入报告为零，推理已计入输出。工程维护与此前失败试验不计入这对成功样本；失败证据单独保留。

| 主题 | Skill | Workflow |
| --- | --- | --- |
| TCP | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-workflow.html) |
| Redis／Memcached | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-workflow.html) |
| Git merge／rebase | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-workflow.html) |

## 视频资产复用与稿件重写

任务讲解 Workflow 底层逻辑，以及它与普通 AI workflow、Harness、Skill 的关系，采用英文配音。

| 阶段 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 |
| --- | ---: | ---: | ---: | ---: |
| 复用相同的已有视频资产 | $0.228100 | $0.139982 | 141.657 | 131.530 |
| 仅重写稿件 | $0.168968 | $0.147321 | 109.846 | 98.921 |

资产复用成本降低 **38.63%**、耗时降低 **7.15%**；稿件重写成本降低 **12.81%**、耗时降低 **9.95%**。

可观看[两种方法独立制作的视频](https://tohman233.github.io/workflow-package/workflow_explanations/examples/video/comparison.html)，包含英文配音和英中双语字幕。A 为 Skill，B 为 Workflow。这些是独立制作阶段的展示产物，不是上表资产复用或仅重写稿件阶段的产物。

## 统计口径

成本包含 Main、共同上下文准备、全部 worker 与修正，耗时覆盖完整交付；金额是 API 等价成本，不是订阅账单。每百万 token 的未缓存输入／缓存输入／输出价格：Luna 三页批量为 $0.10／$0.01／$0.50，历史 Sol 单页 HTML 为 $2／$0.10／$10，视频与文本为 $2／$0.20／$12。三页批量与视频各阶段均为两种方法各一次任务的测量结果。
