'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
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

const SUPPORT_OPTIONS = [
  { value: 'full', label: 'Full support from family' },
  { value: 'partial', label: 'Partial support' },
  { value: 'limited', label: 'Limited support' },
  { value: 'no_support', label: 'No financial support' },
  { value: 'variable', label: 'It changes month to month' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

const LOANS_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: "Not sure" },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

export default function IdentityPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const savedIdentity = state.onboarding.identity
  const savedFinancial = state.onboarding.financial

  const [communities, setCommunities] = useState<string[]>(savedIdentity.communityIdentities ?? [])
  const [supportLevel, setSupportLevel] = useState(savedFinancial.familySupportLevel ?? '')
  const [loans, setLoans] = useState(savedFinancial.hasStudentLoans ?? '')

  function handleNext() {
    dispatch({ type: 'UPDATE_ONBOARDING_IDENTITY', payload: { communityIdentities: communities } })
    dispatch({ type: 'UPDATE_ONBOARDING_FINANCIAL', payload: { familySupportLevel: supportLevel, hasStudentLoans: loans } })
    router.push('/onboarding/money-habits')
  }

  return (
    <OnboardingCard
      caption="Step 2 of 5"
      heading="We want to find resources that fit you."
      subheading="Every woman's financial situation is different. These answers help us recommend scholarships, programs, and support made for you."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/about')}
    >
      <div className="bg-sage/20 border border-sage rounded-xl p-3">
        <p className="font-sans text-xs text-fidelity">
          All questions are optional. Your answers only expand what we recommend — never limit it.
        </p>
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Communities you identify with <span className="text-warm-brown/50 font-normal">(optional)</span></p>
        <MultiSelectChips options={COMMUNITY_OPTIONS} selected={communities} onChange={setCommunities} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How much financial support do you receive from family?</p>
        <SingleSelect options={SUPPORT_OPTIONS} value={supportLevel} onChange={setSupportLevel} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you have student loans?</p>
        <SingleSelect options={LOANS_OPTIONS} value={loans} onChange={setLoans} columns={2} />
      </div>
    </OnboardingCard>
  )
}
