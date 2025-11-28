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
          <defs>
            {/* 香茅叶片渐变 */}
            <linearGradient id="leafGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="30%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="leafGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="25%" stopColor="#bbf7d0" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="leafGrad3" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ecfccb" />
              <stop offset="35%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            {/* 太阳渐变 */}
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </radialGradient>
          </defs>

          {/* 天空背景光晕 */}
          <ellipse cx="65" cy="18" rx="20" ry="15" fill="#fef3c7" opacity="0.5" />

          {/* 太阳 */}
          <circle cx="65" cy="16" r="9" fill="url(#sunGrad)">
            <animate attributeName="r" values="9;10;9" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* 太阳光芒 */}
          <g opacity="0.8">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <line
                key={i}
                x1={65 + 11 * Math.cos((angle * Math.PI) / 180)}
                y1={16 + 11 * Math.sin((angle * Math.PI) / 180)}
                x2={65 + 15 * Math.cos((angle * Math.PI) / 180)}
                y2={16 + 15 * Math.sin((angle * Math.PI) / 180)}
                stroke="#fbbf24"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>

          {/* 云朵 */}
          <g opacity="0.7">
            <ellipse cx="18" cy="14" rx="10" ry="5" fill="white" />
            <ellipse cx="26" cy="12" rx="7" ry="4" fill="white" />
            <ellipse cx="12" cy="12" rx="6" ry="3" fill="white" />
          </g>

          {/* 水滴 */}
          {[{x: 8, delay: 0}, {x: 18, delay: 0.6}, {x: 28, delay: 1.2}].map((drop, i) => (
            <g key={i}>
              <path d={`M ${drop.x} 22 Q ${drop.x - 2.5} 28 ${drop.x} 32 Q ${drop.x + 2.5} 28 ${drop.x} 22`} fill="#7dd3fc" stroke="#38bdf8" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.9;0.7;0" dur="1.8s" begin={`${drop.delay}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="translate" values="0,0;0,38;0,0" dur="1.8s" begin={`${drop.delay}s`} repeatCount="indefinite" />
              </path>
            </g>
          ))}

          {/* 土壤/基部 */}
          <ellipse cx="40" cy="74" rx="22" ry="5" fill="#a3e635" opacity="0.4" />

          {/* 香茅丛 - 多片真实感叶片从中心向外生长 */}
          <g transform="translate(40, 72)">
            {/* 叶片1 - 左后 */}
            <path d="M -2 0 Q -18 -20 -22 -42 Q -19 -43 -17 -42 Q -12 -22 -1 -3 Z" fill="url(#leafGrad2)" opacity="0.85">
              <animate attributeName="d"
                values="M -2 0 Q -18 -20 -22 -42 Q -19 -43 -17 -42 Q -12 -22 -1 -3 Z;M -2 0 Q -20 -20 -24 -43 Q -21 -44 -19 -43 Q -14 -22 -1 -3 Z;M -2 0 Q -18 -20 -22 -42 Q -19 -43 -17 -42 Q -12 -22 -1 -3 Z"
                dur="4s" repeatCount="indefinite" />
            </path>

            {/* 叶片2 - 右后 */}
            <path d="M 2 0 Q 16 -18 20 -40 Q 17 -41 15 -40 Q 11 -20 1 -3 Z" fill="url(#leafGrad3)" opacity="0.85">
              <animate attributeName="d"
                values="M 2 0 Q 16 -18 20 -40 Q 17 -41 15 -40 Q 11 -20 1 -3 Z;M 2 0 Q 18 -18 22 -41 Q 19 -42 17 -41 Q 13 -20 1 -3 Z;M 2 0 Q 16 -18 20 -40 Q 17 -41 15 -40 Q 11 -20 1 -3 Z"
                dur="3.5s" repeatCount="indefinite" />
            </path>

            {/* 叶片3 - 左中 */}
            <path d="M -1 0 Q -12 -15 -15 -35 Q -12 -36 -10 -35 Q -7 -17 0 -2 Z" fill="url(#leafGrad1)">
              <animate attributeName="d"
                values="M -1 0 Q -12 -15 -15 -35 Q -12 -36 -10 -35 Q -7 -17 0 -2 Z;M -1 0 Q -14 -15 -17 -36 Q -14 -37 -12 -36 Q -9 -17 0 -2 Z;M -1 0 Q -12 -15 -15 -35 Q -12 -36 -10 -35 Q -7 -17 0 -2 Z"
                dur="3.8s" repeatCount="indefinite" />
            </path>

            {/* 叶片4 - 中心主叶 */}
            <path d="M -1.5 0 Q 2 -22 0 -48 Q -2 -48 -3 -47 Q -4 -22 -0.5 -2 Z" fill="url(#leafGrad1)">
              <animate attributeName="d"
                values="M -1.5 0 Q 2 -22 0 -48 Q -2 -48 -3 -47 Q -4 -22 -0.5 -2 Z;M -1.5 0 Q 3 -22 1 -49 Q -1 -49 -2 -48 Q -3 -22 -0.5 -2 Z;M -1.5 0 Q 2 -22 0 -48 Q -2 -48 -3 -47 Q -4 -22 -0.5 -2 Z"
                dur="4.2s" repeatCount="indefinite" />
            </path>
            {/* 中心叶脉 */}
            <path d="M -1 -2 Q 0 -25 -1 -45" stroke="#15803d" strokeWidth="0.6" fill="none" opacity="0.5" />

            {/* 叶片5 - 右中 */}
            <path d="M 1 0 Q 10 -14 12 -32 Q 9 -33 7 -32 Q 5 -16 0 -2 Z" fill="url(#leafGrad2)">
              <animate attributeName="d"
                values="M 1 0 Q 10 -14 12 -32 Q 9 -33 7 -32 Q 5 -16 0 -2 Z;M 1 0 Q 12 -14 14 -33 Q 11 -34 9 -33 Q 7 -16 0 -2 Z;M 1 0 Q 10 -14 12 -32 Q 9 -33 7 -32 Q 5 -16 0 -2 Z"
                dur="3.2s" repeatCount="indefinite" />
            </path>

            {/* 叶片6 - 左前小叶 */}
            <path d="M -1 0 Q -8 -10 -10 -25 Q -8 -26 -6 -25 Q -4 -12 0 -1 Z" fill="url(#leafGrad3)">
              <animate attributeName="d"
                values="M -1 0 Q -8 -10 -10 -25 Q -8 -26 -6 -25 Q -4 -12 0 -1 Z;M -1 0 Q -9 -10 -11 -26 Q -9 -27 -7 -26 Q -5 -12 0 -1 Z;M -1 0 Q -8 -10 -10 -25 Q -8 -26 -6 -25 Q -4 -12 0 -1 Z"
                dur="2.8s" repeatCount="indefinite" />
            </path>

            {/* 叶片7 - 右前小叶 */}
            <path d="M 1 0 Q 6 -8 7 -22 Q 5 -23 3 -22 Q 2 -10 0 -1 Z" fill="url(#leafGrad1)">
              <animate attributeName="d"
                values="M 1 0 Q 6 -8 7 -22 Q 5 -23 3 -22 Q 2 -10 0 -1 Z;M 1 0 Q 7 -8 8 -23 Q 6 -24 4 -23 Q 3 -10 0 -1 Z;M 1 0 Q 6 -8 7 -22 Q 5 -23 3 -22 Q 2 -10 0 -1 Z"
                dur="3s" repeatCount="indefinite" />
            </path>

            {/* 基部白色包裹 */}
            <ellipse cx="0" cy="-1" rx="4" ry="3" fill="#fef9c3" opacity="0.6" />
          </g>

          {/* 露珠在叶片上 */}
          <circle cx="32" cy="42" r="1.5" fill="#bfdbfe" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="48" cy="38" r="1" fill="#bfdbfe" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2.5s" repeatCount="indefinite" />
          </circle>

          {/* 小蝴蝶 */}
          <g>
            <animateMotion path="M0,0 Q12,-6 24,0 Q12,6 0,0" dur="5s" repeatCount="indefinite" />
            <g transform="translate(60, 40)">
              <ellipse cx="0" cy="0" rx="0.8" ry="2" fill="#831843" />
              <path d="M-0.8,-0.8 Q-4,-3 -3,0 Q-4,3 -0.8,0.8" fill="#f472b6">
                <animate attributeName="d" values="M-0.8,-0.8 Q-4,-3 -3,0 Q-4,3 -0.8,0.8;M-0.8,-0.8 Q-5,-1 -3,0 Q-5,1 -0.8,0.8;M-0.8,-0.8 Q-4,-3 -3,0 Q-4,3 -0.8,0.8" dur="0.15s" repeatCount="indefinite" />
              </path>
              <path d="M0.8,-0.8 Q4,-3 3,0 Q4,3 0.8,0.8" fill="#f472b6">
                <animate attributeName="d" values="M0.8,-0.8 Q4,-3 3,0 Q4,3 0.8,0.8;M0.8,-0.8 Q5,-1 3,0 Q5,1 0.8,0.8;M0.8,-0.8 Q4,-3 3,0 Q4,3 0.8,0.8" dur="0.15s" repeatCount="indefinite" />
              </path>
            </g>
          </g>

          {/* 香气粒子 */}
          {[{x: 35, delay: 0}, {x: 40, delay: 0.5}, {x: 45, delay: 1}].map((p, i) => (
            <circle key={i} cx={p.x} cy="30" r="1" fill="#86efac" opacity="0.6">
              <animate attributeName="cy" values="30;18;8" dur="3s" begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" begin={`${p.delay}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="1;1.5;0.5" dur="3s" begin={`${p.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      ),
      bgColor: "from-amber-100 to-sky-100",
      borderColor: "border-amber-300",
    },
    // 关卡2: 香茅有扁扁长长的叶子
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            {/* 香茅扁叶渐变 */}
            <linearGradient id="flatLeafGrad1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="20%" stopColor="#d9f99d" />
              <stop offset="60%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="flatLeafGrad2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ecfccb" />
              <stop offset="30%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            {/* 葱的渐变 - 圆管状 */}
            <linearGradient id="scallionGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f0fdf4" />
              <stop offset="40%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* ===== 左侧：葱（错误示例）===== */}
          <g transform="translate(20, 46)">
            {/* 葱的圆管状叶子 - 3根 */}
            {/* 葱1 - 左 */}
            <ellipse cx="-6" cy="-22" rx="3" ry="1.5" fill="#4ade80" opacity="0.7" />
            <path d="M -9 0 L -9 -22 A 3 1.5 0 0 1 -3 -22 L -3 0 Z" fill="url(#scallionGrad)" stroke="#22c55e" strokeWidth="0.5">
              <animate attributeName="d"
                values="M -9 0 L -9 -22 A 3 1.5 0 0 1 -3 -22 L -3 0 Z;M -9 0 L -9.5 -23 A 3 1.5 0 0 1 -2.5 -23 L -3 0 Z;M -9 0 L -9 -22 A 3 1.5 0 0 1 -3 -22 L -3 0 Z"
                dur="3s" repeatCount="indefinite" />
            </path>
            {/* 圆管中空效果 - 明显的黑洞 */}
            <ellipse cx="-6" cy="-22" rx="2" ry="1" fill="#166534" opacity="0.6" />

            {/* 葱2 - 中（最高） */}
            <ellipse cx="0" cy="-28" rx="3.5" ry="1.8" fill="#4ade80" opacity="0.7" />
            <path d="M -3.5 0 L -3.5 -28 A 3.5 1.8 0 0 1 3.5 -28 L 3.5 0 Z" fill="url(#scallionGrad)" stroke="#22c55e" strokeWidth="0.5">
              <animate attributeName="d"
                values="M -3.5 0 L -3.5 -28 A 3.5 1.8 0 0 1 3.5 -28 L 3.5 0 Z;M -3.5 0 L -3 -29 A 3.5 1.8 0 0 1 4 -29 L 3.5 0 Z;M -3.5 0 L -3.5 -28 A 3.5 1.8 0 0 1 3.5 -28 L 3.5 0 Z"
                dur="3.5s" repeatCount="indefinite" />
            </path>
            <ellipse cx="0" cy="-28" rx="2.3" ry="1.2" fill="#166534" opacity="0.6" />

            {/* 葱3 - 右 */}
            <ellipse cx="6" cy="-20" rx="2.8" ry="1.4" fill="#4ade80" opacity="0.7" />
            <path d="M 3.2 0 L 3.2 -20 A 2.8 1.4 0 0 1 8.8 -20 L 8.8 0 Z" fill="url(#scallionGrad)" stroke="#22c55e" strokeWidth="0.5">
              <animate attributeName="d"
                values="M 3.2 0 L 3.2 -20 A 2.8 1.4 0 0 1 8.8 -20 L 8.8 0 Z;M 3.2 0 L 3.7 -21 A 2.8 1.4 0 0 1 9.3 -21 L 8.8 0 Z;M 3.2 0 L 3.2 -20 A 2.8 1.4 0 0 1 8.8 -20 L 8.8 0 Z"
                dur="2.8s" repeatCount="indefinite" />
            </path>
            <ellipse cx="6" cy="-20" rx="1.8" ry="0.9" fill="#166534" opacity="0.6" />

            {/* 基部 */}
            <ellipse cx="0" cy="2" rx="12" ry="4" fill="#fef9c3" opacity="0.8" />
          </g>

          {/* 错误标记 - 大红叉 */}
          <g transform="translate(20, 72)">
            <circle cx="0" cy="0" r="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2">
              <animate attributeName="r" values="6;6.5;6" dur="1s" repeatCount="indefinite" />
            </circle>
            <line x1="-3" y1="-3" x2="3" y2="3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="3" y1="-3" x2="-3" y2="3" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* 中间分隔线 */}
          <line x1="40" y1="8" x2="40" y2="78" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* ===== 右侧：香茅（正确示例）===== */}
          <g transform="translate(60, 46)">
            {/* 香茅扁平叶片 - 多片从中心向外 */}
            {/* 叶片1 - 左后 */}
            <path d="M -2 0 Q -14 -14 -16 -32 L -12 -33 Q -10 -15 -1 -2 Z" fill="url(#flatLeafGrad2)" opacity="0.8">
              <animate attributeName="d"
                values="M -2 0 Q -14 -14 -16 -32 L -12 -33 Q -10 -15 -1 -2 Z;M -2 0 Q -15 -14 -17 -33 L -13 -34 Q -11 -15 -1 -2 Z;M -2 0 Q -14 -14 -16 -32 L -12 -33 Q -10 -15 -1 -2 Z"
                dur="3.5s" repeatCount="indefinite" />
            </path>
            <path d="M -1.5 -2 L -14 -31" stroke="#15803d" strokeWidth="0.5" opacity="0.5" />

            {/* 叶片2 - 右后 */}
            <path d="M 2 0 Q 12 -12 14 -30 L 10 -31 Q 8 -13 1 -2 Z" fill="url(#flatLeafGrad1)" opacity="0.8">
              <animate attributeName="d"
                values="M 2 0 Q 12 -12 14 -30 L 10 -31 Q 8 -13 1 -2 Z;M 2 0 Q 13 -12 15 -31 L 11 -32 Q 9 -13 1 -2 Z;M 2 0 Q 12 -12 14 -30 L 10 -31 Q 8 -13 1 -2 Z"
                dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 1.5 -2 L 12 -29" stroke="#15803d" strokeWidth="0.5" opacity="0.5" />

            {/* 叶片3 - 中心主叶（最高） */}
            <path d="M -1.5 0 Q 1 -18 0 -38 L -4 -39 Q -5 -19 -0.5 -2 Z" fill="url(#flatLeafGrad1)">
              <animate attributeName="d"
                values="M -1.5 0 Q 1 -18 0 -38 L -4 -39 Q -5 -19 -0.5 -2 Z;M -1.5 0 Q 2 -18 1 -39 L -3 -40 Q -4 -19 -0.5 -2 Z;M -1.5 0 Q 1 -18 0 -38 L -4 -39 Q -5 -19 -0.5 -2 Z"
                dur="4s" repeatCount="indefinite" />
            </path>
            <path d="M -1 -2 L -2 -36" stroke="#15803d" strokeWidth="0.6" opacity="0.6" />

            {/* 叶片4 - 左前 */}
            <path d="M -1 0 Q -10 -10 -11 -24 L -7 -25 Q -6 -11 0 -1 Z" fill="url(#flatLeafGrad1)" opacity="0.9">
              <animate attributeName="d"
                values="M -1 0 Q -10 -10 -11 -24 L -7 -25 Q -6 -11 0 -1 Z;M -1 0 Q -11 -10 -12 -25 L -8 -26 Q -7 -11 0 -1 Z;M -1 0 Q -10 -10 -11 -24 L -7 -25 Q -6 -11 0 -1 Z"
                dur="2.8s" repeatCount="indefinite" />
            </path>

            {/* 叶片5 - 右前 */}
            <path d="M 1 0 Q 8 -8 9 -22 L 5 -23 Q 4 -9 0 -1 Z" fill="url(#flatLeafGrad2)" opacity="0.9">
              <animate attributeName="d"
                values="M 1 0 Q 8 -8 9 -22 L 5 -23 Q 4 -9 0 -1 Z;M 1 0 Q 9 -8 10 -23 L 6 -24 Q 5 -9 0 -1 Z;M 1 0 Q 8 -8 9 -22 L 5 -23 Q 4 -9 0 -1 Z"
                dur="3.2s" repeatCount="indefinite" />
            </path>

            {/* 基部白色包裹 */}
            <ellipse cx="0" cy="2" rx="6" ry="4" fill="#fef9c3" opacity="0.8" />
          </g>

          {/* 正确标记 - 大绿勾 */}
          <g transform="translate(60, 72)">
            <circle cx="0" cy="0" r="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="2">
              <animate attributeName="r" values="6;6.5;6" dur="1s" repeatCount="indefinite" />
            </circle>
            <path d="M -3 0 L -1 3 L 4 -3" stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          {/* 闪烁星星装饰 */}
          {[{x: 75, y: 15}, {x: 5, y: 20}].map((star, i) => (
            <polygon key={i} points={`${star.x},${star.y - 3} ${star.x + 1},${star.y - 1} ${star.x + 3},${star.y} ${star.x + 1},${star.y + 1} ${star.x},${star.y + 3} ${star.x - 1},${star.y + 1} ${star.x - 3},${star.y} ${star.x - 1},${star.y - 1}`} fill="#fbbf24">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </polygon>
          ))}
        </svg>
      ),
      bgColor: "from-green-100 to-emerald-100",
      borderColor: "border-green-300",
    },
    // 关卡3: 香茅可以做冬阴功汤
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            {/* 碗的渐变 - 陶瓷质感 */}
            <linearGradient id="bowlOuter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
            <linearGradient id="bowlInner" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
            {/* 汤面渐变 */}
            <radialGradient id="soupSurface" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="60%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </radialGradient>
            {/* 香茅叶片渐变 - 真实扁叶 */}
            <linearGradient id="lemongrassLeaf1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ecfccb" />
              <stop offset="30%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#65a30d" />
            </linearGradient>
            <linearGradient id="lemongrassLeaf2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="25%" stopColor="#bef264" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
            {/* 虾的渐变 */}
            <linearGradient id="shrimpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="50%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
            {/* 蘑菇渐变 */}
            <linearGradient id="mushroomCap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e7e5e4" />
              <stop offset="100%" stopColor="#d6d3d1" />
            </linearGradient>
            {/* 蒸汽渐变 */}
            <linearGradient id="steamGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 背景装饰 - 柠檬片 */}
          <g transform="translate(70, 38)">
            <circle cx="0" cy="0" r="8" fill="#fef08a" opacity="0.3">
              <animate attributeName="r" values="8;8.5;8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="7.5" fill="#fef08a" stroke="#facc15" strokeWidth="1.2" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={i} x1="0" y1="0" x2={5.5 * Math.cos((angle * Math.PI) / 180)} y2={5.5 * Math.sin((angle * Math.PI) / 180)} stroke="#fde047" strokeWidth="1.5" opacity="0.7" />
            ))}
            <circle cx="0" cy="0" r="2.5" fill="#fef9c3" />
          </g>

          {/* 小辣椒装饰 */}
          <g transform="translate(10, 50)">
            <path d="M0,0 Q5,-12 1,-18 Q-3,-12 0,0" fill="#ef4444">
              <animate attributeName="d" values="M0,0 Q5,-12 1,-18 Q-3,-12 0,0;M0,0 Q6,-12 1,-17 Q-2,-12 0,0;M0,0 Q5,-12 1,-18 Q-3,-12 0,0" dur="2s" repeatCount="indefinite" />
            </path>
            <ellipse cx="0.5" cy="-12" rx="1.5" ry="3" fill="#dc2626" />
            <path d="M0,0 Q-2,-2 -1,-4 L0,-3" fill="#22c55e" />
          </g>

          {/* 碗 - 更有质感 */}
          {/* 碗外壁 */}
          <ellipse cx="40" cy="50" rx="30" ry="10" fill="url(#bowlOuter)" opacity="0.5" />
          <path d="M 10 50 Q 10 72 40 74 Q 70 72 70 50" fill="url(#bowlOuter)" stroke="#f59e0b" strokeWidth="0.8" />

          {/* 碗内部 - 汤液 */}
          <ellipse cx="40" cy="50" rx="27" ry="8.5" fill="url(#soupSurface)">
            <animate attributeName="ry" values="8.5;9;8.5" dur="3s" repeatCount="indefinite" />
          </ellipse>

          {/* 汤液反光 */}
          <ellipse cx="28" cy="48" rx="8" ry="3" fill="white" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.2;0.3" dur="2s" repeatCount="indefinite" />
          </ellipse>

          {/* 汤里的配料 */}

          {/* 香茅 - 真实扁平叶片，带渐变 */}
          <g transform="translate(22, 58)">
            {/* 左侧香茅 */}
            <path d="M 0 0 Q -2 -8 -1 -16 Q 1 -8 0 0" fill="url(#lemongrassLeaf1)" opacity="0.9" stroke="#84cc16" strokeWidth="0.4">
              <animate attributeName="d" values="M 0 0 Q -2 -8 -1 -16 Q 1 -8 0 0;M 0 0 Q -2.5 -8 -1.5 -17 Q 1.5 -8 0 0;M 0 0 Q -2 -8 -1 -16 Q 1 -8 0 0" dur="3s" repeatCount="indefinite" />
            </path>
            {/* 叶脉 */}
            <path d="M -0.5 -1 L -0.8 -14" stroke="#65a30d" strokeWidth="0.3" opacity="0.5" />
          </g>

          <g transform="translate(56, 56)">
            {/* 右侧香茅 */}
            <path d="M 0 0 Q 2 -10 1 -18 Q -1 -10 0 0" fill="url(#lemongrassLeaf2)" opacity="0.95" stroke="#84cc16" strokeWidth="0.4">
              <animate attributeName="d" values="M 0 0 Q 2 -10 1 -18 Q -1 -10 0 0;M 0 0 Q 2.5 -10 1.5 -19 Q -1.5 -10 0 0;M 0 0 Q 2 -10 1 -18 Q -1 -10 0 0" dur="2.8s" repeatCount="indefinite" />
            </path>
            {/* 叶脉 */}
            <path d="M 0.5 -1 L 0.8 -16" stroke="#65a30d" strokeWidth="0.3" opacity="0.5" />
          </g>

          {/* 第三片香茅 - 中间 */}
          <g transform="translate(40, 57)">
            <path d="M 0 0 Q 1.5 -6 0.5 -12 Q -0.5 -6 0 0" fill="url(#lemongrassLeaf1)" opacity="0.85" stroke="#84cc16" strokeWidth="0.3">
              <animate attributeName="d" values="M 0 0 Q 1.5 -6 0.5 -12 Q -0.5 -6 0 0;M 0 0 Q 2 -6 1 -13 Q -1 -6 0 0;M 0 0 Q 1.5 -6 0.5 -12 Q -0.5 -6 0 0" dur="3.2s" repeatCount="indefinite" />
            </path>
            <path d="M 0.2 -1 L 0.3 -10" stroke="#65a30d" strokeWidth="0.2" opacity="0.5" />
          </g>

          {/* 虾 - 更精致 */}
          <g transform="translate(32, 52)">
            {/* 虾身 */}
            <ellipse cx="0" cy="0" rx="7" ry="3.5" fill="url(#shrimpGrad)" stroke="#f43f5e" strokeWidth="0.5">
              <animate attributeName="transform" type="translate" values="0,0;0,-0.5;0,0" dur="3s" repeatCount="indefinite" />
            </ellipse>
            {/* 虾节 */}
            <path d="M -2 -1 Q -2 1 -2 2" stroke="#fb7185" strokeWidth="0.8" opacity="0.6" />
            <path d="M 0 -1 Q 0 1 0 2" stroke="#fb7185" strokeWidth="0.8" opacity="0.6" />
            <path d="M 2 -1 Q 2 1 2 2" stroke="#fb7185" strokeWidth="0.8" opacity="0.6" />
            {/* 虾头 */}
            <circle cx="-6" cy="-0.5" r="2" fill="#f87171" />
            {/* 虾须 */}
            <path d="M -7 -2 Q -9 -4 -8 -6" stroke="#fb7185" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            <path d="M -7 -1 Q -10 -2 -10 -4" stroke="#fb7185" strokeWidth="0.6" fill="none" strokeLinecap="round" />
            {/* 眼睛 */}
            <circle cx="-6.5" cy="-1" r="0.6" fill="#1f2937" />
            {/* 虾尾 */}
            <path d="M 6 0 Q 9 -1 11 0 Q 9 1 6 0" fill="#fda4af" opacity="0.8" />
          </g>

          {/* 蘑菇 - 更精致 */}
          <g transform="translate(48, 50)">
            <ellipse cx="0" cy="-2.5" rx="5" ry="2.5" fill="url(#mushroomCap)" stroke="#a8a29e" strokeWidth="0.5" />
            <rect x="-2" y="-2.5" width="4" height="6" fill="#fafaf9" rx="1.5" stroke="#e7e5e4" strokeWidth="0.3" />
            {/* 蘑菇褶皱 */}
            <path d="M -3 -2 Q -3 -1 -3 0" stroke="#d6d3d1" strokeWidth="0.4" opacity="0.5" />
            <path d="M 0 -2 Q 0 -1 0 0" stroke="#d6d3d1" strokeWidth="0.4" opacity="0.5" />
            <path d="M 3 -2 Q 3 -1 3 0" stroke="#d6d3d1" strokeWidth="0.4" opacity="0.5" />
          </g>

          {/* 小番茄片 */}
          <g transform="translate(28, 52)">
            <circle cx="0" cy="0" r="2.5" fill="#f87171" stroke="#dc2626" strokeWidth="0.4" />
            <ellipse cx="0" cy="0" rx="1.2" ry="1.8" fill="#fca5a5" opacity="0.5" />
          </g>

          {/* 柠檬片在汤里 */}
          <g transform="translate(52, 52)">
            <circle cx="0" cy="0" r="3" fill="#fef08a" stroke="#facc15" strokeWidth="0.5" opacity="0.8" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line key={i} x1="0" y1="0" x2={2 * Math.cos((angle * Math.PI) / 180)} y2={2 * Math.sin((angle * Math.PI) / 180)} stroke="#fde047" strokeWidth="0.8" opacity="0.6" />
            ))}
          </g>

          {/* 蒸汽效果 - 更自然流畅 */}
          {[
            {x: 20, delay: 0, dur: 2.5, offset: 4},
            {x: 30, delay: 0.4, dur: 2.8, offset: -3},
            {x: 40, delay: 0.8, dur: 2.2, offset: 2},
            {x: 50, delay: 1.2, dur: 2.6, offset: -4},
            {x: 60, delay: 0.3, dur: 2.4, offset: 3}
          ].map((steam, i) => (
            <g key={i}>
              <path d={`M ${steam.x} 42 Q ${steam.x + steam.offset} 32 ${steam.x} 20 Q ${steam.x - steam.offset} 12 ${steam.x + steam.offset * 0.5} 4`} stroke="url(#steamGrad)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7">
                <animate attributeName="d" values={`M ${steam.x} 42 Q ${steam.x + steam.offset} 32 ${steam.x} 20 Q ${steam.x - steam.offset} 12 ${steam.x + steam.offset * 0.5} 4;M ${steam.x} 42 Q ${steam.x - steam.offset} 32 ${steam.x} 20 Q ${steam.x + steam.offset} 12 ${steam.x - steam.offset * 0.5} 4;M ${steam.x} 42 Q ${steam.x + steam.offset} 32 ${steam.x} 20 Q ${steam.x - steam.offset} 12 ${steam.x + steam.offset * 0.5} 4`} dur={`${steam.dur}s`} begin={`${steam.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.7;0" dur={`${steam.dur}s`} begin={`${steam.delay}s`} repeatCount="indefinite" />
              </path>
            </g>
          ))}

          {/* 香气粒子 - 上升动画 */}
          {[
            {x: 24, y: 28, delay: 0},
            {x: 36, y: 24, delay: 0.5},
            {x: 48, y: 26, delay: 1},
            {x: 56, y: 22, delay: 1.5}
          ].map((particle, i) => (
            <g key={i}>
              <circle cx={particle.x} cy="42" r="2" fill="#fdba74" opacity="0.6">
                <animate attributeName="cy" values="42;28;12;0" dur="3s" begin={`${particle.delay}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="1.5;2.5;1.5;0.5" dur="3s" begin={`${particle.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.6;0.3;0" dur="3s" begin={`${particle.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* 香气波纹 */}
          {[{x: 32, y: 18, delay: 0}, {x: 48, y: 15, delay: 1}].map((ripple, i) => (
            <circle key={i} cx={ripple.x} cy={ripple.y} r="2" fill="none" stroke="#fed7aa" strokeWidth="1.2" opacity="0.4">
              <animate attributeName="r" values="1;6;1" dur="2.5s" begin={`${ripple.delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" begin={`${ripple.delay}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="1.2;0.3;1.2" dur="2.5s" begin={`${ripple.delay}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* 美味表情 */}
          <text x="40" y="10" textAnchor="middle" fontSize="14" opacity="0.9">😋</text>
        </svg>
      ),
      bgColor: "from-orange-100 to-amber-100",
      borderColor: "border-orange-300",
    },
    // 关卡4: 香茅可以做驱蚊精油
    {
      icon: (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            {/* 精油瓶玻璃渐变 */}
            <linearGradient id="bottleGlass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d1fae5" />
              <stop offset="50%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            {/* 精油液体渐变 */}
            <linearGradient id="oilLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#86efac" />
            </linearGradient>
            {/* 瓶盖金属渐变 */}
            <linearGradient id="capMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            {/* 香茅叶片渐变1 */}
            <linearGradient id="leafOil1" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#d9f99d" />
              <stop offset="50%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            {/* 香茅叶片渐变2 */}
            <linearGradient id="leafOil2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#a3e635" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            {/* 魔法光芒渐变 */}
            <radialGradient id="magicGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e9d5ff" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#9333ea" stopOpacity="0.3" />
            </radialGradient>
            {/* 保护盾渐变 */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#e9d5ff" />
            </linearGradient>
          </defs>

          {/* 背景魔法光圈 */}
          <circle cx="40" cy="45" r="32" fill="url(#magicGlow)" opacity="0.3">
            <animate attributeName="r" values="32;35;32" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.15;0.3" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* 旋转的魔法光芒 */}
          <g opacity="0.7">
            <animateTransform attributeName="transform" type="rotate" from="0 40 45" to="360 40 45" dur="12s" repeatCount="indefinite" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
              <line
                key={i}
                x1={40 + 24 * Math.cos((angle * Math.PI) / 180)}
                y1={45 + 24 * Math.sin((angle * Math.PI) / 180)}
                x2={40 + 30 * Math.cos((angle * Math.PI) / 180)}
                y2={45 + 30 * Math.sin((angle * Math.PI) / 180)}
                stroke="url(#shieldGrad)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
              </line>
            ))}
          </g>

          {/* 魔法星星装饰 */}
          {[{x: 8, y: 10, delay: 0}, {x: 70, y: 8, delay: 0.5}, {x: 6, y: 72, delay: 1}].map((star, i) => (
            <g key={i}>
              <polygon points={`${star.x},${star.y - 3.5} ${star.x + 1.2},${star.y - 1} ${star.x + 3.5},${star.y - 1} ${star.x + 1.8},${star.y + 0.5} ${star.x + 2.5},${star.y + 3.5} ${star.x},${star.y + 1.8} ${star.x - 2.5},${star.y + 3.5} ${star.x - 1.8},${star.y + 0.5} ${star.x - 3.5},${star.y - 1} ${star.x - 1.2},${star.y - 1}`} fill="#fbbf24">
                <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5 + i * 0.3}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
                <animateTransform attributeName="transform" type="rotate" values={`0 ${star.x} ${star.y};360 ${star.x} ${star.y}`} dur="8s" repeatCount="indefinite" />
              </polygon>
              <circle cx={star.x} cy={star.y} r="2" fill="#fef08a" opacity="0.5">
                <animate attributeName="r" values="2;4;2" dur={`${1.5 + i * 0.3}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.5 + i * 0.3}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* 精油瓶主体 - 玻璃质感 */}
          <g>
            {/* 瓶身阴影 */}
            <ellipse cx="41" cy="74" rx="12" ry="3" fill="#000000" opacity="0.15" />

            {/* 瓶身 */}
            <path d="M 28 38 L 28 62 Q 28 67 33 68 L 47 68 Q 52 67 52 62 L 52 38 Q 52 36 50 36 L 30 36 Q 28 36 28 38" fill="url(#bottleGlass)" stroke="#22c55e" strokeWidth="1.5" opacity="0.9" />

            {/* 液体 */}
            <path d="M 29.5 42 L 29.5 62 Q 29.5 66 33.5 66.5 L 46.5 66.5 Q 50.5 66 50.5 62 L 50.5 42 Z" fill="url(#oilLiquid)" opacity="0.85">
              <animate attributeName="d" values="M 29.5 42 L 29.5 62 Q 29.5 66 33.5 66.5 L 46.5 66.5 Q 50.5 66 50.5 62 L 50.5 42 Z;M 29.5 43 L 29.5 62 Q 29.5 66 33.5 66.5 L 46.5 66.5 Q 50.5 66 50.5 62 L 50.5 43 Z;M 29.5 42 L 29.5 62 Q 29.5 66 33.5 66.5 L 46.5 66.5 Q 50.5 66 50.5 62 L 50.5 42 Z" dur="3s" repeatCount="indefinite" />
            </path>

            {/* 玻璃高光 - 左侧 */}
            <ellipse cx="32" cy="50" rx="3" ry="12" fill="white" opacity="0.5">
              <animate attributeName="opacity" values="0.5;0.3;0.5" dur="2s" repeatCount="indefinite" />
            </ellipse>

            {/* 玻璃高光 - 右侧小点 */}
            <ellipse cx="48" cy="48" rx="1.5" ry="5" fill="white" opacity="0.4">
              <animate attributeName="opacity" values="0.4;0.2;0.4" dur="2.5s" repeatCount="indefinite" />
            </ellipse>

            {/* 瓶颈 */}
            <rect x="36" y="28" width="8" height="9" fill="#86efac" rx="1.5" stroke="#22c55e" strokeWidth="1" opacity="0.9" />

            {/* 瓶盖 */}
            <rect x="35" y="22" width="10" height="7" fill="url(#capMetal)" rx="2.5" stroke="#d97706" strokeWidth="1" />
            <ellipse cx="40" cy="22" rx="4" ry="1.5" fill="#fef3c7" opacity="0.6" />

            {/* 瓶盖顶部纹理 */}
            {[24, 25.5, 27].map((y, i) => (
              <line key={i} x1="36" y1={y} x2="44" y2={y} stroke="#d97706" strokeWidth="0.5" opacity="0.4" />
            ))}
          </g>

          {/* 香茅标签 */}
          <rect x="32.5" y="46" width="15" height="18" fill="white" rx="2" opacity="0.95" stroke="#22c55e" strokeWidth="0.8" />
          {/* 标签上的香茅叶图案 */}
          <g transform="translate(40, 55)">
            <path d="M -1 6 Q -3 0 -1 -6 Q 1 0 -1 6" fill="url(#leafOil1)">
              <animate attributeName="d" values="M -1 6 Q -3 0 -1 -6 Q 1 0 -1 6;M -1 6 Q -3.5 0 -1 -6 Q 1.5 0 -1 6;M -1 6 Q -3 0 -1 -6 Q 1 0 -1 6" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 1 6 Q 3 0 1 -5 Q -1 0 1 6" fill="url(#leafOil2)">
              <animate attributeName="d" values="M 1 6 Q 3 0 1 -5 Q -1 0 1 6;M 1 6 Q 3.5 0 1 -5 Q -1.5 0 1 6;M 1 6 Q 3 0 1 -5 Q -1 0 1 6" dur="2.2s" repeatCount="indefinite" />
            </path>
            <path d="M 0 5 L 0 -5" stroke="#15803d" strokeWidth="0.6" opacity="0.5" />
          </g>

          {/* 瓶子周围的香茅叶片 - 更真实的扁平叶 */}
          {/* 左侧叶片1 */}
          <g transform="translate(18, 50)">
            <path d="M 0 8 Q -2 0 0 -12 Q 2 0 0 8" fill="url(#leafOil1)" stroke="#22c55e" strokeWidth="0.5" opacity="0.85">
              <animate attributeName="d" values="M 0 8 Q -2 0 0 -12 Q 2 0 0 8;M 0 8 Q -2.5 0 0 -13 Q 2.5 0 0 8;M 0 8 Q -2 0 0 -12 Q 2 0 0 8" dur="3s" repeatCount="indefinite" />
            </path>
            <path d="M 0 6 L 0 -10" stroke="#15803d" strokeWidth="0.4" opacity="0.4" />
          </g>

          {/* 左侧叶片2 */}
          <g transform="translate(22, 58) rotate(-15)">
            <path d="M 0 6 Q -1.5 0 0 -10 Q 1.5 0 0 6" fill="url(#leafOil2)" stroke="#4ade80" strokeWidth="0.5" opacity="0.8">
              <animate attributeName="d" values="M 0 6 Q -1.5 0 0 -10 Q 1.5 0 0 6;M 0 6 Q -2 0 0 -11 Q 2 0 0 6;M 0 6 Q -1.5 0 0 -10 Q 1.5 0 0 6" dur="2.5s" repeatCount="indefinite" />
            </path>
          </g>

          {/* 右侧叶片1 */}
          <g transform="translate(62, 52)">
            <path d="M 0 8 Q -2 0 0 -14 Q 2 0 0 8" fill="url(#leafOil1)" stroke="#22c55e" strokeWidth="0.5" opacity="0.85">
              <animate attributeName="d" values="M 0 8 Q -2 0 0 -14 Q 2 0 0 8;M 0 8 Q -2.5 0 0 -15 Q 2.5 0 0 8;M 0 8 Q -2 0 0 -14 Q 2 0 0 8" dur="3.2s" repeatCount="indefinite" />
            </path>
            <path d="M 0 7 L 0 -12" stroke="#15803d" strokeWidth="0.4" opacity="0.4" />
          </g>

          {/* 右侧叶片2 */}
          <g transform="translate(58, 60) rotate(12)">
            <path d="M 0 5 Q -1.5 0 0 -9 Q 1.5 0 0 5" fill="url(#leafOil2)" stroke="#4ade80" strokeWidth="0.5" opacity="0.8">
              <animate attributeName="d" values="M 0 5 Q -1.5 0 0 -9 Q 1.5 0 0 5;M 0 5 Q -2 0 0 -10 Q 2 0 0 5;M 0 5 Q -1.5 0 0 -9 Q 1.5 0 0 5" dur="2.8s" repeatCount="indefinite" />
            </path>
          </g>

          {/* 上方叶片 */}
          <g transform="translate(40, 18)">
            <path d="M 0 5 Q -2.5 0 0 -8 Q 2.5 0 0 5" fill="url(#leafOil1)" stroke="#22c55e" strokeWidth="0.5" opacity="0.9">
              <animate attributeName="d" values="M 0 5 Q -2.5 0 0 -8 Q 2.5 0 0 5;M 0 5 Q -3 0 0 -9 Q 3 0 0 5;M 0 5 Q -2.5 0 0 -8 Q 2.5 0 0 5" dur="2.6s" repeatCount="indefinite" />
            </path>
            <path d="M 0 4 L 0 -6" stroke="#15803d" strokeWidth="0.4" opacity="0.5" />
          </g>

          {/* 魔法粒子上升 - 更多样化 */}
          {[
            {x: 25, y: 55, delay: 0, dur: 2.5, color: "#a78bfa"},
            {x: 32, y: 60, delay: 0.3, dur: 2.8, color: "#86efac"},
            {x: 40, y: 58, delay: 0.6, dur: 2.3, color: "#c084fc"},
            {x: 48, y: 62, delay: 0.9, dur: 2.6, color: "#a3e635"},
            {x: 55, y: 56, delay: 1.2, dur: 2.4, color: "#e9d5ff"}
          ].map((particle, i) => (
            <g key={i}>
              <circle cx={particle.x} cy={particle.y} r="1.5" fill={particle.color}>
                <animate attributeName="cy" values={`${particle.y};${particle.y - 35};${particle.y - 50}`} dur={`${particle.dur}s`} begin={`${particle.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.6;0" dur={`${particle.dur}s`} begin={`${particle.delay}s`} repeatCount="indefinite" />
                <animate attributeName="r" values="1.5;2;0.8" dur={`${particle.dur}s`} begin={`${particle.delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}

          {/* 逃跑的蚊子 - 更生动 */}
          {[
            {startX: 65, startY: 20, endX: 78, endY: 6, dur: 1.8, flip: false, path: "M0,0 Q8,-5 16,-14"},
            {startX: 15, startY: 25, endX: 2, endY: 10, dur: 2, flip: true, path: "M0,0 Q-7,-6 -13,-15"},
            {startX: 68, startY: 60, endX: 78, endY: 74, dur: 2.1, flip: false, path: "M0,0 Q6,8 10,14"},
            {startX: 12, startY: 58, endX: 2, endY: 70, dur: 1.9, flip: true, path: "M0,0 Q-5,7 -10,12"}
          ].map((mosquito, i) => (
            <g key={i} opacity="0.85">
              <animateMotion path={mosquito.path} dur={`${mosquito.dur}s`} repeatCount="indefinite" />
              <g transform={`translate(${mosquito.startX}, ${mosquito.startY})`}>
                {/* 蚊子身体 */}
                <ellipse cx="0" cy="0" rx="3.5" ry="2" fill="#475569" stroke="#334155" strokeWidth="0.5" />

                {/* 头部 */}
                <circle cx={mosquito.flip ? 2.5 : -2.5} cy="-0.5" r="1.3" fill="#64748b" />

                {/* 触角 */}
                <line x1={mosquito.flip ? 2.5 : -2.5} y1="-1.5" x2={mosquito.flip ? 3.5 : -3.5} y2="-3" stroke="#334155" strokeWidth="0.5" />

                {/* 翅膀 - 快速震动 */}
                <g opacity="0.7">
                  <ellipse cx={mosquito.flip ? -1.5 : 1.5} cy="-1.8" rx="3" ry="1.2" fill="#cbd5e1">
                    <animate attributeName="ry" values="1.2;2.5;1.2" dur="0.08s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.4;0.7" dur="0.08s" repeatCount="indefinite" />
                  </ellipse>
                  <ellipse cx={mosquito.flip ? -1.8 : 1.8} cy="-1.5" rx="2.5" ry="1" fill="#e2e8f0">
                    <animate attributeName="ry" values="1;2;1" dur="0.08s" begin="0.04s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.08s" begin="0.04s" repeatCount="indefinite" />
                  </ellipse>
                </g>

                {/* 逃跑速度线 */}
                <g stroke="#94a3b8" strokeWidth="1" strokeLinecap="round">
                  <line x1={mosquito.flip ? -3.5 : 3.5} y1="-0.5" x2={mosquito.flip ? -6 : 6} y2="-1">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.5s" repeatCount="indefinite" />
                  </line>
                  <line x1={mosquito.flip ? -3.5 : 3.5} y1="0.5" x2={mosquito.flip ? -5.5 : 5.5} y2="1">
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.5s" begin="0.2s" repeatCount="indefinite" />
                  </line>
                </g>

                {/* 惊恐符号 */}
                <text x={mosquito.flip ? 4 : -4} y="-4" fontSize="6" textAnchor="middle">!</text>
              </g>
            </g>
          ))}

          {/* 多层保护盾 - 更精致 */}
          {/* 内层绿色盾 */}
          <circle cx="40" cy="45" r="20" fill="none" stroke="#86efac" strokeWidth="2.5" strokeDasharray="5,3" opacity="0.7">
            <animate attributeName="stroke-dashoffset" values="0;16" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;21;20" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* 中层紫色盾 */}
          <circle cx="40" cy="45" r="25" fill="none" stroke="#c084fc" strokeWidth="2" strokeDasharray="4,4" opacity="0.5">
            <animate attributeName="stroke-dashoffset" values="16;0" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="r" values="25;26;25" dur="2.5s" repeatCount="indefinite" />
          </circle>

          {/* 外层粉色盾 */}
          <circle cx="40" cy="45" r="28" fill="none" stroke="#f0abfc" strokeWidth="1.5" strokeDasharray="3,5" opacity="0.4">
            <animate attributeName="stroke-dashoffset" values="0;16" dur="2s" repeatCount="indefinite" />
            <animate attributeName="r" values="28;29;28" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* 保护盾闪光点 */}
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <circle
              key={i}
              cx={40 + 24 * Math.cos((angle * Math.PI) / 180)}
              cy={45 + 24 * Math.sin((angle * Math.PI) / 180)}
              r="2"
              fill="white"
              opacity="0.8"
            >
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="rotate" values={`0 40 45;360 40 45`} dur="8s" repeatCount="indefinite" />
            </circle>
          ))}
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
