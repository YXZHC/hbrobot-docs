import type {ReactNode} from 'react';

/**
 * 糖果色产品插图（内联 SVG）。
 * 新增机型时在这里补一个组件，并在 products 数据里指定 illustration 字段。
 */

type IllustrationProps = {className?: string};

function Shadow({cx = 160, cy = 190, rx = 88}: {cx?: number; cy?: number; rx?: number}) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="10" fill="url(#candy-shadow)" />;
}

export function AmrAIllustration({className}: IllustrationProps): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 320 220"
      role="img"
      aria-label="WS2024-Lyon Agri-AMR 移动机器人插图">
      <defs>
        <linearGradient id="a-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ff0d8" />
          <stop offset="100%" stopColor="#3ec9a7" />
        </linearGradient>
        <linearGradient id="a-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8fff8" />
          <stop offset="100%" stopColor="#b7f5e2" />
        </linearGradient>
        <linearGradient id="a-wheel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c4a4a" />
          <stop offset="100%" stopColor="#162e31" />
        </linearGradient>
        <radialGradient id="candy-shadow">
          <stop offset="0%" stopColor="#2f7f6d" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2f7f6d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="a-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3ec9a7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3ec9a7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <Shadow cy={188} rx={92} />

      {/* 扫描范围 */}
      <path d="M160 86 L74 180 M160 86 L246 180" stroke="#7fe3c4" strokeWidth="2" strokeDasharray="4 7" opacity="0.7" />
      <path d="M160 86 L74 180 A116 116 0 0 0 246 180 Z" fill="url(#a-scan)" opacity="0.65" />

      {/* 机身 */}
      <rect x="66" y="112" width="188" height="54" rx="24" fill="url(#a-body)" />
      <rect x="78" y="120" width="164" height="20" rx="10" fill="url(#a-deck)" opacity="0.9" />
      <rect x="86" y="146" width="54" height="8" rx="4" fill="#1d8f76" opacity="0.55" />
      <circle cx="226" cy="150" r="5" fill="#e8fff8" />
      <circle cx="210" cy="150" r="3" fill="#e8fff8" opacity="0.7" />

      {/* 轮子 */}
      <circle cx="100" cy="168" r="18" fill="url(#a-wheel)" />
      <circle cx="100" cy="168" r="7" fill="#9ff0d8" />
      <circle cx="220" cy="168" r="18" fill="url(#a-wheel)" />
      <circle cx="220" cy="168" r="7" fill="#9ff0d8" />

      {/* 激光雷达 */}
      <rect x="142" y="82" width="36" height="26" rx="9" fill="#2c4a4a" />
      <rect x="148" y="88" width="24" height="8" rx="4" fill="#7fe3c4" opacity="0.65" />
      <circle cx="160" cy="76" r="12" fill="#9ff0d8" />
      <circle cx="160" cy="76" r="5" fill="#f3fffb" />
      <circle cx="160" cy="76" r="22" stroke="#3ec9a7" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* 天线与装饰 */}
      <rect x="246" y="72" width="4" height="36" rx="2" fill="#3ec9a7" />
      <circle cx="248" cy="68" r="6" fill="#ffd97d" />
      <path d="M58 96c-8-6-16-7-24-4M262 106c8-3 15-2 21 2" stroke="#7fe3c4" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <circle cx="54" cy="64" r="4" fill="#ffb3a7" opacity="0.9" />
      <circle cx="272" cy="52" r="5" fill="#9ccbff" opacity="0.9" />
      <circle cx="286" cy="72" r="3" fill="#ffd97d" />
    </svg>
  );
}

export function AmrBIllustration({className}: IllustrationProps): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 320 220"
      role="img"
      aria-label="WS2026 预留专区插图">
      <defs>
        <linearGradient id="b-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffc9b9" />
          <stop offset="100%" stopColor="#f58f7c" />
        </linearGradient>
        <linearGradient id="b-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1e8" />
          <stop offset="100%" stopColor="#ffd9c9" />
        </linearGradient>
        <linearGradient id="b-wheel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3235" />
          <stop offset="100%" stopColor="#2a1c1f" />
        </linearGradient>
        <linearGradient id="b-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f58f7c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f58f7c" stopOpacity="0" />
        </linearGradient>
      </defs>

      <Shadow cy={192} rx={104} />

      {/* 货箱 */}
      <rect x="92" y="52" width="136" height="64" rx="16" fill="url(#b-box)" />
      <rect x="106" y="66" width="108" height="6" rx="3" fill="#f58f7c" opacity="0.45" />
      <rect x="106" y="80" width="72" height="6" rx="3" fill="#f58f7c" opacity="0.3" />
      <path d="M160 52v64" stroke="#f58f7c" strokeWidth="2" opacity="0.25" />

      {/* 车身 */}
      <rect x="54" y="112" width="212" height="58" rx="26" fill="url(#b-body)" />
      <rect x="68" y="120" width="184" height="18" rx="9" fill="#fff1e8" opacity="0.65" />
      <rect x="70" y="148" width="64" height="8" rx="4" fill="#b64f43" opacity="0.45" />
      <circle cx="244" cy="152" r="5" fill="#fff8f4" />
      <rect x="226" y="146" width="10" height="10" rx="3" fill="#ffd97d" opacity="0.75" />

      {/* 四轮 */}
      <circle cx="92" cy="172" r="20" fill="url(#b-wheel)" />
      <circle cx="92" cy="172" r="7" fill="#ffc9b9" />
      <circle cx="228" cy="172" r="20" fill="url(#b-wheel)" />
      <circle cx="228" cy="172" r="7" fill="#ffc9b9" />
      <circle cx="116" cy="176" r="15" fill="url(#b-wheel)" opacity="0.55" />
      <circle cx="204" cy="176" r="15" fill="url(#b-wheel)" opacity="0.55" />

      {/* 传感器 */}
      <rect x="138" y="92" width="44" height="22" rx="8" fill="#4a3235" />
      <circle cx="160" cy="84" r="13" fill="#ffd9c9" />
      <circle cx="160" cy="84" r="5" fill="#fff8f4" />
      <path d="M160 84 L88 182 M160 84 L232 182" stroke="#f58f7c" strokeWidth="2" strokeDasharray="4 7" opacity="0.55" />
      <path d="M160 84 L88 182 A104 104 0 0 0 232 182 Z" fill="url(#b-scan)" opacity="0.6" />

      {/* 前脸灯带 */}
      <rect x="64" y="132" width="34" height="6" rx="3" fill="#fff8f4" opacity="0.9" />

      {/* 装饰 */}
      <circle cx="48" cy="78" r="5" fill="#7fe3c4" opacity="0.9" />
      <circle cx="276" cy="96" r="4" fill="#9ccbff" opacity="0.9" />
      <circle cx="286" cy="62" r="3" fill="#ffd97d" />
      <path d="M256 44c7-5 14-5 20-1" stroke="#f58f7c" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

export function RobotIllustration({id}: {id: 'amr-a' | 'amr-b'}): ReactNode {
  return id === 'amr-a' ? <AmrAIllustration /> : <AmrBIllustration />;
}
