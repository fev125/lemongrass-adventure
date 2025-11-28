"use client"

interface MascotProps {
  mood: "happy" | "curious" | "excited" | "thinking"
  size?: "sm" | "md" | "lg" | "xl"
  animate?: boolean
}

export function Mascot({ mood, size = "md", animate = true }: MascotProps) {
  const sizeClasses = {
    sm: "w-20 h-24",
    md: "w-28 h-32",
    lg: "w-36 h-40",
    xl: "w-44 h-48",
  }

  return (
    <div className={`${sizeClasses[size]} relative ${animate ? "animate-float" : ""}`}>
      <svg viewBox="0 0 120 140" className="w-full h-full drop-shadow-xl">
        <defs>
          {/* 身体渐变 */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="40%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          {/* 叶子渐变 */}
          <linearGradient id="leafGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
          {/* 高光渐变 */}
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* 阴影 */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#166534" floodOpacity="0.3" />
          </filter>
          {/* 内发光 */}
          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 底部阴影 */}
        <ellipse cx="60" cy="135" rx="25" ry="5" fill="#166534" opacity="0.2">
          {animate && (
            <animate attributeName="rx" values="25;22;25" dur="2s" repeatCount="indefinite" />
          )}
        </ellipse>

        {/* 身体主体 - 香茅叶形状 */}
        <g filter="url(#softShadow)">
          {/* 主叶身 */}
          <path
            d="M60 10
               Q85 30 90 60
               Q92 90 80 115
               Q70 130 60 130
               Q50 130 40 115
               Q28 90 30 60
               Q35 30 60 10"
            fill="url(#bodyGradient)"
          />

          {/* 叶脉 - 中心 */}
          <path
            d="M60 20 Q62 70 60 120"
            stroke="#4d7c0f"
            strokeWidth="2.5"
            fill="none"
            opacity="0.4"
            strokeLinecap="round"
          />
          {/* 叶脉 - 侧边 */}
          <path d="M60 40 Q45 50 38 55" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M60 40 Q75 50 82 55" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M60 60 Q42 72 35 80" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M60 60 Q78 72 85 80" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M60 80 Q47 90 42 100" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />
          <path d="M60 80 Q73 90 78 100" stroke="#4d7c0f" strokeWidth="1.5" fill="none" opacity="0.3" strokeLinecap="round" />

          {/* 高光 */}
          <ellipse cx="45" cy="50" rx="12" ry="25" fill="url(#highlightGradient)" transform="rotate(-15 45 50)" />
        </g>

        {/* 小叶子装饰 - 左 */}
        <g transform="translate(18, 35) rotate(-35)">
          <path
            d="M0 0 Q8 -15 5 -30 Q0 -15 -5 -30 Q-8 -15 0 0"
            fill="url(#leafGradient2)"
          />
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="-35;-40;-35"
              dur="3s"
              repeatCount="indefinite"
              additive="sum"
            />
          )}
        </g>

        {/* 小叶子装饰 - 右 */}
        <g transform="translate(102, 35) rotate(35)">
          <path
            d="M0 0 Q8 -15 5 -30 Q0 -15 -5 -30 Q-8 -15 0 0"
            fill="url(#leafGradient2)"
          />
          {animate && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="35;40;35"
              dur="3s"
              repeatCount="indefinite"
              additive="sum"
            />
          )}
        </g>

        {/* 脸部区域 */}
        <g transform="translate(60, 72)">
          {/* 腮红 */}
          <ellipse cx="-22" cy="12" rx="8" ry="5" fill="#fda4af" opacity="0.6">
            {animate && mood === "happy" && (
              <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>
          <ellipse cx="22" cy="12" rx="8" ry="5" fill="#fda4af" opacity="0.6">
            {animate && mood === "happy" && (
              <animate attributeName="opacity" values="0.6;0.8;0.6" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>

          {/* 眼睛 - 根据心情变化 */}
          {mood === "happy" && (
            <>
              {/* 开心的弯弯眼 */}
              <path d="M-18 -2 Q-13 -8 -8 -2" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M8 -2 Q13 -8 18 -2" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
            </>
          )}

          {mood === "curious" && (
            <>
              {/* 好奇的大眼睛 */}
              <circle cx="-13" cy="-3" r="8" fill="white" stroke="#166534" strokeWidth="2" />
              <circle cx="13" cy="-3" r="8" fill="white" stroke="#166534" strokeWidth="2" />
              <circle cx="-11" cy="-3" r="4" fill="#166534">
                {animate && (
                  <animate attributeName="cx" values="-11;-14;-11" dur="3s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="15" cy="-3" r="4" fill="#166534">
                {animate && (
                  <animate attributeName="cx" values="15;12;15" dur="3s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="-12" cy="-5" r="1.5" fill="white" />
              <circle cx="14" cy="-5" r="1.5" fill="white" />
            </>
          )}

          {mood === "excited" && (
            <>
              {/* 兴奋的星星眼 */}
              <g transform="translate(-13, -3)">
                <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5">
                  {animate && (
                    <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="0.5s" repeatCount="indefinite" />
                  )}
                </polygon>
              </g>
              <g transform="translate(13, -3)">
                <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5">
                  {animate && (
                    <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="0.5s" repeatCount="indefinite" begin="0.1s" />
                  )}
                </polygon>
              </g>
            </>
          )}

          {mood === "thinking" && (
            <>
              {/* 思考的眼睛 - 一个眯着一个睁着 */}
              <path d="M-18 -3 Q-13 -6 -8 -3" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="13" cy="-3" r="7" fill="white" stroke="#166534" strokeWidth="2" />
              <circle cx="15" cy="-2" r="3.5" fill="#166534">
                {animate && (
                  <animate attributeName="cy" values="-2;-4;-2" dur="2s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="14" cy="-4" r="1.5" fill="white" />
            </>
          )}

          {/* 嘴巴 - 根据心情变化 */}
          {mood === "happy" && (
            <path d="M-8 18 Q0 28 8 18" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {mood === "curious" && (
            <ellipse cx="0" cy="20" rx="5" ry="6" fill="#166534" opacity="0.8" />
          )}

          {mood === "excited" && (
            <path d="M-10 16 Q0 30 10 16" fill="#166534" opacity="0.9" />
          )}

          {mood === "thinking" && (
            <path d="M-6 20 Q0 18 6 20" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}
        </g>

        {/* 思考泡泡 */}
        {mood === "thinking" && (
          <g>
            <circle cx="95" cy="25" r="4" fill="white" opacity="0.9" />
            <circle cx="102" cy="15" r="3" fill="white" opacity="0.8" />
            <circle cx="107" cy="8" r="2" fill="white" opacity="0.7" />
          </g>
        )}
      </svg>

      {/* 兴奋时的星星特效 */}
      {mood === "excited" && animate && (
        <>
          <div className="absolute -top-2 right-0 text-2xl animate-sparkle">✨</div>
          <div className="absolute top-0 -left-2 text-xl animate-sparkle" style={{ animationDelay: "0.2s" }}>✨</div>
          <div className="absolute -top-4 left-1/2 text-lg animate-sparkle" style={{ animationDelay: "0.4s" }}>⭐</div>
        </>
      )}

      {/* 开心时的爱心特效 */}
      {mood === "happy" && animate && (
        <div className="absolute -top-1 right-1 text-lg animate-bounce" style={{ animationDuration: "1s" }}>💚</div>
      )}
    </div>
  )
}
