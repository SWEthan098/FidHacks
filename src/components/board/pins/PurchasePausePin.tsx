'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { Pause } from 'lucide-react'

export function PurchasePausePin({ pin, onClick }: { pin: BoardPin; onClick: () => void }) {
  return (
    <BasePin pin={pin} onClick={onClick}>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <Pause size={13} className="text-fidelity" />
          <Badge label="Purchase Pause" variant="sage" />
        </div>
        <p className="font-serif text-forest text-base font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-3">{pin.body}</p>
      </div>
    </BasePin>
  )
}
