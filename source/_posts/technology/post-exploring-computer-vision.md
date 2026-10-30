---
permalink: /2026/08/16/post-exploring-computer-vision/
index_img: /img/scenery/sunrise.webp
title: "初探计算机视觉：从图像分类到目标检测"
date: 2026-8-16 12:00:00
categories: [科技, 计算机视觉]
tags: []
---

从传统的图像分类到现代的目标检测技术，计算机视觉的发展脉络与核心思想。

<p>计算机视觉是人工智能领域中最活跃的研究方向之一。它致力于让计算机能够&quot;看懂&quot;和理解图像与视频中的内容。</p>
<h2>图像分类</h2>
<p>图像分类是计算机视觉最基础的任务之一。给定一张图片，模型需要判断它属于哪个类别。</p>
<p>从早期的手工特征提取（如 SIFT、HOG），到深度学习方法（如 AlexNet、ResNet），图像分类的准确率已经有了质的飞跃。</p>
<h3>ResNet 的贡献</h3>
<p>残差网络（ResNet）通过引入跳跃连接（skip connection），解决了深层网络训练中的梯度消失问题。这使得训练上百层的网络成为可能。</p>


```python
import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, 3, padding=1)
        self.conv2 = nn.Conv2d(out_channels, out_channels, 3, padding=1)
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        residual = x
        out = self.relu(self.conv1(x))
        out = self.conv2(out)
        out += residual
        return self.relu(out)
```


<h2>目标检测</h2>
<p>目标检测不仅要识别图中有什么，还要确定它们在哪里。</p>
<h3>两阶段 vs 一阶段</h3>
<p>两阶段检测器（如 Faster R-CNN）先生成候选区域，再进行分类和回归。一阶段检测器（如 YOLO、SSD）直接预测边界框和类别。</p>
<p>两者的核心区别在于精度和速度的权衡。在实时应用场景中，一阶段方法更具优势。</p>
<h2>未来展望</h2>
<p>随着 Transformer 架构在视觉领域的应用（如 Vision Transformer），计算机视觉正在迎来新的范式变革。多模态学习、自监督学习等方向也为我们提供了新的可能性。</p>
<blockquote>
<p>计算机视觉不仅是一项技术，更是我们理解智能本质的一扇窗口。</p>
</blockquote>
