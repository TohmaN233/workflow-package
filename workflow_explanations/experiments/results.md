# Skill versus Workflow

[中文](results.zh-CN.md) · [Workflow package](../answer-me-with-html.md) · [Data](results.json) · [Original Skill](https://github.com/QingYunA/answer-me-with-html)

**[Open the live comparison gallery](https://tohman233.github.io/workflow-package/)** to view the HTML outputs, video examples and these metrics directly in your browser.

Compare the HTML and video outputs below to judge quality yourself. Both methods use LLMs, whose outputs are stochastic.

## Pages run separately

Workflow values are means of three runs per topic. Input includes cached tokens.

| Topic | Skill input | Workflow input | Skill cost | Workflow cost | Skill seconds | Workflow seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TCP | 258,219 | 179,048 | $0.137719 | $0.122378 | 70.725 | 92.107 |
| Redis / Memcached | 190,193 | 163,948 | $0.146736 | $0.113460 | 60.315 | 77.961 |
| Git merge / rebase | 148,276 | 156,893 | $0.110996 | $0.149621 | 79.219 | 77.962 |

Single-page runs show no consistent advantage across token use, cost and time. TCP and caching take longer with Workflow.

## Three pages in one conversation

Each method produces TCP, Redis / Memcached, and Git merge / rebase explainers in one conversation. Both use `gpt-6.1-sol/high` and renderer 0.4.7.

| Method | Input, including cached | Cached input | Output | API-equivalent cost | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 208,283 | 162,304 | 5,671 | $0.164898 | 144.049 |

Workflow uses **52.10% fewer input tokens**, costs **14.67% less**, and takes **9.16% less time** in this comparison.

| Topic | Skill | Workflow |
| --- | --- | --- |
| TCP | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-workflow.html) |
| Redis / Memcached | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-workflow.html) |
| Git merge / rebase | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-workflow.html) |

## Video asset reuse and manuscript rewriting

The task explains Workflow internals and their relationship to ordinary AI workflows, Harness and Skill, with English narration.

| Stage | Skill cost | Workflow cost | Skill seconds | Workflow seconds |
| --- | ---: | ---: | ---: | ---: |
| Reuse the same supplied video assets | $0.228100 | $0.139982 | 141.657 | 131.530 |
| Rewrite the manuscript only | $0.168968 | $0.147321 | 109.846 | 98.921 |

Reuse costs **38.63% less** and takes **7.15% less time**; manuscript rewriting costs **12.81% less** and takes **9.95% less time**.

Watch the [independently produced Skill / Workflow videos](https://tohman233.github.io/workflow-package/workflow_explanations/examples/video/comparison.html), with English audio and English/Chinese subtitles. A is Skill; B is Workflow. These are illustrative outputs from independent video production, not outputs of the measured asset-reuse or manuscript-only stages above.

## Measurement

Costs include Main, shared-context preparation, all workers and corrections; time covers complete delivery. These are API-equivalent costs, not subscription bills. The per-million-token rates for fresh input / cached input / output are $2 / $0.10 / $10 for HTML and $2 / $0.20 / $12 for video and text. The three-page batch and video stages each report one task per method.
