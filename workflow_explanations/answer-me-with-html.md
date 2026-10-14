# Answer me with HTML

[中文](answer-me-with-html.zh-CN.md) · [Download Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [Comparisons](experiments/results.md)

Converted from [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html), with the [original Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md) and [MIT notice](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt) credited. The package retains structured Markdown, single-file HTML, narrated video, configuration, cleanup and update routes, together with the original runtime tools.

Main selects the requested route and checks the meaning of the result. Host tools perform the original rendering/writing checks and artifact delivery. Independent pages have a parallel batch route. Production uses temporary Main workers.

HTML writers use the supplied material and established knowledge for general explanations. External research is reserved for requested sources, current or version-specific facts, and material uncertainty. This task boundary is included in the shared writing reference for both single-page and batch production; it does not remove tools or limit content depth.

When independent page requests and their common context are explicitly supplied as structured inputs, Host binds that plan directly. Free-form and mixed-mode requests retain Main's route decision. Main reviews the complete manuscript and diagnostics without replaying the producer's rendering guide.

Video supports a new manuscript, supplied narration/player assets, MP4 or WebM export and text-only rewriting. Existing audio can be reused without a speech request. Fresh narration uses the receiving host's configured provider and credentials, including an explicitly selected local OpenAI-compatible service. Both movie exports need Node.js 22+ and Chrome; only MP4 needs FFmpeg. HTML and player pages need Node.js 20+.

Example requests: explain TCP with an HTML diagram; produce three independent explainers in one request; reuse a supplied script and English narration for a video; rewrite only the manuscript. See [six produced HTML examples](examples/html/index.html) and the [video A/B with bilingual subtitles](examples/video/comparison.html).

The package includes 41 nodes and 130 runtime resources, with the exact bundled upstream [CLI 0.5.2](https://github.com/QingYunA/answer-me-with-html/tree/v0.5.2). New capabilities include ER diagrams, structural change markers, decisions and Reply/Remark feedback, real code and image embedding, offline math, auto/paper/user themes, localized and RTL pages, and WebM export. Retrying a successful page replaces the previous product. The original installation-update branches now include DSH.

The upstream description encourages broader use than its detailed decision section. This update retains that section's specific routing rules and explicit video intent. Serving remains user-started; a DSH presentation tool is used only when the receiving host actually provides it.

Package **1.1.1** exports the tested 0.5.2 single-page revision, preserving the semantic graph and all runtime resources from 1.1.0. New [measurements and paired outputs](https://tohman233.github.io/workflow-package/workflow_explanations/gallery/#latest?lang=en): input 5.57% lower, cost 21.92% higher and time 39.47% higher. This route has one production worker. Its stronger long-chat isolation use case was not measured; Main still carries its conversation. Older 0.4.7 page and video data remain historical evidence, not current-package performance. The 0.5.2 update also passed real voice-off MP4/WebM export checks without buying narration.

## Scope and limitations

Cache-hit variation and stochastic LLM behavior can make a Workflow run cost more or take longer than Skill; overly fine node splits and serial handoffs also add mechanical overhead. Isolating a page task within a long chat and overlapping independent stages in complex work offer stronger use cases. This fresh-conversation single-page sample did not measure long-chat gains and provides no savings percentage for that setting.
