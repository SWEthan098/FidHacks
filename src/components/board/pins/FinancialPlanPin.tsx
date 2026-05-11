'use client'

import type { BoardPin } from '@/types'
import { BasePin } from './BasePin'
import { Badge } from '@/components/ui/Badge'
import { PieChart } from 'lucide-react'

export function FinancialPlanPin({ pin, onClick }: { pin: BoardPin; onClick: () => void }) {
  return (
    <BasePin pin={pin} onClick={onClick}>
      <div className="pt-2">
        <div className="flex items-center gap-1.5 mb-2">
          <PieChart size={13} className="text-fidelity" />
          <Badge label={pin.tag ?? 'Planning'} variant="gold" />
        </div>
        <p className="font-serif text-forest text-base font-semibold mb-2 leading-tight">{pin.title}</p>
        <p className="font-sans text-xs text-warm-brown/70 line-clamp-3">{pin.body}</p>
      </div>
    </BasePin>
  )
}
