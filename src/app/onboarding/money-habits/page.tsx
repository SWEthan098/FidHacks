'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { useApp } from '@/context/AppContext'

const BUDGET_OPTIONS = [
  { value: 'yes_follow', label: "Yes, and I follow it" },
  { value: 'yes_inconsistent', label: "Yes, but inconsistently" },
  { value: 'no_want', label: "No, but I want one" },
  { value: 'no_unsure', label: "No, not sure where to start" },
]

const TRACKING_OPTIONS = [
  { value: 'banking_app', label: 'Banking app' },
  { value: 'notes', label: 'Notes app' },
  { value: 'spreadsheet', label: 'Spreadsheet' },
  { value: 'budgeting_app', label: 'Budgeting app' },
  { value: 'dont_track', label: "I don't track it" },
]

const SPENDING_OPTIONS = [
  { value: 'food', label: 'Food/eating out' },
  { value: 'clothes', label: 'Clothes/shopping' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'social', label: 'Social events' },
  { value: 'subscriptions', label: 'Subscriptions' },
  { value: 'school_supplies', label: 'School supplies' },
  { value: 'beauty', label: 'Beauty/self-care' },
  { value: 'family_support', label: 'Family support' },
  { value: 'travel', label: 'Travel' },
]

const SAVING_OPTIONS = [
  { value: 'yes_weekly', label: 'Yes, weekly' },
  { value: 'yes_monthly', label: 'Yes, monthly' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'no_want', label: "No, but I want to" },
  { value: 'no_cant', label: "No, I can't right now" },
]

export default function MoneyHabitsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.financial

  const [hasBudget, setHasBudget] = useState(saved.hasBudget ?? '')
  const [trackingMethod, setTrackingMethod] = useState(saved.trackingMethod ?? '')
  const [spending, setSpending] = useState<string[]>(saved.topSpendingCategories ?? [])
  const [savingFreq, setSavingFreq] = useState(saved.savingFrequency ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_FINANCIAL',
      payload: { hasBudget, trackingMethod, topSpendingCategories: spending, savingFrequency: savingFreq },
    })
    router.push('/onboarding/financial-goals')
  }

  return (
    <OnboardingCard
      caption="Step 4 of 9"
      heading="No shame. Just patterns."
      subheading="Your board will use this to create realistic money moves, not judge your spending."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/family-finances')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you currently have a budget?</p>
        <SingleSelect options={BUDGET_OPTIONS} value={hasBudget} onChange={setHasBudget} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How do you track spending?</p>
        <SingleSelect options={TRACKING_OPTIONS} value={trackingMethod} onChange={setTrackingMethod} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What are your biggest spending categories? <span className="text-warm-brown/50 font-normal">(select all that apply)</span></p>
        <MultiSelectChips options={SPENDING_OPTIONS} selected={spending} onChange={setSpending} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you currently save money?</p>
        <SingleSelect options={SAVING_OPTIONS} value={savingFreq} onChange={setSavingFreq} columns={2} />
      </div>
    </OnboardingCard>
  )
}
