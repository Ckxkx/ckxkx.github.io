---
title: "刷新 Windows 系统环境变量命令"
date: 2026-8-23 12:00:00
categories: "科技"
tags: ["环境变量","Windows"]
---

修改环境变量后，在 PowerShell 里一条命令立即刷新 PATH，无需重启终端或电脑。

<div><h2>&#x95ee;&#x9898;</h2>
<p>&#x5728; Windows &#x4e0a;&#x5b89;&#x88c5;&#x4e86;&#x65b0;&#x8f6f;&#x4ef6;&#xff08;&#x5982; Python&#x3001;Node&#x3001;Go&#xff09;&#xff0c;&#x6216;&#x624b;&#x52a8;&#x4fee;&#x6539;&#x4e86;&#x7cfb;&#x7edf;&#x73af;&#x5883;&#x53d8;&#x91cf;&#x540e;&#xff0c;<strong>&#x5df2;&#x7ecf;&#x6253;&#x5f00;&#x7684;&#x7ec8;&#x7aef;</strong>&#x5f80;&#x5f80;&#x4e0d;&#x4f1a;&#x7acb;&#x5373;&#x751f;&#x6548;&#x2014;&#x2014;&#x56e0;&#x4e3a; PATH &#x662f;&#x5728;&#x7ec8;&#x7aef;&#x542f;&#x52a8;&#x65f6;&#x8bfb;&#x53d6;&#x5e76;&#x7f13;&#x5b58;&#x5230;&#x8fdb;&#x7a0b;&#x91cc;&#x7684;&#x3002;&#x901a;&#x5e38;&#x9700;&#x8981;&#x91cd;&#x5f00;&#x7ec8;&#x7aef;&#xff0c;&#x751a;&#x81f3;&#x91cd;&#x542f;&#x7535;&#x8111;&#x624d;&#x80fd;&#x751f;&#x6548;&#x3002;</p>
<h2>&#x89e3;&#x51b3;&#x65b9;&#x6cd5;</h2>
<p>&#x5728; PowerShell &#x4e2d;&#x6267;&#x884c;&#x4ee5;&#x4e0b;&#x547d;&#x4ee4;&#xff0c;&#x7acb;&#x5373;&#x5c06;&#x7cfb;&#x7edf;&#xff08;Machine&#xff09;&#x548c;&#x7528;&#x6237;&#xff08;User&#xff09;&#x7684; PATH &#x5408;&#x5e76;&#x5e76;&#x5e94;&#x7528;&#x5230;&#x5f53;&#x524d;&#x4f1a;&#x8bdd;&#xff1a;</p>
<pre><code class="language-powershell">&#x24;env:Path = [System.Environment]::GetEnvironmentVariable(&quot;Path&quot;,&quot;Machine&quot;) + &quot;;&quot; + [System.Environment]::GetEnvironmentVariable(&quot;Path&quot;,&quot;User&quot;)
</code></pre>
<h2>&#x539f;&#x7406;</h2>
<ul>
<li><code>GetEnvironmentVariable(&quot;Path&quot;, &quot;Machine&quot;)</code>&#xff1a;&#x8bfb;&#x53d6;<strong>&#x7cfb;&#x7edf;&#x7ea7;</strong> PATH&#xff08;&#x6240;&#x6709;&#x7528;&#x6237;&#x751f;&#x6548;&#xff09;</li>
<li><code>GetEnvironmentVariable(&quot;Path&quot;, &quot;User&quot;)</code>&#xff1a;&#x8bfb;&#x53d6;<strong>&#x7528;&#x6237;&#x7ea7;</strong> PATH&#xff08;&#x5f53;&#x524d;&#x7528;&#x6237;&#x751f;&#x6548;&#xff09;</li>
<li>&#x628a;&#x4e24;&#x8005;&#x5408;&#x5e76;&#x540e;&#x5199;&#x56de;&#x5f53;&#x524d;&#x4f1a;&#x8bdd;&#x7684; <code>&#x24;env:Path</code>&#xff0c;&#x7ec8;&#x7aef;&#x7acb;&#x523b;&#x62e5;&#x6709;&#x6700;&#x65b0;&#x7684;&#x641c;&#x7d22;&#x8def;&#x5f84;</li>
</ul>
<h2>&#x9a8c;&#x8bc1;</h2>
<p>&#x5237;&#x65b0;&#x540e;&#x8fd0;&#x884c; <code>echo &#x24;env:Path</code> &#x67e5;&#x770b;&#x662f;&#x5426;&#x5305;&#x542b;&#x65b0;&#x8def;&#x5f84;&#xff0c;&#x6216;&#x76f4;&#x63a5;&#x6267;&#x884c;&#x521a;&#x5b89;&#x88c5;&#x7684;&#x547d;&#x4ee4;&#xff08;&#x5982; <code>python --version</code>&#xff09;&#x786e;&#x8ba4;&#x751f;&#x6548;&#x3002;</p>
<h2>&#x8865;&#x5145;</h2>
<ul>
<li>&#x53ea;&#x5bf9;<strong>&#x5f53;&#x524d; PowerShell &#x4f1a;&#x8bdd;</strong>&#x751f;&#x6548;&#xff0c;&#x65b0;&#x5f00;&#x7684;&#x7ec8;&#x7aef;&#x4f1a;&#x81ea;&#x52a8;&#x8bfb;&#x53d6;&#x6700;&#x65b0;&#x503c;</li>
<li>&#x82e5;&#x9700;&#x8981;&#x6bcf;&#x6b21;&#x6253;&#x5f00;&#x7ec8;&#x7aef;&#x81ea;&#x52a8;&#x5237;&#x65b0;&#xff0c;&#x53ef;&#x4ee5;&#x628a;&#x547d;&#x4ee4;&#x52a0;&#x5165; PowerShell &#x7684; <code>&#x24;PROFILE</code></li>
<li>&#x547d;&#x4ee4;&#x884c; CMD &#x4e2d;&#x53ef;&#x6539;&#x7528;&#xff1a;<code>refreshenv</code>&#xff08;&#x9700;&#x5b89;&#x88c5; Chocolatey &#x73af;&#x5883;&#x589e;&#x5f3a;&#xff09;&#x6216;&#x91cd;&#x5f00;&#x7a97;&#x53e3;</li>
</ul>
</div>

[旧站收藏页面](https://cvpr.zone.id/collection/windows-refresh-env-vars/)
