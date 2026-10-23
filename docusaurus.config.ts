import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import {products} from './src/data/products';

// 部署参数：优先读取环境变量，本地开发默认使用根路径。
// GitHub Actions 会自动注入 SITE_URL / BASE_URL（见 .github/workflows/deploy.yml）。
const siteUrl = (process.env.SITE_URL || 'https://hbrobot.github.io').replace(/\/$/, '');
const rawBaseUrl = process.env.BASE_URL || '/';
const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`;

const mathPlugins = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
};

const productPlugins = products.map((product) => [
  '@docusaurus/plugin-content-docs',
  {
    id: product.id,
    path: `products/${product.id}`,
    routeBasePath: product.id,
    sidebarPath: `./products/${product.id}/sidebars.ts`,
    ...mathPlugins,
  },
]) as NonNullable<Config['plugins']>;

const config: Config = {
  title: '汇博机器人文档',
  tagline: 'WS2024-Lyon Agri-AMR 技术文档与通用开发手册',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: siteUrl,
  baseUrl,
  organizationName: process.env.GITHUB_REPOSITORY_OWNER || 'hbrobot',
  projectName:
    process.env.GITHUB_REPOSITORY?.split('/')[1] || 'hbrobot.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    mermaid: true,
    mdx1Compat: {
      admonitions: true,
    },
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  plugins: [
    ...productPlugins,
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: ['/docs', ...products.map((p) => `/${p.id}`)],
        blogRouteBasePath: '/blog',
        searchResultLimits: 10,
        searchResultContextMaxLength: 60,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          ...mathPlugins,
        },
        blog: {
          routeBasePath: 'blog',
          blogTitle: '更新日志',
          blogDescription: '站点更新、内容上新与版本变更记录。',
          postsPerPage: 'ALL',
          blogSidebarTitle: '最近更新',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'ignore',
          ...mathPlugins,
        },
        pages: {
          ...mathPlugins,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '汇博机器人文档',
      hideOnScroll: true,
      logo: {
        alt: '汇博机器人',
        src: 'img/brand/huibo-mark.png',
        width: 34,
        height: 34,
      },
      items: [
        {
          type: 'dropdown',
          label: '产品文档',
          position: 'left',
          items: products.map((product) => ({
            to: `/${product.id}`,
            label: product.menuLabel,
          })),
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '通用文档',
        },
        {
          to: '/tools',
          label: '调试工具',
          position: 'left',
        },
        {
          to: '/blog',
          label: '更新日志',
          position: 'left',
        },
        {
          href: 'https://github.com/hbrobot',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: '汇博机器人 HUIBO ROBOTICS',
        src: 'img/brand/huibo-logo.png',
        href: '/',
        width: 196,
        height: 40,
      },
      links: [
        {
          title: '产品文档',
          items: products.map((product) => ({
            label: product.menuLabel,
            to: `/${product.id}`,
          })),
        },
        {
          title: 'WS2024-Lyon Agri-AMR',
          items: [
            {label: '快速开始', to: '/amr-a/quick-start'},
            {label: '规格参数', to: '/amr-a/specs'},
            {label: '参数配置与标定', to: '/amr-a/device-params'},
            {label: '控制与应用', to: '/amr-a/applications'},
          ],
        },
        {
          title: '通用内容',
          items: [
            {label: '开发环境配置', to: '/docs/software/preparation'},
            {label: '基础教学', to: '/docs/basics/ros2/ros2-overview'},
            {label: 'Ultralytics YOLO', to: '/docs/yolo'},
            {label: '常见问题', to: '/docs/faq/faq-overview'},
            {label: '调试工具', to: '/tools'},
          ],
        },
        {
          title: '关于',
          items: [
            {label: '文档总览', to: '/docs'},
            {label: '更新日志', to: '/blog'},
            {label: '提交 Issue', href: 'https://github.com/hbrobot/hbrobot.github.io/issues'},
            {label: '提交 PR', href: 'https://github.com/hbrobot/hbrobot.github.io/compare'},
          ],
        },
      ],
      copyright: `版权所有 © ${new Date().getFullYear()} 汇博机器人 · 世界技能大赛移动机器人项目组`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'python', 'cmake', 'diff'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#7fe3c4',
      },
    },
  ],
};

export default config;
