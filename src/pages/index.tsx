import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import {products, type Product} from '@site/src/data/products';
import {tools, categoryById} from '@site/src/data/tools';
import {
  AmrAIllustration,
  AmrBIllustration,
} from '@site/src/components/ProductIllustrations';
import {
  ArrowRight,
  BookOpen,
  Code,
  Cpu,
  Layers,
  LifeBuoy,
  MapIcon,
  Plus,
  Rocket,
  Sliders,
  Sparkles,
  Wrench,
} from '@site/src/components/Icons';

import styles from './index.module.css';

const stats = [
  {value: String(products.filter((product) => !product.placeholder).length), label: '已上线机型'},
  {value: String(products.length), label: '机型专区'},
  {value: '3', label: '通用章节'},
  {value: String(tools.length), label: '调试工具'},
];

const features = [
  {
    icon: Rocket,
    color: 'mint',
    title: '从开箱到跑通',
    description: '开箱核对、上电自检、网络连接、第一次运动，按顺序一步步完成。',
  },
  {
    icon: Sliders,
    color: 'peach',
    title: '参数可查可调',
    description: '底盘运动学、激光雷达、IMU 与 Wi-Fi 参数，配示例文件与标定方法。',
  },
  {
    icon: Code,
    color: 'blue',
    title: '代码直接复用',
    description: 'Python 控制示例、ROS 2 通信、视觉与 YOLO 应用，贴近真实任务。',
  },
  {
    icon: LifeBuoy,
    color: 'lemon',
    title: '问题有处可查',
    description: 'FAQ、报错速查表与调试工具合集，遇到问题不用从头翻文档。',
  },
] as const;

const learningPath = [
  {
    step: '01',
    title: '认识你的机器人',
    description: '先看产品定位、能力边界与规格参数。',
    to: '/amr-a',
    label: '产品概览',
    color: 'mint',
  },
  {
    step: '02',
    title: '跑通第一次',
    description: '完成开箱、上电、联网和第一次遥控运动。',
    to: '/amr-a/quick-start/device-check-and-boot',
    label: '快速上手',
    color: 'peach',
  },
  {
    step: '03',
    title: '搭好开发环境',
    description: '准备 Ubuntu、ROS 2、VS Code 与常用依赖。',
    to: '/docs/software/preparation',
    label: '环境配置',
    color: 'blue',
  },
  {
    step: '04',
    title: '做出第一个应用',
    description: '从速度控制到建图导航、视觉识别与综合任务。',
    to: '/amr-a/applications',
    label: '控制与应用',
    color: 'lemon',
  },
] as const;

const modules = [
  {
    title: '开发环境配置',
    description: 'Ubuntu、ROS 2、VS Code、Python、NVIDIA 驱动与 Docker',
    count: 8,
    icon: Cpu,
    color: 'blue',
    to: '/docs/software',
  },
  {
    title: '基础教学',
    description: 'ROS 2 通信机制与 Python 编程基础，配套可运行示例',
    count: 16,
    icon: BookOpen,
    color: 'mint',
    to: '/docs/basics',
  },
  {
    title: 'Ultralytics YOLO',
    description: '图像采集、数据标注、模型训练、导出与 MNN 部署',
    count: 6,
    icon: Layers,
    color: 'peach',
    to: '/docs/yolo',
  },
  {
    title: '常见问题',
    description: '环境、硬件、通信、运动与视觉问题的通用排错入口',
    count: 7,
    icon: LifeBuoy,
    color: 'lemon',
    to: '/docs/faq',
  },
] as const;

const faqLinks = [
  {
    question: '电脑连不上机器人怎么办？',
    tag: '网络',
    to: '/docs/faq/hardware-connection-qa',
  },
  {
    question: '导航时定位突然丢失怎么办？',
    tag: '导航',
    to: '/amr-a/faq',
  },
  {
    question: '机器人直线行驶跑偏怎么办？',
    tag: '运动',
    to: '/docs/faq/motion-control-qa',
  },
  {
    question: 'ROS 2 话题能发不能收，从哪里查？',
    tag: '通信',
    to: '/docs/faq/ros2-communication-qa',
  },
];

function ProductArt({product}: {product: Product}) {
  return product.illustration === 'amr-a' ? (
    <AmrAIllustration className={styles.productArtSvg} />
  ) : (
    <AmrBIllustration className={styles.productArtSvg} />
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
}) {
  return (
    <div className={clsx(styles.sectionHeading, align === 'center' && styles.center)}>
      <span className={styles.eyebrow}>
        <Sparkles className={styles.eyebrowIcon} />
        {eyebrow}
      </span>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  const flagship = products[0];
  return (
    <header className={styles.hero}>
      <div className={styles.heroBlobs} aria-hidden="true">
        <span className={styles.blobMint} />
        <span className={styles.blobPeach} />
        <span className={styles.blobBlue} />
        <span className={styles.blobLemon} />
      </div>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={styles.heroBadge}>
            <Sparkles className={styles.badgeIcon} />
            WS2024-Lyon Agri-AMR · 农业自主移动机器人
          </span>
          <h1>
            把移动机器人的
            <br />
            <span className={styles.highlight}>每一步</span>都讲清楚
          </h1>
          <p className={styles.heroLead}>
            {siteConfig.tagline}。产品专区覆盖开箱、联网、参数标定与导航应用，
            通用章节提供 ROS 2、Python 与 Ultralytics YOLO 的开发基础。
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} to="/amr-a">
              进入 WS2024 专区
              <ArrowRight className={styles.buttonIcon} />
            </Link>
            <Link
              className={styles.ghostButton}
              to="/amr-a/quick-start/device-check-and-boot">
              从快速上手开始
            </Link>
          </div>
          <div className={styles.stats}>
            {stats.map((item) => (
              <div key={item.label} className={styles.stat}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <span className={styles.visualTag}>Agri-AMR / ROS 2</span>
            <AmrAIllustration className={styles.heroRobot} />
            <span className={clsx(styles.chip, styles.chipSlam)}>SLAM</span>
            <span className={clsx(styles.chip, styles.chipNav)}>Nav2</span>
            <span className={clsx(styles.chip, styles.chipYolo)}>YOLO</span>
            <span className={clsx(styles.chip, styles.chipRos)}>ROS 2</span>
            <div className={styles.visualFooter}>
              <div>
                <strong>{flagship.name}</strong>
                <span>{flagship.nameZh}</span>
              </div>
              <Link
                to={`/${flagship.id}`}
                aria-label={`查看 ${flagship.name} 文档`}
                className={styles.visualArrow}>
                <ArrowRight />
              </Link>
            </div>
          </div>
          <div className={styles.visualBadge}>
            <span className={styles.badgeDot} />
            WS2026 专区已预留
          </div>
        </div>
      </div>
    </header>
  );
}

function Products() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          id="products"
          eyebrow="Product Docs"
          title="先选机型，再开始探索"
          description="WS2024-Lyon Agri-AMR 已上线完整文档；WS2026 专区已预留，正式资料确认后逐步补充。通用教程全系列共享。"
        />
        <div className={styles.productGrid}>
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/${product.id}`}
              className={clsx(
                styles.productCard,
                styles[product.accent],
                product.placeholder && styles.productPlaceholder,
              )}>
              <div className={styles.productCopy}>
                <div className={styles.productTop}>
                  <span className={styles.productStatus}>{product.status}</span>
                  <span className={styles.productIndex}>0{products.indexOf(product) + 1}</span>
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productNameZh}>{product.nameZh}</p>
                <p className={styles.productSubtitle}>{product.subtitle}</p>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productTags}>
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.productLinks}>
                  {product.placeholder ? (
                    <span>产品资料筹备中</span>
                  ) : (
                    <>
                      <span>快速开始</span>
                      <span>硬件与结构</span>
                      <span>参数配置</span>
                      <span>控制与应用</span>
                    </>
                  )}
                </div>
                <span className={styles.productCta}>
                  查看 {product.name} 专区
                  <ArrowRight className={styles.buttonIcon} />
                </span>
              </div>
              <div className={styles.productArt}>
                <ProductArt product={product} />
              </div>
            </Link>
          ))}
          <div className={styles.moreProduct}>
            <div className={styles.moreIcon}>
              <Plus />
            </div>
            <div>
              <strong>更多机型，持续接入</strong>
              <p>WS2026 之后的机型也会沿用同一产品结构接入，不影响现有文档。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningPath() {
  return (
    <section className={styles.pathSection}>
      <div className="container">
        <SectionHeading
          eyebrow="Learning Path"
          title="不知道从哪里开始？跟着这条路径走"
          description="四步完成从陌生到上手，每一步都配有对应的文档入口。"
          align="center"
        />
        <div className={styles.pathGrid}>
          {learningPath.map((item, index) => (
            <Link key={item.step} to={item.to} className={styles.pathCard}>
              <div className={clsx(styles.pathStep, styles[item.color])}>{item.step}</div>
              {index < learningPath.length - 1 ? (
                <span className={styles.pathLine} aria-hidden="true" />
              ) : null}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.pathLabel}>
                {item.label}
                <ArrowRight className={styles.pathArrow} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHeading
          eyebrow="Why Here"
          title="为真实调试场景而写"
          description="不堆概念，尽量把每一步的条件、现象和排查方法写清楚。"
        />
        <div className={styles.featureGrid}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={styles.featureCard}>
                <div className={clsx(styles.featureIcon, styles[feature.color])}>
                  <Icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className={styles.moduleSection}>
      <div className="container">
        <SectionHeading
          eyebrow="Knowledge Map"
          title="通用内容，按需查阅"
          description="开发环境、ROS 2/Python 基础与 Ultralytics YOLO 独立成章，所有机型共享。"
        />
        <div className={styles.moduleGrid}>
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link key={module.title} to={module.to} className={styles.moduleCard}>
                <div className={clsx(styles.moduleIcon, styles[module.color])}>
                  <Icon />
                </div>
                <div className={styles.moduleBody}>
                  <div className={styles.moduleTitleRow}>
                    <h3>{module.title}</h3>
                    <span>{module.count} 篇</span>
                  </div>
                  <p>{module.description}</p>
                </div>
                <ArrowRight className={styles.moduleArrow} />
              </Link>
            );
          })}
        </div>
        <div className={styles.moduleFooter}>
          <Link to="/docs" className={styles.textLink}>
            查看完整文档目录
            <ArrowRight className={styles.buttonIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className={styles.toolsSection}>
      <div className="container">
        <div className={styles.toolsPanel}>
          <div className={styles.toolsIntro}>
            <span className={styles.toolsEyebrow}>Toolbox · 独立栏目</span>
            <h2>调试工具，不再藏在文档里</h2>
            <p>
              底盘配置、运动标定、地图编辑与导航调试工具集中维护，版本信息直接读取
              GitHub Releases。后续工具会按分类持续接入。
            </p>
            <Link className={styles.toolsCta} to="/tools">
              打开调试工具
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
          <div className={styles.toolGrid}>
            {tools.map((tool) => {
              const Icon = tool.icon === 'map' ? MapIcon : Wrench;
              const category = categoryById(tool.category);
              return (
                <Link key={tool.id} to="/tools" className={styles.toolCard}>
                  <div className={styles.toolCardTop}>
                    <span className={styles.toolIcon}>
                      <Icon />
                    </span>
                    <span className={styles.toolCategory}>{category?.label}</span>
                  </div>
                  <strong>{tool.name}</strong>
                  <p>{tool.description}</p>
                  <div className={styles.toolTags}>
                    {tool.tags.slice(0, 2).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Link>
              );
            })}
            <div className={styles.toolMore}>
              <Wrench />
              <strong>更多工具持续接入</strong>
              <p>新增工具只需要在工具数据中追加一条记录。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <SectionHeading
              eyebrow="Troubleshooting"
              title="卡住了？先看这里"
              description="把最常见的网络、定位、运动与通信问题整理成了快速排查入口。"
            />
            <Link className={styles.primaryButton} to="/docs/faq/faq-overview">
              打开常见问题
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          </div>
          <div className={styles.faqList}>
            {faqLinks.map((item) => (
              <Link key={item.question} to={item.to} className={styles.faqItem}>
                <span className={styles.faqTag}>{item.tag}</span>
                <span className={styles.faqQuestion}>{item.question}</span>
                <ArrowRight className={styles.faqArrow} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaBand}>
          <div className={styles.ctaBlobMint} aria-hidden="true" />
          <div className={styles.ctaBlobPeach} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <span className={styles.ctaEyebrow}>Ready to move?</span>
            <h2>准备好让机器人动起来了吗？</h2>
            <p>从 WS2024-Lyon Agri-AMR 的开箱检查开始，或先浏览通用文档。</p>
            <div className={styles.ctaActions}>
              <Link
                className={styles.ctaPrimary}
                to="/amr-a/quick-start/device-check-and-boot">
                开始快速上手
                <ArrowRight className={styles.buttonIcon} />
              </Link>
              <Link className={styles.ctaGhost} to="/docs">
                浏览文档总览
              </Link>
            </div>
          </div>
          <div className={styles.ctaArt} aria-hidden="true">
            <AmrAIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="汇博机器人技术文档：WS2024-Lyon Agri-AMR 产品专区、WS2026 预留专区、开发环境配置、ROS 2/Python 基础、Ultralytics YOLO 与独立调试工具栏目。">
      <Hero />
      <main>
        <Products />
        <LearningPath />
        <Features />
        <Modules />
        <ToolsSection />
        <FaqPreview />
        <CtaBand />
      </main>
    </Layout>
  );
}
