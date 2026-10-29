---
title: "删除 clone 项目中的 Git 链接"
date: 2026-8-23 12:00:00
categories: "科技"
tags: ["Git","开发工具"]
---

一条命令把从 GitHub 等平台 clone 的项目变成普通文件夹，移除 .git 版本控制目录。

<div><h2>&#x573a;&#x666f;</h2>
<p>&#x5f53;&#x4f60;&#x4ece; GitHub &#x6216;&#x5176;&#x4ed6;&#x5e73;&#x53f0; <code>git clone</code> &#x4e00;&#x4e2a;&#x9879;&#x76ee;&#x540e;&#xff0c;&#x5982;&#x679c;&#x53ea;&#x60f3;&#x4fdd;&#x7559;&#x6e90;&#x7801;&#x6587;&#x4ef6;&#x3001;&#x6446;&#x8131;&#x4e0e;&#x8fdc;&#x7a0b;&#x4ed3;&#x5e93;&#x7684;&#x5173;&#x8054;&#xff08;&#x6bd4;&#x5982;&#x628a;&#x5b83;&#x5f53;&#x4f5c;&#x666e;&#x901a;&#x6587;&#x4ef6;&#x5939;&#x4f7f;&#x7528;&#x3001;&#x6216;&#x4e0d;&#x60f3;&#x8bef; push&#xff09;&#xff0c;&#x9700;&#x8981;&#x5220;&#x9664;&#x9879;&#x76ee;&#x5185;&#x7684; <code>.git</code> &#x76ee;&#x5f55;&#x3002;</p>
<h2>&#x547d;&#x4ee4;</h2>
<p>&#x5728;&#x9879;&#x76ee;&#x6839;&#x76ee;&#x5f55;&#x6267;&#x884c;&#xff1a;</p>
<pre class="language-bash" data-language="bash"><code class="language-bash"><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;.git&quot;</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span>
</code></pre>
<p>&#x8fd9;&#x6761;&#x547d;&#x4ee4;&#x4f1a;&#x9012;&#x5f52;&#x67e5;&#x627e;&#x5f53;&#x524d;&#x76ee;&#x5f55;&#x4e0b;&#x6240;&#x6709;&#x540d;&#x4e3a; <code>.git</code> &#x7684;&#x76ee;&#x5f55;&#xff08;&#x5305;&#x62ec;&#x5b50;&#x9879;&#x76ee;&#x3001;&#x4f9d;&#x8d56;&#x4e2d;&#x7684; git &#x4ed3;&#x5e93;&#xff09;&#xff0c;&#x5e76;&#x5168;&#x90e8;&#x5220;&#x9664;&#x3002;</p>
<h2>&#x8bf4;&#x660e;&#x4e0e;&#x6ce8;&#x610f;</h2>
<ul>
<li><code>find . -name &quot;.git&quot;</code>&#xff1a;&#x4ece;&#x5f53;&#x524d;&#x76ee;&#x5f55;&#x5f00;&#x59cb;&#x9012;&#x5f52;&#x67e5;&#x627e; <code>.git</code> &#x76ee;&#x5f55;</li>
<li><code>xargs rm -rf</code>&#xff1a;&#x628a;&#x627e;&#x5230;&#x7684;&#x8def;&#x5f84;&#x4f20;&#x7ed9; <code>rm -rf</code> &#x5f3a;&#x5236;&#x5220;&#x9664;</li>
<li>&#x26a0;&#xfe0f; <strong>&#x6b64;&#x64cd;&#x4f5c;&#x4e0d;&#x53ef;&#x6062;&#x590d;</strong>&#xff1a;&#x5220;&#x9664;&#x540e;&#x9879;&#x76ee;&#x5c06;&#x5931;&#x53bb;&#x6240;&#x6709; Git &#x5386;&#x53f2;&#x8bb0;&#x5f55;&#xff0c;&#x65e0;&#x6cd5;&#x56de;&#x9000;&#x5230;&#x4efb;&#x610f;&#x63d0;&#x4ea4;</li>
<li>&#x5efa;&#x8bae;&#x5148;&#x786e;&#x8ba4;&#x8def;&#x5f84;&#x518d;&#x6267;&#x884c;&#xff1a;<code>find . -name &quot;.git&quot;</code> &#x5355;&#x72ec;&#x8fd0;&#x884c;&#xff0c;&#x68c0;&#x67e5;&#x5217;&#x51fa;&#x7684;&#x76ee;&#x5f55;&#x90fd;&#x662f;&#x4f60;&#x60f3;&#x5220;&#x9664;&#x7684;</li>
<li>&#x5982;&#x679c;&#x53ea;&#x9700;&#x8981;&#x9876;&#x5c42; <code>.git</code>&#xff0c;&#x4e5f;&#x53ef;&#x4ee5;&#x76f4;&#x63a5; <code>rm -rf .git</code></li>
</ul>
<h2>&#x5220;&#x9664;&#x540e;</h2>
<ul>
<li>&#x9879;&#x76ee;&#x53d8;&#x6210;&#x666e;&#x901a;&#x6587;&#x4ef6;&#x5939;&#xff0c;&#x53ef;&#x81ea;&#x7531;&#x79fb;&#x52a8;&#x3001;&#x590d;&#x5236;</li>
<li>&#x5931;&#x53bb; <code>git log</code>&#x3001;<code>git diff</code> &#x7b49;&#x5386;&#x53f2;&#x529f;&#x80fd;</li>
<li>&#x5982;&#x9700;&#x91cd;&#x65b0;&#x5efa;&#x7acb;&#x7248;&#x672c;&#x7ba1;&#x7406;&#xff0c;&#x53ef;&#x4ee5; <code>git init</code> &#x521d;&#x59cb;&#x5316;&#x4e00;&#x4e2a;&#x65b0;&#x4ed3;&#x5e93;</li>
</ul>
</div>

[旧站收藏页面](https://cvpr.zone.id/collection/git-remove-clone-link/)
