#!/usr/bin/env node
/**
 * 清理 MkDocs → Docusaurus 迁移遗留语法：
 * 1. !!! / ??? admonition → Docusaurus admonition / <details>
 * 2. 移除每页重复的贡献者 HTML 区块
 * 3. 重写 13 个“筹备中”占位页
 * 4. 修复底盘参数页里被错误包进 blockquote 的折叠块
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = path.join(ROOT, 'docs');

function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(DOCS).filter((file) => /\.mdx?$/.test(file));

function stripContributors(text) {
  const marker = '\n## 👥 贡献者';
  const index = text.indexOf(marker);
  if (index !== -1) {
    text = text.slice(0, index);
  }
  // 去掉贡献者区块上方孤立的分隔线
  text = text.replace(/\n---\s*$/, '');
  return text.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

const TYPE_MAP = {
  note: 'note',
  tip: 'tip',
  info: 'info',
  warning: 'warning',
  danger: 'danger',
  caution: 'warning',
  success: 'tip',
  summary: 'info',
  question: 'note',
  example: 'info',
  abstract: 'info',
  quote: 'note',
};

function plainTitle(title) {
  return title
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .trim();
}

function isBoundary(line) {
  return (
    /^#{2,6}\s/.test(line) ||
    /^---+\s*$/.test(line) ||
    /^(\s*)(!!!|\?\?\?\+?)\s+/.test(line) ||
    /^```/.test(line)
  );
}

function collectBody(lines, start) {
  let i = start;
  // 跳过标题后的空行，但不丢失正文
  while (i < lines.length && lines[i].trim() === '') i++;

  if (i >= lines.length) return {body: [], next: i};

  const firstIndent = (lines[i].match(/^\s*/) || [''])[0].length;

  if (firstIndent >= 4) {
    const body = [];
    let j = start;
    while (j < lines.length) {
      const line = lines[j];
      if (line.trim() === '') {
        body.push('');
        j++;
        continue;
      }
      const indent = (line.match(/^\s*/) || [''])[0].length;
      if (indent < 4) break;
      body.push(line.slice(4));
      j++;
    }
    while (body.length && body[body.length - 1] === '') body.pop();
    while (body.length && body[0] === '') body.shift();
    return {body, next: j};
  }

  // 未缩进的正文：收集到标题 / 分隔线 / 下一个 admonition / 代码围栏为止
  const body = [];
  let j = start;
  let fence = false;
  while (j < lines.length) {
    const line = lines[j];
    if (/^```/.test(line)) fence = !fence;
    if (!fence && body.length > 0 && isBoundary(line)) break;
    if (!fence && body.length === 0 && /^#{2,6}\s/.test(line)) break;
    body.push(line);
    j++;
  }
  while (body.length && body[body.length - 1].trim() === '') body.pop();
  while (body.length && body[0].trim() === '') body.shift();
  return {body, next: j};
}

function convertAdmonitions(text) {
  const lines = text.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^(\s*)(!!!|\?\?\?\+?)\s+([A-Za-z]+)(?:\s+"(.*)")?\s*$/);
    if (!match) {
      out.push(line);
      continue;
    }
    const [, indent, marker, rawType, rawTitle = ''] = match;
    if (indent.length > 0) {
      out.push(line);
      continue;
    }

    const {body, next} = collectBody(lines, i + 1);
    const type = TYPE_MAP[rawType] || 'note';
    const title = plainTitle(rawTitle);
    const isCollapsible = marker.startsWith('???') && !marker.includes('+');

    if (isCollapsible) {
      out.push('<details>');
      out.push(`<summary>${title || type}</summary>`);
      if (body.length) {
        out.push('', ...body, '');
      }
      out.push('</details>');
    } else {
      out.push(`:::${type}${title ? ` ${title}` : ''}`);
      if (body.length) out.push('', ...body, '');
      out.push(':::');
    }
    i = next - 1;
  }
  return out.join('\n');
}

function fixBlockquoteDetails(text) {
  const lines = text.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^> - \?\?\?\+? (?:example|tip|warning|note) "(.*)"\s*$/);
    if (!match) {
      out.push(line);
      continue;
    }
    const title = plainTitle(match[1]);
    const body = [];
    let j = i + 1;
    while (j < lines.length) {
      const current = lines[j];
      if (current.trim() === '') {
        body.push('');
        j++;
        continue;
      }
      if (!/^    /.test(current)) break;
      body.push(current.slice(4));
      j++;
    }
    while (body.length && body[body.length - 1] === '') body.pop();
    out.push('<details>', `<summary>${title}</summary>`, '', ...body, '', '</details>');
    i = j - 1;
  }
  return out.join('\n');
}

const COMING_SOON = {
  'docs/applications/integration-tasks/visual-tracking-grasp.md': {
    title: '视觉追踪与抓取',
    group: '综合任务实战',
    points: ['目标检测结果与底盘运动闭环', '目标丢失与重新捕获策略', '抓取位姿估算与执行机构联动', '完整任务状态机与异常处理'],
  },
  'docs/applications/integration-tasks/multi-module-task.md': {
    title: '多模块联动示例',
    group: '综合任务实战',
    points: ['底盘、机械臂与传感器的任务编排', 'ROS 2 节点间通信与状态同步', '典型竞赛任务拆解', '联调步骤与常见故障定位'],
  },
  'docs/applications/vision-application/object-detection-basics.md': {
    title: '目标识别基础',
    group: '视觉应用',
    points: ['OpenCV 图像预处理', '颜色与轮廓检测', '传统特征匹配方法', '识别结果与 ROS 2 话题对接'],
  },
  'docs/applications/vision-application/deep-learning-detection.md': {
    title: '深度学习目标检测',
    group: '视觉应用',
    points: ['YOLO 模型在机器人上的部署流程', '推理节点设计', '检测结果可视化与话题发布', '帧率、精度与功耗的平衡'],
  },
  'docs/hardware/motion-chassis.md': {
    title: '运动底盘',
    group: '硬件与结构',
    points: ['底盘机械结构与轮系布置', '电机、编码器与驱动器接线', '差速与全向底盘的运动学差异', '日常检查与维护要点'],
  },
  'docs/hardware/oms-actuator.md': {
    title: 'OMS 执行机构',
    group: '硬件与结构',
    points: ['举升与旋转机构组成', '伺服舵机与限位开关', '执行机构电气接口', '安全限位与急停联动'],
  },
  'docs/hardware/robot-overview.md': {
    title: '整机结构概述',
    group: '硬件与结构',
    points: ['整机外观与模块划分', '主控、驱动与执行机构布局', '传感器安装位置', '线缆走向与维护空间'],
  },
  'docs/hardware/sensor-peripherals.md': {
    title: '传感器外设',
    group: '硬件与结构',
    points: ['激光雷达与深度相机', 'IMU 与里程计', '红外、超声波等测距传感器', '传感器供电、接口与安装规范'],
  },
  'docs/advanced/lidar/lidar-localization-navigation.md': {
    title: '激光定位与导航',
    group: 'LiDAR SDK',
    points: ['激光里程计与地图构建', 'AMCL 定位配置', 'Nav2 代价地图与规划器', '定位丢失后的恢复策略'],
  },
  'docs/advanced/yolo/model-deployment-mnn.md': {
    title: 'MNN 模型部署与应用',
    group: 'Ultralytics YOLO',
    points: ['MNN 模型转换流程', '端侧推理环境准备', '推理节点与图像话题对接', '性能测试与常见问题'],
  },
  'docs/advanced/yolo/dataset-split.md': {
    title: '划分训练集与测试集',
    group: 'Ultralytics YOLO',
    points: ['训练集、验证集、测试集比例', '随机划分与分层抽样', '数据泄漏的常见来源', '划分脚本与目录结构'],
  },
  'docs/advanced/yolo/model-training-export.md': {
    title: 'YOLO 模型训练与导出',
    group: 'Ultralytics YOLO',
    points: ['训练配置与超参数', '训练过程监控', '模型评估指标解读', '导出 ONNX / MNN 等部署格式'],
  },
  'docs/advanced/yolo/dataset-conversion-coco.md': {
    title: '数据集转换（COCO）',
    group: 'Ultralytics YOLO',
    points: ['COCO 标注格式说明', 'COCO → YOLO 坐标转换', '类别映射与文件命名', '转换结果校验'],
  },
};

function rewriteComingSoon(file, text, info) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = match ? match[1] : '';
  const sidebarPosition = (frontmatter.match(/sidebar_position:\s*(\d+)/) || [])[1];
  const lines = [
    '---',
    `title: ${info.title}`,
    `description: ${info.title}——${info.group}章节内容整理中。`,
    ...(sidebarPosition ? [`sidebar_position: ${sidebarPosition}`] : []),
    '---',
    '',
    `# ${info.title}`,
    '',
    `:::info 本章正在整理`,
    `本节属于「${info.group}」，内容正在编写与实测中。以下为计划覆盖的知识点，完成后会第一时间更新。`,
    ':::',
    '',
    '## 计划内容',
    '',
    ...info.points.map((point) => `- ${point}`),
    '',
    '## 先看这些',
    '',
    '- [快速上手](/amr-a/quick-start/device-check-and-boot)',
    '- [参数配置与标定](/amr-a/device-params/vmxpi-titan-params)',
    '- [常见问题](/docs/faq/faq-overview)',
    '',
    ':::tip 想优先看到哪一节？',
    '欢迎在 GitHub Issues 中留言，我们会根据反馈调整编写顺序。',
    ':::',
    '',
  ];
  return lines.join('\n');
}

let changed = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file).replaceAll(path.sep, '/');
  let text = fs.readFileSync(file, 'utf8');
  const before = text;

  if (text.includes('正在紧张筹备中') && COMING_SOON[rel]) {
    text = rewriteComingSoon(file, text, COMING_SOON[rel]);
  } else {
    text = fixBlockquoteDetails(text);
    // 连续转换多次以处理嵌套 admonition
    for (let pass = 0; pass < 3; pass++) {
      const next = convertAdmonitions(text);
      if (next === text) break;
      text = next;
    }
    text = stripContributors(text);
  }

  if (text !== before) {
    fs.writeFileSync(file, text);
    changed++;
  }
}

console.log(`cleaned ${changed} files`);
