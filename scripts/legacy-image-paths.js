'use strict';

// Keep previously published /img/ URLs working after moving images to /imgs/.
const fs = require('fs');
const path = require('path');
const legacyImages = [
  "chen-icon.png",
  "chen-portrait-small.webp",
  "covers/Termux教程封面.webp",
  "covers/心情日记封面.webp",
  "covers/智慧社区巡检机器人封面.webp",
  "covers/歪比巴卜影院封面.webp",
  "covers/爱看机器人影视封面.webp",
  "scenery/Ubuntu断网解决.jpg",
  "scenery/Ubuntu断网解决.webp",
  "scenery/Windows临时加载环境变量.png",
  "scenery/iCloud图书无法下载.png",
  "scenery/删除git链接.png",
  "scenery/大唐杯成绩查询指南.jpg",
  "scenery/本科获奖经历.png",
  "scenery/本科获奖经历.webp",
  "文章背景.webp",
  "首页背景.webp"
];

hexo.extend.generator.register('legacy-image-paths', function () {
  return legacyImages.map((name) => ({
    path: `img/${name}`,
    data: () => fs.createReadStream(path.join(hexo.source_dir, 'imgs', name))
  }));
});
