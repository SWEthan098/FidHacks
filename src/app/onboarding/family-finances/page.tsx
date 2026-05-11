'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { useApp } from '@/context/AppContext'

const SUPPORT_OPTIONS = [
  { value: 'full', label: 'Full support from family' },
  { value: 'partial', label: 'Partial support' },
  { value: 'limited', label: 'Limited support' },
  { value: 'no_support', label: 'No financial support' },
  { value: 'variable', label: 'It changes month to month' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

const EXPENSE_OPTIONS = [
  { value: 'tuition', label: 'Tuition' },
  { value: 'housing', label: 'Housing/rent' },
  { value: 'food', label: 'Food/groceries' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'textbooks', label: 'Textbooks/supplies' },
  { value: 'phone', label: 'Phone bill' },
  { value: 'medical', label: 'Medical expenses' },
  { value: 'family_support', label: 'Supporting family' },
  { value: 'personal', label: 'Personal spending' },
  { value: 'none', label: 'None of the above' },
]

const LOANS_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'Not sure' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

export default function FamilyFinancesPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.financial

  const [supportLevel, setSupportLevel] = useState(saved.familySupportLevel ?? '')
  const [expenses, setExpenses] = useState<string[]>(saved.expensesPaid ?? [])
  const [loans, setLoans] = useState(saved.hasStudentLoans ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_FINANCIAL',
      payload: { familySupportLevel: supportLevel, expensesPaid: expenses, hasStudentLoans: loans },
    })
    router.push('/onboarding/money-habits')
  }

  return (
    <OnboardingCard
      caption="Step 3 of 9"
      heading="Money looks different for everyone."
      subheading="We ask this so your board can give advice that matches your actual situation."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/identity')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How much financial support do you receive from family?</p>
        <SingleSelect options={SUPPORT_OPTIONS} value={supportLevel} onChange={setSupportLevel} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What expenses do you currently pay for?</p>
        <MultiSelectChips options={EXPENSE_OPTIONS} selected={expenses} onChange={setExpenses} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you currently have student loans?</p>
        <SingleSelect options={LOANS_OPTIONS} value={loans} onChange={setLoans} columns={2} />
      </div>
    </OnboardingCard>
  )
}
