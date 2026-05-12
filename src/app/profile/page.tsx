'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { clearStorage } from '@/lib/storage'
import { generateBoard } from '@/lib/api'
import { ChevronDown, ChevronUp, LogOut, RefreshCw, Edit3, Check, X } from 'lucide-react'

const inputCls = 'w-full bg-cream border border-border-beige rounded-xl px-3 py-2 font-sans text-sm text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors'
const labelCls = 'font-sans text-xs text-warm-brown/50 uppercase tracking-widest font-semibold mb-1 block'

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div>
      <p className="font-sans text-[10px] text-warm-brown/40 uppercase tracking-widest">{label}</p>
      <p className="font-sans text-sm text-warm-brown">{value}</p>
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  editContent?: React.ReactNode
  onSave?: () => void
  onCancel?: () => void
  editing?: boolean
  onEdit?: () => void
}

function Section({ title, children, editContent, onSave, onCancel, editing, onEdit }: SectionProps) {
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

      {open && (
        <div className="px-5 py-4 bg-cream">
          {editing && editContent ? (
            <>
              <div className="flex flex-col gap-3">{editContent}</div>
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={onSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest text-warm-white text-xs font-sans font-semibold cursor-pointer hover:bg-fidelity transition-colors"
                >
                  <Check size={13} /> Save
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-beige text-warm-brown/60 text-xs font-sans cursor-pointer hover:text-forest transition-colors"
                >
                  <X size={13} /> Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 font-sans text-sm text-warm-brown/70">{children}</div>
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="self-start flex items-center gap-1.5 mt-2 text-xs font-sans text-fidelity hover:text-forest transition-colors cursor-pointer"
                >
                  <Edit3 size={12} /> Edit
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  // ── About You edit state ──────────────────────────────────────────
  const [editAbout, setEditAbout] = useState(false)
  const [preferredName, setPreferredName] = useState('')
  const [major, setMajor] = useState('')
  const [school, setSchool] = useState('')
  const [yearInSchool, setYearInSchool] = useState('')

  // ── Career Goals edit state ───────────────────────────────────────
  const [editCareer, setEditCareer] = useState(false)
  const [careerInterests, setCareerInterests] = useState('')
  const [dreamRole, setDreamRole] = useState('')
  const [targetSalary, setTargetSalary] = useState('')

  // ── Financial Goals edit state ────────────────────────────────────
  const [editFinancial, setEditFinancial] = useState(false)
  const [financialGoals, setFinancialGoals] = useState('')
  const [weeklySavings, setWeeklySavings] = useState('')

  useEffect(() => { if (!state.user) router.replace('/login') }, [state.user, router])

  function startAbout() {
    const ob = state.onboarding
    setPreferredName(ob.user?.preferredName ?? '')
    setMajor(ob.user?.major ?? '')
    setSchool(ob.user?.school ?? '')
    setYearInSchool(ob.user?.yearInSchool ?? '')
    setEditAbout(true)
  }

  function saveAbout() {
    dispatch({ type: 'UPDATE_ONBOARDING_USER', payload: {
      preferredName: preferredName.trim() || undefined,
      major: major.trim() || undefined,
      school: school.trim() || undefined,
      yearInSchool: yearInSchool.trim() || undefined,
    }})
    setEditAbout(false)
  }

  function startCareer() {
    const ob = state.onboarding
    setCareerInterests((ob.career?.careerInterests ?? []).join(', '))
    setDreamRole(ob.career?.dreamRole ?? '')
    setTargetSalary(ob.career?.targetSalary ?? '')
    setEditCareer(true)
  }

  function saveCareer() {
    dispatch({ type: 'UPDATE_ONBOARDING_CAREER', payload: {
      careerInterests: careerInterests.split(',').map(s => s.trim()).filter(Boolean),
      dreamRole: dreamRole.trim() || undefined,
      targetSalary: targetSalary.trim() || undefined,
    }})
    setEditCareer(false)
  }

  function startFinancial() {
    const ob = state.onboarding
    setFinancialGoals((ob.financial?.financialGoals ?? []).join(', '))
    setWeeklySavings(ob.financial?.weeklySavingsAbility ?? '')
    setEditFinancial(true)
  }

  function saveFinancial() {
    dispatch({ type: 'UPDATE_ONBOARDING_FINANCIAL', payload: {
      financialGoals: financialGoals.split(',').map(s => s.trim()).filter(Boolean),
      weeklySavingsAbility: weeklySavings.trim() || undefined,
    }})
    setEditFinancial(false)
  }

  function handleSignOut() {
    clearStorage()
    dispatch({ type: 'LOGOUT' })
    router.replace('/login')
  }

  async function handleRegenerate() {
    dispatch({ type: 'COMPLETE_ONBOARDING' })
    const nextVariant = (state.boardVariant + 1) % 3
    dispatch({ type: 'CYCLE_BOARD_VARIANT' })
    const pins = await generateBoard(state.onboarding, nextVariant)
    dispatch({ type: 'SET_BOARD', payload: pins })
    router.push('/board')
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
          <div className="w-16 h-16 rounded-full bg-fidelity text-warm-white flex items-center justify-center font-serif text-3xl font-semibold shrink-0">
            {(ob.user?.preferredName ?? u.firstName).charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-serif text-2xl text-forest font-semibold">
              {ob.user?.preferredName ?? u.firstName} {u.lastName}
            </p>
            <p className="font-sans text-sm text-warm-brown/60">{u.email}</p>
            {ob.user?.school && <p className="font-sans text-xs text-muted-gold mt-0.5">{ob.user.school}</p>}
          </div>
        </div>

        {/* About You */}
        <Section
          title="About You"
          editing={editAbout}
          onEdit={startAbout}
          onSave={saveAbout}
          onCancel={() => setEditAbout(false)}
          editContent={
            <>
              <div>
                <label className={labelCls}>Preferred name</label>
                <input className={inputCls} value={preferredName} onChange={e => setPreferredName(e.target.value)} placeholder="What should we call you?" />
              </div>
              <div>
                <label className={labelCls}>Major</label>
                <input className={inputCls} value={major} onChange={e => setMajor(e.target.value)} placeholder="e.g. Computer Science" />
              </div>
              <div>
                <label className={labelCls}>School</label>
                <input className={inputCls} value={school} onChange={e => setSchool(e.target.value)} placeholder="e.g. UC Berkeley" />
              </div>
              <div>
                <label className={labelCls}>Year</label>
                <select className={inputCls} value={yearInSchool} onChange={e => setYearInSchool(e.target.value)}>
                  <option value="">Select year</option>
                  {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </>
          }
        >
          <Field label="Preferred name" value={ob.user?.preferredName} />
          <Field label="Major" value={ob.user?.major} />
          <Field label="School" value={ob.user?.school} />
          <Field label="Year" value={ob.user?.yearInSchool} />
          {!ob.user?.major && !ob.user?.school && (
            <p className="text-warm-brown/40 text-xs italic">No details yet — tap Edit to add.</p>
          )}
        </Section>

        {/* Career Goals */}
        <Section
          title="Career Goals"
          editing={editCareer}
          onEdit={startCareer}
          onSave={saveCareer}
          onCancel={() => setEditCareer(false)}
          editContent={
            <>
              <div>
                <label className={labelCls}>Career interests <span className="normal-case tracking-normal text-warm-brown/30">(comma-separated)</span></label>
                <input className={inputCls} value={careerInterests} onChange={e => setCareerInterests(e.target.value)} placeholder="e.g. Finance, Technology, Consulting" />
              </div>
              <div>
                <label className={labelCls}>Dream role</label>
                <input className={inputCls} value={dreamRole} onChange={e => setDreamRole(e.target.value)} placeholder="e.g. Product Manager at a startup" />
              </div>
              <div>
                <label className={labelCls}>Target salary</label>
                <input className={inputCls} value={targetSalary} onChange={e => setTargetSalary(e.target.value)} placeholder="e.g. $80,000" />
              </div>
            </>
          }
        >
          <Field label="Fields" value={ob.career?.careerInterests?.join(', ')} />
          <Field label="Dream role" value={ob.career?.dreamRole} />
          <Field label="Target salary" value={ob.career?.targetSalary} />
          {!ob.career?.careerInterests?.length && !ob.career?.dreamRole && (
            <p className="text-warm-brown/40 text-xs italic">No goals set yet — tap Edit to add.</p>
          )}
        </Section>

        {/* Financial Goals */}
        <Section
          title="Financial Goals"
          editing={editFinancial}
          onEdit={startFinancial}
          onSave={saveFinancial}
          onCancel={() => setEditFinancial(false)}
          editContent={
            <>
              <div>
                <label className={labelCls}>Financial goals <span className="normal-case tracking-normal text-warm-brown/30">(comma-separated)</span></label>
                <input className={inputCls} value={financialGoals} onChange={e => setFinancialGoals(e.target.value)} placeholder="e.g. Build emergency fund, Pay off loans" />
              </div>
              <div>
                <label className={labelCls}>Weekly savings ability</label>
                <select className={inputCls} value={weeklySavings} onChange={e => setWeeklySavings(e.target.value)}>
                  <option value="">Select amount</option>
                  {['$0–$10', '$10–$25', '$25–$50', '$50–$100', '$100+'].map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </>
          }
        >
          <Field label="Goals" value={ob.financial?.financialGoals?.map(g => g.replace(/_/g, ' ')).join(', ')} />
          <Field label="Weekly savings" value={ob.financial?.weeklySavingsAbility} />
          <Field label="Family support" value={ob.financial?.familySupportLevel?.replace(/_/g, ' ')} />
          {!ob.financial?.financialGoals?.length && (
            <p className="text-warm-brown/40 text-xs italic">No goals set yet — tap Edit to add.</p>
          )}
        </Section>

        {/* Privacy */}
        <Section title="Privacy & Data">
          <p className="mb-2">ConnectHer uses your answers only to personalize your board. Your data is stored locally on this device and never shared.</p>
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
          ConnectHer provides educational guidance. It does not replace professional financial advice.
        </p>
      </div>
    </AppShell>
  )
}
