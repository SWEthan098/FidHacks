'use client'

import { cn } from '@/lib/utils'

interface ConfidenceScaleProps {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  labels?: { min: string; max: string }
}

export function ConfidenceScale({ value, min = 1, max = 5, onChange, labels }: ConfidenceScaleProps) {
  const steps = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        {steps.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              'flex-1 h-10 rounded-xl border font-sans text-sm font-semibold transition-all duration-150 cursor-pointer',
              value === n
                ? 'bg-muted-gold text-warm-white border-muted-gold scale-105'
                : 'bg-cream border-border-beige text-warm-brown hover:border-muted-gold'
            )}
          >
            {n}
          </button>
        ))}
      </div>
      {labels && (
        <div className="flex justify-between mt-2">
          <span className="font-sans text-xs text-warm-brown/50">{labels.min}</span>
          <span className="font-sans text-xs text-warm-brown/50">{labels.max}</span>
        </div>
      )}
    </div>
  )
}
