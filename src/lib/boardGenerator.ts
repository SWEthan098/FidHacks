import type {
  OnboardingState,
  BoardPin,
  PinType,
  PinColor,
  PinResource,
  MentorNoteEntry,
  SalaryDataEntry,
  OpportunityEntry,
  ScholarshipEntry,
  BudgetTipEntry,
  CareerStepEntry,
  CommunityEventEntry,
  PurchasePauseTipEntry,
} from '@/types'

import mentorNotesData from '@/data/mentorNotes.json'
import salaryData from '@/data/salaryData.json'
import opportunitiesData from '@/data/opportunities.json'
import scholarshipsData from '@/data/scholarships.json'
import budgetTipsData from '@/data/budgetTips.json'
import careerStepsData from '@/data/careerSteps.json'
import communityEventsData from '@/data/communityEvents.json'
import purchasePauseTipsData from '@/data/purchasePauseTips.json'

const mentorNotes = mentorNotesData as MentorNoteEntry[]
const salaries = salaryData as SalaryDataEntry[]
const opportunities = opportunitiesData as OpportunityEntry[]
const scholarships = scholarshipsData as ScholarshipEntry[]
const budgetTips = budgetTipsData as BudgetTipEntry[]
const careerSteps = careerStepsData as CareerStepEntry[]
const communityEvents = communityEventsData as CommunityEventEntry[]
const purchasePauseTips = purchasePauseTipsData as PurchasePauseTipEntry[]

// Wider rotations for a more scattered corkboard look
const ROTATIONS = [-6, -4, -3, -1, 0, 1, 3, 4, 6]

const MEMBERS = [
  { name: 'Sofia Chen',      color: '#DDE8D4', email: 'sofia.c@connecther.co' },
  { name: 'Maya Williams',   color: '#F4D9D5', email: 'maya.w@connecther.co' },
  { name: 'Priya Patel',     color: '#DCEAF6', email: 'priya.p@connecther.co' },
  { name: 'Jordan Lee',      color: '#E8E1F2', email: 'jordan.l@connecther.co' },
  { name: 'Aisha Johnson',   color: '#FFF3B0', email: 'aisha.j@connecther.co' },
  { name: 'Emma Rodriguez',  color: '#FDF8ED', email: 'emma.r@connecther.co' },
  { name: 'Zoe Kim',         color: '#DDE8D4', email: 'zoe.k@connecther.co' },
  { name: 'Nina Okafor',     color: '#F4D9D5', email: 'nina.o@connecther.co' },
]

const RESOURCES_BY_TYPE: Record<PinType, PinResource[]> = {
  salary_check: [
    { label: 'Levels.fyi — real salary data', url: 'https://www.levels.fyi' },
    { label: 'LinkedIn Salary Insights', url: 'https://www.linkedin.com/salary' },
    { label: 'Glassdoor Salaries', url: 'https://www.glassdoor.com/Salaries' },
  ],
  mentor_note: [
    { label: 'Her First $100K', url: 'https://www.herfirst100k.com' },
    { label: 'Ellevest Community', url: 'https://www.ellevest.com' },
  ],
  money_move: [
    { label: 'NerdWallet — Personal Finance', url: 'https://www.nerdwallet.com' },
    { label: 'Investopedia Basics', url: 'https://www.investopedia.com/personal-finance-4427765' },
  ],
  purchase_pause: [
    { label: 'YNAB — You Need a Budget', url: 'https://www.youneedabudget.com' },
    { label: 'Mint Budgeting App', url: 'https://mint.intuit.com' },
  ],
  opportunity: [
    { label: 'Handshake — Student Jobs & Internships', url: 'https://joinhandshake.com' },
    { label: 'Her Campus Opportunities', url: 'https://www.hercampus.com/career' },
  ],
  career_action: [
    { label: 'Handshake', url: 'https://joinhandshake.com' },
    { label: 'LinkedIn Career Explorer', url: 'https://linkedin.com/career-advice' },
    { label: 'Big Interview — Interview Prep', url: 'https://biginterview.com' },
  ],
  ask_board: [
    { label: 'ConnectHer Community Forum', url: '#community' },
    { label: 'Ellevate Network', url: 'https://www.ellevatenetwork.com' },
  ],
  financial_plan: [
    { label: 'StudentAid.gov — Federal Loans', url: 'https://studentaid.gov' },
    { label: 'Fidelity Youth Account', url: 'https://www.fidelity.com/go/youth-account/overview' },
  ],
}

function getMember(index: number) {
  return MEMBERS[index % MEMBERS.length]
}

// Pick from a pool using variant as an offset — cycles through different items on refresh
function pick<T>(pool: T[], variant: number, baseIndex = 0): T | undefined {
  if (pool.length === 0) return undefined
  return pool[(baseIndex + variant) % pool.length]
}

function pickSlice<T>(pool: T[], count: number, variant: number): T[] {
  if (pool.length === 0) return []
  const start = (variant * Math.max(1, Math.ceil(count / 2))) % pool.length
  // Wrap around if needed
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    result.push(pool[(start + i) % pool.length])
  }
  return result
}

function makePin(
  sourceId: string,
  type: PinType,
  color: PinColor,
  title: string,
  body: string,
  priority: number,
  index: number,
  options?: {
    tag?: string
    ctaLabel?: string
    ctaUrl?: string
    author?: string
    avatarColor?: string
    contactEmail?: string
    resources?: PinResource[]
  }
): BoardPin {
  const member = getMember(index)
  return {
    id: `pin_${sourceId}_${index}`,
    type,
    color,
    rotation: ROTATIONS[index % ROTATIONS.length],
    title,
    body,
    priority,
    sourceId,
    isSaved: false,
    author: options?.author ?? member.name,
    avatarColor: options?.avatarColor ?? member.color,
    contactEmail: options?.contactEmail ?? member.email,
    resources: options?.resources ?? RESOURCES_BY_TYPE[type],
    tag: options?.tag,
    ctaLabel: options?.ctaLabel,
    ctaUrl: options?.ctaUrl,
  }
}

export function generatePersonalizedBoard(state: OnboardingState, variant = 0): BoardPin[] {
  const pins: BoardPin[] = []
  let idx = 0
  const usedSourceIds = new Set<string>()

  const add = (pin: BoardPin) => {
    if (!usedSourceIds.has(pin.sourceId)) {
      pins.push(pin)
      usedSourceIds.add(pin.sourceId)
    }
  }

  const career = state.career ?? {}
  const financial = state.financial ?? {}
  const identity = state.identity ?? {}
  const user = state.user ?? {}
  const confidence = career.negotiationConfidence ?? 3
  const interests = career.careerInterests ?? []
  const spending = financial.topSpendingCategories ?? []
  const womenOnly = career.womenOnlyInterest ?? false
  const firstGen = (user as { firstGenStudent?: string }).firstGenStudent === 'yes' || identity.communityIdentities?.includes('First-generation college student')
  const limitedSupport = financial.familySupportLevel === 'no_support' || financial.familySupportLevel === 'limited'

  // ── Rule 1: Salary + career step pins per industry (priority 10) ──────────
  const matchedIndustries = interests.length > 0 ? interests : ['Technology']
  for (const industry of matchedIndustries.slice(0, 3)) {
    const allSalMatches = salaries.filter((s) =>
      s.industry.toLowerCase().includes(industry.toLowerCase()) ||
      industry.toLowerCase().includes(s.industry.toLowerCase())
    )
    const sal = pick(allSalMatches, variant)
    if (sal) {
      add(makePin(sal.id, 'salary_check', 'blue',
        `${sal.role} Pay Range`,
        `Entry-level: $${sal.entryLevel}${sal.entryLevel < 1000 ? '/hr' : '/yr'} · Mid-level: $${sal.midLevel}${sal.midLevel < 1000 ? '/hr' : '/yr'}. ${sal.tip}`,
        10, idx++, { tag: 'Salary' }))
    }
    const allStepMatches = careerSteps.filter((c) =>
      c.industry.some((i) => i.toLowerCase().includes(industry.toLowerCase()) || industry.toLowerCase().includes(i.toLowerCase())) ||
      c.industry.includes('All fields')
    )
    const step = pick(allStepMatches, variant)
    if (step) {
      add(makePin(step.id, 'career_action', 'sage',
        step.title, step.body, 10, idx++, { tag: step.tag }))
    }
  }

  // ── Rule 2: Low confidence → mentor + encouragement (priority 9) ──────────
  if (confidence <= 3) {
    const lowConfPool = mentorNotes.filter((m) => m.targetConfidenceLevels.includes(confidence))
    const lowConfMentors = pickSlice(lowConfPool, 3, variant)
    for (const mentor of lowConfMentors) {
      add(makePin(mentor.id, 'mentor_note', 'lavender',
        `From: ${mentor.author}`, mentor.body, 9, idx++,
        { tag: mentor.tag, author: mentor.author, avatarColor: getMember(idx).color, contactEmail: getMember(idx).email }))
    }
  }

  // ── Rule 3: Limited support → scholarships + emergency fund (priority 8) ──
  if (limitedSupport || firstGen) {
    const schPool = scholarships.filter((s) => !firstGen || s.forFirstGen)
    const matchScholarships = pickSlice(schPool, 2, variant)
    for (const sch of matchScholarships) {
      add(makePin(sch.id, 'opportunity', 'cream',
        sch.title,
        `${sch.body} Amount: ${sch.amount}. Deadline: ${sch.deadline}`,
        8, idx++, { tag: 'Scholarship', ctaLabel: 'Apply', ctaUrl: sch.ctaUrl }))
    }
    const efPool = budgetTips.filter((b) => b.category === 'emergency-fund')
    const efTip = pick(efPool, variant) ?? budgetTips[variant % budgetTips.length]
    if (efTip) {
      add(makePin(efTip.id, 'money_move', 'yellow',
        efTip.title, efTip.body, 8, idx++, { tag: efTip.tag }))
    }
  }

  // ── Rule 4: High spending categories → purchase pause (priority 7) ────────
  for (const cat of spending.slice(0, 2)) {
    const pausePool = purchasePauseTips.filter((p) =>
      p.category === cat.toLowerCase() ||
      cat.toLowerCase().includes(p.category) ||
      p.category.includes(cat.toLowerCase())
    )
    const pause = pick(pausePool, variant) ?? purchasePauseTips[variant % purchasePauseTips.length]
    if (pause) {
      add(makePin(pause.id, 'purchase_pause', 'rose',
        pause.title, pause.body, 7, idx++, { tag: pause.tag }))
    }
  }

  // ── Rule 5: Women-only opportunities (priority 6) ─────────────────────────
  if (womenOnly) {
    const womenPool = opportunities.filter((o) => o.womenOnly)
    const womenOpps = pickSlice(womenPool, 3, variant)
    for (const opp of womenOpps) {
      add(makePin(opp.id, 'opportunity', 'cream',
        opp.title, opp.body, 6, idx++,
        { tag: opp.tag, ctaLabel: opp.ctaLabel, ctaUrl: opp.ctaUrl }))
    }
  }

  // ── Rule 6: Community events (priority 5) ────────────────────────────────
  const communityGoalsList = state.community?.communityPostPreferences ?? []
  const evPool = communityEvents.filter((e) =>
    communityGoalsList.length === 0 || e.communityGoals.some((g) => communityGoalsList.includes(g))
  )
  const matchedEvents = pickSlice(evPool, 2, variant)
  for (const ev of matchedEvents) {
    add(makePin(ev.id, 'ask_board', 'sage',
      ev.title, ev.body, 5, idx++, { tag: ev.tag }))
  }

  // ── Rule 7: Backfill to 12 pins (priority 1–4) ───────────────────────────
  const backfillSources: Array<[string, PinType, PinColor, string, number]> = [
    ...mentorNotes.map((m): [string, PinType, PinColor, string, number] =>
      [m.id, 'mentor_note', 'lavender', `From: ${m.author}`, 4]),
    ...budgetTips.map((b): [string, PinType, PinColor, string, number] =>
      [b.id, 'money_move', 'yellow', b.title, 3]),
    ...careerSteps.map((c): [string, PinType, PinColor, string, number] =>
      [c.id, 'career_action', 'sage', c.title, 2]),
    ...opportunities.map((o): [string, PinType, PinColor, string, number] =>
      [o.id, 'opportunity', 'cream', o.title, 1]),
    ...communityEvents.map((e): [string, PinType, PinColor, string, number] =>
      [e.id, 'ask_board', 'blue', e.title, 1]),
    ...purchasePauseTips.map((p): [string, PinType, PinColor, string, number] =>
      [p.id, 'purchase_pause', 'rose', p.title, 1]),
    ...scholarships.map((s): [string, PinType, PinColor, string, number] =>
      [s.id, 'financial_plan', 'cream', s.title, 1]),
  ]

  // Rotate the backfill order based on variant so different content surfaces
  const rotatedBackfill = [
    ...backfillSources.slice(variant * 3),
    ...backfillSources.slice(0, variant * 3),
  ]

  for (const [sourceId, type, color, , priority] of rotatedBackfill) {
    if (pins.length >= 12) break
    if (usedSourceIds.has(sourceId)) continue
    const entry =
      mentorNotes.find((m) => m.id === sourceId) ||
      budgetTips.find((b) => b.id === sourceId) ||
      careerSteps.find((c) => c.id === sourceId) ||
      opportunities.find((o) => o.id === sourceId) ||
      communityEvents.find((e) => e.id === sourceId) ||
      purchasePauseTips.find((p) => p.id === sourceId) ||
      scholarships.find((s) => s.id === sourceId)
    if (!entry) continue
    const title = type === 'mentor_note'
      ? `From: ${(entry as MentorNoteEntry).author}`
      : (entry as { title: string }).title
    const body = type === 'mentor_note'
      ? (entry as MentorNoteEntry).body
      : (entry as { body: string }).body
    const tag = (entry as { tag?: string }).tag
    const ctaLabel = (entry as OpportunityEntry).ctaLabel
    const ctaUrl = (entry as OpportunityEntry).ctaUrl
    const mentor = type === 'mentor_note' ? (entry as MentorNoteEntry).author : undefined
    add(makePin(sourceId, type, color, title, body, priority, idx++, {
      tag,
      ctaLabel,
      ctaUrl,
      author: mentor,
    }))
  }

  return pins.sort((a, b) => b.priority - a.priority).slice(0, 12)
}
