---
tags:
  - Atlas
  - 独立开发
  - 教程
  - 安卓
  - iPhone
categories:
  - 科技
title: 账号星图 Atlas 安装图解：安卓和 iPhone 都能装
date: 2026-11-20 22:30:00
index_img: /imgs/atlas/install-cover.webp
---

上一篇 [我做了一个记账号的App：账号星图 Atlas](/2026/11/20/technology/我做了一个记账号的App：账号星图Atlas/) 

因为没上应用商店，确实比点一下“获取”麻烦一点。这篇就一步一步、带图讲清楚。整个 App **免费、没广告**，放心装。

先找到你的手机：

- **安卓**：直接下载 APK 安装，三分钟搞定 👉 [跳到安卓](#安卓手机)
- **iPhone**：最省事是把网页版添加到主屏幕；想要原生版就得借电脑自签一下 👉 [跳到 iPhone](#iPhone)

<!-- more -->

## 安卓手机

<p style="text-align:center;margin:28px 0 8px;">
  <a href="/downloads/Atlas.apk" download="Atlas.apk" style="display:inline-block;padding:16px 40px;border-radius:999px;background:linear-gradient(135deg,#F2675A,#FF9A3C);color:#fff;font-size:20px;font-weight:700;text-decoration:none;box-shadow:0 8px 20px rgba(242,103,90,.35);">⬇ 下载安卓版 Atlas.apk（3.55 MB）</a>
</p>
<p style="text-align:center;font-size:14px;color:#888;margin-top:6px;">
  安卓 8.0 及以上 · 当前版本 v2.0-r18 · 下载慢可以走 <a href="https://github.com/Ckxkx/account-atlas/releases/latest">GitHub Releases 备用链接</a>
</p>

### 第 1 步：下载，点“仍然下载”

点上面的按钮。浏览器会提示“此类文件可能会损害设备”——所有不是从应用商店来的 APK 都会弹这个，点 **“仍然下载”** 就行。

在微信、QQ 里点链接是下不了的，先点右上角“⋯”，选 **“在浏览器打开”**。

![第1步：仍然下载](/imgs/atlas/android-1-download.webp)

### 第 2 步：打开下载好的文件

下载完通知栏会有提示，直接点它。找不到的话，去浏览器的“下载内容”，或者文件管理的 **“下载 / Download”** 文件夹，点 `Atlas.apk`。

![第2步：打开 APK](/imgs/atlas/android-2-open.webp)

### 第 3 步：允许“安装未知应用”

第一次装 APK，系统会拦一下。点弹窗里的 **“设置”**，把当前这个浏览器（或者文件管理）的 **“允许来自此来源的应用”** 打开，再按返回。

不同牌子的手机会多一道关：

- **小米 / HyperOS**：会弹“风险提示”或要求联网扫描，勾选“我已知晓风险”，点继续安装。
- **华为 / 鸿蒙**：纯净模式开着会直接拦截。设置里搜 **“纯净模式”**，先关掉（装完可以再开回去）。
- **OPPO / vivo**：可能要你验证账号密码，或者点 **“继续安装”**、“无视风险安装”。

![第3步：允许安装未知应用](/imgs/atlas/android-3-unknown-apps.webp)

### 第 4 步：安装，打开

回到安装界面点 **“安装”**，几秒就好。装完点“打开”，或者去桌面找 **账号星图** 的图标。

![第4步：安装](/imgs/atlas/android-4-install.webp)

> 安装包一直用同一个签名密钥签的。以后出新版本，直接下载新的 APK **覆盖安装**就行，不用卸载，数据也都还在。

## iPhone

iPhone 有两条路，按自己情况选：

| | 方法一：网页版添加到主屏幕 | 方法二：原生 App（IPA 自签） |
|---|---|---|
| 要不要电脑 | 不用 | 要（Windows / Mac 都行） |
| 难度 | ⭐ | ⭐⭐⭐ |
| 体验 | 全屏、能离线，跟 App 很像 | 原生动画和触感反馈更顺 |
| 麻烦的地方 | 没有 | 免费 Apple ID 签名 7 天过期，要重签 |

不想折腾就选方法一，功能是一样的。

### 方法一：网页版添加到主屏幕（推荐，不用电脑）

**1. 用 Safari 打开** [huichen.dev/account-atlas](https://huichen.dev/account-atlas/)。iOS 26 点右下角的 **“⋯”**，再点“分享”；旧版本直接点底部的分享按钮（方框加向上箭头）。

![方法一第1步：Safari 打开网页版](/imgs/atlas/iphone-web-1-safari.webp)

**2. 往下滑，点“添加到主屏幕”。**

![方法一第2步：添加到主屏幕](/imgs/atlas/iphone-web-2-share.webp)

**3. 点右上角“添加”。** 桌面就多了一个账号星图，点开是全屏的，断网也能用。

![方法一第3步：点添加](/imgs/atlas/iphone-web-3-add.webp)

### 方法二：安装原生版 IPA（需要电脑）

<p style="text-align:center;margin:24px 0 8px;">
  <a href="/downloads/Atlas.ipa" download="Atlas.ipa" style="display:inline-block;padding:14px 34px;border-radius:999px;background:linear-gradient(135deg,#3B6CF6,#6C8CFF);color:#fff;font-size:18px;font-weight:700;text-decoration:none;box-shadow:0 8px 20px rgba(59,108,246,.3);">⬇ 下载 iPhone 原生版 Atlas.ipa（3.7 MB）</a>
</p>
<p style="text-align:center;font-size:14px;color:#888;margin-top:6px;">
  需要 iOS 17 及以上 · 未签名，需自签安装 · 备用：<a href="https://github.com/Ckxkx/account-atlas/releases/latest">GitHub Releases</a>
</p>

这个 IPA 是 **没签名** 的（我没交苹果每年 99 美元的开发者费 😂），所以要用你自己的 Apple ID 签一下再装。建议注册一个小号 Apple ID 专门用来签名。

#### 第 1 步：在电脑上签名并安装

最省心的是 **爱思助手**（Windows / Mac 都有）。手机用数据线连上电脑，然后：

1. 顶部点 **工具箱**
2. 点 **IPA签名**
3. **添加 IPA**，选刚下载的 `Atlas.ipa`
4. 选 **“使用 Apple ID 签名”**，登录你的 Apple ID
5. 点 **开始签名**，签好后在“我的设备 → 应用游戏 → 导入安装”里装到手机

![方法二第1步：爱思助手 IPA 签名](/imgs/atlas/iphone-ipa-1-i4-sign.webp)

不想装爱思的话，也可以用 [Sideloadly](https://sideloadly.io/)：把 IPA 拖进去，填 Apple ID，点 Start，一步装完。

#### 第 2 步：信任开发者

装好第一次点开，会提示“不受信任的开发者”。去 **设置 → 通用 → VPN与设备管理**，点你的 Apple ID 那一项，再点 **“信任”**。

![方法二第2步：信任开发者](/imgs/atlas/iphone-ipa-2-trust.webp)

#### 第 3 步：打开开发者模式

iOS 16 及以上还要多一步：**设置 → 隐私与安全性 → 拉到最底 → 开发者模式**，打开后按提示重启，解锁后再选一次“打开”。

![方法二第3步：开发者模式](/imgs/atlas/iphone-ipa-3-devmode.webp)

> ⚠️ **7 天有效期**：免费 Apple ID 签出来的 App 只能用 7 天，过期后点开会闪退，用爱思重新签一遍、覆盖安装就好，数据不会丢。嫌麻烦的话可以用 [SideStore](https://sidestore.io/)，它能在手机上自动续签。

## 装好之后长这样

![安装好之后的样子](/imgs/atlas/installed-preview.webp)

左右滑卡片切换账号，点“+”加一个邮箱或手机号，再把它绑过的 App 点一点就记好了。具体功能可以看[上一篇](/2026/11/20/technology/我做了一个记账号的App：账号星图Atlas/)。

## 常见问题

**安装失败 / 提示“解析包出错”？**
多半是没下载完整。删掉重新下载一次，换个浏览器下也行。如果手机上之前装过别人改过签名的版本，先卸载再装。

**提示“有风险”“可能是病毒”，能装吗？**
能。系统对所有不是应用商店来的 APK 都会这么说。Atlas 只申请了联网（只用于你自己开启的加密同步）和振动两个权限，不读通讯录、不读短信。官方安装包只在 [GitHub Releases](https://github.com/Ckxkx/account-atlas/releases/latest) 和本站发布，别处下载的（尤其是收费的）都不是官方包，不要装。

**iPhone 版过了 7 天打不开了？**
这是免费 Apple ID 签名的限制，不是 App 坏了。重新签名覆盖安装，数据都在；或者用 SideStore 自动续签。实在嫌烦，就用方法一的网页版，永远不过期。

**数据会不会丢？存在哪？**
数据只存在你自己的手机里，我没有服务器，也看不到你的数据。覆盖安装、重签都不会丢；但**卸载 App 会把数据一起删掉**。所以换手机或卸载前，记得在设置里点 **“导出备份”** 存一份 JSON，到新设备再导入就行。想多设备自动同步，可以开 Gist 加密同步。

---

装的时候卡在哪一步，评论区告诉我，我把这篇补全 👇
