"use client"

import { Star } from "lucide-react"

interface StarProgressProps {
  current: number
  total: number
}

export function StarProgress({ current, total }: StarProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`transition-all duration-500 ${i < current ? "scale-110" : "scale-100"}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <Star
            className={`w-10 h-10 ${
              i < current
                ? "fill-amber-400 text-amber-400 star-filled animate-bounce-in"
                : "fill-transparent text-amber-200 star-empty"
            }`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        </div>
      ))}
    </div>
  )
}
