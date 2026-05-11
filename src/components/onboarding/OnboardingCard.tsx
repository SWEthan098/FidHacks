'use client'

import { Button } from '@/components/ui/Button'
import type { ReactNode } from 'react'

interface OnboardingCardProps {
  heading: string
  subheading?: string
  caption?: string
  children: ReactNode
  onNext: () => void
  onBack?: () => void
  nextLabel?: string
  isNextDisabled?: boolean
  loading?: boolean
}

export function OnboardingCard({ heading, subheading, caption, children, onNext, onBack, nextLabel = 'Continue', isNextDisabled, loading }: OnboardingCardProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 py-10">
      <div className="w-full max-w-xl bg-warm-white rounded-3xl shadow-card border border-border-beige/50 p-8 lg:p-10">
        {caption && (
          <p className="font-sans text-xs text-muted-gold uppercase tracking-widest mb-3">{caption}</p>
        )}
        <h2 className="font-serif text-3xl lg:text-4xl text-forest font-semibold leading-snug mb-2">
          {heading}
        </h2>
        {subheading && (
          <p className="font-sans text-sm text-warm-brown/70 leading-relaxed mb-6">{subheading}</p>
        )}

        <div className="mt-6 flex flex-col gap-4">{children}</div>

        <div className="flex items-center justify-between mt-8">
          {onBack ? (
            <button
              onClick={onBack}
              className="font-sans text-sm text-warm-brown/60 hover:text-forest transition-colors cursor-pointer"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}
          <Button onClick={onNext} disabled={isNextDisabled} loading={loading} size="md">
            {nextLabel} →
          </Button>
        </div>
      </div>
    </div>
  )
}
