'use client'

import type { BoardPin } from '@/types'
import { PinGrid } from './PinGrid'

interface BoardCanvasProps {
  pins: BoardPin[]
  onPinClick: (pinId: string) => void
}

export function BoardCanvas({ pins, onPinClick }: BoardCanvasProps) {
  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto"
      style={{ background: 'linear-gradient(135deg, #EFE6D6 0%, #E8DDD0 50%, #EDE4D4 100%)' }}
    >
      {/* Subtle inner shadow frame */}
      <div
        className="min-h-full"
        style={{ boxShadow: 'inset 0 0 40px rgba(92,75,63,0.08)' }}
      >
        <PinGrid pins={pins} onPinClick={onPinClick} />
      </div>
    </div>
  )
}
