'use client'

import { useMemo, useState } from 'react'
import { CreditCard, Filter } from 'lucide-react'
import {
  TRANSACTIONS,
  PLAID_ACCOUNT,
  CATEGORY_COLOR,
  type DisplayCategory,
  type PlaidTransaction,
} from '@/data/transactions'

const CATEGORIES: ('All' | DisplayCategory)[] = [
  'All',
  'Food & Dining',
  'Shopping',
  'Transport',
  'Subscriptions',
  'Beauty',
  'Social',
]

// Baseline per-category totals derived from the seed data — used as the
// denominator when rescaling each transaction's amount to match whatever
// total the user has dialed in on the spending card.
const BASELINE_CATEGORY_TOTALS: Record<DisplayCategory, number> = TRANSACTIONS.reduce(
  (acc, t) => {
    acc[t.displayCategory] = (acc[t.displayCategory] ?? 0) + t.amount
    return acc
  },
  {
    'Food & Dining': 0,
    'Shopping': 0,
    'Transport': 0,
    'Subscriptions': 0,
    'Beauty': 0,
    'Social': 0,
  } as Record<DisplayCategory, number>
)

interface LiveCategory {
  label: string
  spent: number
}

/**
 * Rescale every transaction so per-category sums match `liveTotals`.
 *
 * Algorithm (cents-precise to avoid float drift):
 *   1. Group txns by category, preserving original ordering.
 *   2. Scale each txn by (liveTotal / baselineTotal), rounded to the cent.
 *   3. The last txn in each category absorbs the residual so the category
 *      sum is exactly `liveTotal` cents.
 */
function scaleTransactions(
  txns: PlaidTransaction[],
  liveTotals: Record<DisplayCategory, number>
): PlaidTransaction[] {
  // Group while preserving original index for later re-merge
  const grouped = new Map<DisplayCategory, { txn: PlaidTransaction; idx: number }[]>()
  txns.forEach((txn, idx) => {
    const list = grouped.get(txn.displayCategory) ?? []
    list.push({ txn, idx })
    grouped.set(txn.displayCategory, list)
  })

  const scaledByIdx = new Array<PlaidTransaction>(txns.length)

  for (const [cat, items] of grouped) {
    const baselineCents = Math.round((BASELINE_CATEGORY_TOTALS[cat] ?? 0) * 100)
    const targetCents = Math.max(0, Math.round((liveTotals[cat] ?? 0) * 100))

    if (baselineCents === 0) {
      // No baseline — split evenly so list stays populated
      const perItem = items.length > 0 ? Math.floor(targetCents / items.length) : 0
      let remaining = targetCents
      items.forEach(({ txn, idx }, i) => {
        const isLast = i === items.length - 1
        const cents = isLast ? remaining : perItem
        remaining -= cents
        scaledByIdx[idx] = { ...txn, amount: cents / 100 }
      })
      continue
    }

    const ratio = targetCents / baselineCents
    let remaining = targetCents

    items.forEach(({ txn, idx }, i) => {
      const isLast = i === items.length - 1
      let cents: number
      if (isLast) {
        cents = Math.max(0, remaining)
      } else {
        cents = Math.max(0, Math.round(txn.amount * 100 * ratio))
        if (cents > remaining) cents = remaining
        remaining -= cents
      }
      scaledByIdx[idx] = { ...txn, amount: cents / 100 }
    })
  }

  return scaledByIdx
}

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function initials(name: string): string {
  return name
    .replace(/[^a-zA-Z ]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?'
}

function dateLabel(iso: string): string {
  const today = new Date()
  const todayIso = today.toISOString().slice(0, 10)
  const yest = new Date(today)
  yest.setDate(yest.getDate() - 1)
  const yestIso = yest.toISOString().slice(0, 10)
  if (iso === todayIso) return 'Today'
  if (iso === yestIso) return 'Yesterday'
  return formatDate(iso)
}

interface Group {
  date: string
  label: string
  items: PlaidTransaction[]
}

function groupByDate(txns: PlaidTransaction[]): Group[] {
  const map = new Map<string, PlaidTransaction[]>()
  for (const t of txns) {
    if (!map.has(t.date)) map.set(t.date, [])
    map.get(t.date)!.push(t)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1)) // newest first
    .map(([date, items]) => ({ date, label: dateLabel(date), items }))
}

interface TransactionsListProps {
  /** Live category totals from the dashboard (drives transaction rescaling). */
  liveCategories: LiveCategory[]
}

export function TransactionsList({ liveCategories }: TransactionsListProps) {
  const [filter, setFilter] = useState<'All' | DisplayCategory>('All')

  // Build a lookup of category → live target total
  const liveTotalsMap = useMemo(() => {
    const m: Record<DisplayCategory, number> = {
      'Food & Dining': 0,
      'Shopping': 0,
      'Transport': 0,
      'Subscriptions': 0,
      'Beauty': 0,
      'Social': 0,
    }
    for (const c of liveCategories) {
      if (c.label in m) m[c.label as DisplayCategory] = c.spent
    }
    return m
  }, [liveCategories])

  // Rescale every transaction whenever the live totals change
  const scaled = useMemo(
    () => scaleTransactions(TRANSACTIONS, liveTotalsMap),
    [liveTotalsMap]
  )

  const filtered = useMemo(() => {
    return filter === 'All'
      ? scaled
      : scaled.filter((t) => t.displayCategory === filter)
  }, [scaled, filter])

  const groups = useMemo(() => groupByDate(filtered), [filtered])
  const total = useMemo(
    () => filtered.reduce((sum, t) => sum + t.amount, 0),
    [filtered]
  )

  return (
    <div className="bg-warm-white rounded-3xl border border-border-beige p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <CreditCard size={16} className="text-muted-gold" />
            <h3 className="font-serif text-lg text-forest font-semibold">Recent Transactions</h3>
            <span className="ml-1 inline-flex items-center gap-1 bg-sage/40 text-fidelity font-sans text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-fidelity" />
              Linked
            </span>
          </div>
          <p className="font-sans text-xs text-warm-brown/50">
            {PLAID_ACCOUNT.institution} {PLAID_ACCOUNT.name} ····{PLAID_ACCOUNT.mask} · synced via Plaid
          </p>
        </div>
        <div className="text-right">
          <p className="font-sans text-[10px] uppercase tracking-widest text-warm-brown/40 font-semibold">
            {filter === 'All' ? 'Total spent' : `${filter} total`}
          </p>
          <p className="font-serif text-2xl text-forest font-bold tabular-nums">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        <Filter size={12} className="text-warm-brown/40 shrink-0" />
        {CATEGORIES.map((c) => {
          const active = filter === c
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`font-sans text-xs px-3 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-forest text-warm-white font-semibold'
                  : 'bg-cream text-warm-brown/70 hover:bg-soft-beige'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>

      {/* Grouped transaction list */}
      <div className="max-h-[480px] overflow-y-auto -mx-2 px-2">
        {groups.length === 0 ? (
          <p className="font-sans text-sm text-warm-brown/50 italic py-6 text-center">
            No transactions in this category.
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.date} className="mb-3 last:mb-0">
              {/* Date header */}
              <div className="flex items-center gap-2 mb-1.5 sticky top-0 bg-warm-white py-1 z-10">
                <span className="font-sans text-[10px] uppercase tracking-widest text-warm-brown/40 font-semibold">
                  {group.label}
                </span>
                <span className="flex-1 h-px bg-border-beige/50" />
              </div>

              <div className="flex flex-col">
                {group.items.map((t) => {
                  const color = CATEGORY_COLOR[t.displayCategory]
                  return (
                    <div
                      key={t.transaction_id}
                      className="flex items-center gap-3 py-2.5 px-2 -mx-2 rounded-xl hover:bg-cream/60 transition-colors"
                    >
                      {/* Merchant avatar */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs font-bold text-forest shrink-0 border border-black/5"
                        style={{ backgroundColor: color }}
                      >
                        {initials(t.merchant_name)}
                      </div>

                      {/* Merchant + category */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-sm text-forest font-semibold truncate">
                            {t.merchant_name}
                          </span>
                          {t.pending && (
                            <span className="font-sans text-[9px] uppercase tracking-widest text-muted-gold bg-soft-beige px-1.5 py-0.5 rounded-full font-semibold shrink-0">
                              Pending
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-warm-brown/55 font-sans">
                          <span>{t.displayCategory}</span>
                          <span className="text-warm-brown/25">·</span>
                          <span className="truncate">{t.description}</span>
                        </div>
                      </div>

                      {/* Amount */}
                      <span className="font-sans text-sm font-semibold text-warm-brown shrink-0 tabular-nums">
                        −${t.amount.toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer hint */}
      <p className="font-sans text-[10px] text-warm-brown/35 italic mt-3 pt-3 border-t border-border-beige/40">
        Sample data from a simulated Plaid connection · amounts auto-rescale to match your monthly total
      </p>
    </div>
  )
}
