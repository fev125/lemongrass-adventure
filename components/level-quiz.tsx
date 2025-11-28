"use client"

import { useState, useEffect } from "react"
import { Volume2 } from "lucide-react"
import { IllustrationRenderer } from "./illustration-renderer"
import { Mascot } from "./mascot"
import { StarProgress } from "./star-progress"
import { useAudio } from "./audio-context"
import type { LevelData, LevelOption } from "@/lib/levels-data"

interface LevelQuizProps {
  level: LevelData
  levelIndex: number
  totalLevels: number
  onAnswer: (correct: boolean) => void
  consecutiveErrors: number
  onBack?: () => void
}

export function LevelQuiz({ level, levelIndex, totalLevels, onAnswer, consecutiveErrors, onBack }: LevelQuizProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null)
  const { playClick, playError, speak, stopSpeaking, isSpeaking, ttsAvailable } = useAudio()

  // 所有关卡都显示音频按钮，帮助3岁幼儿理解图片内容
  const showAudioButtons = true

  useEffect(() => {
    setMounted(true)
    setSelectedId(null)
    setShowResult(null)
    setShowHint(false)

    if (ttsAvailable) {
      const timer = setTimeout(() => {
        speak(level.quizQuestion)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [level, speak, ttsAvailable])

  useEffect(() => {
    if (consecutiveErrors >= 2) {
      setShowHint(true)
    }
  }, [consecutiveErrors])

  const handleSelect = (option: LevelOption) => {
    if (selectedId) return

    playClick()
    setSelectedId(option.id)

    if (option.isCorrect) {
      setShowResult("correct")
      setTimeout(() => {
        onAnswer(true)
      }, 800)
    } else {
      setShowResult("wrong")
      playError()
      setTimeout(() => {
        setSelectedId(null)
        setShowResult(null)
        onAnswer(false)
      }, 1000)
    }
  }

  const handlePlayFeatureAudio = (e: React.MouseEvent, option: LevelOption) => {
    e.stopPropagation()

    if (!option.featureAudio || !ttsAvailable) return

    playClick()

    if (playingAudioId !== null) {
      stopSpeaking()
    }

    setPlayingAudioId(option.id)
    speak(option.featureAudio)
  }

  useEffect(() => {
    if (!isSpeaking && playingAudioId !== null) {
      setPlayingAudioId(null)
    }
  }, [isSpeaking, playingAudioId])

  // 重新朗读问题
  const handleReplayQuestion = () => {
    if (ttsAvailable) {
      playClick()
      speak(level.quizQuestion)
    }
  }

  return (
    <div className={`min-h-screen p-3 pb-6 ${level.bgColor}`}>
      <div className={`max-w-lg mx-auto space-y-4 ${mounted ? "animate-fade-in" : "opacity-0"}`}>
        {/* 进度星星 */}
        <StarProgress current={levelIndex} total={totalLevels} />

        {/* 返回按钮 - 适中大小，易于点击 */}
        {onBack && (
          <button
            onClick={() => {
              playClick()
              onBack()
            }}
            className="absolute top-4 left-4 w-14 h-14 rounded-full bg-white/90 backdrop-blur border-3 border-gray-200 text-gray-500 flex items-center justify-center shadow-lg active:scale-90 transition-all hover:border-green-300 hover:text-green-600 z-20"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
        )}

        {/* 吉祥物和问题 - 可点击重新播放 */}
        <button
          onClick={handleReplayQuestion}
          className="w-full flex items-end gap-3 active:scale-98 transition-transform"
        >
          <Mascot mood={showHint ? "thinking" : "curious"} size="lg" />
          <div className="flex-1 bg-white rounded-[1.5rem] rounded-bl-lg p-4 shadow-xl border-4 border-green-200 relative">
            <div className="absolute -left-3 bottom-4 w-5 h-5 bg-white border-l-4 border-b-4 border-green-200 transform rotate-45" />

            {/* 问题文字 */}
            <h2 className="text-xl font-black text-green-800 leading-relaxed">
              {level.quizQuestion}
            </h2>

            {/* 点击播放提示 - 视觉图标 */}
            {ttsAvailable && (
              <div className="flex items-center gap-2 mt-2 text-green-500">
                <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-pulse" : ""}`} />
                <span className="text-sm font-bold">{isSpeaking ? "正在播放..." : "点我听问题"}</span>
                <span className="text-lg">🔊</span>
              </div>
            )}
          </div>
        </button>

        {/* 选项卡片 - 更大的触摸区域和间距 */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          {level.options.map((option, index) => {
            const isSelected = selectedId === option.id
            const isCorrectAnswer = isSelected && option.isCorrect
            const isWrongAnswer = isSelected && !option.isCorrect

            return (
              <div key={option.id} className="flex flex-col">
                <button
                  onClick={() => handleSelect(option)}
                  disabled={selectedId !== null}
                  className={`
                    relative bg-white rounded-[1.5rem] p-3 text-center
                    transition-all duration-200 flex-1 flex flex-col
                    border-[5px] shadow-xl min-h-[180px]
                    active:scale-95
                    ${
                      isCorrectAnswer
                        ? "border-green-400 bg-green-50 scale-105 ring-4 ring-green-300 option-correct-glow"
                        : isWrongAnswer
                          ? "border-red-400 bg-red-50 animate-wiggle option-wrong-glow"
                          : "border-gray-200 hover:border-green-300 hover:shadow-2xl"
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* 正确/错误 视觉反馈图标 - 超大显眼 */}
                  {isCorrectAnswer && (
                    <div className="absolute -top-4 -right-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-in z-10 border-4 border-white">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  )}
                  {isWrongAnswer && (
                    <div className="absolute -top-4 -right-4 w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-wiggle z-10 border-4 border-white">
                      <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </div>
                  )}

                  {/* 插画 - 更大 */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-2 bg-gray-50 flex-1">
                    <IllustrationRenderer id={option.illustrationId} className="w-full h-full" />
                  </div>

                  {/* 标签 - 更醒目 */}
                  <p className="text-lg font-black text-green-800 py-1">{option.label}</p>

                  {/* 音频按钮 - 卡片内右下角小图标 */}
                  {showAudioButtons && option.featureAudio && ttsAvailable && (
                    <button
                      onClick={(e) => handlePlayFeatureAudio(e, option)}
                      disabled={selectedId !== null}
                      className={`
                        absolute bottom-2 right-2 w-10 h-10 rounded-full
                        flex items-center justify-center
                        transition-all duration-200
                        active:scale-90
                        ${
                          playingAudioId === option.id
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }
                        disabled:opacity-50
                      `}
                    >
                      <Volume2 className={`w-5 h-5 ${playingAudioId === option.id ? "animate-pulse" : ""}`} />
                    </button>
                  )}

                  {/* 正确时的星星奖励 + 文字动画 + 粒子效果 */}
                  {isCorrectAnswer && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      {/* 主星星 */}
                      <span className="text-6xl animate-bounce-in">⭐</span>

                      {/* 鼓励文字 */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-up">
                        <p className="text-3xl font-black rainbow-text whitespace-nowrap">
                          太棒了！
                        </p>
                      </div>

                      {/* 粒子爆炸效果 */}
                      <span className="particle text-2xl" style={{ '--tx': '-50px', '--ty': '-60px' } as React.CSSProperties}>✨</span>
                      <span className="particle text-2xl" style={{ '--tx': '50px', '--ty': '-60px' } as React.CSSProperties}>🌟</span>
                      <span className="particle text-xl" style={{ '--tx': '-70px', '--ty': '0px' } as React.CSSProperties}>💫</span>
                      <span className="particle text-xl" style={{ '--tx': '70px', '--ty': '0px' } as React.CSSProperties}>⭐</span>
                      <span className="particle text-2xl" style={{ '--tx': '-40px', '--ty': '50px' } as React.CSSProperties}>🎉</span>
                      <span className="particle text-2xl" style={{ '--tx': '40px', '--ty': '50px' } as React.CSSProperties}>🎊</span>
                    </div>
                  )}

                  {/* 错误时的提示气泡 */}
                  {isWrongAnswer && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 error-bubble pointer-events-none z-20">
                      <div className="bg-amber-100 border-2 border-amber-400 rounded-full px-4 py-2 shadow-lg">
                        <p className="text-amber-700 font-bold text-sm whitespace-nowrap">再看看这个哦~</p>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* 错误鼓励 - 更可爱的视觉 */}
        {consecutiveErrors > 0 && !showHint && showResult !== "wrong" && (
          <div className="bg-white rounded-[1.5rem] p-4 text-center shadow-lg border-4 border-amber-200 animate-pop-in">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">💪</span>
              <p className="text-xl text-amber-700 font-bold">加油！再试试！</p>
              <span className="text-4xl">🌟</span>
            </div>
          </div>
        )}

        {/* 提示 - 更直观的视觉 */}
        {showHint && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-[1.5rem] p-4 border-4 border-amber-300 animate-pop-in shadow-xl">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">💡</span>
              </div>
              <div className="flex-1">
                <p className="font-black text-amber-700 text-lg flex items-center gap-2">
                  小提示
                  <span className="text-xl">🤫</span>
                </p>
                <p className="text-amber-600 mt-1 text-lg font-medium leading-relaxed">{level.hintText}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
