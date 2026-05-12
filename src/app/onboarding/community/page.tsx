'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { useApp } from '@/context/AppContext'

const MENTOR_OPTIONS = [
  { value: 'older_student', label: 'Older student' },
  { value: 'recent_grad', label: 'Recent graduate' },
  { value: 'woman_tech', label: 'Woman in tech' },
  { value: 'woman_finance', label: 'Woman in finance' },
  { value: 'woman_of_color', label: 'Woman of color in my field' },
  { value: 'first_gen_pro', label: 'First-gen professional' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'similar_background', label: 'Someone with similar background' },
]

const POST_OPTIONS = [
  { value: 'salary', label: 'Salary advice' },
  { value: 'internship', label: 'Internship tips' },
  { value: 'budgeting', label: 'Budgeting tips' },
  { value: 'investing', label: 'Investing basics' },
  { value: 'scholarships', label: 'Scholarship deadlines' },
  { value: 'confidence', label: 'Mindset & confidence' },
  { value: 'stories', label: 'Stories from women ahead' },
  { value: 'career_paths', label: 'Career path explanations' },
]

const HOURS_OPTIONS = [
  { value: '0', label: '0 hours' },
  { value: '1-5', label: '1–5 hrs/week' },
  { value: '6-10', label: '6–10 hrs/week' },
  { value: '11-20', label: '11–20 hrs/week' },
  { value: '20+', label: '20+ hrs/week' },
]

export default function CommunityPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const savedCommunity = state.onboarding.community
  const savedActivities = state.onboarding.activities

  const [mentors, setMentors] = useState<string[]>(savedCommunity.mentorPreferences ?? [])
  const [posts, setPosts] = useState<string[]>(savedCommunity.communityPostPreferences ?? [])
  const [hours, setHours] = useState(savedActivities.hoursWorkedPerWeek ?? '')

  function handleNext() {
    dispatch({ type: 'UPDATE_ONBOARDING_COMMUNITY', payload: { mentorPreferences: mentors, communityPostPreferences: posts } })
    dispatch({ type: 'UPDATE_ONBOARDING_ACTIVITIES', payload: { hoursWorkedPerWeek: hours } })
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    router.push('/generate-board')
  }

  return (
    <OnboardingCard
      caption="Step 5 of 5"
      heading="You shouldn't figure this out alone."
      subheading="ConnectHer connects you with women ahead of you. Tell us what kind of community you want so we can curate it."
      nextLabel="Build My Board"
      onNext={handleNext}
      onBack={() => router.push('/onboarding/career-goals')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Who would you most want advice from?</p>
        <MultiSelectChips options={MENTOR_OPTIONS} selected={mentors} onChange={setMentors} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What kind of posts do you want to see?</p>
        <MultiSelectChips options={POST_OPTIONS} selected={posts} onChange={setPosts} columns={2} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How many hours per week do you currently work?</p>
        <SingleSelect options={HOURS_OPTIONS} value={hours} onChange={setHours} columns={3} />
      </div>
    </OnboardingCard>
  )
}
