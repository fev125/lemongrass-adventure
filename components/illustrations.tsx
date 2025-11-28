"use client"

interface IllustrationProps {
  className?: string
}

// 阳光花园 - 关卡1正确答案
export function SunnyGardenIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        {/* 渐变定义 */}
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 天空背景渐变 */}
      <rect width="200" height="200" fill="url(#skyGradient)" />

      {/* 远处的小山丘 */}
      <ellipse cx="50" cy="150" rx="60" ry="25" fill="#86efac" opacity="0.6" />
      <ellipse cx="160" cy="155" rx="50" ry="20" fill="#86efac" opacity="0.5" />

      {/* 太阳 - 更可爱的设计 */}
      <g filter="url(#softGlow)">
        <circle cx="160" cy="45" r="28" fill="url(#sunGradient)">
          <animate attributeName="r" values="28;30;28" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* 太阳光芒 - 更柔和 */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1={160 + 32 * Math.cos((angle * Math.PI) / 180)}
          y1={45 + 32 * Math.sin((angle * Math.PI) / 180)}
          x2={160 + 45 * Math.cos((angle * Math.PI) / 180)}
          y2={45 + 45 * Math.sin((angle * Math.PI) / 180)}
          stroke="#fde047"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        >
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}
      {/* 太阳笑脸 */}
      <circle cx="153" cy="42" r="3" fill="#92400e" />
      <circle cx="167" cy="42" r="3" fill="#92400e" />
      <path d="M 152 52 Q 160 60 168 52" stroke="#92400e" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* 蓬松云朵 */}
      <g transform="translate(20, 35)">
        <ellipse cx="25" cy="18" rx="22" ry="14" fill="white" opacity="0.95" />
        <ellipse cx="48" cy="14" rx="18" ry="12" fill="white" opacity="0.95" />
        <ellipse cx="35" cy="24" rx="20" ry="12" fill="white" opacity="0.95" />
        <ellipse cx="15" cy="22" rx="12" ry="10" fill="white" opacity="0.9" />
      </g>

      {/* 主草地 */}
      <path d="M 0 155 Q 50 140 100 150 Q 150 160 200 145 L 200 200 L 0 200 Z" fill="url(#grassGradient)" />
      <path d="M 0 165 Q 60 155 100 162 Q 140 170 200 158 L 200 200 L 0 200 Z" fill="#22c55e" />

      {/* 可爱的花朵 - 左边粉色 */}
      <g transform="translate(35, 145)">
        <rect x="-2" y="0" width="4" height="25" fill="#16a34a" rx="2" />
        <ellipse cx="-8" cy="15" rx="6" ry="3" fill="#4ade80" transform="rotate(-30)" />
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={12 * Math.cos((angle * Math.PI) / 180)}
            cy={-12 + 12 * Math.sin((angle * Math.PI) / 180)}
            rx="8"
            ry="6"
            fill="#fda4af"
            transform={`rotate(${angle}, 0, -12)`}
          />
        ))}
        <circle cx="0" cy="-12" r="6" fill="#fef08a" />
        <circle cx="-1" cy="-13" r="1.5" fill="#fbbf24" />
        <circle cx="2" cy="-11" r="1" fill="#fbbf24" />
      </g>

      {/* 可爱的花朵 - 右边紫色 */}
      <g transform="translate(155, 140)">
        <rect x="-2" y="0" width="4" height="28" fill="#16a34a" rx="2" />
        <ellipse cx="10" cy="12" rx="5" ry="2.5" fill="#4ade80" transform="rotate(25)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={i}
            cx={10 * Math.cos((angle * Math.PI) / 180)}
            cy={-15 + 10 * Math.sin((angle * Math.PI) / 180)}
            rx="7"
            ry="5"
            fill="#c4b5fd"
            transform={`rotate(${angle}, 0, -15)`}
          />
        ))}
        <circle cx="0" cy="-15" r="5" fill="#fef9c3" />
      </g>

      {/* 小花朵点缀 */}
      <g transform="translate(85, 158)">
        <rect x="-1.5" y="0" width="3" height="15" fill="#16a34a" rx="1.5" />
        <circle cx="0" cy="-5" r="5" fill="#fcd34d" />
        <circle cx="0" cy="-5" r="2.5" fill="#f59e0b" />
      </g>
      <g transform="translate(120, 155)">
        <rect x="-1.5" y="0" width="3" height="18" fill="#16a34a" rx="1.5" />
        <circle cx="0" cy="-6" r="6" fill="#f9a8d4" />
        <circle cx="0" cy="-6" r="3" fill="#fef08a" />
      </g>

      {/* 水滴闪闪 */}
      <g>
        <ellipse cx="70" cy="172" rx="12" ry="5" fill="#7dd3fc" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="73" cy="170" rx="3" ry="1.5" fill="white" opacity="0.8" />
      </g>

      {/* 小蝴蝶 */}
      <g transform="translate(100, 100)">
        <ellipse cx="-8" cy="0" rx="6" ry="4" fill="#f9a8d4">
          <animate attributeName="ry" values="4;3;4" dur="0.3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="8" cy="0" rx="6" ry="4" fill="#f9a8d4">
          <animate attributeName="ry" values="4;3;4" dur="0.3s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="0" cy="0" rx="2" ry="5" fill="#831843" />
        <animateTransform attributeName="transform" type="translate" values="100,100;105,95;100,100" dur="3s" repeatCount="indefinite" />
      </g>

      {/* 小草装饰 */}
      <path d="M 15 175 Q 18 165 15 155" stroke="#16a34a" strokeWidth="2" fill="none" />
      <path d="M 20 178 Q 25 168 22 158" stroke="#22c55e" strokeWidth="2" fill="none" />
      <path d="M 180 172 Q 183 162 180 152" stroke="#16a34a" strokeWidth="2" fill="none" />
      <path d="M 185 175 Q 190 165 187 155" stroke="#22c55e" strokeWidth="2" fill="none" />
    </svg>
  )
}

// 雪地 - 关卡1错误答案
export function SnowyLandIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        {/* 渐变定义 */}
        <linearGradient id="winterSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="snowGround" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <filter id="snowGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 冬日天空 */}
      <rect width="200" height="200" fill="url(#winterSky)" />

      {/* 远处的雪山 */}
      <polygon points="0,130 40,80 80,130" fill="#cbd5e1" />
      <polygon points="60,130 110,60 160,130" fill="#94a3b8" />
      <polygon points="140,130 180,90 200,130" fill="#a1a1aa" />
      {/* 雪山顶的积雪 */}
      <polygon points="95,60 110,60 125,75 110,72 95,75" fill="white" />
      <polygon points="30,80 40,80 55,95 40,92 25,95" fill="white" opacity="0.9" />

      {/* 雪地 - 层次感 */}
      <ellipse cx="100" cy="190" rx="130" ry="45" fill="url(#snowGround)" />
      <ellipse cx="100" cy="185" rx="115" ry="38" fill="white" />

      {/* 雪堆 */}
      <ellipse cx="40" cy="175" rx="25" ry="12" fill="white" />
      <ellipse cx="160" cy="178" rx="30" ry="10" fill="#f8fafc" />

      {/* 真实感雪花飘落 - 左右摇摆+旋转+不同速度 */}
      {[
        { x: 20, y: -10, size: 6, dur: 8, delay: 0, swing: 15 },
        { x: 55, y: -20, size: 8, dur: 10, delay: 1.5, swing: 20 },
        { x: 90, y: -15, size: 5, dur: 12, delay: 0.5, swing: 12 },
        { x: 125, y: -25, size: 7, dur: 9, delay: 2, swing: 18 },
        { x: 160, y: -10, size: 6, dur: 11, delay: 3, swing: 14 },
        { x: 40, y: -30, size: 4, dur: 14, delay: 1, swing: 10 },
        { x: 140, y: -20, size: 5, dur: 13, delay: 4, swing: 16 },
        { x: 180, y: -15, size: 7, dur: 9.5, delay: 2.5, swing: 22 },
        { x: 75, y: -35, size: 4, dur: 15, delay: 5, swing: 8 },
        { x: 110, y: -5, size: 6, dur: 10.5, delay: 0.8, swing: 17 },
      ].map((flake, i) => (
        <g key={i} filter="url(#snowGlow)" opacity="0">
          <animateTransform
            attributeName="transform"
            type="translate"
            values={`${flake.x},${flake.y}; ${flake.x + flake.swing},${flake.y + 60}; ${flake.x - flake.swing * 0.5},${flake.y + 120}; ${flake.x + flake.swing * 0.8},${flake.y + 180}; ${flake.x},${flake.y + 220}`}
            dur={`${flake.dur}s`}
            begin={`${flake.delay}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1; 0.4 0 0.6 1"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;1;0.95;0.7;0"
            dur={`${flake.dur}s`}
            begin={`${flake.delay}s`}
            repeatCount="indefinite"
          />
          {/* 六角雪花 - 带旋转 */}
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;180;360"
              dur={`${flake.dur * 1.5}s`}
              begin={`${flake.delay}s`}
              repeatCount="indefinite"
            />
            {/* 中心点 */}
            <circle cx="0" cy="0" r={flake.size * 0.3} fill="white" />
            {/* 六个分支 */}
            {[0, 60, 120, 180, 240, 300].map((angle, j) => (
              <g key={j} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2={flake.size} y2="0" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                {/* 小分支 */}
                <line x1={flake.size * 0.5} y1="0" x2={flake.size * 0.7} y2={-flake.size * 0.25} stroke="white" strokeWidth="0.8" strokeLinecap="round" />
                <line x1={flake.size * 0.5} y1="0" x2={flake.size * 0.7} y2={flake.size * 0.25} stroke="white" strokeWidth="0.8" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </g>
      ))}

      {/* 小雪粒 - 更密集的背景雪 */}
      {[
        { x: 15, y: 20, dur: 6, delay: 0 },
        { x: 35, y: 40, dur: 7, delay: 1 },
        { x: 65, y: 15, dur: 8, delay: 2 },
        { x: 85, y: 55, dur: 6.5, delay: 0.5 },
        { x: 105, y: 30, dur: 7.5, delay: 3 },
        { x: 135, y: 10, dur: 8.5, delay: 1.5 },
        { x: 155, y: 45, dur: 6, delay: 2.5 },
        { x: 175, y: 25, dur: 7, delay: 4 },
        { x: 50, y: 60, dur: 9, delay: 0.3 },
        { x: 120, y: 50, dur: 8, delay: 1.8 },
        { x: 170, y: 70, dur: 7.5, delay: 3.5 },
        { x: 25, y: 75, dur: 6.5, delay: 2.2 },
      ].map((dot, i) => (
        <circle key={`dot-${i}`} cx={dot.x} cy={dot.y} r="1.5" fill="white" opacity="0">
          <animate
            attributeName="cy"
            values={`${dot.y};${dot.y + 180}`}
            dur={`${dot.dur}s`}
            begin={`${dot.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="cx"
            values={`${dot.x};${dot.x + 8};${dot.x - 5};${dot.x + 3}`}
            dur={`${dot.dur}s`}
            begin={`${dot.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0.8;0.5;0"
            dur={`${dot.dur}s`}
            begin={`${dot.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* 冷风 - 更优雅的曲线 */}
      <g opacity="0.4">
        <path d="M 10 55 Q 35 48 60 55 Q 85 62 110 55" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M 10 55 Q 35 48 60 55 Q 85 62 110 55;M 10 60 Q 35 53 60 60 Q 85 67 110 60;M 10 55 Q 35 48 60 55 Q 85 62 110 55" dur="2.5s" repeatCount="indefinite" />
        </path>
        <path d="M 90 75 Q 115 68 140 75 Q 165 82 190 75" stroke="#64748b" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <animate attributeName="d" values="M 90 75 Q 115 68 140 75 Q 165 82 190 75;M 90 80 Q 115 73 140 80 Q 165 87 190 80;M 90 75 Q 115 68 140 75 Q 165 82 190 75" dur="3s" repeatCount="indefinite" />
        </path>
      </g>

      {/* 冻住的小植物 - 更可爱但伤心 */}
      <g transform="translate(100, 145)">
        {/* 茎 */}
        <path d="M 0 0 Q 2 -15 0 -25" stroke="#78716c" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 枯萎的叶子 */}
        <path d="M 0 -10 Q -15 -20 -20 -15" stroke="#78716c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 0 -15 Q 12 -25 18 -18" stroke="#78716c" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 0 -5 Q -10 -10 -12 -5" stroke="#9ca3af" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* 可爱但伤心的脸 */}
        <circle cx="0" cy="-32" r="14" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="2" />
        {/* 眼睛 - 含泪 */}
        <circle cx="-5" cy="-34" r="3" fill="#57534e" />
        <circle cx="5" cy="-34" r="3" fill="#57534e" />
        <circle cx="-4" cy="-33" r="1" fill="white" />
        <circle cx="6" cy="-33" r="1" fill="white" />
        {/* 眼泪 */}
        <ellipse cx="-5" cy="-28" rx="2" ry="3" fill="#7dd3fc" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
        </ellipse>
        {/* 伤心的嘴巴 */}
        <path d="M -5 -24 Q 0 -28 5 -24" stroke="#57534e" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* 头上的冰晶 */}
        <polygon points="0,-48 2,-44 -2,-44" fill="#bae6fd" />
        <polygon points="-8,-44 -6,-40 -10,-40" fill="#bae6fd" opacity="0.8" />
        <polygon points="8,-44 10,-40 6,-40" fill="#bae6fd" opacity="0.8" />
      </g>

      {/* 小雪人装饰 */}
      <g transform="translate(45, 160)">
        <circle cx="0" cy="0" r="12" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="0" cy="-18" r="9" fill="white" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx="-3" cy="-20" r="1.5" fill="#1e293b" />
        <circle cx="3" cy="-20" r="1.5" fill="#1e293b" />
        <path d="M -2 -16 Q 0 -14 2 -16" stroke="#1e293b" strokeWidth="1" fill="none" />
        <polygon points="0,-18 8,-17 0,-16" fill="#f97316" />
      </g>

      {/* 冰冻的树 */}
      <g transform="translate(165, 145)">
        <rect x="-4" y="0" width="8" height="25" fill="#78716c" rx="2" />
        <polygon points="0,-25 -18,0 18,0" fill="#64748b" />
        <polygon points="0,-15 -12,0 12,0" fill="#78716c" />
        {/* 积雪 */}
        <ellipse cx="0" cy="-25" rx="6" ry="3" fill="white" />
        <ellipse cx="-10" cy="-8" rx="4" ry="2" fill="white" opacity="0.8" />
      </g>
    </svg>
  )
}

// 香茅植物 - 关卡2正确答案
export function LemongrassIllustration({ className = "" }: IllustrationProps) {
  return (
    <img 
      src="/lemongrass.png" 
      alt="扁扁叶子的香茅" 
      className={className}
      style={{ width: "100%", height: "auto", objectFit: "contain" }}
    />
  )
}

// 大葱 - 关卡2错误答案
export function GreenOnionIllustration({ className = "" }: IllustrationProps) {
  return (
    <img 
      src="/green-onion.png" 
      alt="圆管状的大葱" 
      className={className}
      style={{ width: "100%", height: "auto", objectFit: "contain" }}
    />
  )
}

// 冬阴功汤 - 关卡3正确答案
export function TomYumSoupIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        {/* 渐变定义 */}
        <linearGradient id="soupBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
        <linearGradient id="bowlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="soupGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="50%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="tableGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
        <filter id="soupShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#92400e" floodOpacity="0.3" />
        </filter>
        <filter id="steamBlur">
          <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>

      {/* 温暖背景 */}
      <rect width="200" height="200" fill="url(#soupBg)" />

      {/* 装饰光点 */}
      <circle cx="25" cy="30" r="15" fill="#fef08a" opacity="0.4" />
      <circle cx="175" cy="45" r="10" fill="#fed7aa" opacity="0.5" />

      {/* 桌面 */}
      <rect x="0" y="155" width="200" height="45" fill="url(#tableGradient)" />
      <rect x="0" y="155" width="200" height="4" fill="#92400e" opacity="0.3" />

      {/* 碗阴影 */}
      <ellipse cx="100" cy="175" rx="55" ry="8" fill="#92400e" opacity="0.2" />

      {/* 碗 - 更精致 */}
      <g filter="url(#soupShadow)">
        {/* 碗身 */}
        <path d="M 28 140 Q 25 175 100 185 Q 175 175 172 140" fill="url(#bowlGradient)" />
        {/* 碗边缘 */}
        <ellipse cx="100" cy="140" rx="75" ry="22" fill="#fef9c3" />
        <ellipse cx="100" cy="140" rx="72" ry="20" fill="url(#bowlGradient)" />
        {/* 碗内部 */}
        <ellipse cx="100" cy="140" rx="65" ry="17" fill="url(#soupGradient)" />
      </g>

      {/* 汤面反光 */}
      <ellipse cx="75" cy="135" rx="20" ry="5" fill="#fdba74" opacity="0.5" />

      {/* 香茅 - 更真实 */}
      <g transform="translate(65, 125) rotate(-20)">
        <rect x="0" y="0" width="5" height="30" fill="#86efac" rx="2" />
        <rect x="1" y="2" width="3" height="26" fill="#4ade80" rx="1" />
      </g>
      <g transform="translate(125, 122) rotate(15)">
        <rect x="0" y="0" width="5" height="28" fill="#86efac" rx="2" />
        <rect x="1" y="2" width="3" height="24" fill="#4ade80" rx="1" />
      </g>

      {/* 虾 - 更可爱 */}
      <g transform="translate(100, 142)">
        <ellipse cx="0" cy="0" rx="12" ry="6" fill="#fda4af" />
        <ellipse cx="-8" cy="-1" rx="5" ry="4" fill="#fb7185" />
        <path d="M -10 -3 Q -14 -6 -12 -8" stroke="#fb7185" strokeWidth="2" fill="none" />
        <path d="M -10 1 Q -14 4 -12 6" stroke="#fb7185" strokeWidth="2" fill="none" />
        <circle cx="8" cy="-1" r="1.5" fill="#881337" />
        {/* 虾纹 */}
        <path d="M -3 -2 Q 0 0 -3 2" stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M 1 -2 Q 4 0 1 2" stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.5" />
      </g>

      {/* 辣椒 */}
      <g transform="translate(78, 138)">
        <ellipse cx="0" cy="0" rx="8" ry="4" fill="#dc2626" transform="rotate(-30)" />
        <path d="M 5 -4 Q 8 -8 6 -10" stroke="#16a34a" strokeWidth="2" fill="none" />
      </g>

      {/* 柠檬片 */}
      <g transform="translate(122, 135)">
        <circle cx="0" cy="0" r="8" fill="#fef08a" stroke="#eab308" strokeWidth="1" />
        <circle cx="0" cy="0" r="5" fill="#fef9c3" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={4 * Math.cos((angle * Math.PI) / 180)}
            y2={4 * Math.sin((angle * Math.PI) / 180)}
            stroke="#eab308"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* 蘑菇 */}
      <g transform="translate(88, 145)">
        <ellipse cx="0" cy="0" rx="6" ry="3" fill="#fef3c7" />
        <rect x="-2" y="0" width="4" height="5" fill="#fef9c3" />
      </g>

      {/* 香菜点缀 */}
      <circle cx="108" cy="130" r="2" fill="#4ade80" />
      <circle cx="112" cy="132" r="1.5" fill="#22c55e" />
      <circle cx="70" cy="142" r="1.5" fill="#4ade80" />

      {/* 蒸汽 - 更真实飘动 */}
      <g filter="url(#steamBlur)">
        {[
          { x: 65, delay: 0, dur: 3 },
          { x: 85, delay: 0.5, dur: 3.5 },
          { x: 100, delay: 0.2, dur: 2.8 },
          { x: 115, delay: 0.8, dur: 3.2 },
          { x: 135, delay: 0.3, dur: 3 },
        ].map((steam, i) => (
          <g key={i} opacity="0">
            <path
              d={`M ${steam.x} 120 Q ${steam.x + 8} 100 ${steam.x - 5} 80 Q ${steam.x + 5} 60 ${steam.x} 45`}
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <animate attributeName="opacity" values="0;0.6;0.8;0.4;0" dur={`${steam.dur}s`} begin={`${steam.delay}s`} repeatCount="indefinite" />
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 3,-15; -2,-30; 4,-45"
              dur={`${steam.dur}s`}
              begin={`${steam.delay}s`}
              repeatCount="indefinite"
            />
          </g>
        ))}
      </g>

      {/* 香气符号 */}
      <g opacity="0.6">
        <text x="45" y="70" fontSize="14" fill="#f97316">~</text>
        <text x="150" y="80" fontSize="16" fill="#f97316">~</text>
      </g>

      {/* 笑脸装饰 - 更可爱 */}
      <g transform="translate(100, 50)">
        <circle cx="0" cy="0" r="22" fill="#fef08a" stroke="#fbbf24" strokeWidth="3" />
        {/* 高光 */}
        <ellipse cx="-8" cy="-8" rx="6" ry="4" fill="white" opacity="0.5" />
        {/* 眼睛 */}
        <g>
          <circle cx="-7" cy="-3" r="4" fill="#422006" />
          <circle cx="7" cy="-3" r="4" fill="#422006" />
          <circle cx="-6" cy="-4" r="1.5" fill="white" />
          <circle cx="8" cy="-4" r="1.5" fill="white" />
        </g>
        {/* 腮红 */}
        <ellipse cx="-14" cy="5" rx="5" ry="3" fill="#fda4af" opacity="0.6" />
        <ellipse cx="14" cy="5" rx="5" ry="3" fill="#fda4af" opacity="0.6" />
        {/* 嘴巴 */}
        <path d="M -8 8 Q 0 18 8 8" stroke="#422006" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// 蛋糕 - 关卡3错误答案
export function CakeIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        {/* 渐变定义 */}
        <linearGradient id="cakeBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fce7f3" />
        </linearGradient>
        <linearGradient id="cakeLayer1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fecdd3" />
          <stop offset="100%" stopColor="#fda4af" />
        </linearGradient>
        <linearGradient id="cakeLayer2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbcfe8" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        <linearGradient id="creamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#fef9c3" />
        </linearGradient>
        <linearGradient id="plateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="candleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <filter id="cakeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#be185d" floodOpacity="0.2" />
        </filter>
        <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 粉色背景 */}
      <rect width="200" height="200" fill="url(#cakeBg)" />

      {/* 装饰 - 飘落的糖果 */}
      <circle cx="30" cy="40" r="4" fill="#f9a8d4" opacity="0.6" />
      <circle cx="170" cy="35" r="3" fill="#c4b5fd" opacity="0.5" />
      <circle cx="25" cy="80" r="2.5" fill="#fcd34d" opacity="0.5" />
      <circle cx="175" cy="90" r="3.5" fill="#a5f3fc" opacity="0.5" />

      {/* 盘子 */}
      <ellipse cx="100" cy="178" rx="75" ry="12" fill="url(#plateGradient)" />
      <ellipse cx="100" cy="176" rx="70" ry="10" fill="#f8fafc" />
      <ellipse cx="100" cy="176" rx="60" ry="6" fill="#f1f5f9" />

      {/* 蛋糕阴影 */}
      <ellipse cx="100" cy="175" rx="50" ry="6" fill="#be185d" opacity="0.15" />

      {/* 蛋糕主体 - 三层 */}
      <g filter="url(#cakeShadow)">
        {/* 底层 */}
        <rect x="40" y="130" width="120" height="45" fill="url(#cakeLayer1)" rx="8" />
        {/* 底层奶油线 */}
        <rect x="40" y="145" width="120" height="8" fill="#fef9c3" opacity="0.5" rx="4" />

        {/* 中层 */}
        <rect x="50" y="95" width="100" height="40" fill="url(#cakeLayer2)" rx="6" />
        {/* 中层奶油线 */}
        <rect x="50" y="108" width="100" height="6" fill="#fef9c3" opacity="0.5" rx="3" />

        {/* 顶层 */}
        <rect x="60" y="70" width="80" height="30" fill="#fecdd3" rx="5" />

        {/* 顶部糖霜 */}
        <path d="M 60 70 Q 70 65 80 72 Q 90 68 100 73 Q 110 67 120 72 Q 130 66 140 70" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* 奶油花 */}
      {[65, 85, 100, 115, 135].map((x, i) => (
        <g key={i} transform={`translate(${x}, 95)`}>
          <ellipse cx="0" cy="0" rx="8" ry="6" fill="url(#creamGradient)" />
          <ellipse cx="0" cy="-4" rx="5" ry="4" fill="white" />
          <circle cx="0" cy="-6" r="3" fill="#fef9c3" />
        </g>
      ))}

      {/* 草莓装饰 */}
      <g transform="translate(70, 88)">
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#ef4444" />
        <ellipse cx="0" cy="-8" rx="5" ry="3" fill="#22c55e" />
        {/* 草莓籽 */}
        <circle cx="-3" cy="-2" r="1" fill="#fef08a" />
        <circle cx="3" cy="0" r="1" fill="#fef08a" />
        <circle cx="-2" cy="4" r="1" fill="#fef08a" />
        <circle cx="2" cy="6" r="1" fill="#fef08a" />
        {/* 高光 */}
        <ellipse cx="-3" cy="-4" rx="2" ry="1.5" fill="white" opacity="0.5" />
      </g>

      <g transform="translate(130, 88)">
        <ellipse cx="0" cy="0" rx="8" ry="10" fill="#ef4444" />
        <ellipse cx="0" cy="-8" rx="5" ry="3" fill="#22c55e" />
        <circle cx="-3" cy="-2" r="1" fill="#fef08a" />
        <circle cx="3" cy="0" r="1" fill="#fef08a" />
        <circle cx="-2" cy="4" r="1" fill="#fef08a" />
        <ellipse cx="-3" cy="-4" rx="2" ry="1.5" fill="white" opacity="0.5" />
      </g>

      {/* 蜡烛 */}
      <g transform="translate(100, 45)">
        {/* 蜡烛身体 */}
        <rect x="-5" y="0" width="10" height="28" fill="url(#candleGradient)" rx="3" />
        {/* 蜡烛条纹 */}
        <rect x="-5" y="5" width="10" height="3" fill="white" opacity="0.5" rx="1" />
        <rect x="-5" y="12" width="10" height="3" fill="white" opacity="0.5" rx="1" />
        <rect x="-5" y="19" width="10" height="3" fill="white" opacity="0.5" rx="1" />
        {/* 蜡烛芯 */}
        <rect x="-1" y="-5" width="2" height="8" fill="#57534e" rx="1" />

        {/* 火焰 */}
        <g filter="url(#flameGlow)">
          <ellipse cx="0" cy="-12" rx="6" ry="10" fill="#fb923c">
            <animate attributeName="ry" values="10;12;10" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="-14" rx="4" ry="7" fill="#fbbf24">
            <animate attributeName="ry" values="7;8;7" dur="0.25s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="0" cy="-15" rx="2" ry="4" fill="#fef9c3">
            <animate attributeName="ry" values="4;5;4" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
        </g>
      </g>

      {/* 巧克力碎片装饰 */}
      <rect x="55" y="140" width="6" height="4" fill="#78350f" rx="1" transform="rotate(-10 58 142)" />
      <rect x="140" y="138" width="5" height="3" fill="#78350f" rx="1" transform="rotate(15 142 140)" />

      {/* 困惑的小脸 - 更可爱 */}
      <g transform="translate(100, 150)">
        <circle cx="0" cy="0" r="16" fill="#fef9c3" stroke="#fbbf24" strokeWidth="2.5" />
        {/* 高光 */}
        <ellipse cx="-5" cy="-6" rx="4" ry="3" fill="white" opacity="0.5" />
        {/* 眼睛 - 困惑向上看 */}
        <circle cx="-5" cy="-3" r="3.5" fill="white" stroke="#d4d4d4" strokeWidth="0.5" />
        <circle cx="5" cy="-3" r="3.5" fill="white" stroke="#d4d4d4" strokeWidth="0.5" />
        <circle cx="-4" cy="-4" r="2" fill="#422006" />
        <circle cx="6" cy="-4" r="2" fill="#422006" />
        <circle cx="-4.5" cy="-4.5" r="0.8" fill="white" />
        <circle cx="5.5" cy="-4.5" r="0.8" fill="white" />
        {/* 眉毛 - 困惑 */}
        <path d="M -8 -8 Q -5 -10 -2 -8" stroke="#a16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 2 -8 Q 5 -10 8 -8" stroke="#a16207" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 腮红 */}
        <ellipse cx="-10" cy="2" rx="4" ry="2.5" fill="#fda4af" opacity="0.5" />
        <ellipse cx="10" cy="2" rx="4" ry="2.5" fill="#fda4af" opacity="0.5" />
        {/* 嘴巴 - 疑惑 */}
        <ellipse cx="0" cy="7" rx="4" ry="3" fill="#422006" opacity="0.8" />
        {/* 问号 */}
        <text x="18" y="-8" fontSize="12" fill="#a16207" fontWeight="bold">?</text>
      </g>

      {/* 撒糖效果 */}
      {[
        { x: 75, y: 78, c: "#f9a8d4" },
        { x: 95, y: 75, c: "#a5f3fc" },
        { x: 108, y: 77, c: "#fcd34d" },
        { x: 125, y: 76, c: "#c4b5fd" },
      ].map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r="2" fill={s.c} />
      ))}
    </svg>
  )
}

// 驱蚊精油 - 关卡4正确答案
export function MosquitoRepellentIllustration({ className = "" }: IllustrationProps) {
  return (
    <img 
      src="/mosquito-repellent.png" 
      alt="赶走蚊子的神奇水" 
      className={className}
      style={{ width: "100%", height: "auto", objectFit: "contain" }}
    />
  )
}

// 积木 - 关卡4错误答案（题目：香茅可以做什么魔法水？）
export function BuildingBlocksIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <defs>
        {/* 积木立体效果 */}
        <linearGradient id="blockRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="blockBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="blockGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="blockYellow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <linearGradient id="blockPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="blockShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="3" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* 背景 - 温暖的游戏室 */}
      <rect width="200" height="200" fill="#fef3c7" />

      {/* 木地板 */}
      <rect x="0" y="155" width="200" height="45" fill="#d4a574" />
      <line x1="0" y1="170" x2="200" y2="170" stroke="#c4956a" strokeWidth="1" opacity="0.5" />
      <line x1="0" y1="185" x2="200" y2="185" stroke="#c4956a" strokeWidth="1" opacity="0.5" />

      {/* 积木塔 - 更立体可爱 */}
      <g filter="url(#blockShadow)">
        {/* 底层积木 */}
        <g>
          <rect x="55" y="115" width="42" height="40" fill="url(#blockRed)" rx="6" />
          <rect x="57" y="117" width="10" height="10" fill="white" opacity="0.3" rx="2" />
          {/* 红积木表情 */}
          <circle cx="68" cy="132" r="2" fill="#7f1d1d" />
          <circle cx="80" cy="132" r="2" fill="#7f1d1d" />
          <path d="M 68 140 Q 74 144 80 140" stroke="#7f1d1d" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        <g>
          <rect x="97" y="115" width="42" height="40" fill="url(#blockBlue)" rx="6" />
          <rect x="99" y="117" width="10" height="10" fill="white" opacity="0.3" rx="2" />
          {/* 蓝积木表情 */}
          <circle cx="110" cy="132" r="2" fill="#1e3a5f" />
          <circle cx="122" cy="132" r="2" fill="#1e3a5f" />
          <ellipse cx="116" cy="141" rx="4" ry="3" fill="#1e3a5f" />
        </g>

        {/* 中层积木 */}
        <g>
          <rect x="76" y="75" width="42" height="40" fill="url(#blockGreen)" rx="6" />
          <rect x="78" y="77" width="10" height="10" fill="white" opacity="0.3" rx="2" />
          {/* 绿积木表情 - 开心 */}
          <circle cx="89" cy="92" r="2" fill="#14532d" />
          <circle cx="101" cy="92" r="2" fill="#14532d" />
          <path d="M 89 100 Q 95 106 101 100" stroke="#14532d" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* 顶层积木 */}
        <g>
          <rect x="83" y="42" width="28" height="33" fill="url(#blockYellow)" rx="5" />
          <rect x="85" y="44" width="8" height="8" fill="white" opacity="0.3" rx="2" />
          {/* 黄积木表情 - 眨眼 */}
          <path d="M 91 54 Q 93 52 95 54" stroke="#78350f" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="101" cy="54" r="2" fill="#78350f" />
          <path d="M 92 62 Q 97 66 102 62" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* 散落的积木 */}
      <g filter="url(#blockShadow)">
        <rect x="20" y="140" width="25" height="20" fill="url(#blockPurple)" rx="4" transform="rotate(-15, 32, 150)" />
        <polygon points="155,155 170,125 185,155" fill="url(#blockPurple)" />
      </g>

      {/* 问号气泡 - 表示这不是答案 */}
      <g transform="translate(160, 35)">
        <circle cx="0" cy="0" r="18" fill="white" stroke="#e5e7eb" strokeWidth="2" />
        <text x="0" y="6" textAnchor="middle" fontSize="20" fill="#9ca3af" fontWeight="bold">?</text>
      </g>

      {/* 小星星装饰 */}
      <text x="30" y="35" fontSize="16" fill="#fbbf24">✦</text>
      <text x="170" y="90" fontSize="12" fill="#fbbf24">✦</text>
      <text x="15" y="100" fontSize="10" fill="#c4b5fd">✦</text>
    </svg>
  )
}

// 教学场景插画
export function TeachSunnyGardenIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 225" className={className}>
      {/* 天空 */}
      <rect width="400" height="225" fill="#e0f2fe" />

      {/* 太阳 */}
      <circle cx="340" cy="50" r="35" fill="#fbbf24">
        <animate attributeName="r" values="35;38;35" dur="3s" repeatCount="indefinite" />
      </circle>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1={340 + 42 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 42 * Math.sin((angle * Math.PI) / 180)}
          x2={340 + 55 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 55 * Math.sin((angle * Math.PI) / 180)}
          stroke="#fbbf24"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}

      {/* 云朵 */}
      <g transform="translate(50, 30)">
        <ellipse cx="30" cy="20" rx="30" ry="18" fill="white" />
        <ellipse cx="60" cy="15" rx="25" ry="15" fill="white" />
        <ellipse cx="45" cy="28" rx="28" ry="15" fill="white" />
      </g>
      <g transform="translate(200, 50)">
        <ellipse cx="20" cy="15" rx="20" ry="12" fill="white" opacity="0.9" />
        <ellipse cx="40" cy="12" rx="18" ry="10" fill="white" opacity="0.9" />
      </g>

      {/* 草地 */}
      <ellipse cx="200" cy="210" rx="220" ry="50" fill="#86efac" />
      <ellipse cx="200" cy="200" rx="200" ry="40" fill="#4ade80" />

      {/* 香茅植物 */}
      <g transform="translate(200, 170)">
        <path d="M 0 0 Q 8 -50 0 -90 Q -8 -50 0 0" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
        <path d="M -8 5 Q -35 -30 -50 -80 Q -25 -35 -8 5" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
        <path d="M 8 5 Q 35 -30 50 -80 Q 25 -35 8 5" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
        <path d="M -5 8 Q -20 -20 -30 -60 Q -12 -25 -5 8" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <path d="M 5 8 Q 20 -20 30 -60 Q 12 -25 5 8" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* 开心的脸 */}
        <circle cx="0" cy="-30" r="18" fill="#fef9c3" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="-6" cy="-33" r="3" fill="#422006" />
        <circle cx="6" cy="-33" r="3" fill="#422006" />
        <path d="M -7 -24 Q 0 -18 7 -24" stroke="#422006" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="-12" cy="-26" r="4" fill="#fda4af" opacity="0.5" />
        <circle cx="12" cy="-26" r="4" fill="#fda4af" opacity="0.5" />
      </g>

      {/* 水滴 */}
      <g>
        <ellipse cx="120" cy="185" rx="25" ry="10" fill="#7dd3fc" opacity="0.7" />
        <ellipse cx="280" cy="190" rx="20" ry="8" fill="#7dd3fc" opacity="0.7" />
      </g>

      {/* 小花 */}
      <g transform="translate(80, 175)">
        <circle cx="0" cy="-12" r="10" fill="#fda4af" />
        <circle cx="0" cy="-12" r="5" fill="#fef08a" />
        <rect x="-3" y="-5" width="6" height="25" fill="#4ade80" rx="3" />
      </g>
      <g transform="translate(320, 170)">
        <circle cx="0" cy="-12" r="10" fill="#c4b5fd" />
        <circle cx="0" cy="-12" r="5" fill="#fef08a" />
        <rect x="-3" y="-5" width="6" height="25" fill="#4ade80" rx="3" />
      </g>
    </svg>
  )
}

export function TeachLemongrassIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 225" className={className}>
      {/* 背景 */}
      <rect width="400" height="225" fill="#ecfccb" />

      {/* 放大镜效果圈 */}
      <circle cx="200" cy="130" r="90" fill="white" opacity="0.5" />
      <circle cx="200" cy="130" r="85" fill="#f0fdf4" />

      {/* 大香茅 */}
      <g transform="translate(200, 180)">
        <path d="M 0 0 Q 12 -60 0 -110 Q -12 -60 0 0" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        <path d="M -10 5 Q -45 -40 -65 -100 Q -30 -45 -10 5" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
        <path d="M 10 5 Q 45 -40 65 -100 Q 30 -45 10 5" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
        <path d="M -6 8 Q -28 -25 -40 -75 Q -18 -30 -6 8" fill="#86efac" stroke="#22c55e" strokeWidth="1" />
        <path d="M 6 8 Q 28 -25 40 -75 Q 18 -30 6 8" fill="#86efac" stroke="#22c55e" strokeWidth="1" />

        {/* 开心的脸 */}
        <circle cx="0" cy="-35" r="22" fill="#fef9c3" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="-7" cy="-38" r="3" fill="#422006" />
        <circle cx="7" cy="-38" r="3" fill="#422006" />
        <path d="M -8 -28 Q 0 -20 8 -28" stroke="#422006" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="-14" cy="-30" r="5" fill="#fda4af" opacity="0.5" />
        <circle cx="14" cy="-30" r="5" fill="#fda4af" opacity="0.5" />
      </g>

      {/* 标注箭头 - 扁叶 */}
      <g transform="translate(80, 100)">
        <path d="M 0 0 L 50 20" stroke="#15803d" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <rect x="-60" y="-20" width="65" height="30" fill="white" rx="8" />
        <text x="-28" y="2" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">
          扁扁的
        </text>
      </g>

      <g transform="translate(320, 100)">
        <path d="M 0 0 L -50 20" stroke="#15803d" strokeWidth="3" />
        <rect x="-5" y="-20" width="65" height="30" fill="white" rx="8" />
        <text x="28" y="2" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">
          长长的
        </text>
      </g>

      {/* 对比小图 */}
      <g transform="translate(60, 180)">
        <rect x="-30" y="-40" width="60" height="50" fill="white" rx="8" stroke="#e5e7eb" strokeWidth="2" />
        <text x="0" y="-25" textAnchor="middle" fontSize="10" fill="#dc2626">
          ✗ 不是圆管
        </text>
        <ellipse cx="0" cy="0" rx="4" ry="15" fill="#94a3b8" />
      </g>

      <g transform="translate(340, 180)">
        <rect x="-30" y="-40" width="60" height="50" fill="white" rx="8" stroke="#e5e7eb" strokeWidth="2" />
        <text x="0" y="-25" textAnchor="middle" fontSize="10" fill="#22c55e">
          ✓ 是扁叶
        </text>
        <path d="M 0 15 Q 8 0 0 -15 Q -8 0 0 15" fill="#4ade80" />
      </g>
    </svg>
  )
}

export function TeachTomYumIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 225" className={className}>
      {/* 背景 */}
      <rect width="400" height="225" fill="#fef3c7" />

      {/* 装饰 */}
      <circle cx="50" cy="50" r="30" fill="#fde68a" opacity="0.5" />
      <circle cx="350" cy="180" r="40" fill="#fed7aa" opacity="0.5" />

      {/* 桌面 */}
      <rect x="0" y="170" width="400" height="55" fill="#d4a574" />
      <rect x="0" y="170" width="400" height="8" fill="#b8956e" />

      {/* 大碗汤 */}
      <ellipse cx="200" cy="160" rx="100" ry="25" fill="#fef3c7" />
      <path d="M 100 160 Q 100 220 200 220 Q 300 220 300 160" fill="#fbbf24" />
      <ellipse cx="200" cy="160" rx="90" ry="22" fill="#f97316" />
      <ellipse cx="200" cy="155" rx="85" ry="18" fill="#ea580c" />

      {/* 香茅在汤里 */}
      <rect x="140" y="140" width="6" height="35" fill="#86efac" rx="3" transform="rotate(-20, 143, 157)" />
      <rect x="250" y="138" width="6" height="35" fill="#86efac" rx="3" transform="rotate(15, 253, 155)" />

      {/* 配料 */}
      <circle cx="170" cy="152" r="10" fill="#dc2626" />
      <circle cx="230" cy="150" r="8" fill="#fef08a" />
      <ellipse cx="200" cy="158" rx="12" ry="7" fill="#fecaca" />

      {/* 蒸汽 */}
      {[150, 200, 250].map((x, i) => (
        <path
          key={i}
          d={`M ${x} 120 Q ${x + 10} 100 ${x} 80`}
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        >
          <animate
            attributeName="d"
            values={`M ${x} 120 Q ${x + 10} 100 ${x} 80;M ${x} 120 Q ${x - 10} 100 ${x} 80;M ${x} 120 Q ${x + 10} 100 ${x} 80`}
            dur={`${2 + i * 0.3}s`}
            repeatCount="indefinite"
          />
        </path>
      ))}

      {/* 香气符号 */}
      <text x="100" y="80" fontSize="24" fill="#fbbf24">
        ~
      </text>
      <text x="300" y="90" fontSize="24" fill="#fbbf24">
        ~
      </text>

      {/* 柠檬装饰 */}
      <g transform="translate(50, 130)">
        <circle r="25" fill="#fef08a" stroke="#fbbf24" strokeWidth="2" />
        <circle r="18" fill="#fef9c3" />
        <path d="M -10 0 L 10 0 M 0 -10 L 0 10 M -7 -7 L 7 7 M -7 7 L 7 -7" stroke="#fbbf24" strokeWidth="2" />
        <text x="0" y="45" textAnchor="middle" fontSize="12" fill="#92400e" fontWeight="bold">
          柠檬香
        </text>
      </g>

      {/* 开心表情 */}
      <circle cx="200" cy="50" r="25" fill="#fef9c3" stroke="#fbbf24" strokeWidth="3" />
      <circle cx="192" cy="45" r="3" fill="#422006" />
      <circle cx="208" cy="45" r="3" fill="#422006" />
      <path d="M 188 55 Q 200 68 212 55" stroke="#422006" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export function TeachMosquitoRepellentIllustration({ className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 400 225" className={className}>
      {/* 背景 */}
      <defs>
        <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#ddd6fe" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="url(#magicGlow)" />

      {/* 魔法光芒 */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <line
          key={i}
          x1={200 + 70 * Math.cos((angle * Math.PI) / 180)}
          y1={120 + 70 * Math.sin((angle * Math.PI) / 180)}
          x2={200 + 100 * Math.cos((angle * Math.PI) / 180)}
          y2={120 + 100 * Math.sin((angle * Math.PI) / 180)}
          stroke="#c084fc"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.5;0.2;0.5"
            dur="2s"
            begin={`${i * 0.15}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* 精油瓶 */}
      <rect x="160" y="80" width="80" height="100" fill="#86efac" rx="15" />
      <rect x="175" y="55" width="50" height="30" fill="#d4d4d4" rx="8" />
      <rect x="185" y="40" width="30" height="20" fill="#a3a3a3" rx="5" />

      {/* 瓶子标签 */}
      <rect x="170" y="100" width="60" height="60" fill="white" rx="8" />
      <text x="200" y="125" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">
        香茅
      </text>
      <text x="200" y="145" textAnchor="middle" fontSize="14" fill="#15803d" fontWeight="bold">
        魔法水
      </text>

      {/* 笑脸 */}
      <circle cx="200" cy="75" r="12" fill="#fef9c3" stroke="#fbbf24" strokeWidth="2" />
      <circle cx="196" cy="72" r="2" fill="#422006" />
      <circle cx="204" cy="72" r="2" fill="#422006" />
      <path d="M 195 79 Q 200 84 205 79" stroke="#422006" strokeWidth="1.5" fill="none" />

      {/* 逃跑的蚊子们 */}
      <g>
        <g transform="translate(320, 60)">
          <ellipse cx="0" cy="0" rx="12" ry="7" fill="#64748b" />
          <line x1="12" y1="0" x2="20" y2="-8" stroke="#64748b" strokeWidth="2" />
          <circle cx="-8" cy="-3" r="4" fill="#94a3b8" />
          <circle cx="-9" cy="-3" r="1.5" fill="white" />
          <path d="M 25 -10 L 35 -15 M 25 -5 L 35 -5 M 25 0 L 35 5" stroke="#94a3b8" strokeWidth="1.5" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="320,60;340,40;360,20"
            dur="3s"
            repeatCount="indefinite"
          />
        </g>

        <g transform="translate(80, 80)">
          <ellipse cx="0" cy="0" rx="10" ry="6" fill="#64748b" />
          <line x1="-10" y1="0" x2="-18" y2="-6" stroke="#64748b" strokeWidth="2" />
          <circle cx="6" cy="-2" r="3" fill="#94a3b8" />
          <path d="M -22 -8 L -32 -12 M -22 -3 L -32 -3 M -22 2 L -32 6" stroke="#94a3b8" strokeWidth="1.5" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="80,80;60,60;40,40"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </g>

        <g transform="translate(300, 180)">
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#64748b" />
          <line x1="8" y1="0" x2="14" y2="5" stroke="#64748b" strokeWidth="2" />
          <circle cx="-5" cy="-2" r="3" fill="#94a3b8" />
          <path d="M 18 8 L 26 12 M 18 3 L 26 3" stroke="#94a3b8" strokeWidth="1.5" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="300,180;330,200;360,220"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </g>
      </g>

      {/* 星星 */}
      <text x="100" y="50" fontSize="20" fill="#fbbf24">
        ✨
      </text>
      <text x="300" y="150" fontSize="24" fill="#fbbf24">
        ✨
      </text>
      <text x="120" y="180" fontSize="16" fill="#c084fc">
        ✨
      </text>
      <text x="280" y="50" fontSize="18" fill="#c084fc">
        ✨
      </text>

      {/* 保护盾 */}
      <path
        d="M 200 200 Q 130 180 130 130 Q 130 80 200 60 Q 270 80 270 130 Q 270 180 200 200"
        fill="none"
        stroke="#86efac"
        strokeWidth="3"
        strokeDasharray="10,5"
        opacity="0.6"
      >
        <animate attributeName="stroke-dashoffset" values="0;30" dur="2s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}
