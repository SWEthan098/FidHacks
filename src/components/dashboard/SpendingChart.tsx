'use client'

import type { SpendingCategory } from '@/data/spendingData'

interface SpendingChartProps {
  categories: SpendingCategory[]
}

export function SpendingChart({ categories }: SpendingChartProps) {
  const maxVal = Math.max(...categories.map((c) => Math.max(c.spent, c.budget)), 1)

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-forest inline-block" />
          <span className="font-sans text-xs text-warm-brown/60">Spent</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-muted-gold inline-block" />
          <span className="font-sans text-xs text-warm-brown/60">Budget</span>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end gap-4 h-40">
        {categories.map((cat) => {
          const spentH = Math.round((cat.spent / maxVal) * 140)
          const budgetH = Math.round((cat.budget / maxVal) * 140)
          const over = cat.spent > cat.budget

          return (
            <div key={cat.label} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-1 w-full justify-center" style={{ height: 140 }}>
                <div
                  className="w-5 rounded-t-lg"
                  style={{
                    height: spentH,
                    backgroundColor: over ? '#ef4444' : '#263D28',
                    transition: 'height 0.35s ease-out, background-color 0.2s',
                  }}
                />
                <div
                  className="w-5 rounded-t-lg"
                  style={{
                    height: budgetH,
                    backgroundColor: '#C39B3A',
                    transition: 'height 0.35s ease-out',
                  }}
                />
              </div>
              <span className="font-sans text-[9px] text-warm-brown/50 text-center leading-tight">{cat.label.split(' ')[0]}</span>
            </div>
          )
        })}
      </div>

      {/* X axis */}
      <div className="border-t border-border-beige mt-2 pt-2 flex justify-between">
        <span className="font-sans text-xs text-warm-brown/40">0</span>
        <span className="font-sans text-xs text-warm-brown/40">${Math.round(maxVal / 2)}</span>
        <span className="font-sans text-xs text-warm-brown/40">${maxVal}</span>
      </div>
    </div>
  )
}
