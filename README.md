# chen

朱会琛的个人博客，使用 Hexo 和 Fluid 主题。

## 本地使用

安装 Node.js 22 后，运行 `npm ci` 安装依赖，运行 `npm run server` 预览。
使用 `npx hexo new "文章标题"` 创建文章，编辑 `source/_posts/` 中的 Markdown 文件。
提交并推送到 `main` 后，GitHub Actions 自动构建和发布。

GitHub 仓库的 Settings → Pages → Build and deployment → Source 需选择 **GitHub Actions**。
