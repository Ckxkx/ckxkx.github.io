---
title: "初探计算机视觉：从图像分类到目标检测"
date: 2026-8-16 12:00:00
categories: "学习"
tags: []
---

从传统的图像分类到现代的目标检测技术，计算机视觉的发展脉络与核心思想。

<div><p>&#x8ba1;&#x7b97;&#x673a;&#x89c6;&#x89c9;&#x662f;&#x4eba;&#x5de5;&#x667a;&#x80fd;&#x9886;&#x57df;&#x4e2d;&#x6700;&#x6d3b;&#x8dc3;&#x7684;&#x7814;&#x7a76;&#x65b9;&#x5411;&#x4e4b;&#x4e00;&#x3002;&#x5b83;&#x81f4;&#x529b;&#x4e8e;&#x8ba9;&#x8ba1;&#x7b97;&#x673a;&#x80fd;&#x591f;&quot;&#x770b;&#x61c2;&quot;&#x548c;&#x7406;&#x89e3;&#x56fe;&#x50cf;&#x4e0e;&#x89c6;&#x9891;&#x4e2d;&#x7684;&#x5185;&#x5bb9;&#x3002;</p>
<h2>&#x56fe;&#x50cf;&#x5206;&#x7c7b;</h2>
<p>&#x56fe;&#x50cf;&#x5206;&#x7c7b;&#x662f;&#x8ba1;&#x7b97;&#x673a;&#x89c6;&#x89c9;&#x6700;&#x57fa;&#x7840;&#x7684;&#x4efb;&#x52a1;&#x4e4b;&#x4e00;&#x3002;&#x7ed9;&#x5b9a;&#x4e00;&#x5f20;&#x56fe;&#x7247;&#xff0c;&#x6a21;&#x578b;&#x9700;&#x8981;&#x5224;&#x65ad;&#x5b83;&#x5c5e;&#x4e8e;&#x54ea;&#x4e2a;&#x7c7b;&#x522b;&#x3002;</p>
<p>&#x4ece;&#x65e9;&#x671f;&#x7684;&#x624b;&#x5de5;&#x7279;&#x5f81;&#x63d0;&#x53d6;&#xff08;&#x5982; SIFT&#x3001;HOG&#xff09;&#xff0c;&#x5230;&#x6df1;&#x5ea6;&#x5b66;&#x4e60;&#x65b9;&#x6cd5;&#xff08;&#x5982; AlexNet&#x3001;ResNet&#xff09;&#xff0c;&#x56fe;&#x50cf;&#x5206;&#x7c7b;&#x7684;&#x51c6;&#x786e;&#x7387;&#x5df2;&#x7ecf;&#x6709;&#x4e86;&#x8d28;&#x7684;&#x98de;&#x8dc3;&#x3002;</p>
<h3>ResNet &#x7684;&#x8d21;&#x732e;</h3>
<p>&#x6b8b;&#x5dee;&#x7f51;&#x7edc;&#xff08;ResNet&#xff09;&#x901a;&#x8fc7;&#x5f15;&#x5165;&#x8df3;&#x8dc3;&#x8fde;&#x63a5;&#xff08;skip connection&#xff09;&#xff0c;&#x89e3;&#x51b3;&#x4e86;&#x6df1;&#x5c42;&#x7f51;&#x7edc;&#x8bad;&#x7ec3;&#x4e2d;&#x7684;&#x68af;&#x5ea6;&#x6d88;&#x5931;&#x95ee;&#x9898;&#x3002;&#x8fd9;&#x4f7f;&#x5f97;&#x8bad;&#x7ec3;&#x4e0a;&#x767e;&#x5c42;&#x7684;&#x7f51;&#x7edc;&#x6210;&#x4e3a;&#x53ef;&#x80fd;&#x3002;</p>
<pre class="language-python" data-language="python"><code class="language-python"><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>nn <span class="token keyword">as</span> nn

<span class="token keyword">class</span> <span class="token class-name">ResidualBlock</span><span class="token punctuation">(</span>nn<span class="token punctuation">.</span>Module<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> in_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>conv1 <span class="token operator">=</span> nn<span class="token punctuation">.</span>Conv2d<span class="token punctuation">(</span>in_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> padding<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>conv2 <span class="token operator">=</span> nn<span class="token punctuation">.</span>Conv2d<span class="token punctuation">(</span>out_channels<span class="token punctuation">,</span> out_channels<span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> padding<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>relu <span class="token operator">=</span> nn<span class="token punctuation">.</span>ReLU<span class="token punctuation">(</span>inplace<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">forward</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">:</span>
        residual <span class="token operator">=</span> x
        out <span class="token operator">=</span> self<span class="token punctuation">.</span>relu<span class="token punctuation">(</span>self<span class="token punctuation">.</span>conv1<span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
        out <span class="token operator">=</span> self<span class="token punctuation">.</span>conv2<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
        out <span class="token operator">+=</span> residual
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>relu<span class="token punctuation">(</span>out<span class="token punctuation">)</span>
</code></pre>
<h2>&#x76ee;&#x6807;&#x68c0;&#x6d4b;</h2>
<p>&#x76ee;&#x6807;&#x68c0;&#x6d4b;&#x4e0d;&#x4ec5;&#x8981;&#x8bc6;&#x522b;&#x56fe;&#x4e2d;&#x6709;&#x4ec0;&#x4e48;&#xff0c;&#x8fd8;&#x8981;&#x786e;&#x5b9a;&#x5b83;&#x4eec;&#x5728;&#x54ea;&#x91cc;&#x3002;</p>
<h3>&#x4e24;&#x9636;&#x6bb5; vs &#x4e00;&#x9636;&#x6bb5;</h3>
<p>&#x4e24;&#x9636;&#x6bb5;&#x68c0;&#x6d4b;&#x5668;&#xff08;&#x5982; Faster R-CNN&#xff09;&#x5148;&#x751f;&#x6210;&#x5019;&#x9009;&#x533a;&#x57df;&#xff0c;&#x518d;&#x8fdb;&#x884c;&#x5206;&#x7c7b;&#x548c;&#x56de;&#x5f52;&#x3002;&#x4e00;&#x9636;&#x6bb5;&#x68c0;&#x6d4b;&#x5668;&#xff08;&#x5982; YOLO&#x3001;SSD&#xff09;&#x76f4;&#x63a5;&#x9884;&#x6d4b;&#x8fb9;&#x754c;&#x6846;&#x548c;&#x7c7b;&#x522b;&#x3002;</p>
<p>&#x4e24;&#x8005;&#x7684;&#x6838;&#x5fc3;&#x533a;&#x522b;&#x5728;&#x4e8e;&#x7cbe;&#x5ea6;&#x548c;&#x901f;&#x5ea6;&#x7684;&#x6743;&#x8861;&#x3002;&#x5728;&#x5b9e;&#x65f6;&#x5e94;&#x7528;&#x573a;&#x666f;&#x4e2d;&#xff0c;&#x4e00;&#x9636;&#x6bb5;&#x65b9;&#x6cd5;&#x66f4;&#x5177;&#x4f18;&#x52bf;&#x3002;</p>
<h2>&#x672a;&#x6765;&#x5c55;&#x671b;</h2>
<p>&#x968f;&#x7740; Transformer &#x67b6;&#x6784;&#x5728;&#x89c6;&#x89c9;&#x9886;&#x57df;&#x7684;&#x5e94;&#x7528;&#xff08;&#x5982; Vision Transformer&#xff09;&#xff0c;&#x8ba1;&#x7b97;&#x673a;&#x89c6;&#x89c9;&#x6b63;&#x5728;&#x8fce;&#x6765;&#x65b0;&#x7684;&#x8303;&#x5f0f;&#x53d8;&#x9769;&#x3002;&#x591a;&#x6a21;&#x6001;&#x5b66;&#x4e60;&#x3001;&#x81ea;&#x76d1;&#x7763;&#x5b66;&#x4e60;&#x7b49;&#x65b9;&#x5411;&#x4e5f;&#x4e3a;&#x6211;&#x4eec;&#x63d0;&#x4f9b;&#x4e86;&#x65b0;&#x7684;&#x53ef;&#x80fd;&#x6027;&#x3002;</p>
<blockquote>
<p>&#x8ba1;&#x7b97;&#x673a;&#x89c6;&#x89c9;&#x4e0d;&#x4ec5;&#x662f;&#x4e00;&#x9879;&#x6280;&#x672f;&#xff0c;&#x66f4;&#x662f;&#x6211;&#x4eec;&#x7406;&#x89e3;&#x667a;&#x80fd;&#x672c;&#x8d28;&#x7684;&#x4e00;&#x6247;&#x7a97;&#x53e3;&#x3002;</p>
</blockquote>
</div>

[旧站收藏页面](https://cvpr.zone.id/collection/post-exploring-computer-vision/)
