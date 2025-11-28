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
      <svg viewBox="0 0 120 150" className="w-full h-full drop-shadow-xl">
        <defs>
          {/* 身体渐变 - 淡绿色到白色 */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0fdf4" />
            <stop offset="50%" stopColor="#dcfce7" />
            <stop offset="100%" stopColor="#bbf7d0" />
          </linearGradient>
          {/* 叶子渐变 */}
          <linearGradient id="leafGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#65a30d" />
            <stop offset="50%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
          {/* 深色叶子 */}
          <linearGradient id="leafDark" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#65a30d" />
          </linearGradient>
          {/* 腮红渐变 */}
          <radialGradient id="blushGradient">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fda4af" stopOpacity="0" />
          </radialGradient>
          {/* 高光 */}
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.7" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          {/* 阴影滤镜 */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#166534" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* 底部阴影 */}
        <ellipse cx="60" cy="145" rx="30" ry="5" fill="#166534" opacity="0.15">
          {animate && (
            <animate attributeName="rx" values="30;26;30" dur="2s" repeatCount="indefinite" />
          )}
        </ellipse>

        {/* ===== 头顶香茅叶子（头发）===== */}
        <g filter="url(#shadow)">
          {/* 后排叶子 */}
          <path
            d="M60 55 Q55 25 45 -5 Q50 20 55 45 Q57 50 60 55"
            fill="url(#leafDark)"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;-3 60 55;0 60 55" dur="3s" repeatCount="indefinite" />
            )}
          </path>
          <path
            d="M60 55 Q65 25 75 -5 Q70 20 65 45 Q63 50 60 55"
            fill="url(#leafDark)"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;3 60 55;0 60 55" dur="3s" repeatCount="indefinite" />
            )}
          </path>

          {/* 中间主叶子 */}
          <path
            d="M60 55 Q58 20 52 -15 Q60 15 60 55"
            fill="url(#leafGradient)"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;-2 60 55;0 60 55" dur="2.5s" repeatCount="indefinite" />
            )}
          </path>
          <path
            d="M60 55 Q62 20 68 -15 Q60 15 60 55"
            fill="url(#leafGradient)"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;2 60 55;0 60 55" dur="2.5s" repeatCount="indefinite" />
            )}
          </path>

          {/* 最前面的小叶子 */}
          <path
            d="M60 55 Q57 35 50 10 Q58 30 60 55"
            fill="#bef264"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;-4 60 55;0 60 55" dur="2s" repeatCount="indefinite" />
            )}
          </path>
          <path
            d="M60 55 Q63 35 70 10 Q62 30 60 55"
            fill="#bef264"
          >
            {animate && (
              <animateTransform attributeName="transform" type="rotate" values="0 60 55;4 60 55;0 60 55" dur="2s" repeatCount="indefinite" />
            )}
          </path>
        </g>

        {/* ===== Q版圆润身体 ===== */}
        <g filter="url(#shadow)">
          {/* 主身体 - 胖乎乎的椭圆形 */}
          <ellipse cx="60" cy="95" rx="38" ry="45" fill="url(#bodyGradient)" stroke="#86efac" strokeWidth="3" />

          {/* 身体高光 */}
          <ellipse cx="45" cy="80" rx="15" ry="20" fill="url(#shineGradient)" />

          {/* 肚子上的浅绿条纹（香茅特征） */}
          <path d="M40 75 Q60 72 80 75" stroke="#86efac" strokeWidth="2" fill="none" opacity="0.5" />
          <path d="M38 85 Q60 82 82 85" stroke="#86efac" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M40 95 Q60 92 80 95" stroke="#86efac" strokeWidth="2" fill="none" opacity="0.3" />
        </g>

        {/* ===== 小手 ===== */}
        <g>
          {/* 左手 */}
          <ellipse cx="25" cy="95" rx="8" ry="10" fill="#dcfce7" stroke="#86efac" strokeWidth="2">
            {animate && mood === "excited" && (
              <animateTransform attributeName="transform" type="rotate" values="0 25 95;-20 25 95;0 25 95" dur="0.3s" repeatCount="indefinite" />
            )}
          </ellipse>
          {/* 右手 */}
          <ellipse cx="95" cy="95" rx="8" ry="10" fill="#dcfce7" stroke="#86efac" strokeWidth="2">
            {animate && mood === "excited" && (
              <animateTransform attributeName="transform" type="rotate" values="0 95 95;20 95 95;0 95 95" dur="0.3s" repeatCount="indefinite" />
            )}
          </ellipse>
        </g>

        {/* ===== 小脚 ===== */}
        <ellipse cx="45" cy="138" rx="10" ry="6" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
        <ellipse cx="75" cy="138" rx="10" ry="6" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />

        {/* ===== 脸部 ===== */}
        <g transform="translate(60, 90)">
          {/* 腮红 */}
          <ellipse cx="-25" cy="8" rx="10" ry="6" fill="url(#blushGradient)">
            {animate && mood === "happy" && (
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>
          <ellipse cx="25" cy="8" rx="10" ry="6" fill="url(#blushGradient)">
            {animate && mood === "happy" && (
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            )}
          </ellipse>

          {/* ===== 眼睛 - 根据心情变化 ===== */}
          {mood === "happy" && (
            <>
              {/* 开心的弯弯眼 ^_^ */}
              <path d="M-20 -8 Q-14 -18 -8 -8" stroke="#166534" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M8 -8 Q14 -18 20 -8" stroke="#166534" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          )}

          {mood === "curious" && (
            <>
              {/* 好奇的大圆眼 */}
              <circle cx="-14" cy="-10" r="10" fill="white" stroke="#166534" strokeWidth="2" />
              <circle cx="14" cy="-10" r="10" fill="white" stroke="#166534" strokeWidth="2" />
              {/* 瞳孔 */}
              <circle cx="-12" cy="-10" r="5" fill="#166534">
                {animate && (
                  <animate attributeName="cx" values="-12;-16;-12" dur="3s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="16" cy="-10" r="5" fill="#166534">
                {animate && (
                  <animate attributeName="cx" values="16;12;16" dur="3s" repeatCount="indefinite" />
                )}
              </circle>
              {/* 高光 */}
              <circle cx="-14" cy="-13" r="3" fill="white" />
              <circle cx="14" cy="-13" r="3" fill="white" />
            </>
          )}

          {mood === "excited" && (
            <>
              {/* 兴奋的星星眼 - 眼睛里有星星瞳孔 */}
              {/* 左眼 */}
              <g transform="translate(-14, -10)">
                {/* 眼白 */}
                <circle r="11" fill="white" stroke="#166534" strokeWidth="2" />
                {/* 星星瞳孔 */}
                <polygon points="0,-8 2,-3 7,-3 3,0 5,6 0,3 -5,6 -3,0 -7,-3 -2,-3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5">
                  {animate && (
                    <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="0.4s" repeatCount="indefinite" />
                  )}
                </polygon>
                {/* 高光 */}
                <circle cx="-4" cy="-4" r="2.5" fill="white" opacity="0.8" />
              </g>
              {/* 右眼 */}
              <g transform="translate(14, -10)">
                {/* 眼白 */}
                <circle r="11" fill="white" stroke="#166534" strokeWidth="2" />
                {/* 星星瞳孔 */}
                <polygon points="0,-8 2,-3 7,-3 3,0 5,6 0,3 -5,6 -3,0 -7,-3 -2,-3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5">
                  {animate && (
                    <animateTransform attributeName="transform" type="scale" values="1;1.15;1" dur="0.4s" repeatCount="indefinite" begin="0.1s" />
                  )}
                </polygon>
                {/* 高光 */}
                <circle cx="-4" cy="-4" r="2.5" fill="white" opacity="0.8" />
              </g>
            </>
          )}

          {mood === "thinking" && (
            <>
              {/* 思考的眼睛 - 一只眯着一只看上 */}
              <path d="M-20 -10 Q-14 -15 -8 -10" stroke="#166534" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="14" cy="-10" r="9" fill="white" stroke="#166534" strokeWidth="2" />
              <circle cx="16" cy="-12" r="4" fill="#166534">
                {animate && (
                  <animate attributeName="cy" values="-12;-14;-12" dur="2s" repeatCount="indefinite" />
                )}
              </circle>
              <circle cx="14" cy="-14" r="2" fill="white" />
            </>
          )}

          {/* ===== 嘴巴 - 根据心情变化 ===== */}
          {mood === "happy" && (
            <>
              {/* 开心的大笑 */}
              <path d="M-12 15 Q0 28 12 15" stroke="#166534" strokeWidth="3" fill="#166534" opacity="0.8" strokeLinecap="round" />
              {/* 舌头 */}
              <ellipse cx="0" cy="20" rx="5" ry="4" fill="#fda4af" />
            </>
          )}

          {mood === "curious" && (
            <>
              {/* 好奇的O嘴 */}
              <ellipse cx="0" cy="18" rx="6" ry="8" fill="#166534" opacity="0.8" />
              <ellipse cx="0" cy="16" rx="3" ry="4" fill="#f87171" opacity="0.6" />
            </>
          )}

          {mood === "excited" && (
            <>
              {/* 兴奋的大嘴 */}
              <path d="M-15 12 Q0 32 15 12" fill="#166534" opacity="0.9" />
              <path d="M-10 14 Q0 26 10 14" fill="#fda4af" />
            </>
          )}

          {mood === "thinking" && (
            <>
              {/* 思考的嘟嘴 */}
              <ellipse cx="5" cy="18" rx="8" ry="5" fill="#166534" opacity="0.7" />
            </>
          )}
        </g>

        {/* 思考泡泡 */}
        {mood === "thinking" && (
          <g>
            <circle cx="100" cy="50" r="5" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx="108" cy="40" r="4" fill="white" stroke="#e5e7eb" strokeWidth="1" />
            <circle cx="114" cy="32" r="3" fill="white" stroke="#e5e7eb" strokeWidth="1" />
          </g>
        )}

        {/* 香茅香气效果 */}
        {(mood === "happy" || mood === "excited") && animate && (
          <g opacity="0.6">
            <text x="15" y="70" fontSize="12" fill="#84cc16">
              <animate attributeName="y" values="70;60;70" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              ~
            </text>
            <text x="95" y="65" fontSize="10" fill="#84cc16">
              <animate attributeName="y" values="65;55;65" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
              ~
            </text>
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
