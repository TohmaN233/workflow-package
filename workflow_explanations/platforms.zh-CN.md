# 安装与平台

[English](platforms.md) · [说明索引](README.zh-CN.md)

Codex 包需要 [Codex Agents Workflow 1.2](https://github.com/TohmaN233/codex-agents-workflow)。在工作台选择 **安装 Workflow**，打开下载的 `*.workflow-package.json`。`workflow_install_workflow_package` 工具也支持 `package_path` 或 HTTPS 地址。

[codex/catalog.json](../codex/catalog.json)记录文件／包的完整性和依赖；远程安装可选的 `expected_sha256` 使用文件摘要。安装包版本与引擎发布版本分开维护。

启动前在工作台完成依赖设置。Answer me with HTML 需要 Node.js 20+ 和所选媒体路线的依赖；README 生成器需要启用 `native-luna` Provider。语音凭据和 Provider 配置由接收端提供，导入包不会调用语音服务。同 ID 冲突按安装器提示处理。

`pi/` 为未来 Pi 包预留，目前没有发布 Pi 实现；Codex 包不能直接作为 Pi 包导入。
