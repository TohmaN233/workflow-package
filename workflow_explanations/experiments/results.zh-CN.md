# Skill 与 Workflow 对照

[English](results.md) · [Workflow 安装包](../answer-me-with-html.zh-CN.md) · [数据](results.json) · [原 Skill](https://github.com/QingYunA/answer-me-with-html)

质量请自行对比下方 Skill 和 Workflow 产出的 HTML 与视频。两者均使用 LLM，输出具有随机性。

## 分别运行单个网页

Workflow 数据为每种网页三次运行的均值，输入包含缓存 token。

| 主题 | Skill 输入 | Workflow 输入 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TCP | 258,219 | 179,048 | $0.137719 | $0.122378 | 70.725 | 92.107 |
| Redis／Memcached | 190,193 | 163,948 | $0.146736 | $0.113460 | 60.315 | 77.961 |
| Git merge／rebase | 148,276 | 156,893 | $0.110996 | $0.149621 | 79.219 | 77.962 |

单页在 token、成本和耗时上没有一致优势；TCP 与缓存任务的 Workflow 耗时更长。

## 一个对话制作三个网页

两种方法分别在一个对话中制作 TCP、Redis／Memcached、Git merge／rebase 三份讲解网页，均使用 `gpt-6.1-sol/high` 与渲染器 0.4.7。

| 方法 | 输入（含缓存） | 缓存输入 | 输出 | API 等价成本 | 秒数 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 208,283 | 162,304 | 5,671 | $0.164898 | 144.049 |

本次 Workflow 输入 token 减少 **52.10%**，成本降低 **14.67%**，耗时降低 **9.16%**。

| 主题 | Skill | Workflow |
| --- | --- | --- |
| TCP | [HTML](../examples/html/tcp-skill.html) | [HTML](../examples/html/tcp-workflow.html) |
| Redis／Memcached | [HTML](../examples/html/cache-skill.html) | [HTML](../examples/html/cache-workflow.html) |
| Git merge／rebase | [HTML](../examples/html/git-skill.html) | [HTML](../examples/html/git-workflow.html) |

## 视频资产复用与稿件重写

任务讲解 Workflow 底层逻辑，以及它与普通 AI workflow、Harness、Skill 的关系，采用英文配音。

| 阶段 | Skill 成本 | Workflow 成本 | Skill 秒数 | Workflow 秒数 |
| --- | ---: | ---: | ---: | ---: |
| 复用相同的已有视频资产 | $0.228100 | $0.139982 | 141.657 | 131.530 |
| 仅重写稿件 | $0.168968 | $0.147321 | 109.846 | 98.921 |

资产复用成本降低 **38.63%**、耗时降低 **7.15%**；稿件重写成本降低 **12.81%**、耗时降低 **9.95%**。

可观看[两种方法独立制作的视频](../examples/video/comparison.html)，包含英文配音和英中双语字幕。A 为 Skill，B 为 Workflow。

## 统计口径

成本包含 Main、共同上下文准备、全部 worker 与修正，耗时覆盖完整交付；金额是 API 等价成本，不是订阅账单。每百万 token 的未缓存输入／缓存输入／输出价格：HTML 为 $2／$0.10／$10，视频与文本为 $2／$0.20／$12。三页批量与视频各阶段均为两种方法各一次任务的测量结果。
