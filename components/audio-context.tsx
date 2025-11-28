"use client"

import { createContext, useContext, useCallback, useEffect, useRef, useState, type ReactNode } from "react"

interface AudioContextType {
  playClick: () => void
  playSuccess: () => void
  playError: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
  isSpeaking: boolean
  ttsAvailable: boolean
  soundEnabled: boolean
  playBgm: () => void
  stopBgm: () => void
  isBgmPlaying: boolean
}

const AudioCtx = createContext<AudioContextType | null>(null)

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error("useAudio must be used within AudioProvider")
  return ctx
}

interface AudioProviderProps {
  children: ReactNode
  soundEnabled: boolean
}

export function AudioProvider({ children, soundEnabled }: AudioProviderProps) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [ttsAvailable, setTtsAvailable] = useState(false)
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null)
  const [isBgmPlaying, setIsBgmPlaying] = useState(false)
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null)

  // 自动播放背景音乐
  useEffect(() => {
    if (soundEnabled) {
      // 延迟一点时间，确保 AudioContext 已初始化
      const timer = setTimeout(() => {
        playBgm()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [soundEnabled, playBgm])

  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    const checkTTS = () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        const loadVoices = () => {
          const voices = speechSynthesis.getVoices()

          // 日志：输出所有可用中文语音
          const chineseVoices = voices.filter(
            (v) => v.lang.startsWith("zh-CN") || v.lang.startsWith("zh_CN") || v.lang === "zh",
          )
          console.log("[TTS] 所有可用中文语音:", chineseVoices.map((v) => ({
            name: v.name,
            lang: v.lang,
            voiceURI: v.voiceURI,
            localService: (v as any).localService,
            default: (v as any).default,
          })))

          // 按优先级查找高质量中文语音
          // 优先级：iOS 高质量语音 > Chrome Google 语音 > 女声 > 其他本地语音
          const preferredVoicePatterns = [
            /tingting/i, // iOS 高质量女声
            /ting-ting/i, // macOS
            /siyi/i, // iOS 高质量女声
            /google.*普通话/i, // Chrome 高质量语音
            /google/i, // Chrome 其他 Google 语音
            /microsoft.*xiaoxiao/i, // Edge 女声
            /microsoft.*yunxi/i, // Edge 男声
          ]

          let foundVoice: SpeechSynthesisVoice | null = null
          let foundReason = ""

          // 先找优先语音（iOS/Google 优先），支持正则匹配
          for (const pattern of preferredVoicePatterns) {
            const voice = chineseVoices.find((v) => pattern.test(v.name))
            if (voice) {
              foundVoice = voice
              foundReason = `✅ 找到优先语音: ${voice.name} (匹配: ${pattern})`
              break
            }
          }

          // 如果没找到优先语音，尝试选择女声（通常更自然，适合儿童应用）
          if (!foundVoice) {
            // Chrome 中女声通常包含：女、female、woman 等关键词，或排除明显的男声关键词
            const femaleKeywords = [/女/i, /female/i, /woman/i, /xiaoxiao/i]
            const maleKeywords = [/男/i, /male/i, /man/i, /eddy/i, /yunxi/i]
            
            const femaleVoices = chineseVoices.filter((v) => {
              const name = v.name.toLowerCase()
              const hasFemale = femaleKeywords.some((k) => k.test(name))
              const hasMale = maleKeywords.some((k) => k.test(name))
              return hasFemale && !hasMale
            })
            
            if (femaleVoices.length > 0) {
              const localFemale = femaleVoices.filter((v) => (v as any).localService !== false)
              foundVoice = localFemale[0] || femaleVoices[0]
              foundReason = `✅ 找到女声语音: ${foundVoice.name} (更适合儿童应用)`
            }
          }

          // 如果还没找到，优先选择 localService: true 的语音（本地高质量语音）
          if (!foundVoice) {
            const localVoices = chineseVoices.filter((v) => (v as any).localService !== false)
            if (localVoices.length > 0) {
              // 优先选择非默认语音（通常质量更好）
              foundVoice = localVoices.find((v) => !(v as any).default) || localVoices[0]
              foundReason = `⚠️ 未找到优先语音，使用本地语音: ${foundVoice.name}`
            } else {
              // 最后选择任何中文语音
              foundVoice = chineseVoices[0] || null
              if (foundVoice) {
                foundReason = `⚠️ 未找到本地语音，使用默认中文语音: ${foundVoice.name}`
              } else {
                foundReason = `❌ 未找到任何中文语音`
              }
            }
          }

          if (foundVoice) {
            preferredVoiceRef.current = foundVoice
            setTtsAvailable(true)
            console.log(`[TTS] 已选择语音:`, {
              name: foundVoice.name,
              lang: foundVoice.lang,
              voiceURI: foundVoice.voiceURI,
              localService: (foundVoice as any).localService,
              reason: foundReason,
            })
            
            // 检查是否有更好的语音可用
            const betterVoices = chineseVoices.filter((v) => {
              const isPreferred = preferredVoicePatterns.some((pattern) => pattern.test(v.name))
              const isLocal = (v as any).localService !== false
              return isPreferred && isLocal && v.name !== foundVoice!.name
            })
            
            if (betterVoices.length > 0) {
              console.warn(`[TTS] ⚠️ 检测到更好的语音但未使用:`, betterVoices.map((v) => ({
                name: v.name,
                lang: v.lang,
                voiceURI: v.voiceURI,
                localService: (v as any).localService,
              })))
              console.warn(`[TTS] 当前选择原因: ${foundReason}`)
            }
            
            // 显示所有可用语音的对比，帮助理解选择
            const allLocalVoices = chineseVoices.filter((v) => (v as any).localService !== false)
            if (allLocalVoices.length > 1) {
              console.log(`[TTS] 📊 所有本地中文语音对比 (${allLocalVoices.length}个):`, allLocalVoices.map((v) => {
                const isPreferred = preferredVoicePatterns.some((pattern) => pattern.test(v.name))
                const isFemale = /女|female|woman|xiaoxiao/i.test(v.name) && !/男|male|man|eddy|yunxi/i.test(v.name)
                return {
                  name: v.name,
                  lang: v.lang,
                  isSelected: v.name === foundVoice!.name,
                  isPreferred: isPreferred ? "✅" : "❌",
                  isFemale: isFemale ? "👩" : "👨",
                  localService: (v as any).localService,
                }
              }))
              console.log(`[TTS] 💡 选择逻辑: 优先语音 > 女声 > 本地语音 > 默认语音`)
            }
          } else {
            console.error("[TTS] ❌ 未找到可用中文语音")
          }
        }

        if (speechSynthesis.getVoices().length > 0) {
          loadVoices()
        }
        speechSynthesis.onvoiceschanged = loadVoices

        // 设置超时，如果3秒内没有加载到语音，也标记为可用（使用默认语音）
        setTimeout(() => {
          if (!preferredVoiceRef.current && speechSynthesis.getVoices().length > 0) {
            // 尝试使用默认中文语音
            const defaultVoice = speechSynthesis.getVoices().find(
              (v) => v.lang.startsWith("zh-CN") || v.lang.startsWith("zh_CN") || v.lang === "zh",
            )
            if (defaultVoice) {
              preferredVoiceRef.current = defaultVoice
              setTtsAvailable(true)
              console.log("[TTS] ⏰ 超时后使用默认中文语音:", {
                name: defaultVoice.name,
                lang: defaultVoice.lang,
                voiceURI: defaultVoice.voiceURI,
                localService: (defaultVoice as any).localService,
              })
            } else {
              console.warn("[TTS] ⏰ 超时后仍未找到中文语音")
            }
          }
        }, 3000)
      }
    }

    initAudio()
    checkTTS()

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playClick = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === "suspended") ctx.resume()

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)
    gainNode.gain.setValueAtTime(0.25, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.08)
  }, [soundEnabled])

  const playSuccess = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === "suspended") ctx.resume()

    const frequencies = [523.25, 659.25, 783.99, 1046.5]

    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.type = "triangle"
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.12)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5 + i * 0.12)

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.start(ctx.currentTime + i * 0.12)
      oscillator.stop(ctx.currentTime + 0.6 + i * 0.12)
    })
  }, [soundEnabled])

  const playError = useCallback(() => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    if (ctx.state === "suspended") ctx.resume()

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = "sine"
    oscillator.frequency.setValueAtTime(300, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.2)
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  }, [soundEnabled])

  const speak = useCallback(
    (text: string) => {
      if (!soundEnabled || !ttsAvailable) return

      // 停止当前播放
      speechSynthesis.cancel()

      // 使用浏览器本地 TTS（优先 iOS 高质量语音）
      const utterance = new SpeechSynthesisUtterance(text)
      
      if (preferredVoiceRef.current) {
        utterance.voice = preferredVoiceRef.current
        console.log(`[TTS] 🎤 正在使用语音:`, {
          name: preferredVoiceRef.current.name,
          lang: preferredVoiceRef.current.lang,
          voiceURI: preferredVoiceRef.current.voiceURI,
          localService: (preferredVoiceRef.current as any).localService,
          text: text.substring(0, 50) + (text.length > 50 ? "..." : ""),
        })
      } else {
        console.warn("[TTS] ⚠️ 未设置语音，将使用系统默认语音")
      }
      
      // 设置语音参数，优化普通话效果
      utterance.lang = "zh-CN"
      utterance.rate = 0.9 // 语速（iOS 推荐值）
      utterance.pitch = 1.1 // 音调（略高更自然）
      utterance.volume = 1

      // 状态管理
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
        // "canceled" and "interrupted" are expected when we call speechSynthesis.cancel()
        if (e.error === "canceled" || e.error === "interrupted") {
          console.log("[TTS] ⏹️ 语音已停止:", e.error)
        } else if (e.error === "not-allowed") {
          // 用户未交互时自动播放被阻止，这是正常的
          console.log("[TTS] ⚠️ 需要用户交互后才能播放语音")
        } else if (e.error === "synthesis-unavailable" || e.error === "voice-unavailable") {
          console.log("[TTS] ⚠️ 语音合成暂不可用")
        } else {
          // 其他错误，只在有具体错误信息时打印
          if (e.error) {
            console.warn("[TTS] ⚠️ 语音播放异常:", e.error)
          }
        }
        setIsSpeaking(false)
      }

      speechSynthesis.speak(utterance)
    },
    [soundEnabled, ttsAvailable],
  )

  const stopSpeaking = useCallback(() => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  // 背景音乐 - 播放 MP3 文件
  const playBgm = useCallback(() => {
    if (!soundEnabled) return

    // 如果已经在播放，不重复创建
    if (bgmAudioRef.current && !bgmAudioRef.current.paused) return

    // 创建或复用 Audio 元素
    if (!bgmAudioRef.current) {
      bgmAudioRef.current = new Audio("/bgm.mp3")
      bgmAudioRef.current.loop = true
      bgmAudioRef.current.volume = 1.0 // 正常音量
    }

    // 播放
    bgmAudioRef.current.play().then(() => {
      setIsBgmPlaying(true)
      console.log("[BGM] 🎵 背景音乐开始播放")
    }).catch((err) => {
      console.log("[BGM] ⚠️ 背景音乐播放失败（需要用户交互）:", err.message)
    })
  }, [soundEnabled])

  const stopBgm = useCallback(() => {
    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause()
      bgmAudioRef.current.currentTime = 0
      console.log("[BGM] ⏹️ 背景音乐已停止")
    }
    setIsBgmPlaying(false)
  }, [])

  return (
    <AudioCtx.Provider
      value={{
        playClick,
        playSuccess,
        playError,
        speak,
        stopSpeaking,
        isSpeaking,
        ttsAvailable,
        soundEnabled,
        playBgm,
        stopBgm,
        isBgmPlaying,
      }}
    >
      {children}
    </AudioCtx.Provider>
  )
}
