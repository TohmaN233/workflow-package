# Answer me with HTML

[中文](answer-me-with-html.zh-CN.md) · [Download Workflow](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) · [Comparisons](experiments/results.md)

Converted from [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html), with the [original Skill](https://github.com/QingYunA/answer-me-with-html/blob/main/skills/answer-me-with-html/SKILL.md) and [MIT notice](../codex/answer-me-with-html/UPSTREAM-LICENSE.txt) credited. The package retains structured Markdown, single-file HTML, narrated video, configuration, cleanup and update routes, together with the original runtime tools.

Main selects the requested route and checks the meaning of the result. Host tools perform the original rendering/writing checks and artifact delivery. Independent pages have a batch route. The edited package uses temporary Main workers on its tested production paths; this is a package choice, not the generated Workflow default.

Video supports a new manuscript, supplied narration/player assets, MP4 export and text-only rewriting. Existing audio can be reused without a speech request. Fresh narration uses the receiving host's configured provider and credentials. Node.js 20+ and the selected media route's dependencies are required.

Example requests: explain TCP with an HTML diagram; produce three independent explainers in one request; reuse a supplied script and English narration for a video; rewrite only the manuscript. See [six produced HTML examples](examples/html/index.html) and the [video A/B with bilingual subtitles](examples/video/comparison.html).

The package includes 34 nodes and 75 runtime resources, with CLI 0.4.7. The comparisons measure earlier production runs; they do not certify fresh paid narration or every later package change.
