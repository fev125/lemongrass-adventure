"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedBackgroundProps {
  className?: string
}

/**
 * 优化后的 SVG 动画背景组件
 * - 使用 CSS class 动画 + GPU 加速
 * - 支持 prefers-reduced-motion
 * - 视口可见时才激活动画
 */
export function AnimatedBackground({ className = "" }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(true)

  // 检测用户偏好和可见性
  useEffect(() => {
    // 检测 prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches) {
      setShouldAnimate(false)
      return
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches)
    }
    mediaQuery.addEventListener("change", handleChange)

    // 可见性检测
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldAnimate(entry.isIntersecting && !mediaQuery.matches)
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      observer.disconnect()
    }
  }, [])

  const floatClass = shouldAnimate ? "animate-float" : ""
  const bounceClass = shouldAnimate ? "animate-bounce" : ""

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* 云朵 - 左上 */}
      <svg
        className={`absolute top-[8%] left-[5%] w-20 h-12 opacity-80 ${floatClass}`}
        style={{ willChange: shouldAnimate ? "transform" : "auto" }}
        viewBox="0 0 80 48"
      >
        <ellipse cx="30" cy="28" rx="25" ry="15" fill="white" />
        <ellipse cx="50" cy="24" rx="20" ry="12" fill="white" />
        <ellipse cx="40" cy="32" rx="22" ry="12" fill="white" />
      </svg>

      {/* 云朵 - 右上 */}
      <svg
        className={`absolute top-[12%] right-[8%] w-16 h-10 opacity-70 ${floatClass}`}
        style={{
          animationDelay: "1s",
          willChange: shouldAnimate ? "transform" : "auto",
        }}
        viewBox="0 0 64 40"
      >
        <ellipse cx="24" cy="22" rx="20" ry="12" fill="white" />
        <ellipse cx="40" cy="18" rx="16" ry="10" fill="white" />
        <ellipse cx="32" cy="26" rx="18" ry="10" fill="white" />
      </svg>

      {/* 云朵 - 中间 */}
      <svg
        className={`absolute top-[6%] left-1/3 w-14 h-8 opacity-60 ${floatClass}`}
        style={{
          animationDelay: "0.5s",
          willChange: shouldAnimate ? "transform" : "auto",
        }}
        viewBox="0 0 56 32"
      >
        <ellipse cx="20" cy="18" rx="16" ry="10" fill="white" />
        <ellipse cx="36" cy="14" rx="14" ry="8" fill="white" />
        <ellipse cx="28" cy="20" rx="15" ry="9" fill="white" />
      </svg>

      {/* 粉色花朵 - 左下 */}
      <svg
        className={`absolute bottom-[12%] left-[8%] w-12 h-12 ${bounceClass}`}
        style={{
          animationDelay: "0.2s",
          willChange: shouldAnimate ? "transform" : "auto",
        }}
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="10" fill="#fda4af" />
        <circle cx="24" cy="24" r="5" fill="#fef08a" />
        <ellipse cx="24" cy="40" rx="2" ry="6" fill="#4ade80" />
      </svg>

      {/* 紫色蝴蝶 - 右下 */}
      <svg
        className={`absolute bottom-[18%] right-[6%] w-10 h-10 ${bounceClass}`}
        style={{
          animationDelay: "0.5s",
          willChange: shouldAnimate ? "transform" : "auto",
        }}
        viewBox="0 0 40 40"
      >
        <ellipse cx="20" cy="18" rx="15" ry="8" fill="#c4b5fd" opacity="0.8" />
        <ellipse cx="12" cy="20" rx="8" ry="5" fill="#c4b5fd" />
        <ellipse cx="28" cy="20" rx="8" ry="5" fill="#c4b5fd" />
        <circle cx="20" cy="22" r="3" fill="#422006" />
      </svg>

      {/* 黄色花朵 - 右下 */}
      <svg
        className={`absolute bottom-[8%] right-1/4 w-12 h-12 ${bounceClass}`}
        style={{
          animationDelay: "0.8s",
          willChange: shouldAnimate ? "transform" : "auto",
        }}
        viewBox="0 0 48 48"
      >
        <circle cx="24" cy="24" r="10" fill="#fef08a" />
        <circle cx="24" cy="24" r="5" fill="#fbbf24" />
        <ellipse cx="24" cy="40" rx="2" ry="6" fill="#4ade80" />
      </svg>

      {/* 草地 SVG - 静态 */}
      <svg
        className="absolute bottom-0 left-0 w-full h-28"
        viewBox="0 0 400 112"
        preserveAspectRatio="none"
      >
        <ellipse cx="200" cy="90" rx="250" ry="60" fill="#4ade80" />
        <ellipse cx="200" cy="85" rx="230" ry="50" fill="#22c55e" />
        {/* 小草 */}
        <path d="M 50 80 Q 55 60 50 50" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 100 85 Q 105 65 100 55" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 300 80 Q 305 60 300 50" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 350 85 Q 355 65 350 55" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  )
}
