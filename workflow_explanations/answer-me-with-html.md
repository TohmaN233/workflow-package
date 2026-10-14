# Answer me with HTML

[中文](answer-me-with-html.zh-CN.md) · [Download Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [Comparisons](experiments/results.md)

Converted from [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html), with the [original Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md) and [MIT notice](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt) credited. The package retains structured Markdown, single-file HTML, narrated video, configuration, cleanup and update routes, together with the original runtime tools.

Main selects the requested route and checks the meaning of the result. Host tools perform the original rendering/writing checks and artifact delivery. Independent pages have a parallel batch route. Production uses temporary Main workers.

HTML writers use the supplied material and established knowledge for general explanations. External research is reserved for requested sources, current or version-specific facts, and material uncertainty. This task boundary is included in the shared writing reference for both single-page and batch production; it does not remove tools or limit content depth.

When independent page requests and their common context are explicitly supplied as structured inputs, Host binds that plan directly. Free-form and mixed-mode requests retain Main's route decision. Main reviews the complete manuscript and diagnostics without replaying the producer's rendering guide.

Explicit Workflow invocation establishes artifact intent. Routing, Host interfaces and writers no longer carry the ambient Skill activation fields `always_on` or `behavior`. Content follows task complexity; a short request can still need a complete technical explanation. Acceptance checks mechanisms, relevant conditions and necessary subquestions rather than word counts, panel counts or render success. Original tools and STE correction remain available, without a new Host content gate.

Video supports a new manuscript, supplied narration/player assets, MP4 or WebM export and text-only rewriting. Existing audio can be reused without a speech request. Fresh narration uses the receiving host's configured provider and credentials, including an explicitly selected local OpenAI-compatible service. Both movie exports need Node.js 22+ and Chrome; only MP4 needs FFmpeg. HTML and player pages need Node.js 20+.

Example requests: explain TCP with an HTML diagram; produce three independent explainers in one request; reuse a supplied script and English narration for a video; rewrite only the manuscript. See [six produced HTML examples](examples/html/index.html) and the [video A/B with bilingual subtitles](examples/video/comparison.html).

The package includes **41 nodes and 140 runtime resources**, with the exact upstream [CLI 0.5.3](https://github.com/QingYunA/answer-me-with-html/tree/v0.5.3). It retains ER diagrams, structural changes, decisions and Reply/Remark feedback, real source and images, offline formulas, automatic/paper/user themes, localized and RTL pages, WebM export, replacement of a successful retry and DSH updates. The 0.5.3 update adds catalog theme add/list/update/remove commands, comic/manga/pop theme support, diagram styling tokens, bundled comic fonts, improved Reply controls and `close_after_reply`. Existing Main worker nodes and routes are preserved; the current configuration Host calls the original theme CLI and preserves its overwrite-consent rule.

Video and file export retain explicit-intent requirements. Configuration, cleanup, updates, supplied-asset reuse and section patches retain their routes. Serving remains user-started; a DSH presentation tool is used only when the receiving host actually provides it.

Package **1.1.3** distributes upstream 0.5.3 and uses CAW **1.2.2**; this update changes only the Workflow package. Earlier original-CLI/Host and upstream configuration/theme/Reply checks remain recorded. A fresh [Luna/max three-page qualification](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#batch?lang=en) completed the original three questions. Review covered TCP close states, cache-miss/invalidation paths and selection conditions, and Git history changes and shared commits. The fixed Skill sample remains on 0.5.2 and was not rerun; Workflow uses 0.5.3, with that difference disclosed. The new outputs are accompanied by their actual measurements: 47.62% less input, 14.58% less time and 25.40% higher Standard API-equivalent cost. This is not a same-version causal benchmark. No paid narration was used. The [historical single-page sample](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=en) retains its original data and outputs.

## Scope and limitations

Cache-hit variation and stochastic LLM behavior can make a Workflow run cost more or take longer than Skill; overly fine node splits and serial handoffs also add mechanical overhead. Isolating a page task within a long chat and overlapping independent stages in complex work offer stronger use cases. This fresh-conversation single-page sample did not measure long-chat gains and provides no savings percentage for that setting.
