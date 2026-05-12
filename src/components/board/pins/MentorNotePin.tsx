'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'

interface Props { pin: BoardPin; onClick: () => void; draggable?: boolean; onDragStart?: () => void; onDragEnd?: () => void }

export function MentorNotePin({ pin, onClick, draggable, onDragStart, onDragEnd }: Props) {
  return (
    <BasePin pin={pin} onClick={onClick} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pt-2">
        {pin.tag && <Badge label={pin.tag} variant="gold" className="mb-2" />}
        <p className="font-serif text-forest text-sm leading-snug italic line-clamp-5 mb-3">
          &ldquo;{pin.body}&rdquo;
        </p>
        <p className="font-sans text-xs text-warm-brown/60">{pin.title}</p>
      </div>
    </BasePin>
  )
}
