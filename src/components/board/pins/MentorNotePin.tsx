'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'

export function MentorNotePin({ pin, onClick }: { pin: BoardPin; onClick: () => void }) {
  return (
    <BasePin pin={pin} onClick={onClick}>
      <div className="pt-2">
        {pin.tag && <Badge label={pin.tag} variant="gold" className="mb-2" />}
        <p className="font-serif text-forest text-sm leading-snug italic line-clamp-4 mb-3">
          &ldquo;{pin.body}&rdquo;
        </p>
        <p className="font-sans text-xs text-warm-brown/60">{pin.title}</p>
      </div>
    </BasePin>
  )
}
