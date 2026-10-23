/**
 * 产品目录 —— 首页、导航栏、页脚、产品横幅与文档实例的唯一数据源。
 *
 * 新增机型：
 * 1. 在 products/ 下复制一个产品目录（如 products/ws2028）；
 * 2. 在下面的数组中追加一项；
 * 3. 新目录内放 sidebars.ts 与文档，路由会自动生成。
 *
 * 修改型号名称时，只需要改这里的 name / nameZh / subtitle 等字段。
 */
export type ProductAccent = 'mint' | 'peach' | 'blue' | 'lemon';

export type Product = {
  /** 路由与文档目录名，建议使用小写短横线 */
  id: string;
  /** 展示用英文型号名 */
  name: string;
  /** 展示用中文全称 */
  nameZh: string;
  /** 导航下拉中的短名称 */
  menuLabel: string;
  /** 一句话定位 */
  subtitle: string;
  /** 首页卡片描述 */
  description: string;
  /** 能力标签 */
  tags: string[];
  /** 主题色 */
  accent: ProductAccent;
  /** 首页/产品页插图 */
  illustration: 'amr-a' | 'amr-b';
  /** 文档完善状态 */
  status: string;
  /** 预留机型：显示入口，但暂不提供完整文档 */
  placeholder?: boolean;
};

export const products: Product[] = [
  {
    id: 'amr-a',
    name: 'WS2024-Lyon Agri-AMR',
    nameZh: 'WS2024 里昂农业自主移动机器人',
    menuLabel: 'WS2024-Lyon Agri-AMR',
    subtitle: '农业自主移动机器人 · 教学与科研',
    description:
      '面向农业场景的自主移动机器人平台，覆盖开箱调试、底盘参数、导航部署、传感器应用与二次开发，适合教学实训、算法验证和田间任务联调。',
    tags: ['ROS 2', '农业场景', '激光导航', '二次开发'],
    accent: 'mint',
    illustration: 'amr-a',
    status: '资料完善中',
  },
  {
    id: 'amr-b',
    name: 'WS2026',
    nameZh: '上海自主移动机器人（暂定）',
    menuLabel: 'WS2026（筹备中）',
    subtitle: '资料筹备中 · 预留专区',
    description:
      'WS2026 产品专区已预留。正式名称、规格与文档结构将在产品资料与视觉主题确认后补充。',
    tags: ['WS2026', '上海', '筹备中'],
    accent: 'blue',
    illustration: 'amr-b',
    status: '资料筹备中',
    placeholder: true,
  },
];

export const productById = (id: string) => products.find((item) => item.id === id);

export const productRoute = (product: Product) => `/${product.id}`;
