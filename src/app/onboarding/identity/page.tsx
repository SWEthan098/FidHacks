'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { useApp } from '@/context/AppContext'

const COMMUNITY_OPTIONS = [
  { value: 'First-generation college student', label: 'First-generation student' },
  { value: 'Low-income background', label: 'Low-income background' },
  { value: 'Immigrant or child of immigrants', label: 'Immigrant family' },
  { value: 'International student', label: 'International student' },
  { value: 'LGBTQ+', label: 'LGBTQ+' },
  { value: 'Student with a disability', label: 'Student with a disability' },
  { value: 'Caregiver responsibilities', label: 'Caregiver responsibilities' },
  { value: 'Transfer student', label: 'Transfer student' },
  { value: 'Veteran/military-connected student', label: 'Veteran/military-connected' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

export default function IdentityPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.identity

  const [communities, setCommunities] = useState<string[]>(saved.communityIdentities ?? [])

  function handleNext() {
    dispatch({ type: 'UPDATE_ONBOARDING_IDENTITY', payload: { communityIdentities: communities } })
    router.push('/onboarding/family-finances')
  }

  return (
    <OnboardingCard
      caption="Step 2 of 9"
      heading="Help us find resources that actually fit you."
      subheading="These questions are optional. Select any communities you identify with so we can recommend relevant scholarships, programs, and support."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/about')}
    >
      <div className="bg-sage/20 border border-sage rounded-xl p-3">
        <p className="font-sans text-xs text-fidelity">
          Your answers are only used to expand support resources — never to limit them. Skip anything you prefer not to share.
        </p>
      </div>
      <MultiSelectChips options={COMMUNITY_OPTIONS} selected={communities} onChange={setCommunities} />
    </OnboardingCard>
  )
}
