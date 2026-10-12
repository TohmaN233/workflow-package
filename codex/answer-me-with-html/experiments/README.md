# Skill versus Workflow: three comparison studies

[中文](README.zh-CN.md) · [Package](../README.md) · [Numeric summary](metrics.json) · [Original Skill](https://github.com/QingYunA/answer-me-with-html)

These studies compare the original Skill with its edited Workflow conversion. Costs are model API equivalents calculated from observed fresh/cached input and output, including the initiating Main and every worker. They are not subscription bills or the total cost of the many failed development attempts. Quality was assessed on anonymous outputs; small samples cannot establish general superiority. The exported final revision is identified in the package README; measurements belong to the historical revisions below.

## 1. Individual HTML pages

TCP, Redis/Memcached and Git merge/rebase were run separately. There are three accepted Workflow samples per topic, compared with one fixed historical Skill sample. The original single-page Skill files had been deleted; numeric and quality records were recovered from prior conversation evidence, and the Skill was not rerun. Single-page quality comparison therefore has a weaker retained-evidence basis than the later blind paired batch study.

| Topic | Skill cost | Workflow mean cost | Skill seconds | Workflow mean seconds | Skill quality | Workflow qualities |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| TCP | $0.137719 | $0.122378 | 70.725 | 92.107 | 98 | 100 / 100 / 100 |
| Redis/Memcached | $0.146736 | $0.113460 | 60.315 | 77.961 | 97 | 99 / 99 / 98 |
| Git merge/rebase | $0.110996 | $0.149621 | 79.219 | 77.962 | 97 | 99 / 100 / 99 |

All nine passed the predeclared per-sample gates: input and cost at most 1.5× Skill, time at most 2×, successful delivery and no material quality regression. This **does not mean every page was cheaper or faster**: Git cost was higher, while TCP/cache were slower. Workflow used `gpt-6.1-sol/high`; observed pricing was $2 fresh input, $0.10 cached input and $10 output per million tokens. Tested revisions were `8f66fb51539a5c3afc9872416b4e2de67ab16eb16700938cc289c6e3169a84a7` (TCP first sample) and `b9a8758f2ef4f665574061b248b607eb84a57bee59fc0fb097637431a5478535` (remaining samples). The earlier HTML comparison used Skill CLI 0.4.7 and Workflow CLI 0.4.9; this is a recorded practical comparison, not exact renderer-version parity or a test of the final bundled 0.4.7 runtime.

## 2. Three pages in one conversation

The Skill produced TCP, cache and Git pages in one conversation; the Workflow used its independent batch production path. The fixed Skill baseline was retained, not rerun. One accepted Workflow batch used `gpt-6.1-sol/high`, revision `8f66fb51539a5c3afc9872416b4e2de67ab16eb16700938cc289c6e3169a84a7`.

| Method | Total input (includes cache) | Cached input | Output | API-equivalent cost | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 200,112 | 171,008 | 4,822 | $0.123529 | 101.188 |

Cost fell 36.08%; elapsed time fell 36.19%. New anonymous paired quality review scored Workflow/Skill TCP 98/93, cache 98/95 and Git 100/96, with no material Workflow regression. Previously recorded Skill scores remain separate in `metrics.json`; they were not replaced by these later reviews. Desktop/mobile screenshots were checked; interactive controls and other viewports were not fully tested. The same historical renderer-version difference applies. Cache hits were observed rather than guaranteed by isolation or parallelism.

## 3. Video asset reuse, then text-only rewriting

The task explained Workflow mechanics, their relationship with common AI workflows, Harness and Skills, in a roughly 1–2 minute 3Blue1Brown-style explainer with English narration. Earlier fresh-speech trials failed to meet the full quality/time/cost requirements and consumed paid voice credits. They are **not accepted evidence of a successful fresh video-generation comparison**.

The final authorized study supplied identical completed manuscript/player/narration assets to both arms, then separately compared new manuscript writing without generating video or audio. Each stage has one Skill and one Workflow sample; no paid voice requests occurred. Original renderer/export tools were preserved.

| Stage | Skill cost | Workflow cost | Skill seconds | Workflow seconds | Quality |
| --- | ---: | ---: | ---: | ---: | --- |
| Reuse completed assets | $0.228100 | $0.139982 | 141.657 | 131.530 | HTML and MP4 byte-identical; decoded audio identical |
| Rewrite manuscript only | $0.168968 | $0.147321 | 109.846 | 98.921 | Blind scores: Skill 96, Workflow 98; no critical defects |

Reuse reduced API-equivalent cost 38.63% and time 7.15%; text reduced cost 12.81% and time 9.95%. Text input **rose 37.38%**, while observed cache fractions were 81.63% for Skill and 91.58% for Workflow; the lower equivalent cost depends on those cache hits. Recorded pricing was $2 input, $0.20 cached input and $12 output per million. Full decode and byte comparisons were experiment quality checks, not mandatory repeated Host production checks. The final published revision `7f1a372c03a0ce70dbd4218da10d965feed74dcd139dda7e1f8412043b46c093` also restored original scene rules and removed unused layout guidance; that final clarification was mechanically qualified, not a new timed trial.

The complete fresh paid speech path remains a selectable feature, **not an experimentally accepted performance claim**. The latest README-generator package has no such comparison. Summaries retain numeric values and ledger digests without exposing private conversations, credentials or local paths.
