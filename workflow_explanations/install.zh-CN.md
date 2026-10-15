# 安装 Workflow 包

[English](install.md) · [安装包下载](../README.zh-CN.md) · [平台](platforms.zh-CN.md)

用户要求安装后，LLM 可以按本文执行。复用已有依赖，把下载统一放在选定目录。安装本身不运行生产任务。

## 1. 连接接收端引擎

Codex 端按照 [Codex Agents Workflow 安装说明](https://github.com/TohmaN233/codex-agents-workflow/blob/main/INSTALL.zh-CN.md)安装引擎、原生上下文配置并检查当前 MCP 连接。验收过的引擎版本是 **1.2.2**。

Pi 包在**本地 pi-CAW 构建 0.5.10**、Node.js **22.19+** 和兼容 Pi SDK 上验证。该引擎构建尚未公开；公开仓库目前的 0.3.1 未通过本包验收。先确认接收端具备兼容引擎，缺少时报告，不试跑业务。读取 [pi/catalog.json](../pi/catalog.json)，通过 pi-CAW 自身的 **安装 Workflow** 操作导入，详见 [Pi 专用配置](answer-me-with-html-pi.zh-CN.md)。下文 Codex MCP 调用只适用于 Codex；浏览器、FFmpeg、TTS 等路线依赖两端共用，Pi 仍须满足引擎更高的 Node 下限。

## 2. 选择并导入

读取 [codex/catalog.json](../codex/catalog.json)，获取所选包当前的路径、ID、依赖和 `file_sha256`，使用其中的最新值。

| Workflow | ID | 安装包 |
| --- | --- | --- |
| Answer me with HTML | `answer-me-with-html-evidence` | [JSON](../codex/answer-me-with-html/answer-me-with-html.workflow-package.json) |
| GitHub README generator | `github-readme-generator` | [JSON](../codex/github-readme-generator/github-readme-generator.workflow-package.json) |

使用已经连接的 `workflow_install_workflow_package` 工具，二选一：

- **远程：** `source_url` = `https://raw.githubusercontent.com/TohmaN233/workflow-package/main/` 加目录中的 `path`；`expected_sha256` = 其中的 **file_sha256**。
- **本地：** 下载 JSON 后，提供绝对 `package_path`；相对路径还必须提供包含文件的绝对 `workspace`。

只有已连接的工作台可用时，使用**安装 Workflow**。不要把包正文复制进模型。Host 校验完整性、恢复声明的资源并导入 Workflow。更新时若目录和下载不同，重新读取两者；持续不匹配就报告。同 ID 冲突通过安装器解决，不能删除用户已有 Workflow 强行替换。

包内包含脚本、参考资料和资源字节。HTML 包还包含渲染器及打包的 JavaScript 库，**不需要安装原 Skill、另拉原仓库或单独 npm 安装渲染器**。声明的 `am_*` 工具是包提供的 Host 适配器，不是要按这些名称另行安装的 MCP 服务。

## 3. 安装目标路线的依赖

同时检查全局依赖与所选节点的 `runtime_requirements`。条件依赖不一定出现在全局清单。

导入上游 0.5.3 HTML 包前，先从当前 `main` 更新引擎。它明确声明的 WebM 操作需要 Host 长任务期限支持；旧构建即使仍标为 1.2，也可能拒绝该契约。使用正常引擎安装器并检查当前连接，无需重装应用或试跑业务 Run。

| 路线 | 额外要求 |
| --- | --- |
| HTML、图解、批量网页 | Node.js **20+** |
| MP4 导出或已有播放器复用（`export_mp4`、`reuse_video`） | Node.js **22+**、FFmpeg、兼容 Chrome 的浏览器 |
| WebM 导出或已有播放器复用（`export_webm`、`reuse_video_webm`） | Node.js **22+**、兼容 Chrome 的浏览器；不要求 FFmpeg |
| 新配音 | 接收端 TTS 配置；ElevenLabs 使用 `ELEVENLABS_API_KEY` 及可选语音／模型 ID；明确选中的本地 TTS 使用 `AM_TTS_URL` 及已有 `AM_TTS_*` 选项 |
| 复用已有配音/文本 | 提供的本地音频、对应文本/字幕及路线输入；不发起新 TTS 请求 |
| 原 Skill 更新路线，仅选中时需要 | `update_npx_skills`：`npx`；`update_git`：`git`、`npm`；`update_claude_plugin`：`claude`；`update_dsh`：`dsh` 及已有 profile/package |
| README/说明文档 | 已启用的配置 Provider **`native-luna`**；无需媒体软件 |

Provider ID 指向接收端配置，不是要下载的模型文件。可选账号和凭据在接收端配置，不包含在包中。

需要 Node/Git 时使用[引擎安装步骤](https://github.com/TohmaN233/codex-agents-workflow/blob/main/INSTALL.zh-CN.md)。视频文件导出先复用已有浏览器，只有 MP4 需要安装 FFmpeg。所选路线缺少工具时，使用现有包管理器安装：

| 系统 | FFmpeg | 没有可用浏览器时 |
| --- | --- | --- |
| Windows / WinGet | `winget install --id Gyan.FFmpeg -e --source winget` | `winget install --id Google.Chrome -e --source winget` |
| macOS / Homebrew | `brew install ffmpeg` | `brew install --cask google-chrome` |
| Debian/Ubuntu | 先 `sudo apt-get update`，再 `sudo apt-get install -y ffmpeg` | 发行版支持的 Chromium 或适配架构的官方 Chrome |

来源：[WinGet FFmpeg](https://github.com/microsoft/winget-pkgs/tree/master/manifests/g/Gyan/FFmpeg)、[WinGet Chrome](https://github.com/microsoft/winget-pkgs/tree/master/manifests/g/Google/Chrome)、[Homebrew FFmpeg](https://formulae.brew.sh/formula/ffmpeg)、[Homebrew Chrome](https://formulae.brew.sh/cask/google-chrome)。

验证实际版本和位置。视频节点使用逻辑名称 `chrome`，已安装浏览器的文件名可能不同。需要时在工作台依赖设置中绑定查到的路径，并通过 `AM_CHROME` 或 `CHROME_PATH` 让渲染器使用同一路径。自动发现系统路径，包括 macOS 应用包内路径和 Windows 可执行路径。现有宿主接口无法注册绑定时，准确报告这个缺失步骤。

安装软件后重新检查宿主。`workflow_prepare_environment` 接收 `workflow_id` 和可选的 `environment_directories`，用来提供 PATH 外发现的目录；它检查依赖，不安装软件。仅通过全局检查不能证明全部条件路线就绪，还需检查目标节点。

普通 HTML/视频采用 cooperative 策略，无需额外开启 Strict。Main worker 需要本地 Codex 执行器时，由 Host 自动注册。这个包出现 `STRICT_DISABLED` 表明旧引擎误用了开关，应按引擎安装步骤更新，不要手填程序摘要。新引擎默认配置也会为真正选择 Strict 的路线启用 Strict。

## 4. 验收就绪状态

读取安装后元数据，确认 ID、可用修订/状态、恢复的资源、Provider 和目标路线可执行依赖。工作台应显示安装的 Workflow。适用时检查依赖，无需为安装验收启动 benchmark 或付费配音。

报告 ID/修订、资源导入结果、依赖版本/路径与已就绪路线。缺少软件、登录、凭据或路径绑定时准确指出。保留已有安装，先完成独立步骤，再请求无法代办的人工动作。

使用说明和原 Skill 来源：[HTML/视频](answer-me-with-html.zh-CN.md)、[README/说明文档](github-readme-generator.zh-CN.md)。
