'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { useApp } from '@/context/AppContext'

const MENTOR_OPTIONS = [
  { value: 'older_student', label: 'Older student' },
  { value: 'recent_grad', label: 'Recent graduate' },
  { value: 'woman_tech', label: 'Woman in tech' },
  { value: 'woman_finance', label: 'Woman in finance' },
  { value: 'woman_of_color', label: 'Woman of color in my field' },
  { value: 'first_gen_pro', label: 'First-generation professional' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'financial_advisor', label: 'Financial advisor' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'similar_background', label: 'Someone with a similar background' },
]

const POST_OPTIONS = [
  { value: 'salary', label: 'Salary advice' },
  { value: 'internship', label: 'Internship tips' },
  { value: 'budgeting', label: 'Budgeting tips' },
  { value: 'investing', label: 'Investing basics' },
  { value: 'scholarships', label: 'Scholarship deadlines' },
  { value: 'confidence', label: 'Confidence/mindset advice' },
  { value: 'stories', label: 'Stories from women ahead' },
  { value: 'anonymous', label: 'Anonymous questions' },
  { value: 'career_paths', label: 'Career path explanations' },
]

export default function CommunityPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.community

  const [mentors, setMentors] = useState<string[]>(saved.mentorPreferences ?? [])
  const [posts, setPosts] = useState<string[]>(saved.communityPostPreferences ?? [])

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_COMMUNITY',
      payload: { mentorPreferences: mentors, communityPostPreferences: posts },
    })
    router.push('/onboarding/current-activities')
  }

  return (
    <OnboardingCard
      caption="Step 8 of 9"
      heading="You shouldn't figure this out alone."
      subheading="Your board will include advice from women ahead of you and questions from students like you."
      onNext={handleNext}
      onBack={() => router.push('/onboarding/salary-confidence')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">Who would you most want advice from?</p>
        <MultiSelectChips options={MENTOR_OPTIONS} selected={mentors} onChange={setMentors} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What kind of community posts do you want to see?</p>
        <MultiSelectChips options={POST_OPTIONS} selected={posts} onChange={setPosts} />
      </div>
    </OnboardingCard>
  )
}
