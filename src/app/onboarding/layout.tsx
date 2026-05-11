'use client'

import { usePathname } from 'next/navigation'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import type { ReactNode } from 'react'

const STEPS: Record<string, { step: number; label: string }> = {
  '/onboarding/about':              { step: 1, label: 'About You' },
  '/onboarding/identity':           { step: 2, label: 'Identity & Community' },
  '/onboarding/family-finances':    { step: 3, label: 'Family & Finances' },
  '/onboarding/money-habits':       { step: 4, label: 'Money Habits' },
  '/onboarding/financial-goals':    { step: 5, label: 'Financial Goals' },
  '/onboarding/career-goals':       { step: 6, label: 'Career Goals' },
  '/onboarding/salary-confidence':  { step: 7, label: 'Salary Confidence' },
  '/onboarding/community':          { step: 8, label: 'Community' },
  '/onboarding/current-activities': { step: 9, label: 'Your Schedule' },
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const current = STEPS[pathname] ?? { step: 1, label: 'Getting Started' }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ProgressBar currentStep={current.step} totalSteps={9} label={current.label} />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
