'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { ConfidenceScale } from '@/components/onboarding/ConfidenceScale'
import { useApp } from '@/context/AppContext'

const FIELD_OPTIONS = [
  { value: 'Finance', label: 'Finance' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Software Engineering', label: 'Software Engineering' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Product Management', label: 'Product Management' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Entrepreneurship', label: 'Entrepreneurship' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Investment Management', label: 'Investment Mgmt' },
  { value: 'Healthcare Business', label: 'Healthcare Business' },
  { value: 'Unsure', label: "Still exploring" },
]

const OPPORTUNITY_OPTIONS = [
  { value: 'paid_internships', label: 'Paid internships' },
  { value: 'women_only', label: 'Women-only programs' },
  { value: 'scholarships', label: 'Scholarships' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'career_workshops', label: 'Career workshops' },
  { value: 'resume_help', label: 'Resume help' },
  { value: 'interview_prep', label: 'Interview prep' },
  { value: 'networking', label: 'Networking events' },
]

const NEG_EXP_OPTIONS = [
  { value: 'yes', label: 'Yes, I have' },
  { value: 'no_want', label: "No, but I want to" },
  { value: 'no', label: 'No, not yet' },
  { value: 'didnt_know', label: "I didn't know I could" },
]

export default function CareerGoalsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.career

  const [interests, setInterests] = useState<string[]>(saved.careerInterests ?? [])
  const [oppTypes, setOppTypes] = useState<string[]>(saved.opportunityTypes ?? [])
  const [negExp, setNegExp] = useState(saved.negotiationExperience ?? '')
  const [confidence, setConfidence] = useState(saved.negotiationConfidence ?? 3)

  function handleNext() {
    const womenOnly = oppTypes.includes('women_only')
    dispatch({
      type: 'UPDATE_ONBOARDING_CAREER',
      payload: {
        careerInterests: interests,
        opportunityTypes: oppTypes,
        womenOnlyInterest: womenOnly,
        negotiationExperience: negExp,
        negotiationConfidence: confidence,
      },
    })
    router.push('/onboarding/community')
  }

  return (
    <OnboardingCard
      caption="Step 4 of 5"
      heading="Your career is your biggest wealth lever."
      subheading="The right internship, negotiation, or mentor connection can change everything. Let's find those for you."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/money-habits')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What fields are you interested in?</p>
        <MultiSelectChips options={FIELD_OPTIONS} selected={interests} onChange={setInterests} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What opportunities are you looking for?</p>
        <MultiSelectChips options={OPPORTUNITY_OPTIONS} selected={oppTypes} onChange={setOppTypes} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Have you ever negotiated pay?</p>
        <SingleSelect options={NEG_EXP_OPTIONS} value={negExp} onChange={setNegExp} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How confident do you feel about negotiating salary?</p>
        <ConfidenceScale value={confidence} onChange={setConfidence} labels={{ min: 'Not at all', max: 'Very confident' }} />
      </div>
    </OnboardingCard>
  )
}
