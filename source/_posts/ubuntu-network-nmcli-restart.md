---
title: "解决 Ubuntu 没有网络的真神命令"
date: 2026-8-23 12:00:00
categories: "科技"
tags: ["Ubuntu","Linux","网络"]
---

Ubuntu 突然断网时，一条 nmcli 命令重启网络管理器，快速恢复网络连接。

<div><h2>&#x573a;&#x666f;</h2>
<p>Ubuntu &#x7cfb;&#x7edf;&#x4f7f;&#x7528;&#x4e00;&#x6bb5;&#x65f6;&#x95f4;&#x540e;&#x7a81;&#x7136;&#x6ca1;&#x6709;&#x7f51;&#x7edc;&#xff08;&#x6709;&#x7ebf; / Wi-Fi &#x90fd;&#x65e0;&#x6cd5;&#x8fde;&#x63a5;&#xff09;&#xff0c;ping &#x4e0d;&#x901a;&#x5916;&#x7f51;&#xff0c;&#x6d4f;&#x89c8;&#x5668;&#x6253;&#x4e0d;&#x5f00;&#x9875;&#x9762;&#xff0c;&#x4f46;&#x7cfb;&#x7edf;&#x672c;&#x8eab;&#x8fd0;&#x884c;&#x6b63;&#x5e38;&#x3002;&#x8fd9;&#x79cd;&#x60c5;&#x51b5;&#x7ecf;&#x5e38;&#x53d1;&#x751f;&#x5728;&#xff1a;</p>
<ul>
<li>&#x4f11;&#x7720; / &#x6302;&#x8d77;&#x5524;&#x9192;&#x540e;</li>
<li>&#x7f51;&#x7edc;&#x670d;&#x52a1;&#x5f02;&#x5e38;</li>
<li>&#x5207;&#x6362;&#x4e86;&#x7f51;&#x7edc;&#x73af;&#x5883;</li>
<li>&#x865a;&#x62df;&#x673a;&#x4e2d;&#x7f51;&#x7edc;&#x72b6;&#x6001;&#x5f02;&#x5e38;</li>
</ul>
<h2>&#x771f;&#x795e;&#x547d;&#x4ee4;</h2>
<p>&#x5728;&#x7ec8;&#x7aef;&#x4e2d;&#x6267;&#x884c;&#xff1a;</p>
<pre class="language-bash" data-language="bash"><code class="language-bash"><span class="token function">sudo</span> nmcli networking off
<span class="token function">sudo</span> nmcli networking on
</code></pre>
<p>&#x5148;&#x5173;&#x95ed;&#x7f51;&#x7edc;&#x7ba1;&#x7406;&#xff0c;&#x518d;&#x91cd;&#x65b0;&#x5f00;&#x542f;&#xff0c;&#x8ba9; NetworkManager &#x91cd;&#x65b0;&#x521d;&#x59cb;&#x5316;&#x6240;&#x6709;&#x7f51;&#x7edc;&#x63a5;&#x53e3;&#x3002;</p>
<h2>&#x539f;&#x7406;</h2>
<p><code>nmcli</code> &#x662f; NetworkManager &#x7684;&#x547d;&#x4ee4;&#x884c;&#x5de5;&#x5177;&#xff0c;<code>networking off/on</code> &#x4f1a;&#x6574;&#x4f53;&#x91cd;&#x542f;&#x7f51;&#x7edc;&#x7ba1;&#x7406;&#x670d;&#x52a1;&#xff0c;&#x76f8;&#x5f53;&#x4e8e;&#x5bf9;&#x7f51;&#x7edc;&#x6808;&#x505a;&#x4e00;&#x6b21;&#x300c;&#x8f6f;&#x91cd;&#x7f6e;&#x300d;&#x3002;&#x6bd4;&#x5355;&#x72ec;&#x91cd;&#x542f;&#x67d0;&#x4e2a;&#x63a5;&#x53e3;&#xff08;&#x5982; <code>ip link set dev eth0 down/up</code>&#xff09;&#x66f4;&#x5f7b;&#x5e95;&#xff0c;&#x80fd;&#x4fee;&#x590d;&#x5927;&#x90e8;&#x5206;&#x300c;&#x83ab;&#x540d;&#x65ad;&#x7f51;&#x300d;&#x95ee;&#x9898;&#x3002;</p>
<h2>&#x5176;&#x4ed6;&#x6392;&#x67e5;&#x624b;&#x6bb5;</h2>
<p>&#x5982;&#x679c;&#x4e0a;&#x9762;&#x547d;&#x4ee4;&#x65e0;&#x6548;&#xff0c;&#x53ef;&#x4ee5;&#x6309;&#x987a;&#x5e8f;&#x5c1d;&#x8bd5;&#xff1a;</p>
<pre class="language-bash" data-language="bash"><code class="language-bash"><span class="token comment"># &#x91cd;&#x542f; NetworkManager &#x670d;&#x52a1;</span>
<span class="token function">sudo</span> systemctl restart NetworkManager

<span class="token comment"># &#x67e5;&#x770b;&#x7f51;&#x5361;&#x72b6;&#x6001;</span>
<span class="token function">ip</span> a

<span class="token comment"># &#x91ca;&#x653e;&#x5e76;&#x91cd;&#x65b0;&#x83b7;&#x53d6; DHCP &#x5730;&#x5740;&#xff08;&#x6709;&#x7ebf;&#xff09;</span>
<span class="token function">sudo</span> dhclient <span class="token parameter variable">-r</span>
<span class="token function">sudo</span> dhclient
</code></pre>
<h2>&#x6ce8;&#x610f;&#x4e8b;&#x9879;</h2>
<ul>
<li>&#x547d;&#x4ee4;&#x9700;&#x8981; <code>sudo</code> &#x6743;&#x9650;</li>
<li>&#x5982;&#x679c;&#x914d;&#x7f6e;&#x4e86;&#x9759;&#x6001; IP&#xff0c;&#x91cd;&#x542f;&#x540e;&#x9700;&#x786e;&#x8ba4;&#x914d;&#x7f6e;&#x4ecd;&#x7136;&#x751f;&#x6548;</li>
<li>&#x65e0;&#x7ebf;&#x7f51;&#x7edc;&#x4e0b;&#xff0c;&#x91cd;&#x542f;&#x540e;&#x53ef;&#x80fd;&#x9700;&#x8981;&#x91cd;&#x65b0;&#x8fde;&#x63a5; Wi-Fi</li>
<li>&#x5728;&#x8fdc;&#x7a0b;&#x670d;&#x52a1;&#x5668;&#x4e0a;&#x64cd;&#x4f5c;&#x65f6;&#x6ce8;&#x610f;&#xff1a;&#x7f51;&#x7edc;&#x91cd;&#x542f;&#x77ac;&#x95f4; SSH &#x4f1a;&#x77ed;&#x6682;&#x65ad;&#x5f00;&#xff0c;&#x968f;&#x540e;&#x6062;&#x590d;</li>
</ul>
</div>

[旧站收藏页面](https://cvpr.zone.id/collection/ubuntu-network-nmcli-restart/)
