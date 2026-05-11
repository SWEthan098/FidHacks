'use client'

import { cn } from '@/lib/utils'

interface Option { value: string; label: string }

interface MultiSelectChipsProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  maxSelect?: number
  columns?: 2 | 3
}

export function MultiSelectChips({ options, selected, onChange, maxSelect, columns = 2 }: MultiSelectChipsProps) {
  function toggle(value: string) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      if (maxSelect && selected.length >= maxSelect) return
      onChange([...selected, value])
    }
  }

  return (
    <div className={cn('grid gap-2', columns === 3 ? 'grid-cols-3' : 'grid-cols-2')}>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value)
        const isDisabled = !isSelected && maxSelect !== undefined && selected.length >= maxSelect
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => toggle(opt.value)}
            disabled={isDisabled}
            className={cn(
              'text-left px-4 py-2.5 rounded-xl border font-sans text-sm transition-all duration-150 cursor-pointer',
              isSelected
                ? 'bg-fidelity text-warm-white border-fidelity'
                : 'bg-cream border-border-beige text-warm-brown hover:border-muted-gold',
              isDisabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
