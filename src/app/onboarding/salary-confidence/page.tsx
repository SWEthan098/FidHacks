'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { ConfidenceScale } from '@/components/onboarding/ConfidenceScale'
import { useApp } from '@/context/AppContext'

const NEG_EXP_OPTIONS = [
  { value: 'yes', label: 'Yes, I have negotiated' },
  { value: 'no', label: 'No' },
  { value: 'no_want', label: "No, but I want to" },
  { value: 'didnt_know', label: "I didn't know I could" },
]

const SALARY_RESEARCH_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'somewhat', label: 'Somewhat' },
  { value: 'no', label: 'No' },
]

const SALARY_HELP_OPTIONS = [
  { value: 'salary_ranges', label: 'Salary range estimates' },
  { value: 'negotiation_scripts', label: 'Negotiation scripts' },
  { value: 'internship_pay', label: 'Internship pay expectations' },
  { value: 'benefits', label: 'Benefits explanation' },
  { value: 'total_comp', label: 'Total comp breakdown' },
  { value: 'how_to_ask', label: 'How to ask if role is paid' },
  { value: 'low_offer', label: 'How to respond to low offer' },
]

export default function SalaryConfidencePage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.career

  const [negExp, setNegExp] = useState(saved.negotiationExperience ?? '')
  const [confidence, setConfidence] = useState(saved.negotiationConfidence ?? 3)
  const [salaryResearch, setSalaryResearch] = useState(saved.salaryResearchConfidence ?? '')
  const [salaryHelp, setSalaryHelp] = useState<string[]>(saved.salaryHelpTypes ?? [])

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_CAREER',
      payload: {
        negotiationExperience: negExp,
        negotiationConfidence: confidence,
        salaryResearchConfidence: salaryResearch,
        salaryHelpTypes: salaryHelp,
      },
    })
    router.push('/onboarding/community')
  }

  return (
    <OnboardingCard
      caption="Step 7 of 9"
      heading="Knowing your worth starts before your first offer."
      subheading="Your board can pin salary ranges, scripts, and advice so you're not guessing."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/career-goals')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Have you ever negotiated pay?</p>
        <SingleSelect options={NEG_EXP_OPTIONS} value={negExp} onChange={setNegExp} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How confident do you feel about negotiation?</p>
        <ConfidenceScale value={confidence} onChange={setConfidence} labels={{ min: 'Not at all', max: 'Very confident' }} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Do you know how to research fair pay?</p>
        <SingleSelect options={SALARY_RESEARCH_OPTIONS} value={salaryResearch} onChange={setSalaryResearch} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What salary help do you want on your board?</p>
        <MultiSelectChips options={SALARY_HELP_OPTIONS} selected={salaryHelp} onChange={setSalaryHelp} />
      </div>
    </OnboardingCard>
  )
}
