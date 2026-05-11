'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { Sparkles } from 'lucide-react'

export function MoneyMovePin({ pin, onClick }: { pin: BoardPin; onClick: () => void }) {
  return (
    <BasePin pin={pin} onClick={onClick}>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles size={13} className="text-muted-gold" />
          <Badge label={pin.tag ?? 'Money Move'} variant="gold" />
        </div>
        <p className="font-serif text-forest text-base font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-3">{pin.body}</p>
      </div>
    </BasePin>
  )
}
