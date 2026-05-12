'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { SpendingChart } from '@/components/dashboard/SpendingChart'
import { TransactionsList } from '@/components/dashboard/TransactionsList'
import { MONTHLY_STATS, SPENDING_CATEGORIES } from '@/data/spendingData'
import { DollarSign, ShoppingBag, MessageSquare, LayoutDashboard, Edit3, Check } from 'lucide-react'

const BASE_TOTAL = MONTHLY_STATS.totalSpent // 832 — the baseline to scale from

export default function DashboardPage() {
  const router = useRouter()
  const { state } = useApp()

  // ── Emergency fund (editable goal) ───────────────────────────────
  const [emergencyGoal, setEmergencyGoal] = useState(MONTHLY_STATS.savingsGoal)
  const [emergencyGoalInput, setEmergencyGoalInput] = useState(String(MONTHLY_STATS.savingsGoal))
  const [editingGoal, setEditingGoal] = useState(false)
  const [displayedSaved, setDisplayedSaved] = useState(0)
  const goalInputRef = useRef<HTMLInputElement>(null)

  // ── Monthly spending (editable total) ────────────────────────────
  const [spendingTotal, setSpendingTotal] = useState(MONTHLY_STATS.totalSpent)
  const [spendingInput, setSpendingInput] = useState(String(MONTHLY_STATS.totalSpent))
  const [editingSpend, setEditingSpend] = useState(false)
  const [displayedSpent, setDisplayedSpent] = useState(0)
  const spendInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!state.user) { router.replace('/login'); return }
    if (!state.onboarding.isComplete) router.replace('/onboarding/about')
  }, [state.user, state.onboarding.isComplete, router])

  // Animate emergency fund counter on mount
  useEffect(() => {
    const target = MONTHLY_STATS.totalSaved
    let val = 0
    const step = Math.ceil(target / 40)
    const id = setInterval(() => {
      val = Math.min(val + step, target)
      setDisplayedSaved(val)
      if (val >= target) clearInterval(id)
    }, 30)
    return () => clearInterval(id)
  }, [])

  // Animate spending counter whenever spendingTotal changes
  useEffect(() => {
    const target = spendingTotal
    let val = 0
    const step = Math.ceil(target / 40)
    const id = setInterval(() => {
      val = Math.min(val + step, target)
      setDisplayedSpent(val)
      if (val >= target) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [spendingTotal])

  // Scale all categories proportionally when total changes
  const liveCategories = useMemo(() => {
    const ratio = spendingTotal / BASE_TOTAL
    return SPENDING_CATEGORIES.map((cat) => ({
      ...cat,
      spent: Math.round(cat.spent * ratio),
    }))
  }, [spendingTotal])

  function saveGoal() {
    const val = parseInt(emergencyGoalInput, 10)
    if (!isNaN(val) && val > 0) setEmergencyGoal(val)
    else setEmergencyGoalInput(String(emergencyGoal))
    setEditingGoal(false)
  }

  function startEditGoal() {
    setEditingGoal(true)
    setTimeout(() => goalInputRef.current?.select(), 50)
  }

  function saveSpend() {
    const val = parseInt(spendingInput.replace(/,/g, ''), 10)
    if (!isNaN(val) && val >= 0) {
      setSpendingTotal(val)
      setSpendingInput(String(val))
    } else {
      setSpendingInput(String(spendingTotal))
    }
    setEditingSpend(false)
  }

  function startEditSpend() {
    setEditingSpend(true)
    setTimeout(() => spendInputRef.current?.select(), 50)
  }

  if (!state.user) return null

  const name = state.onboarding.user?.preferredName ?? state.user.firstName
  const savingsPct = Math.min(Math.round((displayedSaved / emergencyGoal) * 100), 100)
  const budgetPct  = Math.round((spendingTotal / MONTHLY_STATS.monthlyBudget) * 100)
  const overBudget = spendingTotal > MONTHLY_STATS.monthlyBudget

  return (
    <AppShell showRightPanel={false}>
      {/* Header */}
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-4 flex items-center gap-2">
        <LayoutDashboard size={18} className="text-muted-gold" />
        <div>
          <h1 className="font-serif text-xl text-forest font-semibold">Dashboard</h1>
          <p className="font-sans text-xs text-warm-brown/50">Welcome back, {name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* ── Two stat cards ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Emergency Fund */}
            <div className="bg-warm-white rounded-3xl border border-border-beige p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-fidelity flex items-center justify-center">
                    <DollarSign size={18} className="text-warm-white" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-warm-brown/50 uppercase tracking-widest">Emergency Fund</p>
                    <p className="font-serif text-2xl text-forest font-bold">${displayedSaved.toLocaleString()}</p>
                  </div>
                </div>
                <span className="font-serif text-3xl font-bold text-fidelity">{savingsPct}%</span>
              </div>

              <div>
                <div className="h-3 bg-soft-beige rounded-full overflow-hidden">
                  <div
                    className="h-full bg-fidelity rounded-full"
                    style={{ width: `${savingsPct}%`, transition: 'width 0.5s ease-out' }}
                  />
                </div>
                <div className="flex justify-between mt-2 items-center">
                  <span className="font-sans text-xs text-warm-brown/50">${displayedSaved.toLocaleString()} saved</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans text-xs text-warm-brown/50">Goal:</span>
                    {editingGoal ? (
                      <div className="flex items-center gap-1">
                        <span className="font-sans text-xs text-muted-gold">$</span>
                        <input
                          ref={goalInputRef}
                          value={emergencyGoalInput}
                          onChange={(e) => setEmergencyGoalInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') saveGoal(); if (e.key === 'Escape') setEditingGoal(false) }}
                          onBlur={saveGoal}
                          className="w-20 bg-cream border border-muted-gold rounded-lg px-2 py-0.5 font-sans text-xs text-forest focus:outline-none text-right"
                        />
                        <button onClick={saveGoal} className="text-fidelity hover:text-forest cursor-pointer">
                          <Check size={13} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={startEditGoal}
                        className="flex items-center gap-1 text-xs font-sans text-muted-gold hover:text-forest transition-colors cursor-pointer font-semibold"
                      >
                        ${emergencyGoal.toLocaleString()}
                        <Edit3 size={11} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <p className="font-sans text-xs text-warm-brown/50">
                +${MONTHLY_STATS.monthlyChange.saved} this month · ${Math.max(0, emergencyGoal - MONTHLY_STATS.totalSaved).toLocaleString()} to go
              </p>
            </div>

            {/* Monthly Spending */}
            <div className="bg-warm-white rounded-3xl border border-border-beige p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-muted-gold flex items-center justify-center">
                    <ShoppingBag size={18} className="text-warm-white" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-warm-brown/50 uppercase tracking-widest">Monthly Spending</p>

                    {/* Editable total */}
                    {editingSpend ? (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="font-serif text-2xl text-forest font-bold">$</span>
                        <input
                          ref={spendInputRef}
                          value={spendingInput}
                          onChange={(e) => setSpendingInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') saveSpend(); if (e.key === 'Escape') setEditingSpend(false) }}
                          onBlur={saveSpend}
                          className="w-28 bg-cream border border-muted-gold rounded-lg px-2 py-0.5 font-serif text-2xl text-forest font-bold focus:outline-none"
                        />
                        <button onClick={saveSpend} className="text-fidelity hover:text-forest cursor-pointer ml-1">
                          <Check size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={startEditSpend}
                        className="flex items-center gap-1.5 mt-0.5 cursor-pointer group"
                      >
                        <span className="font-serif text-2xl text-forest font-bold">${displayedSpent.toLocaleString()}</span>
                        <Edit3 size={13} className="text-warm-brown/30 group-hover:text-muted-gold transition-colors" />
                      </button>
                    )}
                  </div>
                </div>
                <span
                  className="font-serif text-3xl font-bold"
                  style={{ color: overBudget ? '#ef4444' : '#526A49', transition: 'color 0.3s' }}
                >
                  {budgetPct}%
                </span>
              </div>

              <div>
                <div className="h-3 bg-soft-beige rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(budgetPct, 100)}%`,
                      backgroundColor: overBudget ? '#ef4444' : '#C39B3A',
                      transition: 'width 0.4s ease-out, background-color 0.3s',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-sans text-xs text-warm-brown/50">Budget: ${MONTHLY_STATS.monthlyBudget}/mo</span>
                  {overBudget ? (
                    <span className="font-sans text-xs text-red-500 font-semibold">
                      ${(spendingTotal - MONTHLY_STATS.monthlyBudget).toLocaleString()} over
                    </span>
                  ) : (
                    <span className="font-sans text-xs text-fidelity font-semibold">
                      ${(MONTHLY_STATS.monthlyBudget - spendingTotal).toLocaleString()} left
                    </span>
                  )}
                </div>
              </div>

              <p className="font-sans text-xs text-warm-brown/40 italic">
                Click the amount above to update — the breakdown below adjusts in real time.
              </p>
            </div>
          </div>

          {/* ── Spending breakdown + Ask AI ──────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* Spending chart — receives live categories */}
            <div className="lg:col-span-3 bg-warm-white rounded-3xl border border-border-beige p-6">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-serif text-lg text-forest font-semibold">Spending Breakdown</h3>
                  <p className="font-sans text-3xl font-bold text-forest mt-1">
                    ${spendingTotal.toLocaleString()}
                    {overBudget && (
                      <span className="ml-2 text-sm font-sans font-semibold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Over budget
                      </span>
                    )}
                  </p>
                  <p className="font-sans text-xs text-warm-brown/50 mt-0.5">
                    +${MONTHLY_STATS.monthlyChange.spent} from last month
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <SpendingChart categories={liveCategories} />
              </div>

              {/* Category rows — live */}
              <div className="mt-6 flex flex-col gap-2.5">
                {liveCategories.map((cat) => {
                  const over = cat.spent > cat.budget
                  const pct = Math.min(Math.round((cat.spent / cat.budget) * 100), 150)
                  return (
                    <div key={cat.label} className="flex items-center gap-3">
                      <span className="font-sans text-xs text-warm-brown/70 w-28 shrink-0">{cat.label}</span>
                      <div className="flex-1 h-2 bg-soft-beige rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            backgroundColor: over ? '#ef4444' : '#526A49',
                            transition: 'width 0.35s ease-out, background-color 0.2s',
                          }}
                        />
                      </div>
                      <div className="flex items-center gap-1.5 w-24 justify-end shrink-0">
                        <span className={`font-sans text-xs font-semibold ${over ? 'text-red-500' : 'text-warm-brown/60'}`}>
                          ${cat.spent.toLocaleString()}
                        </span>
                        <span className="font-sans text-[10px] text-warm-brown/30">/ ${cat.budget}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Ask ConnectHer AI */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="bg-forest rounded-3xl p-6 flex flex-col gap-4 flex-1">
                <div className="w-10 h-10 bg-warm-white/15 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={18} className="text-warm-white" />
                </div>
                <div>
                  <p className="font-serif text-xl text-warm-white font-semibold leading-snug">
                    Have a money question?
                  </p>
                  <p className="font-sans text-xs text-sage/80 mt-2 leading-relaxed">
                    Ask ConnectHer AI about budgeting, internships, salary negotiation, and more.
                  </p>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  {['How do I negotiate my offer?', 'What is a Roth IRA?', 'How do I start saving?'].map((q) => (
                    <Link
                      key={q}
                      href={`/ask-board?q=${encodeURIComponent(q)}`}
                      className="bg-warm-white/10 hover:bg-warm-white/20 text-sage text-xs font-sans px-3 py-2 rounded-xl transition-colors"
                    >
                      {q}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/ask-board"
                  className="mt-auto bg-muted-gold text-warm-white font-sans text-sm font-semibold py-2.5 rounded-2xl text-center hover:bg-warm-brown transition-colors"
                >
                  Ask ConnectHer AI →
                </Link>
              </div>
            </div>
          </div>

          {/* ── Recent transactions (Plaid mock) ─────────────────────── */}
          <TransactionsList liveCategories={liveCategories} />

        </div>
      </div>
    </AppShell>
  )
}
