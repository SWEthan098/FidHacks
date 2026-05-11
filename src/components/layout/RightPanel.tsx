'use client'

import { useApp } from '@/context/AppContext'
import { TrendingUp, Target, Bookmark } from 'lucide-react'

export function RightPanel() {
  const { state } = useApp()
  const career = state.onboarding.career
  const financial = state.onboarding.financial
  const savedCount = state.savedPinIds.length

  const topField = career?.careerInterests?.[0] ?? '—'
  const confidence = career?.negotiationConfidence ?? 0
  const topGoal = financial?.financialGoals?.[0]?.replace(/_/g, ' ') ?? '—'

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-soft-beige border-l border-border-beige/60 py-6 px-4 gap-4">
      <p className="font-sans text-[10px] text-warm-brown/40 uppercase tracking-widest">Your Snapshot</p>

      <div className="flex flex-col gap-3">
        <div className="bg-warm-white rounded-2xl p-3 border border-border-beige/60">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={13} className="text-muted-gold" />
            <span className="font-sans text-[10px] text-warm-brown/50 uppercase tracking-wide">Top field</span>
          </div>
          <p className="font-serif text-forest text-sm font-semibold capitalize">{topField}</p>
        </div>

        <div className="bg-warm-white rounded-2xl p-3 border border-border-beige/60">
          <div className="flex items-center gap-2 mb-1">
            <Target size={13} className="text-muted-gold" />
            <span className="font-sans text-[10px] text-warm-brown/50 uppercase tracking-wide">Top goal</span>
          </div>
          <p className="font-serif text-forest text-sm font-semibold capitalize">{topGoal}</p>
        </div>

        <div className="bg-warm-white rounded-2xl p-3 border border-border-beige/60">
          <div className="flex items-center gap-2 mb-1">
            <Bookmark size={13} className="text-muted-gold" />
            <span className="font-sans text-[10px] text-warm-brown/50 uppercase tracking-wide">Pins saved</span>
          </div>
          <p className="font-serif text-forest text-sm font-semibold">{savedCount}</p>
        </div>

        {confidence > 0 && (
          <div className="bg-warm-white rounded-2xl p-3 border border-border-beige/60">
            <p className="font-sans text-[10px] text-warm-brown/50 uppercase tracking-wide mb-2">Negotiation confidence</p>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((n) => (
                <div
                  key={n}
                  className="flex-1 h-1.5 rounded-full"
                  style={{ backgroundColor: n <= confidence ? '#C39B3A' : '#D7CDBA' }}
                />
              ))}
            </div>
            <p className="font-sans text-[10px] text-warm-brown/50 mt-1">{confidence}/5</p>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <p className="font-serif text-xs text-warm-brown/40 italic leading-relaxed">
          &ldquo;Start where you are. Use what you have. Do what you can.&rdquo;
        </p>
      </div>
    </aside>
  )
}
