# Skill 与 Workflow：最终对照结果

[English](results.md) · [安装包说明](../answer-me-with-html.zh-CN.md) · [数值](results.json) · [原 Skill](https://github.com/QingYunA/answer-me-with-html)

**评分为 agent 自主的评分，不一定合理。** 它不是人工评审或客观质量标准。成本为包含 Main 与全部 worker 的 API 等价美元成本，耗时为完整交付耗时；不是订阅账单。

## 一个对话制作三个网页

两种方法均完成 TCP、Redis／Memcached、Git merge／rebase 三页任务。

| 方法 | 输入（含缓存） | 缓存输入 | 输出 | API 等价成本 | 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 376,374 | 314,240 | 5,307 | $0.208762 | 148.940 |

Workflow 耗时降低 **6.08%**，成本增加 **8.03%**。输入总量减少，但未缓存输入从 45,715 增至 62,134；因此输入更少不等于成本更低。本次未实现成本与耗时同时降低。

## 内容对比

以下是 agent 对实际稿件的判断，不是客观质量证明，也没有给新产物沿用旧分数。

| 主题 | 两者覆盖的核心内容 | 差异 |
| --- | --- | --- |
| TCP | 三次握手、序号与确认号、关闭状态、半关闭、TIME-WAIT、RST | Skill 另外说明握手不提供加密或身份认证；Workflow 明确区分四个状态步骤与三个消息。 |
| Redis／Memcached | 功能与选型、cache-aside、失效、并发 miss 与故障处理 | Workflow 给出具体负载测量清单；Skill 更明确说明异步复制可能丢失近期写入，以及版本化 key 等一致性措施。 |
| Git merge／rebase | 提交图、分支指针、提交 ID、fast-forward、冲突继续／取消、共享历史注意事项 | Skill 另有 squash、rebase-merges、跳过或空提交、reflog 恢复说明；Workflow 的两种操作均从同一 feature 分支视角讲解。 |

两组均覆盖题目的主要机制；Skill 的高级边界说明仍更丰富，不能据此宣称 Workflow 质量完全等价。

## 视频资产复用与稿件重写

任务是约 1–2 分钟的英文配音讲解：Workflow 底层逻辑，以及它与普通 AI workflow、Harness、Skill 的关系。

| 阶段 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 | 质量结果 |
| --- | ---: | ---: | ---: | ---: | --- |
| 复用相同已有资产 | $0.228100 | $0.139982 | 141.657 | 131.530 | HTML、MP4 字节与解码音频相同 |
| 仅重写稿件 | $0.168968 | $0.147321 | 109.846 | 98.921 | agent 分数 Skill 96／Workflow 98 |

复用成本下降 38.63%、耗时下降 7.15%；文本成本下降 12.81%、耗时下降 9.95%。文本输入增加 37.38%，实际缓存占比 Skill／Workflow 为 81.63%／91.58%。

## 可自行查看的例子

[HTML 样例页](../examples/html/index.html)展示上述三页实验的六份实际产物。

| 主题 | Workflow | Skill |
| --- | --- | --- |
| TCP | [页面](../examples/html/tcp-workflow.html) | [页面](../examples/html/tcp-skill.html) |
| Redis／Memcached | [页面](../examples/html/cache-workflow.html) | [页面](../examples/html/cache-skill.html) |
| Git merge／rebase | [页面](../examples/html/git-workflow.html) | [页面](../examples/html/git-skill.html) |

[视频 A/B 展示](../examples/video/comparison.html)使用此前独立制作的两份视频，复用英文配音，新增完整英中双语字幕。A 为 Skill、B 为 Workflow，原 agent 分数为 94／93；A 的因果讲解更完整，B 的依赖关系、角色与节点、并行汇合图解更清楚。它们供观众直接比较，不作为最终“相同资产复用”实验的质量差异。字幕发布处理没有新生成配音，也不计入原制作耗时。

## 比较条件

HTML 使用 `gpt-6.1-sol/high`；每百万 token 的未缓存输入／缓存输入／输出价格为 $2／$0.10／$10，视频与文本为 $2／$0.20／$12。两组 HTML 渲染器均为 0.4.7。批量网页与两个视频阶段各一对样本；小样本与缓存命中不能保证其他任务同样节约。README 生成器没有性能对照。
