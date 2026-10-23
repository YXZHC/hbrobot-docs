import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

import {products} from '@site/src/data/products';
import {tools, categoryById} from '@site/src/data/tools';
import {RobotIllustration} from '@site/src/components/ProductIllustrations';
import {
  ArrowRight,
  Book,
  BookOpen,
  Bot,
  Code,
  Compass,
  Cpu,
  Layers,
  LifeBuoy,
  Rocket,
  Shield,
  Sliders,
  Sparkles,
} from '@site/src/components/Icons';
import styles from './styles.module.css';

const productModules = [
  {
    title: '快速开始',
    description: '开箱核对、上电联网、功能检测与本地调试。',
    count: 4,
    icon: Rocket,
    color: 'mint',
    to: '/amr-a/quick-start',
  },
  {
    title: '规格参数',
    description: '外形、运动、电气、传感器与接口参数。',
    count: 1,
    icon: Book,
    color: 'blue',
    to: '/amr-a/specs',
  },
  {
    title: '硬件与结构',
    description: '系统拓扑、运动底盘、OMS 执行机构与传感器。',
    count: 5,
    icon: Bot,
    color: 'peach',
    to: '/amr-a/hardware',
  },
  {
    title: '参数配置与标定',
    description: 'VMX-Pi、底盘运动学、电机、雷达、IMU 与 Wi-Fi。',
    count: 7,
    icon: Sliders,
    color: 'lemon',
    to: '/amr-a/device-params',
  },
  {
    title: '控制与应用',
    description: '底盘、执行机构、传感器、视觉与综合任务。',
    count: 15,
    icon: Code,
    color: 'blue',
    to: '/amr-a/applications',
  },
  {
    title: '导航与调参',
    description: '建图、AMCL 定位与 Nav2 参数调整建议。',
    count: 1,
    icon: Compass,
    color: 'mint',
    to: '/amr-a/navigation',
  },
  {
    title: '维护与安全',
    description: '日常点检、电池保养、清洁与安全规范。',
    count: 1,
    icon: Shield,
    color: 'peach',
    to: '/amr-a/maintenance',
  },
  {
    title: '产品常见问题',
    description: '启动、网络、运动、导航与传感器排错。',
    count: 1,
    icon: LifeBuoy,
    color: 'lemon',
    to: '/amr-a/faq',
  },
] as const;

const commonModules = [
  {
    title: '开发环境配置',
    description: 'Ubuntu、ROS 2、VS Code、Python 依赖、NVIDIA 驱动与 Docker。',
    count: 8,
    icon: Cpu,
    color: 'blue',
    to: '/docs/software',
  },
  {
    title: '基础教学',
    description: 'ROS 2 通信机制与 Python 编程基础，配套可运行示例。',
    count: 16,
    icon: BookOpen,
    color: 'mint',
    to: '/docs/basics',
  },
  {
    title: 'Ultralytics YOLO',
    description: '图像采集、数据标注、模型训练、导出与 MNN 部署。',
    count: 6,
    icon: Layers,
    color: 'peach',
    to: '/docs/yolo',
  },
  {
    title: '通用常见问题',
    description: '环境、硬件、通信、运动与视觉问题速查。',
    count: 7,
    icon: LifeBuoy,
    color: 'lemon',
    to: '/docs/faq',
  },
] as const;

const firstSteps = [
  {
    title: '先跑通第一次',
    description: '完成开箱、上电、联网和遥控，确认硬件状态正常。',
    to: '/amr-a/quick-start/device-check-and-boot',
  },
  {
    title: '搭好开发环境',
    description: '安装 Ubuntu、ROS 2 和常用工具，准备好开发机。',
    to: '/docs/software/preparation',
  },
  {
    title: '补齐基础知识',
    description: '按需学习 ROS 2 通信与 Python 编程，理解示例代码。',
    to: '/docs/basics/ros2/ros2-overview',
  },
  {
    title: '做第一个应用',
    description: '从底盘速度控制开始，逐步进入导航、视觉与综合任务。',
    to: '/amr-a/applications',
  },
];

type ModuleItem = (typeof commonModules)[number] | (typeof productModules)[number];

function ModuleGrid({items}: {items: readonly ModuleItem[]}) {
  return (
    <div className={styles.modules}>
      {items.map((module) => {
        const Icon = module.icon;
        return (
          <Link key={module.title} to={module.to} className={styles.module}>
            <span className={clsx(styles.moduleIcon, styles[module.color])}>
              <Icon />
            </span>
            <span className={styles.moduleBody}>
              <span className={styles.moduleTitle}>
                {module.title}
                <em>{module.count} 篇</em>
              </span>
              <span className={styles.moduleDesc}>{module.description}</span>
            </span>
            <ArrowRight className={styles.moduleArrow} />
          </Link>
        );
      })}
    </div>
  );
}

export default function DocOverview(): ReactNode {
  return (
    <div className={styles.overview}>
      <section className={styles.hero}>
        <span className={styles.eyebrow}>
          <Sparkles className={styles.eyebrowIcon} />
          Documentation
        </span>
        <h1>文档总览</h1>
        <p>
          这里汇总 WS2024-Lyon Agri-AMR 产品文档、通用开发内容与独立调试工具栏目。
          产品内容按机型组织，通用章节全系列共享；WS2026 专区暂为占位。
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primary} to="/amr-a/quick-start/device-check-and-boot">
            从快速上手开始
            <ArrowRight className={styles.icon} />
          </Link>
          <Link className={styles.ghost} to="/tools">
            打开调试工具
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>先选机型</h2>
          <p>WS2024-Lyon Agri-AMR 文档已上线，WS2026 专区等待后续补充。</p>
        </div>
        <div className={styles.products}>
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/${product.id}`}
              className={clsx(
                styles.product,
                styles[product.accent],
                product.placeholder && styles.productPlaceholder,
              )}>
              <div className={styles.productCopy}>
                <span className={styles.productStatus}>{product.status}</span>
                <strong>{product.name}</strong>
                <span className={styles.productNameZh}>{product.nameZh}</span>
                <span className={styles.productSubtitle}>{product.subtitle}</span>
                <p>{product.description}</p>
                <span className={styles.productCta}>
                  进入专区
                  <ArrowRight className={styles.icon} />
                </span>
              </div>
              <div className={styles.productArt}>
                <RobotIllustration id={product.illustration} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>WS2024-Lyon Agri-AMR 产品文档</h2>
          <p>快速开始、硬件与结构、参数配置与标定、控制与应用均归属该机型专区。</p>
        </div>
        <ModuleGrid items={productModules} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>通用内容</h2>
          <p>开发环境、ROS 2/Python 基础、Ultralytics YOLO 与通用排错，所有机型共享。</p>
        </div>
        <ModuleGrid items={commonModules} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>调试工具</h2>
          <p>独立栏目，集中维护底盘配置、运动标定、地图编辑与导航调试工具。</p>
        </div>
        <div className={styles.toolbox}>
          <div className={styles.toolboxCopy}>
            <span className={styles.toolboxBadge}>Toolbox</span>
            <strong>工具从这里进，不再混在文档目录里</strong>
            <p>
              工具版本从 GitHub Releases 自动读取，分类和下载资产由数据文件驱动，
              后续可以持续扩充。
            </p>
            <div className={styles.toolboxTags}>
              {tools.map((tool) => (
                <span key={tool.id}>
                  {tool.name}
                  <em>{categoryById(tool.category)?.label}</em>
                </span>
              ))}
            </div>
          </div>
          <Link className={styles.primary} to="/tools">
            进入工具栏目
            <ArrowRight className={styles.icon} />
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>第一次来？按这个顺序</h2>
          <p>不用一次看完，先完成当前需要的步骤即可。</p>
        </div>
        <div className={styles.steps}>
          {firstSteps.map((step, index) => (
            <Link key={step.title} to={step.to} className={styles.step}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <span className={styles.stepBody}>
                <strong>{step.title}</strong>
                <span>{step.description}</span>
              </span>
              <ArrowRight className={styles.stepArrow} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.note}>
        <strong>内容状态说明</strong>
        <p>
          产品正式名称为 WS2024-Lyon Agri-AMR；WS2026 的正式名称与主题仍在确认中，
          当前仅保留占位入口。部分章节会以「本章正在整理」标注计划覆盖的知识点。
          如果你希望优先看到某一节，欢迎在 GitHub Issues 中留言。
        </p>
      </section>
    </div>
  );
}
