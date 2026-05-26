# AGENTS.md

## 项目概览

这是一个本地静态版的 AI 工具导航站，目标是复刻 `https://ai-bot.cn/` 的首页内容结构和用户认知习惯。

项目当前没有使用前端框架，也没有构建步骤。页面由原生 `HTML + CSS + JavaScript` 组成，使用一个很轻量的 Node.js 静态服务器在本地运行。

## 目录结构

```text
D:\Codex\Ai集合页
├── .gitignore
├── AGENTS.md
├── index.html
├── script.js
├── server.mjs
├── styles.css
├── preview.png
└── preview-home.png
```

说明：

- `index.html`：页面骨架，包含侧栏容器、顶部导航、搜索区、推荐入口、资讯条、模块定位提示、内容容器和页脚。
- `script.js`：核心数据与交互逻辑。分类、工具卡片、侧栏菜单、搜索过滤、滚动定位都在这里。
- `styles.css`：全站样式、布局、响应式规则、模块高亮和交互状态。
- `server.mjs`：本地静态文件服务器，默认监听 `127.0.0.1:4173`。
- `preview.png`、`preview-home.png`：本地预览截图，已被 `.gitignore` 忽略，不应提交。

## 本地运行

要求本机有 Node.js。

```bash
node server.mjs
```

默认访问地址：

```text
http://127.0.0.1:4173/
```

如需换端口，可设置 `PORT` 环境变量：

```bash
PORT=3000 node server.mjs
```

在 Windows PowerShell 中可用：

```powershell
$env:PORT=3000; node server.mjs
```

## 页面结构

页面主要区域如下：

1. 左侧固定分类导航：`aside.sidebar` 和 `nav#sideNav`
2. 顶部快捷导航：`.topbar`
3. Hero 搜索区：`.hero`
4. 推荐入口：`.notice-grid`
5. 每日快讯：`.news-strip`
6. 内容定位提示：`.module-map`
7. 动态内容区：`#content`
8. 页脚：`.footer`

其中，`#sideNav` 和 `#content` 都由 `script.js` 根据同一份 `sections` 数据动态生成。

## 内容数据

核心数据在 `script.js` 的 `sections` 数组中。

每个分类结构如下：

```js
{
  id: "hot",
  title: "热门AI工具",
  tools: [
    ["Kimi", "工具描述", "hot"],
    ["豆包", "工具描述", "hot"]
  ]
}
```

字段说明：

- `id`：模块锚点 ID，同时用于侧栏跳转，例如 `#hot`。
- `title`：模块标题，也会作为左侧菜单名称。
- `tools`：工具卡片列表。
- 工具数组第 1 项是名称，第 2 项是描述，第 3 项可选，用于标签。
- 可选标签当前支持：
  - `"hot"`：显示“热门”
  - `"new"`：显示“新”

当前页面包含 17 个分类、约 140 个工具卡片。

## 导航与定位规则

项目的核心交互原则是：

```text
菜单名称与模块标题 100% 对齐
```

为避免“点击菜单找不到对应内容”，左侧菜单不要在 `index.html` 中手写。应始终通过 `script.js` 的 `sections` 自动生成。

相关函数：

- `renderNav()`：根据 `sections` 生成左侧菜单。
- `renderSections()`：根据 `sections` 生成右侧模块和工具卡片。
- `locateSection(id)`：定位到指定模块。
- `scrollToSection(id)`：滚动到指定模块，并添加短暂高亮。
- `setActiveNav(id)`：同步左侧菜单高亮。
- `updateActiveByScroll()`：滚动时根据当前位置更新菜单高亮。

如果要新增、删除或重命名分类，只修改 `sections`，不要分别修改菜单和模块标题。

## 搜索交互

搜索逻辑在 `renderSections(filter)` 中完成。

行为：

- 输入关键词时，只展示匹配到的分类和工具。
- 匹配范围包括分类标题、工具名称和工具描述。
- 搜索状态显示匹配到的分类数量和工具数量。
- 没有结果时显示空状态。
- 点击“清空搜索”会恢复全部分类，并定位到“热门AI工具”。

快捷搜索词在 `quickLinks` 数组中维护。

## 样式约定

主要样式变量定义在 `:root` 中：

- `--bg`：页面背景
- `--panel`：卡片背景
- `--text`：主文本颜色
- `--muted`：次级文本颜色
- `--line`：边框颜色
- `--brand`：主品牌蓝色
- `--accent`：辅助绿色
- `--shadow`：通用阴影

布局特点：

- 桌面端左侧栏宽度为 `220px`。
- 主内容区通过 `.page { margin-left: 220px; }` 避开侧栏。
- 工具卡片桌面端 4 列，中等屏幕 3 列，平板 2 列，手机 1 列。
- 侧栏在 `max-width: 900px` 以下变为可展开抽屉。

注意：

- 不要把菜单和模块分成两份样式或两份数据维护。
- 不要移除 `.section.is-located`，它用于点击菜单后的定位反馈。
- `#codex-browser-sidebar-comments-root` 是为了避免 Codex 浏览器评论层拦截点击的本地调试兜底样式，真实用户页面中通常不存在该元素。

## 本地服务器

`server.mjs` 使用 Node.js 内置模块实现：

- `node:http`
- `node:fs/promises`
- `node:path`

它会把 `/` 映射到 `/index.html`，并根据文件扩展名返回基础 `Content-Type`。

已包含路径越界保护：

```js
if (!filepath.startsWith(root)) {
  response.writeHead(403);
  response.end("Forbidden");
  return;
}
```

## Git 与远程仓库

项目已经初始化为 Git 仓库，并推送到 Gitee：

```text
https://gitee.com/chenyishan13/codex-ai-collection.git
```

默认分支：

```text
master
```

`.gitignore` 已排除：

- `node_modules/`
- `.env` 和 `.env.*`
- 构建产物：`dist/`、`build/`
- 缓存目录：`.cache/`、`.parcel-cache/`、`.vite/`
- 日志文件
- 本地预览截图：`preview*.png`
- 临时抓取文件：`ai-bot-home.html`
- 系统和编辑器文件：`.DS_Store`、`Thumbs.db`、`Desktop.ini`、`.idea/`、`.vscode/`

## 开发注意事项

1. 新增分类时，只改 `script.js` 的 `sections`。
2. 新增工具时，把工具追加到对应分类的 `tools` 中。
3. 修改分类名称时，确保 `title` 就是最终要展示的菜单名和模块标题。
4. 修改分类锚点时，确保 `id` 唯一且稳定。
5. 不要提交预览截图，截图会被 `.gitignore` 忽略。
6. 修改交互后建议检查：
   - 侧栏菜单数量是否等于模块数量
   - 菜单文本是否等于模块标题
   - 点击菜单是否滚动到右侧同名模块
   - 搜索和清空搜索是否正常
   - 移动端侧栏是否能打开和关闭

## 推荐验证命令

```bash
node --check script.js
node --check server.mjs
node server.mjs
```

然后访问：

```text
http://127.0.0.1:4173/
```

## 后续维护建议

- 如果工具数量继续增加，可以考虑把 `sections` 拆分为独立 JSON 文件。
- 如果需要真实外链跳转，可给每个工具增加 URL 字段，并在渲染卡片时使用真实链接。
- 如果要部署到静态托管平台，只需要托管 `index.html`、`styles.css`、`script.js`；`server.mjs` 只用于本地预览。
