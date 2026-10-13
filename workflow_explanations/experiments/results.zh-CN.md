# Skill 与 Workflow：最终对照结果

[English](results.md) · [安装包说明](../answer-me-with-html.zh-CN.md) · [数值](results.json) · [原 Skill](https://github.com/QingYunA/answer-me-with-html)

**评分为 agent 自主的评分，不一定合理。** 它不是人工评审或客观质量标准。成本为包含 Main 与全部 worker 的 API 等价美元成本，耗时为完整交付耗时；不是订阅账单。

## 单个网页

每种网页有三次 Workflow 结果，对照一次固定 Skill 结果。

| 主题 | Skill 成本 | Workflow 平均成本 | Skill 秒数 | Workflow 平均秒数 | Skill 分数 | Workflow 分数 |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| TCP | $0.137719 | $0.122378 | 70.725 | 92.107 | 98 | 100 / 100 / 100 |
| Redis／Memcached | $0.146736 | $0.113460 | 60.315 | 77.961 | 97 | 99 / 99 / 98 |
| Git merge／rebase | $0.110996 | $0.149621 | 79.219 | 77.962 | 97 | 99 / 100 / 99 |

Git 成本较高，TCP／缓存网页较慢。原单页 Skill 成品没有保留，因此下方 Skill 展示选自三页任务，不沿用单页分数。

## 一个对话制作三个网页

| 方法 | 输入（含缓存） | 缓存输入 | 输出 | API 等价成本 | 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 200,112 | 171,008 | 4,822 | $0.123529 | 101.188 |

本次成本降低 36.08%，耗时降低 36.19%。同批产物的 agent 匿名评分为 Workflow／Skill：TCP 98／93、缓存 98／95、Git 100／96。

## 视频资产复用与稿件重写

任务是约 1–2 分钟的英文配音讲解：Workflow 底层逻辑，以及它与普通 AI workflow、Harness、Skill 的关系。

| 阶段 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 | 质量结果 |
| --- | ---: | ---: | ---: | ---: | --- |
| 复用相同已有资产 | $0.228100 | $0.139982 | 141.657 | 131.530 | HTML、MP4 字节与解码音频相同 |
| 仅重写稿件 | $0.168968 | $0.147321 | 109.846 | 98.921 | agent 分数 Skill 96／Workflow 98 |

复用成本下降 38.63%、耗时下降 7.15%；文本成本下降 12.81%、耗时下降 9.95%。文本输入增加 37.38%，实际缓存占比 Skill／Workflow 为 81.63%／91.58%。

## 可自行查看的例子

[HTML 样例页](../examples/html/index.html)提供 TCP、缓存、Git 各一份 Skill 与 Workflow 成品。Workflow 选可用产物中的最高分，同分选首次；Skill 选仍保留的真实成品。展示选样不用于推断平均质量。

| 主题 | Workflow 示例 | Skill 示例 |
| --- | --- | --- |
| TCP | [100 分](../examples/html/tcp-workflow.html) | [93 分](../examples/html/tcp-skill.html) |
| Redis／Memcached | [99 分](../examples/html/cache-workflow.html) | [95 分](../examples/html/cache-skill.html) |
| Git merge／rebase | [100 分](../examples/html/git-workflow.html) | [96 分](../examples/html/git-skill.html) |

[视频 A/B 展示](../examples/video/comparison.html)使用此前独立制作的两份视频，复用英文配音，新增完整英中双语字幕。A 为 Skill、B 为 Workflow，原 agent 分数为 94／93；A 的因果讲解更完整，B 的依赖关系、角色与节点、并行汇合图解更清楚。它们供观众直接比较，不作为最终“相同资产复用”实验的质量差异。字幕发布处理没有新生成配音，也不计入原制作耗时。

## 比较条件

HTML 使用 `gpt-6.1-sol/high`；每百万 token 的未缓存输入／缓存输入／输出价格为 $2／$0.10／$10，视频与文本为 $2／$0.20／$12。HTML 的 Skill／Workflow 渲染器分别是 0.4.7／0.4.9。批量网页与两个视频阶段各一对样本；新配音全线没有达到最终性能要求。小样本与缓存命中不能保证其他任务同样节约。README 生成器没有性能对照。
