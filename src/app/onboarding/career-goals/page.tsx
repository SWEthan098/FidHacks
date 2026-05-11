'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
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
  { value: 'Business', label: 'Business Operations' },
  { value: 'Healthcare Business', label: 'Healthcare Business' },
  { value: 'Unsure', label: "I'm still exploring" },
]

const STAGE_OPTIONS = [
  { value: 'exploring', label: 'Exploring majors' },
  { value: 'first_internship', label: 'Looking for first internship' },
  { value: 'preparing_resume', label: 'Preparing resume' },
  { value: 'interviewing', label: 'Interviewing now' },
  { value: 'have_internship', label: 'Already have an internship' },
  { value: 'side_hustle', label: 'Starting a side hustle' },
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
  { value: 'campus_jobs', label: 'Campus jobs' },
]

export default function CareerGoalsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.career

  const [interests, setInterests] = useState<string[]>(saved.careerInterests ?? [])
  const [stage, setStage] = useState(saved.careerStage ?? '')
  const [oppTypes, setOppTypes] = useState<string[]>(saved.opportunityTypes ?? [])

  function handleNext() {
    const womenOnly = oppTypes.includes('women_only')
    dispatch({
      type: 'UPDATE_ONBOARDING_CAREER',
      payload: { careerInterests: interests, careerStage: stage, opportunityTypes: oppTypes, womenOnlyInterest: womenOnly },
    })
    router.push('/onboarding/salary-confidence')
  }

  return (
    <OnboardingCard
      caption="Step 6 of 9"
      heading="Career growth is a money move too."
      subheading="The right internship, mentor, or negotiation can shape your financial future."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/financial-goals')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What fields are you interested in?</p>
        <MultiSelectChips options={FIELD_OPTIONS} selected={interests} onChange={setInterests} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Where are you in your career journey?</p>
        <SingleSelect options={STAGE_OPTIONS} value={stage} onChange={setStage} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What opportunities are you looking for?</p>
        <MultiSelectChips options={OPPORTUNITY_OPTIONS} selected={oppTypes} onChange={setOppTypes} />
      </div>
    </OnboardingCard>
  )
}
