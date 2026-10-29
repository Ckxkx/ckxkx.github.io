---
index_img: /img/scenery/sunrise.webp
title: "解决 Ubuntu 没有网络的真神命令"
date: 2026-8-23 12:00:00
categories: "科技"
tags: ["Ubuntu","Linux","网络"]
---

Ubuntu 突然断网时，一条 nmcli 命令重启网络管理器，快速恢复网络连接。

<h2>场景</h2>
<p>Ubuntu 系统使用一段时间后突然没有网络（有线 / Wi-Fi 都无法连接），ping 不通外网，浏览器打不开页面，但系统本身运行正常。这种情况经常发生在：</p>
<ul>
<li>休眠 / 挂起唤醒后</li>
<li>网络服务异常</li>
<li>切换了网络环境</li>
<li>虚拟机中网络状态异常</li>
</ul>
<h2>真神命令</h2>
<p>在终端中执行：</p>


```bash
sudo nmcli networking off
sudo nmcli networking on
```


<p>先关闭网络管理，再重新开启，让 NetworkManager 重新初始化所有网络接口。</p>
<h2>原理</h2>
<p><code>nmcli</code> 是 NetworkManager 的命令行工具，<code>networking off/on</code> 会整体重启网络管理服务，相当于对网络栈做一次「软重置」。比单独重启某个接口（如 <code>ip link set dev eth0 down/up</code>）更彻底，能修复大部分「莫名断网」问题。</p>
<h2>其他排查手段</h2>
<p>如果上面命令无效，可以按顺序尝试：</p>


```bash
# 重启 NetworkManager 服务
sudo systemctl restart NetworkManager

# 查看网卡状态
ip a

# 释放并重新获取 DHCP 地址（有线）
sudo dhclient -r
sudo dhclient
```


<h2>注意事项</h2>
<ul>
<li>命令需要 <code>sudo</code> 权限</li>
<li>如果配置了静态 IP，重启后需确认配置仍然生效</li>
<li>无线网络下，重启后可能需要重新连接 Wi-Fi</li>
<li>在远程服务器上操作时注意：网络重启瞬间 SSH 会短暂断开，随后恢复</li>
</ul>


[旧站收藏页面](https://cvpr.zone.id/collection/ubuntu-network-nmcli-restart/)
