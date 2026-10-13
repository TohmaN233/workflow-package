# Skill versus Workflow: final comparisons

[中文](results.zh-CN.md) · [Package guide](../answer-me-with-html.md) · [Numbers](results.json) · [Original Skill](https://github.com/QingYunA/answer-me-with-html)

**Scores are the agents’ own assessments and may not be reasonable.** They are not human reviews or objective quality standards. Costs are API-equivalent USD including Main and all workers; time covers complete delivery. These are not subscription bills.

## Individual pages

Three Workflow results per topic, compared with one fixed Skill result.

| Topic | Skill cost | Workflow mean cost | Skill seconds | Workflow mean seconds | Skill score | Workflow scores |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| TCP | $0.137719 | $0.122378 | 70.725 | 92.107 | 98 | 100 / 100 / 100 |
| Redis / Memcached | $0.146736 | $0.113460 | 60.315 | 77.961 | 97 | 99 / 99 / 98 |
| Git merge / rebase | $0.110996 | $0.149621 | 79.219 | 77.962 | 97 | 99 / 100 / 99 |

Git costs more; TCP and cache pages take longer. The original individual Skill pages are unavailable. The displayed Skill pages below come from the three-page task and retain those scores.

## Three pages in one conversation

| Method | Input, including cached | Cached input | Output | API-equivalent cost | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 200,112 | 171,008 | 4,822 | $0.123529 | 101.188 |

Cost fell 36.08% and time 36.19% in this comparison. Anonymous agent scores for Workflow / Skill: TCP 98 / 93, cache 98 / 95, Git 100 / 96.

## Video asset reuse and manuscript rewriting

The task is a roughly 1–2 minute English-narrated explanation of Workflow internals and their relationship to ordinary AI workflows, Harness and Skill.

| Stage | Skill cost | Workflow cost | Skill seconds | Workflow seconds | Quality result |
| --- | ---: | ---: | ---: | ---: | --- |
| Reuse the same completed assets | $0.228100 | $0.139982 | 141.657 | 131.530 | Identical HTML/MP4 bytes and decoded audio |
| Rewrite the manuscript only | $0.168968 | $0.147321 | 109.846 | 98.921 | Agent scores: Skill 96 / Workflow 98 |

Reuse reduced cost 38.63% and time 7.15%; rewriting reduced cost 12.81% and time 9.95%. Rewriting input increased 37.38%, with observed cached-input shares of 81.63% / 91.58% for Skill / Workflow.

## Inspect the examples

The [HTML gallery](../examples/html/index.html) contains one real output from each method for TCP, cache and Git. Workflow selects the highest available score, taking the first tied sample; Skill uses the retained originals. This selection is for display, not an estimate of average quality.

| Topic | Workflow example | Skill example |
| --- | --- | --- |
| TCP | [100](../examples/html/tcp-workflow.html) | [93](../examples/html/tcp-skill.html) |
| Redis / Memcached | [99](../examples/html/cache-workflow.html) | [95](../examples/html/cache-skill.html) |
| Git merge / rebase | [100](../examples/html/git-workflow.html) | [96](../examples/html/git-skill.html) |

The [video A/B presentation](../examples/video/comparison.html) uses two previously produced independent videos, their existing English narration, and complete new English/Chinese subtitles. A is Skill, B is Workflow; prior agent scores are 94 / 93. A explains the causal benefits more fully; B illustrates dependencies, role versus node and parallel joins more clearly. This presentation is separate from the final identical-asset reuse comparison. Subtitle preparation generated no new speech and is excluded from the original production timings.

## Comparison conditions

HTML uses `gpt-6.1-sol/high`, priced per million fresh-input/cached-input/output tokens at $2 / $0.10 / $10; video and text use $2 / $0.20 / $12. HTML Skill / Workflow renderer versions were 0.4.7 / 0.4.9. The batch and each video stage have one pair of results; fresh narration did not meet the final performance requirements. Small samples and observed cache hits do not guarantee savings on other tasks. The README generator has no performance comparison.
