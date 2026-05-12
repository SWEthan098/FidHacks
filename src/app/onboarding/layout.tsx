'use client'

import { usePathname } from 'next/navigation'
import { ProgressBar } from '@/components/onboarding/ProgressBar'
import type { ReactNode } from 'react'

const STEPS: Record<string, { step: number; label: string }> = {
  '/onboarding/about':        { step: 1, label: 'About You' },
  '/onboarding/identity':     { step: 2, label: 'Your Background' },
  '/onboarding/money-habits': { step: 3, label: 'Money & Goals' },
  '/onboarding/career-goals': { step: 4, label: 'Career & Salary' },
  '/onboarding/community':    { step: 5, label: 'Your Aspirations' },
}

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const current = STEPS[pathname] ?? { step: 1, label: 'Getting Started' }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <ProgressBar currentStep={current.step} totalSteps={5} label={current.label} />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}
