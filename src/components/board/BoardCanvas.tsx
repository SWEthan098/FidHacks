'use client'

import type { BoardPin } from '@/types'
import { PinGrid } from './PinGrid'

interface BoardCanvasProps {
  pins: BoardPin[]
  onPinClick: (pinId: string) => void
  onRemovePin: (pinId: string) => void
}

export function BoardCanvas({ pins, onPinClick, onRemovePin }: BoardCanvasProps) {
  return (
    <div
      className="flex-1 flex flex-col min-h-0 relative"
      style={{
        backgroundColor: '#b8956a',
        backgroundImage: [
          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 3px)',
          'repeating-linear-gradient(85deg, transparent, transparent 8px, rgba(255,255,255,0.025) 8px, rgba(255,255,255,0.025) 9px)',
          'repeating-linear-gradient(175deg, transparent, transparent 12px, rgba(0,0,0,0.02) 12px, rgba(0,0,0,0.02) 13px)',
          'radial-gradient(ellipse at 18% 28%, rgba(150,105,50,0.35) 0%, transparent 55%)',
          'radial-gradient(ellipse at 78% 70%, rgba(120,80,35,0.28) 0%, transparent 45%)',
          'radial-gradient(ellipse at 50% 50%, rgba(180,135,75,0.15) 0%, transparent 70%)',
        ].join(', '),
        boxShadow: 'inset 0 0 80px rgba(50,30,10,0.35), inset 0 0 0 10px rgba(40,25,8,0.22)',
      }}
    >
      <PinGrid pins={pins} onPinClick={onPinClick} onRemovePin={onRemovePin} />
    </div>
  )
}
