'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { ExternalLink } from 'lucide-react'

interface Props { pin: BoardPin; onClick: () => void; draggable?: boolean; onDragStart?: () => void; onDragEnd?: () => void }

export function OpportunityPin({ pin, onClick, draggable, onDragStart, onDragEnd }: Props) {
  return (
    <BasePin pin={pin} onClick={onClick} draggable={draggable} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="pt-2">
        {pin.tag && <Badge label={pin.tag} variant="forest" className="mb-2" />}
        <p className="font-serif text-forest text-base font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-5 mb-3">{pin.body}</p>
        {pin.ctaLabel && (
          <div className="flex items-center gap-1 text-fidelity">
            <ExternalLink size={11} />
            <span className="font-sans text-xs font-semibold">{pin.ctaLabel}</span>
          </div>
        )}
      </div>
    </BasePin>
  )
}
