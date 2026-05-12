'use client'

import { AlertTriangle, Info, XCircle, ChevronRight } from 'lucide-react'
import type { SpendingAlert as SpendingAlertType } from '@/data/spendingData'
import { cn } from '@/lib/utils'

const LEVEL_STYLES = {
  critical: {
    bg:     'bg-red-50 border-red-200',
    icon:   'text-red-500',
    badge:  'bg-red-100 text-red-600',
    label:  'Critical',
    Icon:   XCircle,
  },
  warning: {
    bg:     'bg-amber-50 border-amber-200',
    icon:   'text-amber-500',
    badge:  'bg-amber-100 text-amber-700',
    label:  'Warning',
    Icon:   AlertTriangle,
  },
  info: {
    bg:     'bg-pin-blue/30 border-border-beige',
    icon:   'text-fidelity',
    badge:  'bg-pin-blue text-fidelity',
    label:  'Tip',
    Icon:   Info,
  },
}

interface SpendingAlertProps {
  alert: SpendingAlertType
}

export function SpendingAlertCard({ alert }: SpendingAlertProps) {
  const s = LEVEL_STYLES[alert.level]
  const { Icon } = s

  return (
    <div className={cn('rounded-2xl border p-4 flex gap-3', s.bg)}>
      <div className="mt-0.5">
        <Icon size={18} className={s.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={cn('text-[10px] font-sans font-bold uppercase tracking-widest px-2 py-0.5 rounded-full', s.badge)}>
            {s.label}
          </span>
          <span className="font-sans text-xs font-semibold text-warm-brown">{alert.category}</span>
        </div>
        <p className="font-sans text-sm text-warm-brown font-medium leading-snug">{alert.message}</p>
        <p className="font-sans text-xs text-warm-brown/60 mt-1">{alert.detail}</p>
        <p className="font-sans text-xs text-fidelity font-medium mt-2 flex items-center gap-1">
          <ChevronRight size={12} />
          {alert.action}
        </p>
      </div>
    </div>
  )
}
