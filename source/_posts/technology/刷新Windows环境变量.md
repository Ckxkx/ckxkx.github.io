---
permalink: /2026/08/23/windows-refresh-env-vars/
index_img: /img/scenery/mist.webp
title: "刷新 Windows 系统环境变量命令"
date: 2026-8-23 12:00:00
categories: 科技
tags: ["环境变量","Windows"]
---

修改环境变量后，在 PowerShell 里一条命令立即刷新 PATH，无需重启终端或电脑。

## 问题

在 Windows 上安装了新软件（如 Python、Node、Go），或手动修改了系统环境变量后，**已经打开的终端**往往不会立即生效——因为 PATH 是在终端启动时读取并缓存到进程里的。通常需要重开终端，甚至重启电脑才能生效。

## 解决方法

在 PowerShell 中执行以下命令，立即将系统（Machine）和用户（User）的 PATH 合并并应用到当前会话：

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## 原理

- `GetEnvironmentVariable("Path", "Machine")`：读取**系统级** PATH（所有用户生效）

- `GetEnvironmentVariable("Path", "User")`：读取**用户级** PATH（当前用户生效）

- 把两者合并后写回当前会话的 `$env:Path`，终端立刻拥有最新的搜索路径

## 验证

刷新后运行 `echo $env:Path` 查看是否包含新路径，或直接执行刚安装的命令（如 `python --version`）确认生效。

## 补充

- 只对**当前 PowerShell 会话**生效，新开的终端会自动读取最新值

- 若需要每次打开终端自动刷新，可以把命令加入 PowerShell 的 `$PROFILE`

- 命令行 CMD 中可改用：`refreshenv`（需安装 Chocolatey 环境增强）或重开窗口

