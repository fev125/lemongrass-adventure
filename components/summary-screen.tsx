"use client"

import { useState, useEffect, useRef } from "react"
import { RotateCcw } from "lucide-react"
import { Mascot } from "./mascot"
import { levelsData } from "@/lib/levels-data"
import { useAudio } from "./audio-context"

interface SummaryScreenProps {
  onReview: () => void
  onFinish: () => void
  unlockedLevels: number[]
  onSelectLevel: (level: number) => void
}

// 知识图标卡片 - 用图形展示每个知识点
function KnowledgeCard({
  index,
  delay,
  onClick,
}: {
  index: number
  delay: number
  onClick: () => void
}) {
  const cards = [
    // 关卡1: 香茅喜欢温暖有水的地方
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* 云朵 */}
          <g opacity="0.6">
            <ellipse cx="15" cy="12" rx="8" ry="4" fill="white" />
            <ellipse cx="22" cy="10" rx="6" ry="3" fill="white" />
            <ellipse cx="10" cy="10" rx="5" ry="2.5" fill="white" />
          </g>
          {/* 太阳 - 带旋转光芒 */}
          <circle cx="60" cy="18" r="10" fill="#fbbf24">
            <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
          </circle>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 60 18" to="360 60 18" dur="15s" repeatCount="indefinite" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={60 + 12 * Math.cos((angle * Math.PI) / 180)}
                y1={18 + 12 * Math.sin((angle * Math.PI) / 180)}
                x2={60 + 18 * Math.cos((angle * Math.PI) / 180)}
                y2={18 + 18 * Math.sin((angle * Math.PI) / 180)}
                stroke="#fbbf24"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ))}
          </g>
          {/* 下落的水滴 */}
          {[{x: 12, delay: 0}, {x: 22, delay: 0.5}, {x: 32, delay: 1}].map((drop, i) => (
            <g key={i}>
              <path d={`M ${drop.x} 25 Q ${drop.x - 3} 32 ${drop.x} 35 Q ${drop.x + 3} 32 ${drop.x} 25`} fill="#7dd3fc">
                <animate attributeName="opacity" values="1;0.8;0" dur="1.5s" begin={`${drop.delay}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate" values="0,0;0,35;0,0" dur="1.5s" begin={`${drop.delay}s`} repeatCount="indefinite" />
              </path>
            </g>
          ))}
          {/* 小蝴蝶1 */}
          <g>
            <animateMotion path="M0,0 Q15,-8 30,0 Q15,8 0,0" dur="4s" repeatCount="indefinite" />
            <g transform="translate(35, 35)">
              <ellipse cx="0" cy="0" rx="1" ry="2.5" fill="#831843" />
              <path d="M-1,-1 Q-5,-4 -4,0 Q-5,4 -1,1" fill="#f472b6">
                <animate attributeName="d" values="M-1,-1 Q-5,-4 -4,0 Q-5,4 -1,1;M-1,-1 Q-6,-2 -4,0 Q-6,2 -1,1;M-1,-1 Q-5,-4 -4,0 Q-5,4 -1,1" dur="0.2s" repeatCount="indefinite" />
              </path>
              <path d="M1,-1 Q5,-4 4,0 Q5,4 1,1" fill="#f472b6">
                <animate attributeName="d" values="M1,-1 Q5,-4 4,0 Q5,4 1,1;M1,-1 Q6,-2 4,0 Q6,2 1,1;M1,-1 Q5,-4 4,0 Q5,4 1,1" dur="0.2s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
          {/* 小蝴蝶2 */}
          <g>
            <animateMotion path="M0,0 Q-10,-5 -20,0 Q-10,5 0,0" dur="3.5s" repeatCount="indefinite" />
            <g transform="translate(70, 45)">
              <ellipse cx="0" cy="0" rx="0.8" ry="2" fill="#7c3aed" />
              <path d="M-1,-0.5 Q-4,-3 -3,0 Q-4,3 -1,0.5" fill="#c084fc">
                <animate attributeName="d" values="M-1,-0.5 Q-4,-3 -3,0 Q-4,3 -1,0.5;M-1,-0.5 Q-5,-1 -3,0 Q-5,1 -1,0.5;M-1,-0.5 Q-4,-3 -3,0 Q-4,3 -1,0.5" dur="0.15s" repeatCount="indefinite" />
              </path>
              <path d="M1,-0.5 Q4,-3 3,0 Q4,3 1,0.5" fill="#c084fc">
                <animate attributeName="d" values="M1,-0.5 Q4,-3 3,0 Q4,3 1,0.5;M1,-0.5 Q5,-1 3,0 Q5,1 1,0.5;M1,-0.5 Q4,-3 3,0 Q4,3 1,0.5" dur="0.15s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
          {/* 小花 */}
          {[{x: 8, y: 72, color: "#fda4af"}, {x: 72, y: 70, color: "#fdba74"}, {x: 40, y: 75, color: "#c4b5fd"}].map((flower, i) => (
            <g key={i} transform={`translate(${flower.x}, ${flower.y})`}>
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={3 * Math.cos((angle * Math.PI) / 180)} cy={3 * Math.sin((angle * Math.PI) / 180)} rx="2.5" ry="1.5" fill={flower.color} transform={`rotate(${angle})`}>
                  <animate attributeName="rx" values="2.5;3;2.5" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                </ellipse>
              ))}
              <circle cx="0" cy="0" r="2" fill="#fbbf24" />
            </g>
          ))}
          {/* 香茅 */}
          <g transform="translate(50, 68)">
            <path d="M 0 0 Q 3 -12 0 -22 Q -3 -12 0 0" fill="#22c55e">
              <animate attributeName="d" values="M 0 0 Q 3 -12 0 -22 Q -3 -12 0 0;M 0 0 Q 4 -12 0 -23 Q -4 -12 0 0;M 0 0 Q 3 -12 0 -22 Q -3 -12 0 0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M -2 2 Q -8 -6 -12 -16" stroke="#4ade80" strokeWidth="2.5" fill="none" />
            <path d="M 2 2 Q 8 -6 12 -16" stroke="#4ade80" strokeWidth="2.5" fill="none" />
          </g>
          {/* 笑脸 */}
          <circle cx="50" cy="52" r="5" fill="#fef9c3" />
          <circle cx="48" cy="51" r="0.8" fill="#422006" />
          <circle cx="52" cy="51" r="0.8" fill="#422006" />
          <path d="M 48 54 Q 50 56 52 54" stroke="#422006" strokeWidth="0.8" fill="none" />
        </svg>
      ),
      bgColor: "from-amber-100 to-sky-100",
      borderColor: "border-amber-300",
    },
    // 关卡2: 香茅有扁扁长长的叶子
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* 发现星星 */}
          {[{x: 8, y: 12, delay: 0}, {x: 52, y: 8, delay: 0.5}, {x: 75, y: 40, delay: 1}].map((star, i) => (
            <polygon key={i} points={`${star.x},${star.y - 4} ${star.x + 1.5},${star.y - 1} ${star.x + 4},${star.y - 1} ${star.x + 2},${star.y + 1} ${star.x + 3},${star.y + 4} ${star.x},${star.y + 2} ${star.x - 3},${star.y + 4} ${star.x - 2},${star.y + 1} ${star.x - 4},${star.y - 1} ${star.x - 1.5},${star.y - 1}`} fill="#fbbf24">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin={`${star.delay}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale" values="0.8;1.2;0.8" dur="1.5s" begin={`${star.delay}s`} repeatCount="indefinite" additive="sum" />
            </polygon>
          ))}
          {/* 放大镜 - 带镜片反光 */}
          <circle cx="30" cy="32" r="18" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="4" />
          <ellipse cx="22" cy="26" rx="4" ry="8" fill="white" opacity="0.4" transform="rotate(-30 22 26)" />
          <line x1="43" y1="45" x2="55" y2="57" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
          {/* 放大镜内的扁叶 - 带叶脉 */}
          <g>
            <path d="M 30 42 Q 36 32 30 18 Q 24 32 30 42" fill="#22c55e" stroke="#15803d" strokeWidth="1">
              <animate attributeName="d"
                values="M 30 42 Q 36 32 30 18 Q 24 32 30 42;M 30 44 Q 37 33 30 17 Q 23 33 30 44;M 30 42 Q 36 32 30 18 Q 24 32 30 42"
                dur="2s" repeatCount="indefinite" />
            </path>
            {/* 叶脉 */}
            <path d="M 30 40 L 30 20" stroke="#15803d" strokeWidth="0.8" opacity="0.6" />
            <path d="M 30 32 L 26 29" stroke="#15803d" strokeWidth="0.5" opacity="0.4" />
            <path d="M 30 32 L 34 29" stroke="#15803d" strokeWidth="0.5" opacity="0.4" />
            <path d="M 30 26 L 27 24" stroke="#15803d" strokeWidth="0.5" opacity="0.4" />
            <path d="M 30 26 L 33 24" stroke="#15803d" strokeWidth="0.5" opacity="0.4" />
          </g>
          {/* 瓢虫 */}
          <g>
            <animateMotion path="M0,0 L3,-6 L6,-3" dur="4s" repeatCount="indefinite" />
            <g transform="translate(38, 30)">
              <ellipse cx="0" cy="0" rx="4" ry="3" fill="#ef4444" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="#1f2937" strokeWidth="1" />
              <circle cx="-1.5" cy="-1" r="0.8" fill="#1f2937" />
              <circle cx="1.5" cy="0.5" r="0.6" fill="#1f2937" />
              <circle cx="0" cy="-3.5" r="1.5" fill="#1f2937" />
              <line x1="-1" y1="-4.5" x2="-2" y2="-6" stroke="#1f2937" strokeWidth="0.5" />
              <line x1="1" y1="-4.5" x2="2" y2="-6" stroke="#1f2937" strokeWidth="0.5" />
            </g>
          </g>
          {/* 对比：圆管（打叉） */}
          <g transform="translate(62, 68)">
            <ellipse cx="0" cy="0" rx="4" ry="8" fill="#94a3b8" />
            <ellipse cx="0" cy="-3" rx="3" ry="3" fill="#64748b" opacity="0.5" />
            <line x1="-6" y1="-6" x2="6" y2="6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="6" y1="-6" x2="-6" y2="6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* 扁叶（打勾） */}
          <g transform="translate(62, 22)">
            <path d="M 0 8 Q 4 0 0 -8 Q -4 0 0 8" fill="#4ade80" />
            <path d="M 0 6 L 0 -6" stroke="#15803d" strokeWidth="0.5" opacity="0.5" />
            <circle cx="0" cy="12" r="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
            <path d="M -3 12 L -1 14 L 4 9" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      ),
      bgColor: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
    },
    // 关卡3: 香茅可以做冬阴功汤
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* 柠檬片装饰 */}
          <g transform="translate(70, 42)">
            <circle cx="0" cy="0" r="7" fill="#fef08a" stroke="#facc15" strokeWidth="1" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line key={i} x1="0" y1="0" x2={5 * Math.cos((angle * Math.PI) / 180)} y2={5 * Math.sin((angle * Math.PI) / 180)} stroke="#fbbf24" strokeWidth="1.5" />
            ))}
            <circle cx="0" cy="0" r="2" fill="#fef9c3" />
          </g>
          {/* 小辣椒 */}
          <g transform="translate(8, 48)">
            <path d="M0,0 Q4,-10 0,-15" fill="#ef4444" />
            <path d="M0,0 L0,3" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
            <animate attributeName="transform" type="rotate" values="0 8 48;5 8 48;0 8 48" dur="2s" repeatCount="indefinite" />
          </g>
          {/* 碗 - 更精美 */}
          <ellipse cx="40" cy="52" rx="28" ry="9" fill="#fef9c3" />
          <path d="M 12 52 Q 12 72 40 72 Q 68 72 68 52" fill="#fbbf24" />
          <ellipse cx="40" cy="52" rx="25" ry="7" fill="#f97316">
            <animate attributeName="ry" values="7;7.5;7" dur="2s" repeatCount="indefinite" />
          </ellipse>
          {/* 汤里的香茅 */}
          <rect x="23" y="44" width="3" height="14" fill="#86efac" rx="1" transform="rotate(-15, 24, 52)">
            <animate attributeName="transform" values="rotate(-15, 24, 52);rotate(-12, 24, 52);rotate(-15, 24, 52)" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="52" y="42" width="3" height="14" fill="#86efac" rx="1" transform="rotate(12, 53, 50)">
            <animate attributeName="transform" values="rotate(12, 53, 50);rotate(15, 53, 50);rotate(12, 53, 50)" dur="2.5s" repeatCount="indefinite" />
          </rect>
          {/* 蘑菇 */}
          <g transform="translate(48, 52)">
            <ellipse cx="0" cy="-2" rx="4" ry="2" fill="#a3a3a3" />
            <rect x="-1.5" y="-2" width="3" height="5" fill="#f5f5f5" rx="1" />
          </g>
          {/* 虾 - 更精细 */}
          <g transform="translate(35, 54)">
            <ellipse cx="0" cy="0" rx="6" ry="3" fill="#fda4af" />
            <path d="M-5,0 Q-8,-2 -6,-4" stroke="#fda4af" strokeWidth="2" fill="none" />
            <circle cx="-5" cy="-1" r="0.8" fill="#f472b6" />
            <animate attributeName="transform" type="translate" values="35,54;35,52;35,54" dur="3s" repeatCount="indefinite" />
          </g>
          {/* 丰富的蒸汽 */}
          {[
            {x: 22, delay: 0, dur: 1.5},
            {x: 32, delay: 0.3, dur: 1.8},
            {x: 42, delay: 0.6, dur: 2},
            {x: 52, delay: 0.9, dur: 1.6}
          ].map((steam, i) => (
            <path key={i} d={`M ${steam.x} 38 Q ${steam.x + 3} 30 ${steam.x} 22`} stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7">
              <animate attributeName="d" values={`M ${steam.x} 38 Q ${steam.x + 3} 30 ${steam.x} 22;M ${steam.x} 38 Q ${steam.x - 3} 30 ${steam.x} 22;M ${steam.x} 38 Q ${steam.x + 3} 30 ${steam.x} 22`} dur={`${steam.dur}s`} begin={`${steam.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.2;0.7" dur={`${steam.dur}s`} begin={`${steam.delay}s`} repeatCount="indefinite" />
            </path>
          ))}
          {/* 香气小圈圈 */}
          {[{x: 28, y: 18}, {x: 50, y: 15}].map((pos, i) => (
            <circle key={i} cx={pos.x} cy={pos.y} r="3" fill="none" stroke="#fdba74" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="2;5;2" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* 好吃表情 */}
          <text x="40" y="10" textAnchor="middle" fontSize="12">😋</text>
        </svg>
      ),
      bgColor: "from-orange-100 to-amber-100",
      borderColor: "border-orange-300",
    },
    // 关卡4: 香茅可以做驱蚊精油
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* 小星星装饰 */}
          {[{x: 8, y: 8}, {x: 72, y: 12}, {x: 5, y: 70}].map((pos, i) => (
            <polygon key={i} points={`${pos.x},${pos.y - 3} ${pos.x + 1},${pos.y - 1} ${pos.x + 3},${pos.y - 1} ${pos.x + 1.5},${pos.y + 0.5} ${pos.x + 2},${pos.y + 3} ${pos.x},${pos.y + 1.5} ${pos.x - 2},${pos.y + 3} ${pos.x - 1.5},${pos.y + 0.5} ${pos.x - 3},${pos.y - 1} ${pos.x - 1},${pos.y - 1}`} fill="#fbbf24">
              <animate attributeName="opacity" values="1;0.4;1" dur={`${1.2 + i * 0.3}s`} repeatCount="indefinite" />
            </polygon>
          ))}
          {/* 魔法光芒 - 旋转 */}
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 40 45" to="360 40 45" dur="10s" repeatCount="indefinite" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1={40 + 20 * Math.cos((angle * Math.PI) / 180)}
                y1={45 + 20 * Math.sin((angle * Math.PI) / 180)}
                x2={40 + 28 * Math.cos((angle * Math.PI) / 180)}
                y2={45 + 28 * Math.sin((angle * Math.PI) / 180)}
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.6"
              >
                <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>
          {/* 魔法粒子上升 */}
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={35 + i * 3} cy="55" r="1.5" fill="#a78bfa">
              <animate attributeName="cy" values="55;35;15" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;0" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* 精油瓶 - 增加高光 */}
          <rect x="30" y="35" width="20" height="28" fill="#86efac" rx="5" />
          <ellipse cx="34" cy="45" rx="2" ry="6" fill="white" opacity="0.3" />
          <rect x="35" y="26" width="10" height="11" fill="#d4d4d4" rx="3" />
          <rect x="37" y="21" width="6" height="6" fill="#a3a3a3" rx="2" />
          {/* 香茅标签 */}
          <rect x="33" y="42" width="14" height="16" fill="white" rx="2" />
          <path d="M 40 53 Q 42 48 40 43 Q 38 48 40 53" fill="#22c55e" />
          <path d="M 40 52 L 40 44" stroke="#15803d" strokeWidth="0.5" opacity="0.5" />
          {/* 多只逃跑的蚊子 */}
          {[
            {startX: 62, startY: 22, endX: 76, endY: 8, dur: 2, flip: false},
            {startX: 16, startY: 28, endX: 2, endY: 14, dur: 1.8, flip: true},
            {startX: 64, startY: 58, endX: 78, endY: 72, dur: 2.2, flip: false},
            {startX: 14, startY: 55, endX: 2, endY: 68, dur: 1.9, flip: true}
          ].map((mosquito, i) => (
            <g key={i}>
              <g transform={`translate(${mosquito.startX}, ${mosquito.startY})`}>
                <ellipse cx="0" cy="0" rx="4" ry="2.5" fill="#64748b" />
                <circle cx={mosquito.flip ? 2 : -2} cy="-1" r="1.5" fill="#94a3b8" />
                {/* 翅膀震动 */}
                <ellipse cx={mosquito.flip ? -2 : 2} cy="-2" rx="3" ry="1" fill="#94a3b8" opacity="0.6">
                  <animate attributeName="ry" values="1;2;1" dur="0.1s" repeatCount="indefinite" />
                </ellipse>
                {/* 逃跑线 */}
                <path d={mosquito.flip ? "M -4 0 L -8 -2 M -4 1 L -8 1" : "M 4 0 L 8 -2 M 4 1 L 8 1"} stroke="#94a3b8" strokeWidth="1" />
              </g>
              <animateTransform attributeName="transform" type="translate" values={`${mosquito.startX},${mosquito.startY};${mosquito.endX},${mosquito.endY}`} dur={`${mosquito.dur}s`} repeatCount="indefinite" />
            </g>
          ))}
          {/* 双层保护盾 */}
          <circle cx="40" cy="45" r="18" fill="none" stroke="#86efac" strokeWidth="2" strokeDasharray="4,3" opacity="0.6">
            <animate attributeName="stroke-dashoffset" values="0;14" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="40" cy="45" r="23" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3,4" opacity="0.4">
            <animate attributeName="stroke-dashoffset" values="14;0" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      ),
      bgColor: "from-purple-100 to-pink-100",
      borderColor: "border-purple-300",
    },
  ]

  const card = cards[index]

  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-3xl bg-gradient-to-br ${card.bgColor} border-4 ${card.borderColor} shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 p-3 animate-bounce-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      {card.icon}
      {/* 星星标记 */}
      <div className="absolute -top-2 -right-2 w-8 h-8">
        <svg viewBox="0 0 32 32" className="w-full h-full animate-sparkle">
          <polygon points="16,2 19,12 30,12 21,19 24,30 16,23 8,30 11,19 2,12 13,12" fill="#fbbf24" />
        </svg>
      </div>
    </button>
  )
}

export function SummaryScreen({ onReview, onFinish, unlockedLevels, onSelectLevel }: SummaryScreenProps) {
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { playSuccess, playClick, speak, ttsAvailable } = useAudio()

  useEffect(() => {
    setMounted(true)
    playSuccess()

    if (ttsAvailable) {
      setTimeout(() => {
        speak("哇！你太厉害了！你已经成为香茅小专家啦！")
      }, 500)
    }

    // 星星闪烁动画
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const stars: Array<{
          x: number
          y: number
          size: number
          opacity: number
          speed: number
          color: string
        }> = []

        const colors = ["#fbbf24", "#f472b6", "#c084fc", "#4ade80"]
        for (let i = 0; i < 50; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 5 + 2,
            opacity: Math.random(),
            speed: Math.random() * 0.03 + 0.01,
            color: colors[Math.floor(Math.random() * colors.length)],
          })
        }

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          stars.forEach((star) => {
            ctx.beginPath()
            // 画星星形状
            const spikes = 5
            const outerRadius = star.size
            const innerRadius = star.size / 2
            let rot = (Math.PI / 2) * 3
            const step = Math.PI / spikes

            ctx.moveTo(star.x, star.y - outerRadius)
            for (let i = 0; i < spikes; i++) {
              ctx.lineTo(
                star.x + Math.cos(rot) * outerRadius,
                star.y + Math.sin(rot) * outerRadius
              )
              rot += step
              ctx.lineTo(
                star.x + Math.cos(rot) * innerRadius,
                star.y + Math.sin(rot) * innerRadius
              )
              rot += step
            }
            ctx.closePath()

            ctx.globalAlpha = star.opacity
            ctx.fillStyle = star.color
            ctx.fill()
            ctx.globalAlpha = 1

            star.opacity += star.speed
            if (star.opacity > 1 || star.opacity < 0.2) {
              star.speed *= -1
            }
          })

          requestAnimationFrame(animate)
        }

        animate()
      }
    }
  }, [playSuccess, speak, ttsAvailable])

  return (
    <div className="min-h-screen p-3 pb-4 bg-gradient-to-b from-amber-100 via-pink-50 to-purple-100 relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className={`max-w-lg mx-auto space-y-3 relative z-10 ${mounted ? "animate-fade-in" : "opacity-0"}`}>
        {/* 奖杯和庆祝动画 - 紧凑布局 */}
        <div className="flex items-center justify-center gap-4">
          <div className="relative">
            {/* 奖杯 - 缩小 */}
            <div className="w-24 h-24 animate-float">
              <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="white" stopOpacity="0" />
                    <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* 光环 */}
                <circle cx="60" cy="55" r="50" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.3">
                  <animate attributeName="r" values="45;55;45" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* 奖杯主体 */}
                <path
                  d="M 38 40 L 38 30 L 82 30 L 82 40 Q 82 68 60 75 Q 38 68 38 40"
                  fill="url(#goldGradient)"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
                {/* 闪光效果 */}
                <rect x="45" y="35" width="30" height="25" fill="url(#shineGradient)" rx="3">
                  <animate attributeName="x" values="35;75;35" dur="2s" repeatCount="indefinite" />
                </rect>
                {/* 奖杯把手 */}
                <path d="M 38 38 Q 22 38 22 52 Q 22 64 38 64" fill="none" stroke="#fbbf24" strokeWidth="5" />
                <path d="M 82 38 Q 98 38 98 52 Q 98 64 82 64" fill="none" stroke="#fbbf24" strokeWidth="5" />
                {/* 奖杯底座 */}
                <rect x="50" y="75" width="20" height="10" fill="#fbbf24" />
                <rect x="42" y="85" width="36" height="10" rx="3" fill="#f59e0b" />
                {/* 大星星 */}
                <polygon points="60,40 64,52 77,52 67,60 71,72 60,64 49,72 53,60 43,52 56,52" fill="#fef08a">
                  <animate attributeName="transform" attributeType="XML" type="rotate" from="0 60 55" to="360 60 55" dur="10s" repeatCount="indefinite" />
                </polygon>
                {/* 香茅图案 */}
                <g transform="translate(60, 58)">
                  <path d="M 0 8 Q 2 0 0 -8 Q -2 0 0 8" fill="#22c55e" />
                </g>
              </svg>
            </div>
            {/* 闪烁星星 */}
            <svg className="absolute -top-1 -right-2 w-6 h-6 animate-sparkle" viewBox="0 0 24 24">
              <polygon points="12,2 14,9 22,9 16,13 18,20 12,16 6,20 8,13 2,9 10,9" fill="#fbbf24" />
            </svg>
          </div>

          {/* 香茅小专家徽章 - 精美SVG设计 */}
          <button
            onClick={() => {
              playClick()
              if (ttsAvailable) speak("恭喜你成为香茅小专家！")
            }}
            className="flex-1 bg-gradient-to-r from-amber-100 via-yellow-100 to-amber-100 rounded-2xl px-3 py-2 shadow-lg border-4 border-amber-300 active:scale-95"
          >
            <div className="flex items-center justify-center gap-1">
              {/* 左侧奖章 */}
              <svg viewBox="0 0 60 70" className="w-14 h-16 flex-shrink-0">
                <defs>
                  <linearGradient id="medalGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <linearGradient id="ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
                {/* 绶带 */}
                <path d="M 15 5 L 25 25 L 30 20 L 35 25 L 45 5" fill="url(#ribbon)" />
                <path d="M 15 5 L 10 0 L 20 0 L 25 5 Z" fill="#15803d" />
                <path d="M 45 5 L 50 0 L 40 0 L 35 5 Z" fill="#15803d" />
                {/* 奖章主体 */}
                <circle cx="30" cy="40" r="22" fill="url(#medalGold)" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="30" cy="40" r="18" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="3,2" />
                {/* 香茅图案 */}
                <g transform="translate(30, 42)">
                  {/* 中心叶 */}
                  <path d="M 0 10 Q 4 0 0 -14 Q -4 0 0 10" fill="#22c55e" stroke="#15803d" strokeWidth="0.5">
                    <animate attributeName="d" values="M 0 10 Q 4 0 0 -14 Q -4 0 0 10;M 0 10 Q 5 0 0 -15 Q -5 0 0 10;M 0 10 Q 4 0 0 -14 Q -4 0 0 10" dur="2s" repeatCount="indefinite" />
                  </path>
                  {/* 左叶 */}
                  <path d="M -3 8 Q -12 -2 -14 -10" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round">
                    <animate attributeName="d" values="M -3 8 Q -12 -2 -14 -10;M -3 8 Q -13 -3 -15 -11;M -3 8 Q -12 -2 -14 -10" dur="2.5s" repeatCount="indefinite" />
                  </path>
                  {/* 右叶 */}
                  <path d="M 3 8 Q 12 -2 14 -10" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round">
                    <animate attributeName="d" values="M 3 8 Q 12 -2 14 -10;M 3 8 Q 13 -3 15 -11;M 3 8 Q 12 -2 14 -10" dur="2.5s" repeatCount="indefinite" />
                  </path>
                  {/* 叶脉 */}
                  <path d="M 0 8 L 0 -10" stroke="#15803d" strokeWidth="0.8" opacity="0.5" />
                </g>
                {/* 闪光星星 */}
                <g>
                  <polygon points="12,25 13,28 16,28 14,30 15,33 12,31 9,33 10,30 8,28 11,28" fill="#fef08a">
                    <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                  </polygon>
                  <polygon points="48,25 49,28 52,28 50,30 51,33 48,31 45,33 46,30 44,28 47,28" fill="#fef08a">
                    <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
                  </polygon>
                </g>
              </svg>

              {/* 中间文字 */}
              <div className="flex flex-col items-center">
                <span className="text-lg font-black text-amber-800 leading-tight">香茅</span>
                <span className="text-lg font-black text-amber-800 leading-tight">小专家</span>
              </div>

              {/* 右侧奖杯 */}
              <svg viewBox="0 0 50 60" className="w-12 h-14 flex-shrink-0">
                <defs>
                  <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                {/* 奖杯主体 */}
                <path d="M 15 15 L 15 10 L 35 10 L 35 15 Q 35 30 25 35 Q 15 30 15 15" fill="url(#trophyGold)" stroke="#f59e0b" strokeWidth="1" />
                {/* 把手 */}
                <path d="M 15 14 Q 8 14 8 22 Q 8 28 15 28" fill="none" stroke="#fbbf24" strokeWidth="3" />
                <path d="M 35 14 Q 42 14 42 22 Q 42 28 35 28" fill="none" stroke="#fbbf24" strokeWidth="3" />
                {/* 底座 */}
                <rect x="21" y="35" width="8" height="5" fill="#fbbf24" />
                <rect x="17" y="40" width="16" height="5" rx="2" fill="#f59e0b" />
                {/* 香茅装饰 */}
                <path d="M 25 30 Q 27 22 25 16 Q 23 22 25 30" fill="#22c55e" />
                {/* 星星 */}
                <polygon points="25,12 26,15 29,15 27,17 28,20 25,18 22,20 23,17 21,15 24,15" fill="#fef08a">
                  <animateTransform attributeName="transform" type="rotate" values="0 25 16;360 25 16" dur="8s" repeatCount="indefinite" />
                </polygon>
                {/* 闪光 */}
                <ellipse cx="20" cy="18" rx="2" ry="4" fill="white" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2s" repeatCount="indefinite" />
                </ellipse>
              </svg>
            </div>
          </button>
        </div>

        {/* 吉祥物祝贺 - 可点击朗读 */}
        <button
          onClick={() => {
            playClick()
            if (ttsAvailable) speak("你学会了香茅的所有秘密！太厉害了！")
          }}
          className="w-full flex items-end gap-2 active:scale-98"
        >
          <Mascot mood="excited" size="md" />
          <div className="flex-1 bg-white rounded-2xl rounded-bl-lg p-3 shadow-xl border-4 border-green-200 relative">
            <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white border-l-4 border-b-4 border-green-200 transform rotate-45" />
            <div className="flex items-center justify-center gap-2 text-2xl">
              <span>🎉</span><span>⭐</span><span>🏆</span><span>⭐</span><span>🎉</span>
            </div>
            <p className="text-base text-green-700 font-bold text-center">学会了所有秘密！</p>
          </div>
        </button>

        {/* 知识图片卡片 - 2x2 网格，更紧凑 */}
        <div className="bg-white rounded-2xl p-3 shadow-xl border-4 border-green-200">
          <div className="grid grid-cols-2 gap-2">
            {levelsData.map((level, index) => (
              <KnowledgeCard
                key={level.id}
                index={index}
                delay={index * 0.1}
                onClick={() => {
                  playClick()
                  if (ttsAvailable) {
                    // 播放扩展知识：先故事，再总结
                    const ext = level.extendedKnowledge
                    speak(`${ext.story} ${ext.summary}`)
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* 底部按钮 - 横向布局 */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              playClick()
              onReview()
            }}
            className="w-14 h-14 rounded-2xl bg-white border-4 border-purple-300 flex items-center justify-center shadow-lg active:scale-95"
          >
            <RotateCcw className="w-7 h-7 text-purple-600" />
          </button>

          <button
            onClick={() => {
              playClick()
              onFinish()
            }}
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 border-4 border-green-300"
          >
            <span className="text-2xl">🏠</span>
            <span>回家</span>
          </button>
        </div>
      </div>
    </div>
  )
}
