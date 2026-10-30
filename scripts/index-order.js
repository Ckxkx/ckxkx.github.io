/* 首页按下方名单固定排序：新文章发布后，将文件相对 source/_posts 的路径加到列表最前面。 */
'use strict';
const pagination = require('hexo-pagination');
const order = [
  '苏大机试第三批-回忆版.md',
  'technology/从源码角度理解Transformer.md',
  'essays/欢迎来到chen.md',
  'learning/本科期间获奖经历.md',
  'learning/大唐杯证书查询步骤.md',
  'technology/Ubuntu网络恢复.md',
  'technology/刷新Windows环境变量.md',
  'technology/删除项目Git链接.md',
  'technology/苹果图书云端同步.md',
  'technology/Termux手机服务器教程.md',
  'movies/歪比巴卜影院.md',
  'movies/爱看机器人影视.md'
];
const rank = new Map(order.map((name, i) => [name, i]));
hexo.extend.filter.register('after_init', function() {
hexo.extend.generator.register('index', function(locals) {
  const config = this.config;
  const posts = locals.posts.sort('source');
  function path(post) { return String(post.source || '').replace(/\\/g, '/').replace(/^_posts\//, ''); }
  posts.data.sort((a, b) => {
    const pa = path(a), pb = path(b);
    const ra = rank.has(pa) ? rank.get(pa) : -1;
    const rb = rank.has(pb) ? rank.get(pb) : -1;
    return ra - rb || pa.localeCompare(pb, 'zh-CN');
  });
  return pagination(config.index_generator.path || '', posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: (config.index_generator.pagination_dir || config.pagination_dir || 'page') + '/%d/',
    data: { __index: true }
  });
});
});
