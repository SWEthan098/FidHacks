'use client'

import { cn } from '@/lib/utils'

interface Option { value: string; label: string }

interface SingleSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  columns?: 1 | 2 | 3
}

export function SingleSelect({ options, value, onChange, columns = 1 }: SingleSelectProps) {
  return (
    <div className={cn('grid gap-2', columns === 3 ? 'grid-cols-3' : columns === 2 ? 'grid-cols-2' : 'grid-cols-1')}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            'text-left px-4 py-3 rounded-xl border font-sans text-sm transition-all duration-150 cursor-pointer',
            value === opt.value
              ? 'bg-fidelity text-warm-white border-fidelity'
              : 'bg-cream border-border-beige text-warm-brown hover:border-muted-gold'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
