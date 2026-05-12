'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { Input } from '@/components/ui/Input'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { useApp } from '@/context/AppContext'

const YEAR_OPTIONS = [
  { value: 'first', label: 'First year' },
  { value: 'second', label: 'Second year' },
  { value: 'third', label: 'Third year' },
  { value: 'fourth', label: 'Fourth year' },
  { value: 'graduate', label: 'Graduate student' },
]

const FIRSTGEN_OPTIONS = [
  { value: 'yes', label: 'Yes, I am' },
  { value: 'no', label: 'No' },
  { value: 'unsure', label: 'Not sure' },
  { value: 'prefer_not', label: 'Prefer not to say' },
]

export default function AboutPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.user

  const [preferredName, setPreferredName] = useState(saved.preferredName ?? '')
  const [school, setSchool] = useState(saved.school ?? '')
  const [major, setMajor] = useState(saved.major ?? '')
  const [yearInSchool, setYearInSchool] = useState(saved.yearInSchool ?? '')
  const [firstGen, setFirstGen] = useState(saved.firstGenStudent ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_USER',
      payload: { preferredName, school, major, yearInSchool, firstGenStudent: firstGen },
    })
    router.push('/onboarding/identity')
  }

  return (
    <OnboardingCard
      caption="Step 1 of 5"
      heading="Welcome. Let's build your board."
      subheading="ConnectHer is built by women, for women — your answers help us personalize every pin you see."
      onNext={handleNext}
    >
      <Input
        id="preferredName"
        label="What should we call you?"
        placeholder="Your preferred name"
        value={preferredName}
        onChange={(e) => setPreferredName(e.target.value)}
      />
      <Input
        id="school"
        label="Where do you go to school?"
        placeholder="College or university"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <Input
        id="major"
        label="What's your major or intended major?"
        placeholder="Major / intended major"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
      />
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What year are you in?</p>
        <SingleSelect options={YEAR_OPTIONS} value={yearInSchool} onChange={setYearInSchool} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Are you a first-generation college student?</p>
        <SingleSelect options={FIRSTGEN_OPTIONS} value={firstGen} onChange={setFirstGen} columns={2} />
      </div>
    </OnboardingCard>
  )
}
