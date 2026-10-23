export type ToolCategory = {
  id: string;
  label: string;
  description: string;
};

export type ToolAsset = {
  label: string;
  /** GitHub Release 资产文件名关键字 */
  keyword: string;
};

export type Tool = {
  id: string;
  name: string;
  repo: string;
  category: string;
  description: string;
  tags: string[];
  assets: ToolAsset[];
  icon: 'wrench' | 'map' | 'cpu' | 'compass';
  color: 'mint' | 'peach' | 'blue' | 'lemon';
};

export const toolCategories: ToolCategory[] = [
  {
    id: 'hardware',
    label: '硬件调试',
    description: '控制器、驱动器与底盘参数的配置和标定。',
  },
  {
    id: 'navigation',
    label: '地图与导航',
    description: '地图编辑、路径规划与导航过程的可视化调试。',
  },
];

export const tools: Tool[] = [
  {
    id: 'vmxpi-tool',
    name: 'HB-VmxPiTool',
    repo: 'hbrobot/HB-VmxPiTool',
    category: 'hardware',
    description:
      'VMX-Pi 控制器上位机调试工具，支持底盘参数配置、运动学标定与实时状态监控。',
    tags: ['Linux', 'x86_64', '.deb'],
    assets: [{label: '下载 Linux 版', keyword: 'Linux-x86_64.deb'}],
    icon: 'cpu',
    color: 'mint',
  },
  {
    id: 'navmap-studio',
    name: 'NavMap-Studio',
    repo: 'YXZHC/NavMap-Studio',
    category: 'navigation',
    description:
      '导航地图编辑与路径规划调试工具，支持建图、标注、轨迹回放与参数调优。',
    tags: ['Ubuntu 22.04', 'Windows 10+', '.deb / .exe'],
    assets: [
      {label: '下载 Linux 版', keyword: 'ubuntu22.04-amd64.deb'},
      {label: '下载 Windows 版', keyword: 'Windows-x64-Setup.exe'},
    ],
    icon: 'map',
    color: 'peach',
  },
];

export const categoryById = (id: string) =>
  toolCategories.find((category) => category.id === id);
