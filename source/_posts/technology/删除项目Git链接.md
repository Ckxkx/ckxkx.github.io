---
permalink: /2026/08/23/git-remove-clone-link/
index_img: /img/scenery/删除git链接.png
title: "删除 clone 项目中的 Git 链接"
date: 2026-8-23 12:00:00
categories: 科技
tags: ["Git","开发工具"]
---

一条命令把从 GitHub 等平台 clone 的项目变成普通文件夹，移除 .git 版本控制目录。

## 场景

当你从 GitHub 或其他平台 `git clone` 一个项目后，如果只想保留源码文件、摆脱与远程仓库的关联（比如把它当作普通文件夹使用、或不想误 push），需要删除项目内的 `.git` 目录。

## 命令

在项目根目录执行：

```bash
find . -name ".git" | xargs rm -rf
```

这条命令会递归查找当前目录下所有名为 `.git` 的目录（包括子项目、依赖中的 git 仓库），并全部删除。

## 说明与注意

- `find . -name ".git"`：从当前目录开始递归查找 `.git` 目录

- `xargs rm -rf`：把找到的路径传给 `rm -rf` 强制删除

- ⚠️ **此操作不可恢复**：删除后项目将失去所有 Git 历史记录，无法回退到任意提交

- 建议先确认路径再执行：`find . -name ".git"` 单独运行，检查列出的目录都是你想删除的

- 如果只需要顶层 `.git`，也可以直接 `rm -rf .git`

## 删除后

- 项目变成普通文件夹，可自由移动、复制

- 失去 `git log`、`git diff` 等历史功能

- 如需重新建立版本管理，可以 `git init` 初始化一个新仓库

