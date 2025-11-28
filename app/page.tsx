"use client"

import { useState, useEffect } from "react"
import { CoverScreen } from "@/components/cover-screen"
import { LevelTeach } from "@/components/level-teach"
import { LevelQuiz } from "@/components/level-quiz"
import { LevelFeedback } from "@/components/level-feedback"
import { SummaryScreen } from "@/components/summary-screen"
import { AudioProvider } from "@/components/audio-context"
import { levelsData } from "@/lib/levels-data"
import { Settings, Volume2, VolumeX, RotateCcw, ArrowLeft } from "lucide-react"

type GamePhase = "cover" | "teach" | "quiz" | "feedback" | "summary"

export default function LemongrassAdventure() {
  const [phase, setPhase] = useState<GamePhase>("cover")
  const [previousPhase, setPreviousPhase] = useState<GamePhase | null>(null)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [consecutiveErrors, setConsecutiveErrors] = useState(0)
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  
  // 更新 phase 时记录上一个 phase
  const updatePhase = (newPhase: GamePhase) => {
    setPreviousPhase(phase)
    setPhase(newPhase)
  }

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lemongrass-progress")
    if (saved) {
      const data = JSON.parse(saved)
      setUnlockedLevels(data.unlockedLevels || [0])
    }
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem("lemongrass-progress", JSON.stringify({ unlockedLevels }))
  }, [unlockedLevels])

  const handleStartGame = () => {
    updatePhase("teach")
    setCurrentLevel(0)
  }

  const handleTeachComplete = () => {
    updatePhase("quiz")
  }

  const handleQuizAnswer = (correct: boolean) => {
    setIsCorrect(correct)
    if (correct) {
      setConsecutiveErrors(0)
      updatePhase("feedback")
    } else {
      setConsecutiveErrors((prev) => prev + 1)
    }
  }

  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1
    if (nextLevel >= levelsData.length) {
      updatePhase("summary")
    } else {
      if (!unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels((prev) => [...prev, nextLevel])
      }
      setCurrentLevel(nextLevel)
      updatePhase("teach")
      setConsecutiveErrors(0)
    }
  }

  const handleRestart = () => {
    updatePhase("cover")
    setCurrentLevel(0)
    setConsecutiveErrors(0)
    setPreviousPhase(null)
  }

  const handleSelectLevel = (level: number) => {
    if (unlockedLevels.includes(level)) {
      setCurrentLevel(level)
      updatePhase("teach")
      setConsecutiveErrors(0)
    }
  }

  // 返回上一页
  const handleGoBack = () => {
    if (phase === "teach") {
      // 如果上一个页面是 quiz，返回 quiz；否则返回 cover
      if (previousPhase === "quiz") {
        updatePhase("quiz")
      } else {
        updatePhase("cover")
      }
    } else if (phase === "quiz") {
      updatePhase("teach")
    } else if (phase === "feedback") {
      updatePhase("quiz")
    } else if (phase === "summary") {
      // 返回到最后一个关卡的 feedback
      setCurrentLevel(levelsData.length - 1)
      updatePhase("feedback")
    }
  }

  return (
    <AudioProvider soundEnabled={soundEnabled}>
      <main className="min-h-screen relative overflow-hidden">
        {phase !== "cover" && (
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-12 h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-green-700 hover:bg-white transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>

            {showSettings && (
              <div className="absolute top-14 right-0 bg-white rounded-2xl shadow-xl p-3 space-y-2 min-w-[140px] animate-pop-in">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-green-50 text-green-700"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  <span className="text-sm font-medium">{soundEnabled ? "关闭声音" : "开启声音"}</span>
                </button>
                <button
                  onClick={() => {
                    handleRestart()
                    setShowSettings(false)
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-green-50 text-green-700"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="text-sm font-medium">重新开始</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 点击外部关闭设置菜单 */}
        {showSettings && <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />}

        <div className="relative z-10">
          {phase === "cover" && (
            <CoverScreen
              onStart={handleStartGame}
              onStartSilent={() => {
                setSoundEnabled(false)
                handleStartGame()
              }}
            />
          )}

          {phase === "teach" && (
            <LevelTeach
              level={levelsData[currentLevel]}
              levelIndex={currentLevel}
              totalLevels={levelsData.length}
              onComplete={handleTeachComplete}
              onBack={handleGoBack}
            />
          )}

          {phase === "quiz" && (
            <LevelQuiz
              level={levelsData[currentLevel]}
              levelIndex={currentLevel}
              totalLevels={levelsData.length}
              onAnswer={handleQuizAnswer}
              consecutiveErrors={consecutiveErrors}
              onBack={handleGoBack}
            />
          )}

          {phase === "feedback" && (
            <LevelFeedback
              level={levelsData[currentLevel]}
              levelIndex={currentLevel}
              totalLevels={levelsData.length}
              onNext={handleNextLevel}
              isLastLevel={currentLevel === levelsData.length - 1}
              onBack={handleGoBack}
            />
          )}

          {phase === "summary" && (
            <SummaryScreen
              onReview={handleRestart}
              onFinish={handleRestart}
              unlockedLevels={unlockedLevels}
              onSelectLevel={handleSelectLevel}
            />
          )}
        </div>
      </main>
    </AudioProvider>
  )
}
