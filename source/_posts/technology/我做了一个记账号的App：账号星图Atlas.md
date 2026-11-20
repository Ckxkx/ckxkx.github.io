---
tags:
  - Atlas
  - 独立开发
  - SwiftUI
  - Jetpack Compose
  - PWA
categories:
  - 科技
title: 我做了一个记账号的App：账号星图 Atlas
date: 2026-11-20 21:00:00
index_img: /imgs/atlas/cover.webp
---

## 起因：Codex 买错了号

前几天半夜兴冲冲开了 Codex，付完款一看，不对劲。登的根本不是我的主力 Gmail，而是半年前为了薅羊毛随手注册的一个 Outlook 🫠

发给朋友吐槽，他第一句就问：“你到底有几个号啊？”

我当场沉默，因为我是真的数不清。微信绑的哪个手机号、Steam 用的哪个邮箱、各种小号又绑了哪些 App，全靠脑子记，脑子又不靠谱。

于是一气之下做了个 App：**账号星图 Atlas**。一句话说清楚它干嘛的：

> 记清每个邮箱、手机号，分别注册 / 绑定了哪些网站和 App。

![钱包首页](/imgs/atlas/1-wallet.webp)

## 它长什么样

### 像 Apple 钱包一样的卡片

每个邮箱、每个手机号都是一张卡。左右滑动切换，手机号做成了 SIM 卡的样子，卡片后面的光晕会跟着前面那张卡变色。点开一张卡，这个号绑了哪些 App 一眼就能看到。

![钱包动效](/imgs/atlas/wallet.gif)

### 关系图

这是我自己最喜欢的一页。所有账号和 App 之间自动连线，哪个 App 同时绑了邮箱和手机号，一看就知道。以后想换手机号，先来这里点一下，要改哪些地方清清楚楚。

![关系图](/imgs/atlas/map.gif)

### 网站列表和身份详情

反过来查也行：从 App 出发，看它绑的是哪个号。内置了 100 多个常用 App 的官方图标，添加的时候点一下就行，不用打字。

![网站列表](/imgs/atlas/3-sites.webp)

![身份详情](/imgs/atlas/5-identity.webp)

### 深色 / 浅色

两套配色都单独调过。切换的时候会从按钮的位置画一个圆扩散开，这个动画我磨了很久（iOS 上今天还在修一个切换时抖动的 bug 😂）。

![主题切换](/imgs/atlas/theme.gif)

## 我比较在意的几件事

**不记密码。** 它只记“哪个号绑了哪个 App”，从设计上就不存密码，泄露了也没什么可偷的。

**没有服务器。** 数据默认只存在你自己的设备里。想多设备同步的话，用你自己的 Gitee（或 GitHub）Gist，在本地先用 AES-GCM 加密（密钥由你的同步密码经过 PBKDF2 31 万次派生）再上传，Gist 里存的只是一坨密文，我也看不到。

**三端互通。** 网页、iOS、安卓三个版本的数据格式完全一样，同步可以互相读写。安卓这边我在 CI 里专门写了一个测试，用 iOS / 网页加密出来的数据去给安卓解密，确保一个字节都不差。

**免费，没有广告。**

## 技术上折腾了些啥

- **网页版**：零依赖，纯 HTML + CSS + JS，一个 PWA，断网也能打开。部署在 GitHub Pages。
- **iOS 原生版**：SwiftUI 写的，iOS 17+。动效尽量往系统原生的感觉靠：无回弹的 spring、SF Symbols 的符号动画、触感反馈。没有 Mac，所以整个构建都放在 GitHub Actions 上用 `swiftc` 编译，模拟器自动截图、录屏。
- **安卓原生版**：Kotlin + Jetpack Compose，功能和 iOS 对齐，同样走 GitHub Actions 自动签名发布。
- 每次发版，Release 里同时带上 `Atlas.ipa` 和 `Atlas.apk`。

顺便记两个踩过的坑：

1. **SideStore 安装失败**：SideStore 会用 App 的显示名去注册 App ID，而苹果只接受 ASCII。原来显示名是“账号星图”，直接装不上。解决办法是 `CFBundleDisplayName` 写成 `Atlas`，再用 `InfoPlist.strings` 做本地化，中文系统下照样显示“账号星图”。
2. **主题切换不要用 `withAnimation`**：在 SwiftUI 里用 `withAnimation` 包住配色切换，整个导航栏的大标题都会跟着跳，还卡。最后改成先截一张图盖在最上层，下面直接切换系统的明暗模式，再用一个圆形遮罩把截图“擦掉”。

## 怎么用

> 📖 手把手带图的安装教程在这里：[账号星图 Atlas 安装图解：安卓和 iPhone 都能装](/2026/11/20/technology/账号星图Atlas安装图解：安卓和iPhone/)，安卓 APK 也可以直接在那篇里下载。

- **iPhone（最简单）**：Safari 打开 [huichen.dev/account-atlas](https://huichen.dev/account-atlas/)，点分享（iOS 26 先点右下角的“⋯”），再点“添加到主屏幕”，桌面就多了一个 App。
- **iPhone 原生版**：去 [GitHub Releases](https://github.com/Ckxkx/account-atlas/releases/latest) 下载 `Atlas.ipa`，用 SideStore、爱思助手或 Sideloadly 自签安装。
- **安卓**：同一个页面下载 `Atlas.apk` 直接安装；或者用 Chrome 打开网页版，右上角“⋮”添加到主屏幕。

项目地址：[github.com/Ckxkx/account-atlas](https://github.com/Ckxkx/account-atlas)。有 bug 或者想要的功能，欢迎去提 Issue。

> 源码目前转为私有维护：之前出现过二次打包、倒卖的风险。App 永久免费，只从这个仓库的 Releases 和本站发布，任何收费渠道都不是官方的。

## 最后

做这个的初衷就是不想再买错号了。现在每注册一个新东西，我都会顺手记一笔，心里踏实很多。

你手里一共有几个号？评论区说说 👇
