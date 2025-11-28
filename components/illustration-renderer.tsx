"use client"

import type React from "react"

import {
  SunnyGardenIllustration,
  SnowyLandIllustration,
  LemongrassIllustration,
  GreenOnionIllustration,
  TomYumSoupIllustration,
  CakeIllustration,
  MosquitoRepellentIllustration,
  BuildingBlocksIllustration,
  TeachSunnyGardenIllustration,
  TeachLemongrassIllustration,
  TeachTomYumIllustration,
  TeachMosquitoRepellentIllustration,
} from "./illustrations"

interface IllustrationRendererProps {
  id: string
  className?: string
}

const illustrationMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "sunny-garden": SunnyGardenIllustration,
  "snowy-land": SnowyLandIllustration,
  lemongrass: LemongrassIllustration,
  "green-onion": GreenOnionIllustration,
  "tom-yum-soup": TomYumSoupIllustration,
  cake: CakeIllustration,
  "mosquito-repellent": MosquitoRepellentIllustration,
  "building-blocks": BuildingBlocksIllustration,
  "teach-sunny-garden": TeachSunnyGardenIllustration,
  "teach-lemongrass": TeachLemongrassIllustration,
  "teach-tom-yum": TeachTomYumIllustration,
  "teach-mosquito-repellent": TeachMosquitoRepellentIllustration,
}

export function IllustrationRenderer({ id, className = "" }: IllustrationRendererProps) {
  const Illustration = illustrationMap[id]

  if (!Illustration) {
    return (
      <div className={`flex items-center justify-center bg-green-100 rounded-3xl ${className}`}>
        <span className="text-6xl">🌿</span>
      </div>
    )
  }

  return <Illustration className={className} />
}
