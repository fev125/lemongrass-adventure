"use client"

import { useState, useEffect, useRef } from "react"
import { Mascot } from "./mascot"
import { StarProgress } from "./star-progress"
import { useAudio } from "./audio-context"
import type { LevelData } from "@/lib/levels-data"

interface LevelFeedbackProps {
  level: LevelData
  levelIndex: number
  totalLevels: number
  onNext: () => void
  isLastLevel: boolean
  onBack?: () => void
}

export function LevelFeedback({ level, levelIndex, totalLevels, onNext, isLastLevel, onBack }: LevelFeedbackProps) {
  const [mounted, setMounted] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { playSuccess, playClick, speak, ttsAvailable, isSpeaking } = useAudio()

  // 点击文字朗读
  const handleSpeak = (text: string) => {
    if (ttsAvailable) {
      playClick()
      speak(text)
    }
  }

  useEffect(() => {
    setMounted(true)
    playSuccess()

    if (ttsAvailable) {
      setTimeout(() => speak(level.correctFeedback), 300)
    }

    // 彩带动画
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const confetti: Array<{
          x: number
          y: number
          vx: number
          vy: number
          color: string
          size: number
          rotation: number
          rotationSpeed: number
          shape: "star" | "circle" | "square"
        }> = []

        const colors = ["#fbbf24", "#34d399", "#f472b6", "#60a5fa", "#a78bfa", "#fb7185"]

        for (let i = 0; i < 100; i++) {
          confetti.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 300,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 14 + 10,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 18,
            shape: ["star", "circle", "square"][Math.floor(Math.random() * 3)] as "star" | "circle" | "square",
          })
        }

        let frame = 0
        const maxFrames = 200

        const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2
            const px = x + Math.cos(angle) * size
            const py = y + Math.sin(angle) * size
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
        }

        const animate = () => {
          if (frame >= maxFrames) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            return
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          confetti.forEach((c) => {
            ctx.save()
            ctx.translate(c.x, c.y)
            ctx.rotate((c.rotation * Math.PI) / 180)
            ctx.fillStyle = c.color

            if (c.shape === "star") {
              drawStar(ctx, 0, 0, c.size / 2)
            } else if (c.shape === "circle") {
              ctx.beginPath()
              ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2)
              ctx.fill()
            } else {
              ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size)
            }

            ctx.restore()

            c.x += c.vx
            c.y += c.vy
            c.vy += 0.12
            c.rotation += c.rotationSpeed
          })

          frame++
          requestAnimationFrame(animate)
        }

        animate()
      }
    }

    setTimeout(() => setShowButton(true), 1200)
  }, [level, playSuccess, speak, ttsAvailable])

  const handleNext = () => {
    playClick()
    onNext()
  }

  return (
    <div className={`min-h-screen p-3 pb-4 ${level.bgColor} relative overflow-hidden`}>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

      <div className={`max-w-lg mx-auto space-y-3 relative z-10 ${mounted ? "animate-pop-in" : "opacity-0"}`}>
        {/* 进度星星 */}
        <StarProgress current={levelIndex + 1} total={totalLevels} />

        {/* 返回按钮 - 小圆形 */}
        {onBack && (
          <button
            onClick={() => {
              playClick()
              onBack()
            }}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur border-2 border-gray-200 text-gray-500 flex items-center justify-center shadow-lg active:scale-90 transition-transform z-20"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        )}

        {/* 庆祝区域 - 紧凑布局 */}
        <div className="flex items-center justify-center gap-4">
          {/* 笑脸 - 缩小 */}
          <div className="w-20 h-20 animate-bounce-in flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              <circle cx="50" cy="50" r="48" fill="#fef08a" stroke="#fbbf24" strokeWidth="4" />
              <path d="M 28 42 Q 35 32 42 42" stroke="#422006" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 58 42 Q 65 32 72 42" stroke="#422006" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 25 58 Q 50 85 75 58" stroke="#422006" strokeWidth="5" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="55" r="10" fill="#fda4af" opacity="0.6" />
              <circle cx="80" cy="55" r="10" fill="#fda4af" opacity="0.6" />
            </svg>
          </div>

          {/* 大字标题 - 可点击朗读 */}
          <button
            onClick={() => handleSpeak(isLastLevel ? "全部通关！你太厉害了！" : "答对啦！真棒！")}
            className="text-3xl font-black text-green-800 flex items-center gap-2 active:scale-95"
          >
            <span className="text-4xl">🎉</span>
            {isLastLevel ? "通关！" : "答对！"}
            <span className="text-4xl">🎉</span>
          </button>
        </div>

        {/* 吉祥物和反馈 - 可点击朗读 */}
        <button
          onClick={() => handleSpeak(level.correctFeedback)}
          className="w-full flex items-end gap-2 active:scale-98 transition-transform"
        >
          <Mascot mood="excited" size="md" />
          <div className="flex-1 bg-white rounded-2xl rounded-bl-lg p-3 shadow-xl border-4 border-green-200 relative">
            <div className="absolute -left-2 bottom-3 w-4 h-4 bg-white border-l-4 border-b-4 border-green-200 transform rotate-45" />
            <p className="text-lg text-green-700 font-bold leading-snug">{level.correctFeedback}</p>
            {ttsAvailable && (
              <span className={`text-xl absolute -top-2 -right-2 ${isSpeaking ? "animate-pulse" : ""}`}>🔊</span>
            )}
          </div>
        </button>

        {/* 知识点卡片 - 可点击朗读，更紧凑 */}
        <button
          onClick={() => handleSpeak(level.summaryPoint)}
          className="w-full bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-3 border-4 border-amber-300 shadow-lg active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center flex-shrink-0 shadow">
              <span className="text-2xl">📖</span>
            </div>
            <p className="font-black text-amber-800 text-lg leading-snug text-left flex-1">{level.summaryPoint}</p>
            {ttsAvailable && (
              <span className={`text-xl ${isSpeaking ? "animate-pulse" : ""}`}>🔊</span>
            )}
          </div>
        </button>

        {/* 继续按钮 - 更紧凑 */}
        {showButton && (
          <button
            onClick={handleNext}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-2xl flex items-center justify-center gap-3 shadow-xl border-4 border-green-300 active:scale-95 transition-transform animate-pop-in"
          >
            {isLastLevel ? (
              <>
                <span className="text-3xl">🏆</span>
                <span>看成绩</span>
              </>
            ) : (
              <>
                <span className="text-3xl">👉</span>
                <span>下一关</span>
              </>
            )}
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
