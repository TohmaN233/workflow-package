# Install a Workflow package

[中文](install.zh-CN.md) · [Package downloads](../README.md) · [Platforms](platforms.md)

An LLM can execute this procedure once the user requests installation. Reuse working dependencies and keep downloads in one selected directory. Installation does not run a production task.

## 1. Connect the engine

For Codex, follow the [Codex Agents Workflow installation procedure](https://github.com/TohmaN233/codex-agents-workflow/blob/main/INSTALL.md), including its native context profile and live MCP checks. The qualified engine release is **1.2.2**.

For Pi, this package is verified with **local pi-CAW build 0.5.10**, Node.js **22.19+** and a compatible Pi SDK. That engine build is not yet public; the public repository's 0.3.1 version is not qualified for this package. Confirm a compatible receiving host first; otherwise report the missing engine without launching a trial. Use [pi/catalog.json](../pi/catalog.json) and pi-CAW's **Install Workflow** operation, following the [Pi-specific setup](answer-me-with-html-pi.md). The Codex MCP calls below apply only to Codex. Browser, FFmpeg and TTS dependencies apply to both editions, subject to Pi's higher Node minimum.

## 2. Select and import

Read [codex/catalog.json](../codex/catalog.json) for the selected package's current path, ID, dependencies and `file_sha256`; use its latest values.

| Workflow | ID | Package |
| --- | --- | --- |
| Answer me with HTML | `answer-me-with-html-evidence` | [JSON](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) |
| GitHub README generator | `github-readme-generator` | [JSON](../codex/github-readme-generator/github-readme-generator.workflow-package.json) |

Call the connected `workflow_install_workflow_package` tool using either:

- **Remote:** `source_url` = `https://raw.githubusercontent.com/TohmaN233/workflow-package/main/` + the catalog's `path`; `expected_sha256` = its **file_sha256**.
- **Local:** download the JSON, then supply its absolute `package_path`. A relative path also requires the containing absolute `workspace`.

If only the connected workbench is available, use **Install Workflow**. Do not paste package bodies through the model. The Host checks integrity, restores the declared resources and imports the Workflow. If the catalog and download differ during an update, reread both; report a persistent mismatch. Resolve same-ID conflicts through the installer without deleting a user's existing Workflow.

The package carries its scripts, references and resource bytes. The HTML package also contains the renderer and its bundled JavaScript libraries. **No original Skill installation, original repository checkout or separate npm installation of the renderer is needed.** Declared `am_*` tools are package-provided Host adapters, not separate MCP servers to install by those names.

## 3. Install the selected route's dependencies

Inspect both the global dependency list and the selected nodes' `runtime_requirements`. Conditional dependencies need not appear in the global list.

For the upstream 0.5.3 HTML package, install CAW 1.2.2 from its current `main` before importing. Its explicitly declared WebM operations need the long Host-tool deadline support; an older build still labeled 1.2 may reject that contract. Use the normal engine installer and current connection check, not an application reinstall or a trial business Run.

| Route | Additional requirements |
| --- | --- |
| HTML, diagrams, batch pages | Node.js **20+** |
| MP4 export or existing-player MP4 reuse (`export_mp4`, `reuse_video`) | Node.js **22+**, FFmpeg, Chrome-compatible browser |
| WebM export or existing-player WebM reuse (`export_webm`, `reuse_video_webm`) | Node.js **22+**, Chrome-compatible browser; no FFmpeg requirement |
| New narration | Receiving-host TTS configuration; ElevenLabs uses `ELEVENLABS_API_KEY` and optional voice/model IDs; explicit local TTS uses `AM_TTS_URL` and its configured `AM_TTS_*` options |
| Existing narration/text reuse | Supplied local audio, matching text/subtitles and route inputs; no new TTS request |
| Original Skill update routes, only when selected | `update_npx_skills`: `npx`; `update_git`: `git`, `npm`; `update_claude_plugin`: `claude`; `update_dsh`: `dsh` with its existing profile/package |
| README/documentation | Enabled configured Provider **`native-luna`**; no media software |

Provider IDs refer to receiving-host configuration, not model files to download. Optional accounts and credentials belong to the receiving host and are not bundled.

Use the engine's [Node/Git instructions](https://github.com/TohmaN233/codex-agents-workflow/blob/main/INSTALL.md) if needed. For movie export, reuse a working browser first; install FFmpeg only for MP4. Install missing selected-route tools using the existing package manager:

| System | FFmpeg | Browser, if none is suitable |
| --- | --- | --- |
| Windows / WinGet | `winget install --id Gyan.FFmpeg -e --source winget` | `winget install --id Google.Chrome -e --source winget` |
| macOS / Homebrew | `brew install ffmpeg` | `brew install --cask google-chrome` |
| Debian/Ubuntu | `sudo apt-get update`, then `sudo apt-get install -y ffmpeg` | Distribution-supported Chromium or official Chrome for the detected architecture |

Sources: [WinGet FFmpeg](https://github.com/microsoft/winget-pkgs/tree/master/manifests/g/Gyan/FFmpeg), [WinGet Chrome](https://github.com/microsoft/winget-pkgs/tree/master/manifests/g/Google/Chrome), [Homebrew FFmpeg](https://formulae.brew.sh/formula/ffmpeg), [Homebrew Chrome](https://formulae.brew.sh/cask/google-chrome).

Verify real executable versions and locations. Video nodes use the logical name `chrome`; an installed browser may have another filename. Bind the discovered path in workbench dependency settings when needed and supply that same path to the renderer through `AM_CHROME` or `CHROME_PATH`. Discover OS-specific paths, including macOS app bundles and Windows executable locations. If the available host interface cannot register a binding, report that exact missing step.

Recheck the host after installing programs. `workflow_prepare_environment` accepts `workflow_id` and optional `environment_directories` for discovered directories outside PATH; it diagnoses dependencies and does not install software. Its global result does not certify every conditional route: check the intended nodes too.

Normal HTML/video execution uses cooperative policy and does not require opting into Strict. The Host registers a local Codex executor automatically when a Main worker needs one. A `STRICT_DISABLED` failure for this package indicates an older engine's incorrect gate; update the engine using its installation procedure, rather than hand-filling executable hashes. Fresh engine defaults also enable Strict for routes that actually select it.

## 4. Verify readiness

Read installed metadata: confirm ID, usable revision/status, restored resources, configured Providers and selected-route executables. The workbench must show the installed Workflow. Use dependency diagnostics where applicable, without launching benchmarks or paid narration for installation checks.

Report ID/revision, resource import result, dependency versions/paths and the ready route. Identify an unavailable dependency, login, credential or path binding precisely. Preserve the existing installation and complete independent steps before requesting a missing human action.

Usage and original Skill credits: [HTML/video](answer-me-with-html.md), [README/documentation](github-readme-generator.md).
