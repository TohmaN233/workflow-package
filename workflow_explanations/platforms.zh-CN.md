# 安装与平台

[English](platforms.md) · [说明索引](README.zh-CN.md)

可执行安装步骤与路线依赖见[安装说明](install.zh-CN.md)。

Codex 包需要 [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow)。在工作台选择 **安装 Workflow**，打开下载的 `*.workflow-package.json`。`workflow_install_workflow_package` 工具也支持 `package_path` 或 HTTPS 地址。

[codex/catalog.json](../codex/catalog.json)记录文件／包的完整性和依赖；远程安装可选的 `expected_sha256` 使用文件摘要。安装包版本与引擎发布版本分开维护。

启动前在工作台完成依赖设置。Answer me with HTML 需要 Node.js 20+ 和所选媒体路线的依赖；README 生成器需要启用 `native-luna` Provider。语音凭据和 Provider 配置由接收端提供，导入包不会调用语音服务。同 ID 冲突按安装器提示处理。

Pi 包在**本地 pi-CAW 构建 0.5.10**、Node.js 22.19+ 和兼容 Pi SDK 上验证。该构建尚未发布，公开 [pi-CAW](https://github.com/TohmaN233/pi-CAW) 的 0.3.1 未通过本包验收。具备兼容 Host 后，通过 Pi 自身的 **安装 Workflow** 操作导入原生 JSON；[pi/catalog.json](../pi/catalog.json)记录摘要和依赖。Main 继承发起会话的模型与思考档位，若有显式子模型槽位，在 **Models** 页配置。详见 [Pi 配置与前端可视化](answer-me-with-html-pi.zh-CN.md)。
