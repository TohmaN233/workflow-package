# Skill versus Workflow: final comparisons

[中文](results.zh-CN.md) · [Package guide](../answer-me-with-html.md) · [Numbers](results.json) · [Original Skill](https://github.com/QingYunA/answer-me-with-html)

**Scores are the agents’ own assessments and may not be reasonable.** They are not human reviews or objective quality standards. Costs are API-equivalent USD including Main and all workers; time covers complete delivery. These are not subscription bills.

## Three pages in one conversation

Both methods complete the same three-page task: TCP, Redis / Memcached, and Git merge / rebase.

| Method | Input, including cached | Cached input | Output | API-equivalent cost | Seconds |
| --- | ---: | ---: | ---: | ---: | ---: |
| Skill | 434,835 | 389,120 | 6,291 | $0.193252 | 158.577 |
| Workflow | 376,374 | 314,240 | 5,307 | $0.208762 | 148.940 |

Workflow takes **6.08% less time** and costs **8.03% more**. Total input falls, but uncached input rises from 45,715 to 62,134 tokens. Fewer input tokens therefore do not mean lower cost. This pair does not establish simultaneous cost and time savings.

## Content comparison

This is an agent's assessment of the actual manuscripts, not objective proof of quality. New outputs do not inherit earlier scores.

| Topic | Core content covered by both | Differences |
| --- | --- | --- |
| TCP | Handshake, sequence and ACK numbers, close states, half-close, TIME-WAIT, RST | Skill also explains the absence of encryption or authentication; Workflow explicitly separates four state steps from three messages. |
| Redis / Memcached | Capabilities and choice, cache-aside, invalidation, concurrent misses, failure handling | Workflow adds a workload measurement checklist; Skill is more explicit about asynchronous replication loss and consistency remedies such as versioned keys. |
| Git merge / rebase | Commit graphs, branch references, IDs, fast-forward, conflict continuation / cancellation, shared-history caution | Skill additionally covers squash, rebase-merges, skipped or empty commits and reflog recovery; Workflow explains both operations from the same feature-branch perspective. |

Both cover the main mechanisms requested. Skill retains more advanced edge cases; this review does not establish full quality equivalence.

## Video asset reuse and manuscript rewriting

The task is a roughly 1–2 minute English-narrated explanation of Workflow internals and their relationship to ordinary AI workflows, Harness and Skill.

| Stage | Skill cost | Workflow cost | Skill seconds | Workflow seconds | Quality result |
| --- | ---: | ---: | ---: | ---: | --- |
| Reuse the same completed assets | $0.228100 | $0.139982 | 141.657 | 131.530 | Identical HTML/MP4 bytes and decoded audio |
| Rewrite the manuscript only | $0.168968 | $0.147321 | 109.846 | 98.921 | Agent scores: Skill 96 / Workflow 98 |

Reuse reduced cost 38.63% and time 7.15%; rewriting reduced cost 12.81% and time 9.95%. Rewriting input increased 37.38%, with observed cached-input shares of 81.63% / 91.58% for Skill / Workflow.

## Inspect the examples

The [HTML gallery](../examples/html/index.html) contains the six actual outputs from the three-page comparison above.

| Topic | Workflow | Skill |
| --- | --- | --- |
| TCP | [Page](../examples/html/tcp-workflow.html) | [Page](../examples/html/tcp-skill.html) |
| Redis / Memcached | [Page](../examples/html/cache-workflow.html) | [Page](../examples/html/cache-skill.html) |
| Git merge / rebase | [Page](../examples/html/git-workflow.html) | [Page](../examples/html/git-skill.html) |

The [video A/B presentation](../examples/video/comparison.html) uses two previously produced independent videos, their existing English narration, and complete new English/Chinese subtitles. A is Skill, B is Workflow; prior agent scores are 94 / 93. A explains the causal benefits more fully; B illustrates dependencies, role versus node and parallel joins more clearly. This presentation is separate from the final identical-asset reuse comparison. Subtitle preparation generated no new speech and is excluded from the original production timings.

## Comparison conditions

HTML uses `gpt-6.1-sol/high`, priced per million fresh-input/cached-input/output tokens at $2 / $0.10 / $10; video and text use $2 / $0.20 / $12. Both HTML renderer versions are 0.4.7. The batch and each video stage have one pair of results. Small samples and observed cache hits do not guarantee savings on other tasks. The README generator has no performance comparison.
