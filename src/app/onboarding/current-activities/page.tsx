'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OnboardingCard } from '@/components/onboarding/OnboardingCard'
import { MultiSelectChips } from '@/components/onboarding/MultiSelectChips'
import { SingleSelect } from '@/components/onboarding/SingleSelect'
import { useApp } from '@/context/AppContext'

const ACTIVITY_OPTIONS = [
  { value: 'classes_only', label: 'Classes only' },
  { value: 'campus_job', label: 'Campus job' },
  { value: 'part_time_job', label: 'Part-time job' },
  { value: 'internship', label: 'Internship' },
  { value: 'research', label: 'Research' },
  { value: 'student_org', label: 'Student organization' },
  { value: 'women_biz_tech', label: 'Women in biz/tech club' },
  { value: 'finance_club', label: 'Finance club' },
  { value: 'entrepreneurship', label: 'Entrepreneurship club' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'family_responsibilities', label: 'Family responsibilities' },
  { value: 'side_hustle', label: 'Side hustle' },
]

const HOURS_OPTIONS = [
  { value: '0', label: '0 hours' },
  { value: '1-5', label: '1–5 hours' },
  { value: '6-10', label: '6–10 hours' },
  { value: '11-20', label: '11–20 hours' },
  { value: '20+', label: '20+ hours' },
]

const TIME_OPTIONS = [
  { value: '15min', label: '15 minutes/week' },
  { value: '30min', label: '30 minutes/week' },
  { value: '1hr', label: '1 hour/week' },
  { value: '2-3hr', label: '2–3 hours/week' },
  { value: '3hr+', label: 'More than 3 hours' },
]

export default function CurrentActivitiesPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const saved = state.onboarding.activities

  const [activities, setActivities] = useState<string[]>(saved.currentActivities ?? [])
  const [hours, setHours] = useState(saved.hoursWorkedPerWeek ?? '')
  const [weeklyTime, setWeeklyTime] = useState(saved.weeklyTimeForGrowth ?? '')

  function handleNext() {
    dispatch({
      type: 'UPDATE_ONBOARDING_ACTIVITIES',
      payload: { currentActivities: activities, hoursWorkedPerWeek: hours, weeklyTimeForGrowth: weeklyTime },
    })
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    router.push('/generate-board')
  }

  return (
    <OnboardingCard
      caption="Step 9 of 9"
      heading="Let's keep this realistic."
      subheading="Your board should fit your actual schedule, not an imaginary perfect week."
      onNext={handleNext}
      nextLabel="Generate My Board"
      onBack={() => router.push('/onboarding/community')}
    >
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">What are you currently involved in?</p>
        <MultiSelectChips options={ACTIVITY_OPTIONS} selected={activities} onChange={setActivities} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How many hours/week do you work outside class?</p>
        <SingleSelect options={HOURS_OPTIONS} value={hours} onChange={setHours} columns={3} />
      </div>
      <div>
        <p className="font-sans text-sm text-warm-brown font-medium mb-2">How much time can you spend weekly on career/financial growth?</p>
        <SingleSelect options={TIME_OPTIONS} value={weeklyTime} onChange={setWeeklyTime} columns={2} />
      </div>
    </OnboardingCard>
  )
}
