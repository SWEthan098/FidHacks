'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { clearStorage } from '@/lib/storage'
import { ChevronDown, ChevronUp, LogOut, RefreshCw } from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border-beige rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-warm-white hover:bg-soft-beige transition-colors cursor-pointer"
      >
        <span className="font-sans text-sm font-semibold text-forest">{title}</span>
        {open ? <ChevronUp size={16} className="text-warm-brown/50" /> : <ChevronDown size={16} className="text-warm-brown/50" />}
      </button>
      {open && <div className="px-5 py-4 bg-cream text-sm font-sans text-warm-brown/70">{children}</div>}
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  useEffect(() => { if (!state.user) router.replace('/login') }, [state.user, router])

  function handleSignOut() {
    clearStorage()
    dispatch({ type: 'LOGOUT' })
    router.replace('/login')
  }

  function handleRegenerate() {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    router.push('/generate-board')
  }

  if (!state.user) return null

  const u = state.user
  const ob = state.onboarding

  return (
    <AppShell showRightPanel={false}>
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-3">
        <h1 className="font-serif text-xl text-forest font-semibold">Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full flex flex-col gap-4">
        {/* Avatar + name */}
        <div className="bg-warm-white rounded-3xl border border-border-beige p-6 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-fidelity text-warm-white flex items-center justify-center font-serif text-3xl font-semibold">
            {u.firstName.charAt(0)}
          </div>
          <div>
            <p className="font-serif text-2xl text-forest font-semibold">{u.firstName} {u.lastName}</p>
            <p className="font-sans text-sm text-warm-brown/60">{u.email}</p>
            {ob.user?.school && <p className="font-sans text-xs text-muted-gold mt-0.5">{ob.user.school}</p>}
          </div>
        </div>

        {/* Onboarding summaries */}
        <Section title="About You">
          <div className="flex flex-col gap-1">
            {ob.user?.major && <p>Major: {ob.user.major}</p>}
            {ob.user?.yearInSchool && <p>Year: {ob.user.yearInSchool}</p>}
            {ob.user?.firstGenStudent && <p>First-gen: {ob.user.firstGenStudent}</p>}
          </div>
        </Section>

        <Section title="Career Goals">
          <div className="flex flex-col gap-1">
            {ob.career?.careerInterests && <p>Fields: {ob.career.careerInterests.join(', ')}</p>}
            {ob.career?.careerStage && <p>Stage: {ob.career.careerStage.replace(/_/g, ' ')}</p>}
          </div>
        </Section>

        <Section title="Financial Goals">
          <div className="flex flex-col gap-1">
            {ob.financial?.financialGoals && <p>Goals: {ob.financial.financialGoals.map(g => g.replace(/_/g, ' ')).join(', ')}</p>}
            {ob.financial?.familySupportLevel && <p>Family support: {ob.financial.familySupportLevel.replace(/_/g, ' ')}</p>}
          </div>
        </Section>

        <Section title="Privacy & Data">
          <p className="mb-2">Her Wealth uses your answers only to personalize your board. Your data is stored locally on this device and never shared.</p>
          <p className="text-xs text-warm-brown/50">To remove all data, sign out below — this clears your board, onboarding answers, and profile.</p>
        </Section>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-2">
          <Button variant="secondary" onClick={handleRegenerate} className="w-full gap-2">
            <RefreshCw size={15} />
            Regenerate My Board
          </Button>
          <Button variant="ghost" onClick={handleSignOut} className="w-full gap-2 text-red-500 hover:text-red-700">
            <LogOut size={15} />
            Sign Out
          </Button>
        </div>

        <p className="font-sans text-xs text-center text-warm-brown/40 pb-4">
          Her Wealth provides educational guidance. It does not replace professional financial advice.
        </p>
      </div>
    </AppShell>
  )
}
