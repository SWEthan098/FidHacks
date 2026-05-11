'use client'

import { cn } from '@/lib/utils'
import type { BoardPin, PinColor } from '@/types'
import type { ReactNode } from 'react'

const COLOR_CLASSES: Record<PinColor, string> = {
  yellow:   'bg-pin-yellow',
  sage:     'bg-pin-sage',
  blue:     'bg-pin-blue',
  cream:    'bg-pin-cream',
  rose:     'bg-pin-rose',
  lavender: 'bg-pin-lavender',
}

interface BasePinProps {
  pin: BoardPin
  onClick: () => void
  children: ReactNode
  className?: string
}

export function BasePin({ pin, onClick, children, className }: BasePinProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={cn(
        'relative p-4 rounded-sm cursor-pointer select-none',
        'transition-all duration-200 hover:scale-[1.03] hover:z-10',
        'border border-black/5',
        COLOR_CLASSES[pin.color],
        className
      )}
      style={{
        transform: `rotate(${pin.rotation}deg)`,
        boxShadow: '2px 4px 12px rgba(92,75,63,0.18)',
      }}
    >
      {/* Pushpin */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-muted-gold shadow-sm border-2 border-warm-white z-10" />
      {children}
    </div>
  )
}
