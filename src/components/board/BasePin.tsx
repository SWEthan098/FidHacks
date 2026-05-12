'use client'

import { useState } from 'react'
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

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

interface BasePinProps {
  pin: BoardPin
  onClick: () => void
  children: ReactNode
  className?: string
  draggable?: boolean
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function BasePin({ pin, onClick, children, className, draggable, onDragStart, onDragEnd }: BasePinProps) {
  const [hovered, setHovered] = useState(false)

  const rotation = hovered ? pin.rotation * 0.15 : pin.rotation
  const scale = hovered ? 1.1 : 1
  const shadow = hovered
    ? '6px 16px 36px rgba(50,30,10,0.45)'
    : '2px 5px 14px rgba(92,75,63,0.22)'

  return (
    <div
      role="button"
      tabIndex={0}
      draggable={draggable}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragStart={onDragStart}
      onDragEnd={() => { setHovered(false); onDragEnd?.() }}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
      className={cn(
        'relative p-4 rounded-sm cursor-pointer select-none',
        'border border-black/5',
        COLOR_CLASSES[pin.color],
        className
      )}
      style={{
        transform: `rotate(${rotation}deg) scale(${scale})`,
        boxShadow: shadow,
        transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s ease',
        zIndex: hovered ? 20 : undefined,
      }}
    >
      {/* Pushpin */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-muted-gold shadow-sm border-2 border-warm-white z-10" />

      {children}

      {/* Author row */}
      {pin.author && (
        <div className="mt-3 pt-2.5 border-t border-black/8 flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-sans font-bold text-forest shrink-0"
            style={{ backgroundColor: pin.avatarColor ?? '#DDE3D2' }}
          >
            {getInitials(pin.author)}
          </div>
          <span className="font-sans text-[10px] text-warm-brown/60 truncate">{pin.author}</span>
        </div>
      )}
    </div>
  )
}
