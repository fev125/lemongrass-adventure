"use client"

import { useState, useEffect, useRef } from "react"
import { VolumeX, Volume2 } from "lucide-react"
import { IllustrationRenderer } from "./illustration-renderer"
import { Mascot } from "./mascot"
import { StarProgress } from "./star-progress"
import { useAudio } from "./audio-context"
import type { LevelData } from "@/lib/levels-data"

interface LevelTeachProps {
  level: LevelData
  levelIndex: number
  totalLevels: number
  onComplete: () => void
  onBack?: () => void
}

export function LevelTeach({ level, levelIndex, totalLevels, onComplete, onBack }: LevelTeachProps) {
  const [mounted, setMounted] = useState(false)
  const { speak, stopSpeaking, isSpeaking, ttsAvailable, playClick } = useAudio()
  const videoRef = useRef<HTMLVideoElement>(null)
  const playCountRef = useRef(0)

  // 判断显示哪个视频
  const showVideoHome = level.theme === "香茅的家"
  const showVideoAppearance = level.theme === "香茅的样子"
  const showVideoFood = level.theme === "香茅做美食"
  const showVideoMagic = level.theme === "香茅的魔法"
  const showVideo = showVideoHome || showVideoAppearance || showVideoFood || showVideoMagic

  // 获取视频路径、是否静音和缩放比例
  const videoSrc = showVideoHome
    ? "/香茅的家.mp4"
    : showVideoAppearance
      ? "/香茅的样子.mp4"
      : showVideoFood
        ? "/香茅做美食.mp4"
        : showVideoMagic
          ? "/香茅的魔法.mp4"
          : ""
  const videoMuted = showVideoAppearance
  const videoScale = showVideoHome ? 1.3 : 1.0

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      if (ttsAvailable) {
        speak(level.teachContent)
      }
    }, 800)

    return () => {
      clearTimeout(timer)
      stopSpeaking()
    }
  }, [level, speak, stopSpeaking, ttsAvailable])

  // 视频自动播放2次
  useEffect(() => {
    if (!showVideo || !videoRef.current) return

    const video = videoRef.current
    playCountRef.current = 0

    video.preload = "auto"
    video.playsInline = true

    if (video.parentElement) {
      video.parentElement.style.transform = "translateZ(0)"
      video.parentElement.style.willChange = "transform"
    }

    const handleVideoEnd = () => {
      playCountRef.current += 1
      if (playCountRef.current < 2) {
        video.currentTime = 0
        video.play().catch((err) => {
          console.error("视频播放失败:", err)
        })
      }
    }

    video.addEventListener("ended", handleVideoEnd)
    video.muted = videoMuted

    const playVideo = async () => {
      try {
        await video.play()
        if (!videoMuted && video.muted) {
          video.muted = false
        }
      } catch (err) {
        console.warn("视频自动播放失败:", err)
        video.muted = true
        video.play().catch((e) => {
          console.error("静音播放也失败:", e)
        })
      }
    }

    const playTimer = setTimeout(playVideo, 1000)

    return () => {
      clearTimeout(playTimer)
      video.removeEventListener("ended", handleVideoEnd)
      video.pause()
      video.currentTime = 0
      playCountRef.current = 0
    }
  }, [showVideo, videoMuted])

  const handleListenAgain = () => {
    playClick()
    speak(level.teachContent)
  }

  const handleComplete = () => {
    playClick()
    stopSpeaking()
    onComplete()
  }

  const handleVideoClick = () => {
    if (!videoRef.current) return

    const video = videoRef.current
    playClick()
    playCountRef.current = 0
    video.currentTime = 0
    video.play().catch((err) => {
      console.error("视频播放失败:", err)
    })
  }

  return (
    <div className={`min-h-screen p-3 pb-4 ${level.bgColor}`}>
      <div className={`max-w-lg mx-auto space-y-3 ${mounted ? "animate-fade-in" : "opacity-0"}`}>
        {/* 进度星星 */}
        <StarProgress current={levelIndex} total={totalLevels} />

        {/* 返回按钮 - 小圆形，不显眼 */}
        {onBack && (
          <button
            onClick={() => {
              playClick()
              onBack()
            }}
            className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/80 backdrop-blur border-2 border-gray-200 text-gray-500 flex items-center justify-center shadow-lg active:scale-90 transition-transform z-20"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        )}

        {/* 主题标签 - 更醒目 */}
        <div className="flex justify-center">
          <div className="px-6 py-3 rounded-full bg-white text-green-700 text-xl font-bold shadow-lg border-4 border-green-200 flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <span>{level.theme}</span>
          </div>
        </div>

        {/* 吉祥物和对话气泡 - 可点击播放 */}
        <button
          onClick={handleListenAgain}
          disabled={!ttsAvailable}
          className="w-full flex items-end gap-3 active:scale-98 transition-transform disabled:active:scale-100"
        >
          <Mascot mood={level.mascotMood} size="lg" />
          <div className="flex-1 bg-white rounded-[1.5rem] rounded-bl-lg p-4 shadow-xl border-4 border-green-200 relative">
            <div className="absolute -left-3 bottom-4 w-5 h-5 bg-white border-l-4 border-b-4 border-green-200 transform rotate-45" />

            <h2 className="text-xl font-black text-green-800 mb-2">{level.teachTitle}</h2>
            <p className="text-lg text-green-700 leading-relaxed font-medium">{level.teachContent}</p>

            {/* 朗读状态指示器 */}
            {ttsAvailable && (
              <div className="flex items-center gap-2 text-green-500 text-sm mt-3 font-bold">
                {isSpeaking ? (
                  <>
                    <div className="flex gap-1">
                      <span className="w-2 h-4 bg-green-400 rounded-full animate-pulse" />
                      <span className="w-2 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                      <span className="w-2 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <span>正在说话...</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span>点我再听一遍</span>
                    <span className="text-lg">🔊</span>
                  </>
                )}
              </div>
            )}
          </div>
        </button>

        {/* 视频/插画区域 */}
        {showVideo ? (
          <div className="bg-white rounded-[1.5rem] p-3 shadow-xl border-4 border-green-200">
            <div
              className="rounded-2xl relative"
              style={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                className="rounded-2xl"
                playsInline
                preload="auto"
                loop={false}
                muted={videoMuted}
                onClick={handleVideoClick}
                style={{
                  width: "100%",
                  height: "auto",
                  transform: `scale(${videoScale})`,
                  transformOrigin: "center center",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  display: "block",
                }}
              />
              {/* 重播提示 */}
              <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white text-sm">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                </svg>
                <span>点击重播</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[1.5rem] p-3 shadow-xl border-4 border-green-200">
            <IllustrationRenderer id={level.teachIllustrationId} className="w-full h-auto rounded-2xl" />
          </div>
        )}

        {/* TTS 不可用提示 - 更紧凑 */}
        {!ttsAvailable && (
          <div className="flex items-center gap-2 bg-amber-50 rounded-2xl p-3 text-amber-700 border-3 border-amber-200">
            <span className="text-2xl">👨‍👩‍👧</span>
            <p className="text-base font-bold flex-1">请家长读给宝宝听</p>
            <VolumeX className="w-6 h-6 shrink-0" />
          </div>
        )}

        {/* 底部按钮区 - 横向布局减少高度 */}
        <div className="flex gap-2 pt-2">
          {/* 再听一遍按钮 - 小圆形 */}
          {ttsAvailable && (
            <button
              onClick={handleListenAgain}
              disabled={isSpeaking}
              className={`w-16 h-16 rounded-2xl bg-white border-4 border-green-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform disabled:opacity-50 ${isSpeaking ? "animate-pulse" : ""}`}
            >
              <span className="text-3xl">🔊</span>
            </button>
          )}

          {/* 继续按钮 - 占满剩余空间 */}
          <button
            onClick={handleComplete}
            className="flex-1 h-16 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-black text-2xl flex items-center justify-center gap-3 shadow-xl border-4 border-green-300 active:scale-95 transition-transform relative overflow-hidden"
          >
            <span className="text-3xl">✨</span>
            <span>学会啦</span>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
