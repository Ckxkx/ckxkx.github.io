---
index_img: /img/scenery/mist.webp
title: "刷新 Windows 系统环境变量命令"
date: 2026-8-23 12:00:00
categories: "科技"
tags: ["环境变量","Windows"]
---

修改环境变量后，在 PowerShell 里一条命令立即刷新 PATH，无需重启终端或电脑。

<h2>问题</h2>
<p>在 Windows 上安装了新软件（如 Python、Node、Go），或手动修改了系统环境变量后，<strong>已经打开的终端</strong>往往不会立即生效——因为 PATH 是在终端启动时读取并缓存到进程里的。通常需要重开终端，甚至重启电脑才能生效。</p>
<h2>解决方法</h2>
<p>在 PowerShell 中执行以下命令，立即将系统（Machine）和用户（User）的 PATH 合并并应用到当前会话：</p>


```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```


<h2>原理</h2>
<ul>
<li><code>GetEnvironmentVariable(&quot;Path&quot;, &quot;Machine&quot;)</code>：读取<strong>系统级</strong> PATH（所有用户生效）</li>
<li><code>GetEnvironmentVariable(&quot;Path&quot;, &quot;User&quot;)</code>：读取<strong>用户级</strong> PATH（当前用户生效）</li>
<li>把两者合并后写回当前会话的 <code>&#x24;env:Path</code>，终端立刻拥有最新的搜索路径</li>
</ul>
<h2>验证</h2>
<p>刷新后运行 <code>echo &#x24;env:Path</code> 查看是否包含新路径，或直接执行刚安装的命令（如 <code>python --version</code>）确认生效。</p>
<h2>补充</h2>
<ul>
<li>只对<strong>当前 PowerShell 会话</strong>生效，新开的终端会自动读取最新值</li>
<li>若需要每次打开终端自动刷新，可以把命令加入 PowerShell 的 <code>&#x24;PROFILE</code></li>
<li>命令行 CMD 中可改用：<code>refreshenv</code>（需安装 Chocolatey 环境增强）或重开窗口</li>
</ul>


[旧站收藏页面](https://cvpr.zone.id/collection/windows-refresh-env-vars/)
