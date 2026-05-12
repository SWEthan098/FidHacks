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

const SPENDING_OPTIONS = [
  { value: 'food', label: 'Food / eating out' },
  { value: 'clothes', label: 'Clothes / shopping' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'social', label: 'Social events' },
  { value: 'subscriptions', label: 'Subscriptions' },
  { value: 'school_supplies', label: 'School supplies' },
  { value: 'beauty', label: 'Beauty / self-care' },
  { value: 'family_support', label: 'Supporting family' },
  { value: 'travel', label: 'Travel' },
]

const GOAL_OPTIONS = [
  { value: 'emergency_fund', label: 'Build emergency fund' },
  { value: 'stop_overspending', label: 'Stop overspending' },
  { value: 'learn_budget', label: 'Learn to budget' },
  { value: 'save_internship', label: 'Save from internship' },
  { value: 'pay_debt', label: 'Pay off debt' },
  { value: 'understand_loans', label: 'Understand student loans' },
  { value: 'start_investing', label: 'Start investing' },
  { value: 'roth_ira', label: 'Open a Roth IRA' },
  { value: 'credit_score', label: 'Build credit score' },
  { value: 'negotiate_salary', label: 'Negotiate salary' },
  { value: 'build_wealth', label: 'Build long-term wealth' },
  { value: 'help_family', label: 'Help family financially' },
]

const SAVINGS_OPTIONS = [
  { value: '0', label: '$0 right now' },
  { value: '5', label: '$5/week' },
  { value: '10', label: '$10/week' },
  { value: '25', label: '$25/week' },
  { value: '50', label: '$50/week' },
  { value: 'more', label: 'More than $50' },
]

export default function MoneyHabitsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.financial

  const [hasBudget, setHasBudget] = useState(saved.hasBudget ?? '')
  const [spending, setSpending] = useState<string[]>(saved.topSpendingCategories ?? [])
  const [goals, setGoals] = useState<string[]>(saved.financialGoals ?? [])
  const [savings, setSavings] = useState(saved.weeklySavingsAbility ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_FINANCIAL',
      payload: { hasBudget, topSpendingCategories: spending, financialGoals: goals, weeklySavingsAbility: savings },
    })
    router.push('/onboarding/career-goals')
  }

  return (
    <OnboardingCard
      caption="Step 3 of 5"
      heading="No shame — just your real starting point."
      subheading="Your board uses this to surface realistic money moves, not judge your spending. Every woman starts somewhere."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/identity')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you currently have a budget?</p>
        <SingleSelect options={BUDGET_OPTIONS} value={hasBudget} onChange={setHasBudget} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">
          Where does most of your money go? <span className="text-warm-brown/50 font-normal">(select all that apply)</span>
        </p>
        <MultiSelectChips options={SPENDING_OPTIONS} selected={spending} onChange={setSpending} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">
          What are your money goals? <span className="text-warm-brown/50 font-normal">(select all that apply)</span>
        </p>
        <MultiSelectChips options={GOAL_OPTIONS} selected={goals} onChange={setGoals} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How much could you realistically save per week?</p>
        <SingleSelect options={SAVINGS_OPTIONS} value={savings} onChange={setSavings} columns={3} />
      </div>
    </OnboardingCard>
  )
}
