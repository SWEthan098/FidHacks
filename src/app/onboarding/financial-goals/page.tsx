'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { useApp } from '@/context/AppContext'

const GOAL_OPTIONS = [
  { value: 'emergency_fund', label: 'Build emergency fund' },
  { value: 'stop_overspending', label: 'Stop overspending' },
  { value: 'learn_budget', label: 'Learn to budget' },
  { value: 'save_campus', label: 'Save from campus job' },
  { value: 'save_internship', label: 'Save from internship' },
  { value: 'pay_debt', label: 'Pay off debt' },
  { value: 'understand_loans', label: 'Understand student loans' },
  { value: 'start_investing', label: 'Start investing' },
  { value: 'roth_ira', label: 'Learn about Roth IRA' },
  { value: 'credit_score', label: 'Improve credit score' },
  { value: 'negotiate_salary', label: 'Negotiate salary' },
  { value: 'financial_independence', label: 'Become financially independent' },
  { value: 'build_wealth', label: 'Build long-term wealth' },
  { value: 'help_family', label: 'Help family financially' },
]

const SAVINGS_OPTIONS = [
  { value: '0', label: '$0 right now' },
  { value: '5', label: '$5/week' },
  { value: '10', label: '$10/week' },
  { value: '25', label: '$25/week' },
  { value: '50', label: '$50/week' },
  { value: 'more', label: 'More than $50/week' },
]

export default function FinancialGoalsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.financial

  const [goals, setGoals] = useState<string[]>(saved.financialGoals ?? [])
  const [savings, setSavings] = useState(saved.weeklySavingsAbility ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_FINANCIAL',
      payload: { financialGoals: goals, weeklySavingsAbility: savings },
    })
    router.push('/onboarding/career-goals')
  }

  return (
    <OnboardingCard
      caption="Step 5 of 9"
      heading="Pick your first money moves."
      subheading="You don't need to have everything figured out. Start with the goals that matter most right now."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/money-habits')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What are your money goals? <span className="text-warm-brown/50 font-normal">(select all that apply)</span></p>
        <MultiSelectChips options={GOAL_OPTIONS} selected={goals} onChange={setGoals} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How much could you realistically save per week?</p>
        <SingleSelect options={SAVINGS_OPTIONS} value={savings} onChange={setSavings} columns={2} />
      </div>
    </OnboardingCard>
  )
}
