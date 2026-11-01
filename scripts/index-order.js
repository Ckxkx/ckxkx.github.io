/* 首页统一按首次发布的 Git 提交时间倒序；无完整 Git 历史时使用文章日期。 */
'use strict';

const pagination = require('hexo-pagination');
const { execFileSync } = require('child_process');

hexo.extend.filter.register('after_init', function() {
  hexo.extend.generator.register('index', function(locals) {
    const config = this.config;
    const posts = locals.posts.sort('source');
    const sourceDir = (config.source_dir || 'source').replace(/\\/g, '/').replace(/\/$/, '');
    const times = new Map();

    function path(post) {
      return String(post.source || '').replace(/\\/g, '/').replace(/^_posts\//, '');
    }
    function articleDate(post) {
      const date = post.date && typeof post.date.valueOf === 'function' ? Number(post.date.valueOf()) : 0;
      return Number.isFinite(date) ? date : 0;
    }

    for (const post of posts.data) {
      const name = path(post);
      let firstPublished = 0;
      try {
        const file = sourceDir + '/_posts/' + name;
        const result = execFileSync('git', ['log', '--follow', '-1', '--diff-filter=A', '--format=%ct', '--', file], {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
        if (/^\d+$/.test(result)) firstPublished = Number(result) * 1000;
      } catch (_) {
        // 本地无 Git 或历史时仍可以生成网站。
      }
      times.set(name, firstPublished || articleDate(post));
    }

    posts.data.sort((a, b) => {
      const pa = path(a), pb = path(b);
      return (times.get(pb) || 0) - (times.get(pa) || 0)
        || articleDate(b) - articleDate(a)
        || pa.localeCompare(pb, 'zh-CN');
    });
    return pagination(config.index_generator.path || '', posts, {
      perPage: config.index_generator.per_page,
      layout: config.index_generator.layout || ['index', 'archive'],
      format: (config.index_generator.pagination_dir || config.pagination_dir || 'page') + '/%d/',
      data: { __index: true }
    });
  });
});
