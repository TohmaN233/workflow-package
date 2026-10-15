# Skill versus Workflow

Current distribution: Codex HTML 1.1.5, README 1.0.1 and Pi HTML 1.0.0; HTML upstream 0.5.3, with CAW 1.2.2 / pi-CAW 0.5.10. The batch section uses the accepted same-source Skill/Codex pair and adds Pi outputs only. Historical single-page and video records retain their measured conditions.

[中文](results.zh-CN.md) · [Workflow package](../answer-me-with-html.md) · [Data](results.json) · [Original Skill](https://github.com/QingYunA/answer-me-with-html)

**[Open the live comparison gallery](https://tohman233.github.io/workflow-package/)** to view the HTML outputs, video examples and these metrics directly in your browser.

Compare the HTML and video outputs below to judge quality yourself. Both methods use LLMs, whose outputs are stochastic.

## 0.5.2: one page in fresh conversations

Measured on 2026-10-14 with gpt-6.1-sol/high, upstream **0.5.2**, identical supplied facts and code, and separate fresh conversations. Skill is the fixed sample; Workflow ran once after engineering checks. Package **1.1.1** exports the tested revision with the same 41 nodes and 130 runtime resources.

| Method | Input (cached included) | Cached input | Output | API-equivalent USD | Full delivery, seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 553,582 | 483,968 | 5,894 | $0.246565 | 146.169 |
| Workflow | 522,747 | 419,456 | 5,208 | $0.300608 | 203.863 |

Input decreased **5.57%**, cost increased **21.92%**, and time increased **39.47%**. See the [online measurements](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=en) and unchanged [Skill page](../examples/html/run-052-skill.html) and [Workflow page](../examples/html/run-052-workflow.html). ER cardinalities, real code embedding and copy, offline formulas, and Reply/Remark were checked. Skill uses doc and Workflow uses sheet, both supported original templates; this is not a blind quality score.

The route has one SDK Main worker producing the page; Main selects the route and accepts the result. The worker uses 368,355 input tokens and **$0.159578**; Main adds 154,392 input tokens and **$0.141030**. Uncached input is **103,291** for Workflow versus **69,614** for Skill. This adds $0.067354; lower cached input and output subtract $0.013311, leaving **+$0.054043**. These counts explain the price difference, but alone do not prove a cache implementation regression.

| Workflow phase | Seconds |
| --- | ---: |
| Startup and routing | 15.102 |
| SDK production node | 166.068 |
| Host observation, Main semantic acceptance and recording | 16.938 |
| Final reply | 5.755 |

The worker alone took longer than the entire Skill sample. The render command took about 1.2 seconds; worker time also includes preparation, model responses, source reads and checks. One production task has no independent-page parallelism.

**A stronger isolation use case is requesting a page during an already long chat.** A focused task brief lets production calls omit unrelated chat history; Main still carries its own conversation. This fresh-conversation trial did not measure that benefit and claims no savings percentage for it.

Costs include the business Main and SDK worker; output includes reasoning once and cache-write input was explicitly reported as zero. Engineering maintenance and older failed/development attempts are excluded from this final pair, not presented as the cost of the whole optimization process. The engine was CAW **1.2** with local source revision f05f737 for terminal-completion returns, maintained separately from the Workflow package. The following records are historical experiments, not measurements of the current 0.5.2 package.

## Pages run separately

Workflow values are means of three runs per topic. Input includes cached tokens.

| Topic | Skill input | Workflow input | Skill cost | Workflow cost | Skill seconds | Workflow seconds |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TCP | 258,219 | 179,048 | $0.137719 | $0.122378 | 70.725 | 92.107 |
| Redis / Memcached | 190,193 | 163,948 | $0.146736 | $0.113460 | 60.315 | 77.961 |
| Git merge / rebase | 148,276 | 156,893 | $0.110996 | $0.149621 | 79.219 | 77.962 |

Single-page runs show no consistent advantage across token use, cost and time. TCP and caching take longer with Workflow.

## Three pages in one conversation

Skill and Codex Workflow each complete the identical three-page request in an independent fresh conversation, using gpt-6-luna/max and upstream v0.5.3. Workflow totals include initiating Main, common preparation, every worker, correction and acceptance. One successful delivery per method; semantic review found no material regression, while optional detail and layout differ. Pi contributes a separate three-page delivery for content and interaction inspection only and has no consumption row.

| Method | Input (cached included) | Cached input / hit rate | Output | API-equivalent cost | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 786,187 | 721,664 / 91.79% | 18,846 | $0.023092 | 192.278 |
| Codex Workflow | 302,007 | 197,376 / 65.35% | 21,728 | $0.023301 | 133.712 |

Workflow uses 61.59% less input and 30.46% less time, with 0.90% higher API-equivalent cost (+$0.000209). Uncached input is 104,631 / 64,523; cache-hit variation and output volume offset some input savings. The platform cause of cache misses is unproven; this sample does not establish a universal advantage.

The original experiment's frozen API-equivalent rates are $0.10 fresh input, $0.01 cached input and $0.50 output per million tokens; reasoning is included in output and reported cache writes are zero. This is neither a current bill nor a fresh price lookup. Engineering and prior trials are outside this successful delivery pair and are not claimed free.

| Topic | Skill | Codex Workflow | Pi Workflow (outputs only) |
| --- | --- | --- | --- |
| TCP | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-workflow.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/tcp-pi.html) |
| Redis / Memcached | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-workflow.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/cache-pi.html) |
| Git merge / rebase | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-skill.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-workflow.html) | [HTML](https://tohman233.github.io/workflow-package/workflow_explanations/examples/html/git-pi.html) |

## Video asset reuse and manuscript rewriting

The task explains Workflow internals and their relationship to ordinary AI workflows, Harness and Skill, with English narration.

| Stage | Skill cost | Workflow cost | Skill seconds | Workflow seconds |
| --- | ---: | ---: | ---: | ---: |
| Reuse the same supplied video assets | $0.228100 | $0.139982 | 141.657 | 131.530 |
| Rewrite the manuscript only | $0.168968 | $0.147321 | 109.846 | 98.921 |

Reuse costs **38.63% less** and takes **7.15% less time**; manuscript rewriting costs **12.81% less** and takes **9.95% less time**.

Watch the [independently produced Skill / Workflow videos](https://tohman233.github.io/workflow-package/workflow_explanations/examples/video/comparison.html), with English audio and English/Chinese subtitles. A is Skill; B is Workflow. These are illustrative outputs from independent video production, not outputs of the measured asset-reuse or manuscript-only stages above.

## Measurement

Costs include Main, shared-context preparation, all workers and corrections; time covers complete delivery. These are API-equivalent costs, not subscription bills. Per million fresh input / cached input / output tokens: the Luna batch uses $0.10 / $0.01 / $0.50, historical Sol single-page HTML uses $2 / $0.10 / $10, and video/text use $2 / $0.20 / $12. The three-page batch and video stages each report one task per method.
