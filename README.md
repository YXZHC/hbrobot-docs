# 汇博机器人文档

基于 [Docusaurus 3](https://docusaurus.io/) 的自主移动机器人技术文档站。中文站点，糖果马卡龙主题，支持多机型文档实例、独立工具栏目、全文搜索、Mermaid、KaTeX 与 GitHub Pages 自动部署。

内容由原 MkDocs 站点（`hbrobot/hbrobot.github.io`）迁移并重新组织。

## 内容架构

站点分为四块：

1. **通用内容**：开发环境配置、ROS 2/Python 基础教学、Ultralytics YOLO 与通用常见问题，所有机型共享。
2. **WS2024-Lyon Agri-AMR 专区**：正式英文名 `WS2024-Lyon Agri-AMR`，中文名 `WS2024 里昂农业自主移动机器人`。快速开始、规格参数、硬件与结构、参数配置与标定、控制与应用、导航调参、维护与安全、常见问题均归属该专区。
3. **WS2026 预留专区**：正式名称与视觉主题待确认，当前仅保留产品入口和文档状态说明，不填充未经确认的规格。
4. **调试工具**：独立栏目 `/tools`，支持分类筛选、GitHub Releases 版本读取与数据驱动扩充，不再混在文档目录中。

## 本地运行

```bash
npm install     # 首次安装依赖
npm start       # 开发模式，默认 http://localhost:3000/
```

```bash
npm run build      # 生产构建（含死链检查）
npm run serve      # 预览构建产物
npm run typecheck  # TypeScript 类型检查
npm run clear      # 清理 Docusaurus 缓存
```

> 本地默认使用根路径 `/`。如果部署为项目站点（如 `/robot-docs/`），构建时设置 `BASE_URL=/robot-docs/`。

## 目录结构

```
docs/                     # 通用文档（全机型共享，路由 /docs）
├── index.mdx             # 文档总览
├── software/             # 开发环境配置
├── basics/               # 基础教学（ROS 2 / Python）
├── yolo/                 # Ultralytics YOLO
└── faq/                  # 通用常见问题

products/                 # 机型文档实例（每个目录一个独立路由）
├── amr-a/                # /amr-a · WS2024-Lyon Agri-AMR
│   ├── intro.mdx         # 产品概览（产品横幅）
│   ├── quick-start.mdx   # 快速开始总览
│   ├── quick-start/      # 设备检查、联网、功能检测、本地调试
│   ├── specs.mdx         # 规格参数
│   ├── hardware/         # 硬件与结构
│   ├── device-params/    # 参数配置与标定
│   ├── applications/     # 控制与应用
│   ├── advanced/         # 激光雷达与系统配置
│   ├── navigation.mdx    # 导航与调参
│   ├── maintenance.mdx   # 维护与安全
│   ├── faq.mdx           # 产品常见问题
│   └── sidebars.ts       # 产品侧边栏
└── amr-b/                # /amr-b · WS2026 占位专区
    ├── intro.mdx         # 资料筹备中
    └── sidebars.ts

src/
├── data/products.ts      # 产品名称、中文名、标签、状态与主题的唯一数据源
├── data/tools.ts         # 调试工具分类、仓库、下载资产与图标
├── components/           # 首页、产品横幅、文档总览、工具目录、图标、插图
├── css/custom.css        # 全局主题与文档排版
└── pages/
    ├── index.tsx         # 首页
    └── tools.tsx         # 独立调试工具页 /tools

static/img/brand/         # 公司横版 Logo 与导航栏图标
static/img/docs/          # 文档图片
static/res/               # 参数示例等资源
blog/                     # 更新日志
.github/workflows/        # GitHub Pages 自动部署
```

## 修改机型名称

机型的展示信息全部集中在：

```
src/data/products.ts
```

- `name`：英文正式型号名，如 `WS2024-Lyon Agri-AMR`
- `nameZh`：中文全称
- `menuLabel`：导航下拉中的短名称
- `subtitle` / `description` / `tags` / `status`：定位、描述、标签与资料状态
- `placeholder`：预留机型设为 `true`，产品横幅会自动隐藏未完成的文档入口

修改这些字段会同步到首页、产品横幅、导航栏和页脚。文档正文中的标题与描述仍需要同步修改 `products/<id>/` 下的文档。

## 新增机型

1. 复制 `products/amr-a/` 或 `products/amr-b/` 为 `products/amr-c/`，按需修改文档与 `sidebars.ts`。
2. 在 `src/data/products.ts` 的 `products` 数组中追加一项，`id` 使用 `amr-c`。
3. 如需新的插图，在 `src/components/ProductIllustrations/index.tsx` 中新增组件，并在数据里指定 `illustration` 字段。
4. 运行 `npm run typecheck && npm run build` 验证。

`docusaurus.config.ts` 会根据 `products` 数组自动注册文档实例、导航下拉与页脚链接，不需要逐处手改。

## 扩充调试工具

工具数据集中在 `src/data/tools.ts`：

```ts
{
  id: 'example-tool',
  name: 'Example-Tool',
  repo: 'owner/repo',
  category: 'hardware',        // 对应 toolCategories 中的 id
  description: '一句话说明工具用途。',
  tags: ['Linux', '.deb'],
  assets: [{label: '下载 Linux 版', keyword: 'Linux-x86_64.deb'}],
  icon: 'cpu',
  color: 'mint',
}
```

新增分类时同步在 `toolCategories` 中追加一项。页面会自动生成筛选按钮、版本信息和下载回退链接，无需改动 `src/pages/tools.tsx`。

## 品牌资源

- 导航栏图标：`static/img/brand/huibo-mark.png`
- 页脚横版 Logo：`static/img/brand/huibo-logo.png`
- 站点 favicon：`static/img/favicon.ico`
- 社交分享卡片：`static/img/social-card.png`（源文件 `social-card.svg`）

导航栏、页脚、favicon 与社交分享卡片在 `docusaurus.config.ts` 中配置。

## 部署到 GitHub Pages

站点已配置为使用环境变量覆盖部署参数：

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `SITE_URL` | 站点完整地址，如 `https://hbrobot.github.io` | `https://hbrobot.github.io` |
| `BASE_URL` | 站点路径，组织主页为 `/`，项目站点为 `/仓库名/` | `/` |

`.github/workflows/deploy.yml` 使用 `actions/configure-pages` 自动读取仓库的 Pages 地址，并注入 `SITE_URL` / `BASE_URL`。

启用步骤：

1. 推送仓库到 GitHub。
2. 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。
3. 推送 `main` 分支，等待 Actions 完成部署。

如果沿用组织主页仓库 `hbrobot/hbrobot.github.io`，`BASE_URL` 为 `/`，访问地址是 `https://hbrobot.github.io/`。

## 内容迁移说明

- 原 MkDocs 的 `!!!` / `???` 提示框已转换为 Docusaurus admonition 或 `<details>`。
- `.zh.md` 链接、图片路径、按钮属性、Mermaid 与数学公式已迁移。
- 每页重复的贡献者 HTML 已移除，改为全站统一的 Issue / PR 入口。
- 产品相关内容按机型迁入 `products/amr-a/`，通用内容保留在 `docs/`。
- 调试工具改为独立 React 页面 `/tools`，自动读取 GitHub Releases 最新版本；网络受限时回退到 Releases 页面。
- 站点使用汇博机器人品牌图标、页脚 Logo 与 favicon。

迁移脚本保留在 `scripts/`，仅用于批量清理，不建议在正常内容编辑时重复运行。

## 设计约定

- 主色：薄荷绿 `#0b7f6a`（正文链接与按钮），浅色 `#7fe3c4`（装饰与强调）。
- 辅助色：蜜桃粉 `#ffb3a3`、柠檬黄 `#ffd97d`、雾霾蓝 `#9ccbff`、淡紫 `#c9b8ff`。
- 背景：奶油白 `#fffdf8`；暗色模式为深蓝灰 `#121a21`。
- 圆角：卡片 20–30px，按钮与标签使用胶囊圆角。
- 新增颜色请统一写入 `src/css/custom.css` 的 `--candy-*` 变量。
