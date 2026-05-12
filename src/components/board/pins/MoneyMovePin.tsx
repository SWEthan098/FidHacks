'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { Sparkles } from 'lucide-react'

interface Props { pin: BoardPin; onClick: () => void; draggable?: boolean; onDragStart?: () => void; onDragEnd?: () => void }

export function MoneyMovePin({ pin, onClick, draggable, onDragStart, onDragEnd }: Props) {
  return (
    <BasePin pin={pin} onClick={onClick} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={13} className="text-muted-gold" />
          <Badge label={pin.tag ?? 'Money Move'} variant="gold" />
        </div>
        <p className="font-serif text-forest text-base font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-5">{pin.body}</p>
      </div>
    </BasePin>
  )
}
