'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { MessageCircle } from 'lucide-react'

interface Props { pin: BoardPin; onClick: () => void; draggable?: boolean; onDragStart?: () => void; onDragEnd?: () => void }

export function AskBoardPin({ pin, onClick, draggable, onDragStart, onDragEnd }: Props) {
  return (
    <BasePin pin={pin} onClick={onClick} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <MessageCircle size={13} className="text-fidelity" />
          <Badge label={pin.tag ?? 'Community'} variant="sage" />
        </div>
        <p className="font-serif text-forest text-sm font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-5">{pin.body}</p>
      </div>
    </BasePin>
  )
}
