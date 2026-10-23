import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';

import {categoryById, toolCategories, tools, type Tool} from '@site/src/data/tools';
import {ArrowRight, Compass, Cpu, Download, MapIcon, Wrench} from '@site/src/components/Icons';
import styles from './styles.module.css';

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type ReleaseInfo = {
  tag_name: string;
  html_url: string;
  published_at?: string;
  assets: ReleaseAsset[];
};

type ReleaseState = {
  loading: boolean;
  release: ReleaseInfo | null;
  error: boolean;
};

const releaseCache = new Map<string, ReleaseInfo | null>();

const toolIcon = {
  wrench: Wrench,
  map: MapIcon,
  cpu: Cpu,
  compass: Compass,
};

function useLatestRelease(repo: string): ReleaseState {
  const [state, setState] = useState<ReleaseState>({
    loading: true,
    release: releaseCache.get(repo) ?? null,
    error: false,
  });

  useEffect(() => {
    const cached = releaseCache.get(repo);
    if (cached) {
      setState({loading: false, release: cached, error: false});
      return;
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {Accept: 'application/vnd.github+json'},
    })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API ${response.status}`);
        return response.json() as Promise<ReleaseInfo>;
      })
      .then((release) => {
        releaseCache.set(repo, release);
        if (!cancelled) setState({loading: false, release, error: false});
      })
      .catch(() => {
        releaseCache.set(repo, null);
        if (!cancelled) setState({loading: false, release: null, error: true});
      });

    return () => {
      cancelled = true;
    };
  }, [repo]);

  return state;
}

function formatDate(value?: string): string {
  if (!value) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(value));
}

function ToolCard({tool}: {tool: Tool}) {
  const {loading, release, error} = useLatestRelease(tool.repo);
  const fallback = `https://github.com/${tool.repo}/releases/latest`;
  const Icon = toolIcon[tool.icon];
  const category = categoryById(tool.category);

  return (
    <article className={styles.card}>
      <div className={styles.cardTop}>
        <span className={clsx(styles.icon, styles[tool.color])}>
          <Icon />
        </span>
        <div className={styles.titleGroup}>
          <div className={styles.category}>{category?.label ?? '调试工具'}</div>
          <h2>{tool.name}</h2>
        </div>
        <span className={styles.version}>
          {loading
            ? '检查更新中…'
            : release?.tag_name
              ? release.tag_name
              : error
                ? 'Releases'
                : '暂无版本'}
        </span>
      </div>

      <p className={styles.description}>{tool.description}</p>

      <div className={styles.metaRow}>
        <div className={styles.tags}>
          {tool.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {release?.published_at ? (
          <span className={styles.releaseDate}>更新于 {formatDate(release.published_at)}</span>
        ) : null}
      </div>

      <div className={styles.actions}>
        {tool.assets.map((asset) => {
          const matched = release?.assets.find((item) =>
            item.name.toLowerCase().includes(asset.keyword.toLowerCase()),
          );
          return (
            <a
              key={asset.label}
              className={styles.download}
              href={matched?.browser_download_url || release?.html_url || fallback}
              target="_blank"
              rel="noreferrer">
              <Download className={styles.downloadIcon} />
              {asset.label}
            </a>
          );
        })}
        <a
          className={styles.releaseLink}
          href={release?.html_url || fallback}
          target="_blank"
          rel="noreferrer">
          查看 Releases
          <ArrowRight className={styles.releaseIcon} />
        </a>
      </div>
    </article>
  );
}

export default function ToolCatalog(): ReactNode {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredTools =
    activeCategory === 'all'
      ? tools
      : tools.filter((tool) => tool.category === activeCategory);

  return (
    <div className={styles.catalog}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Tools · 独立工具栏目</span>
          <h1>机器人调试工具</h1>
          <p>
            这里集中维护底盘配置、运动标定、地图编辑与导航调试工具。版本信息会从 GitHub
            Releases 自动获取；新增工具只需在工具数据中追加一条记录。
          </p>
          <div className={styles.heroActions}>
            <a
              className={styles.primaryAction}
              href="https://github.com/hbrobot"
              target="_blank"
              rel="noreferrer">
              浏览 GitHub
              <ArrowRight className={styles.buttonIcon} />
            </a>
            <a
              className={styles.secondaryAction}
              href="https://github.com/hbrobot/hbrobot.github.io/issues/new"
              target="_blank"
              rel="noreferrer">
              推荐或反馈工具
            </a>
          </div>
        </div>
        <div className={styles.heroStats}>
          <div>
            <strong>{tools.length}</strong>
            <span>个工具</span>
          </div>
          <div>
            <strong>{toolCategories.length}</strong>
            <span>个分类</span>
          </div>
          <div>
            <strong>Release</strong>
            <span>自动同步版本</span>
          </div>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="工具分类">
          <button
            type="button"
            className={clsx(styles.filter, activeCategory === 'all' && styles.filterActive)}
            onClick={() => setActiveCategory('all')}>
            全部
            <span>{tools.length}</span>
          </button>
          {toolCategories.map((category) => {
            const count = tools.filter((tool) => tool.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                className={clsx(
                  styles.filter,
                  activeCategory === category.id && styles.filterActive,
                )}
                onClick={() => setActiveCategory(category.id)}>
                {category.label}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
        <span className={styles.toolbarHint}>按类别筛选，点击按钮前往下载</span>
      </div>

      {filteredTools.length > 0 ? (
        <div className={styles.grid}>
          {filteredTools.map((tool) => (
            <ToolCard key={tool.repo} tool={tool} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <strong>这个分类还没有工具</strong>
          <p>欢迎通过 Issues 推荐合适的调试工具。</p>
        </div>
      )}

      <div className={styles.footerGrid}>
        <div className={styles.note}>
          <strong>版本信息如何获取？</strong>
          <p>
            页面通过 GitHub 公共 API 读取最新 Release。如果网络受限、API 限流或仓库暂时没有
            Release，按钮会回退到 Releases 页面，不影响手动下载。
          </p>
        </div>
        <div className={styles.extend}>
          <strong>持续扩充</strong>
          <p>
            工具列表由 <code>src/data/tools.ts</code> 驱动，支持分类、平台标签与多个下载资产。
            新增工具时不需要改动页面结构。
          </p>
        </div>
      </div>
    </div>
  );
}
