"use client"

import { useState, useEffect } from "react"
import { VolumeX, Volume2 } from "lucide-react"
import { Mascot } from "./mascot"
import { AnimatedBackground } from "./animated-background"
import { useAudio } from "./audio-context"

interface CoverScreenProps {
  onStart: () => void
  onStartSilent: () => void
}

export function CoverScreen({ onStart, onStartSilent }: CoverScreenProps) {
  const [mounted, setMounted] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const { speak, stopSpeaking, isSpeaking, ttsAvailable, playClick, playBgm, stopBgm, isBgmPlaying, soundEnabled } = useAudio()

  const welcomeText = "嗨！我是香茅宝宝！和我一起去探险吧！"

  useEffect(() => {
    setMounted(true)

    // 延迟播放欢迎语音和背景音乐
    const timer = setTimeout(() => {
      if (ttsAvailable && soundEnabled) {
        speak(welcomeText)
      }
      // 启动背景音乐
      if (soundEnabled) {
        playBgm()
      }
    }, 800)

    return () => {
      clearTimeout(timer)
      stopSpeaking()
    }
  }, [ttsAvailable, soundEnabled, speak, stopSpeaking, playBgm])

  // 点击重新播放欢迎语
  const handleReplayWelcome = () => {
    if (ttsAvailable) {
      playClick()
      speak(welcomeText)
    }
  }

  // 切换背景音乐
  const handleToggleBgm = () => {
    playClick()
    if (isBgmPlaying) {
      stopBgm()
    } else {
      playBgm()
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-sky-200 via-green-100 to-amber-100">
      {/* 优化后的 SVG 动画背景 */}
      <AnimatedBackground />

      <div className={`text-center space-y-6 relative z-10 w-full max-w-md ${mounted ? "animate-pop-in" : "opacity-0"}`}>
        {/* 吉祥物 - 更大更显眼 */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <Mascot mood="excited" size="xl" />
            {/* 欢迎气泡 */}
            <div className="absolute -top-2 -right-8 bg-white rounded-full px-3 py-1.5 shadow-lg border-2 border-green-300 animate-bounce">
              <span className="text-2xl">👋</span>
            </div>
          </div>
        </div>

        {/* 标题 - 更大更醒目 */}
        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-black text-green-800 drop-shadow-lg">
            香茅探险记
          </h1>
          {/* 对话框 - 可点击朗读 */}
          <button
            onClick={handleReplayWelcome}
            className="inline-block bg-white rounded-[2rem] px-6 py-4 shadow-xl border-4 border-green-200 relative active:scale-95 transition-transform"
          >
            <p className="text-2xl text-green-700 font-bold">嗨！我是香茅宝宝！</p>
            <p className="text-lg text-green-600 mt-1">和我一起去探险吧！</p>
            {/* 小叶子装饰 */}
            <span className="absolute -top-3 -left-3 text-3xl transform -rotate-12">🌿</span>
            <span className="absolute -bottom-2 -right-2 text-2xl transform rotate-12">🌱</span>
            {/* 朗读指示器 */}
            {ttsAvailable && (
              <span className={`absolute -top-2 -right-2 text-xl ${isSpeaking ? "animate-pulse" : ""}`}>🔊</span>
            )}
          </button>
        </div>

        {/* 开始按钮 - 超大触摸区域 */}
        <div className="pt-6 space-y-4">
          <button
            onClick={onStart}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            className={`
              w-full h-28 rounded-[2rem]
              bg-gradient-to-b from-green-400 via-green-500 to-emerald-600
              text-white font-black text-4xl
              flex items-center justify-center gap-4
              shadow-2xl border-4 border-green-300
              transition-all duration-150
              relative overflow-hidden
              ${isPressed ? "scale-95 shadow-lg" : "scale-100 hover:scale-105"}
            `}
          >
            {/* 闪光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />

            {/* 播放图标 - 更大更直观 */}
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="drop-shadow-lg">开始玩！</span>
          </button>

          {/* 底部按钮 - 横向布局 */}
          <div className="flex gap-3 justify-center">
            {/* 背景音乐按钮 */}
            <button
              onClick={handleToggleBgm}
              className={`flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-lg shadow-lg border-2 active:scale-95 transition-all ${
                isBgmPlaying
                  ? "bg-amber-100 border-amber-300 text-amber-700"
                  : "bg-white/80 backdrop-blur border-gray-200 text-gray-500"
              }`}
            >
              <span className="text-2xl">{isBgmPlaying ? "🎵" : "🔇"}</span>
              <span>{isBgmPlaying ? "音乐" : "静音"}</span>
            </button>

            {/* 静音模式按钮 */}
            <button
              onClick={onStartSilent}
              className="flex items-center justify-center gap-2 text-green-700 bg-white/80 backdrop-blur px-5 py-4 rounded-2xl font-bold text-lg shadow-lg border-2 border-green-200 active:scale-95 transition-transform"
            >
              <VolumeX className="w-6 h-6" />
              <span>静音开始</span>
            </button>
          </div>
        </div>

        {/* 装饰星星 */}
        <div className="absolute top-10 left-4 text-3xl animate-pulse">⭐</div>
        <div className="absolute top-20 right-6 text-2xl animate-bounce" style={{ animationDelay: "0.5s" }}>✨</div>
        <div className="absolute bottom-32 left-8 text-2xl animate-pulse" style={{ animationDelay: "1s" }}>🌟</div>
      </div>
    </div>
  )
}
