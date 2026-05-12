'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatsCardProps {
  icon: ReactNode
  label: string
  value: string
  sub: string
  change: string
  changePositive: boolean
  bg: 'purple' | 'gold' | 'blue'
  href?: string
  onClick?: () => void
}

const BG_CLASSES = {
  purple: 'bg-forest text-warm-white',
  gold:   'bg-muted-gold text-warm-white',
  blue:   'bg-pin-blue text-forest',
}

const ICON_BG = {
  purple: 'bg-warm-white/20',
  gold:   'bg-warm-white/20',
  blue:   'bg-forest/10',
}

const CHANGE_BG = {
  purple: 'bg-warm-white/15 text-warm-white',
  gold:   'bg-warm-white/15 text-warm-white',
  blue:   'bg-forest/10 text-forest',
}

export function StatsCard({ icon, label, value, sub, change, changePositive, bg, onClick }: StatsCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn('rounded-3xl p-6 flex flex-col gap-3 cursor-pointer hover:scale-[1.02] transition-transform', BG_CLASSES[bg])}
    >
      <div className="flex items-center justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', ICON_BG[bg])}>
          {icon}
        </div>
        <span className={cn('text-xs font-sans font-semibold px-2.5 py-1 rounded-full flex items-center gap-1', CHANGE_BG[bg])}>
          {changePositive ? '↑' : '↓'} {change}
        </span>
      </div>
      <div>
        <p className="font-sans text-sm opacity-70 mb-1">{label}</p>
        <p className="font-serif text-4xl font-bold leading-none">{value}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-sans text-xs opacity-60">{sub}</p>
        <button className="font-sans text-xs font-semibold opacity-70 hover:opacity-100 transition-opacity">
          More →
        </button>
      </div>
    </div>
  )
}
