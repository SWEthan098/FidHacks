import type {
  OnboardingState,
  BoardPin,
  PinType,
  PinColor,
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

const ROTATIONS = [-3, -2, -1, 0, 1, 2, 3]

function makePin(
  sourceId: string,
  type: PinType,
  color: PinColor,
  title: string,
  body: string,
  priority: number,
  index: number,
  options?: { tag?: string; ctaLabel?: string; ctaUrl?: string }
): BoardPin {
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
    ...options,
  }
}

export function generatePersonalizedBoard(state: OnboardingState): BoardPin[] {
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
    const sal = salaries.find((s) =>
      s.industry.toLowerCase().includes(industry.toLowerCase()) ||
      industry.toLowerCase().includes(s.industry.toLowerCase())
    )
    if (sal) {
      add(makePin(sal.id, 'salary_check', 'blue',
        `${sal.role} Pay Range`,
        `Entry-level: $${sal.entryLevel}${sal.entryLevel < 1000 ? '/hr' : '/yr'} · Mid-level: $${sal.midLevel}${sal.midLevel < 1000 ? '/hr' : '/yr'}. ${sal.tip}`,
        10, idx++, { tag: 'Salary' }))
    }
    const step = careerSteps.find((c) =>
      c.industry.some((i) => i.toLowerCase().includes(industry.toLowerCase()) || industry.toLowerCase().includes(i.toLowerCase())) ||
      c.industry.includes('All fields')
    )
    if (step) {
      add(makePin(step.id, 'career_action', 'sage',
        step.title, step.body, 10, idx++, { tag: step.tag }))
    }
  }

  // ── Rule 2: Low confidence → mentor + encouragement (priority 9) ──────────
  if (confidence <= 3) {
    const lowConfMentors = mentorNotes
      .filter((m) => m.targetConfidenceLevels.includes(confidence))
      .slice(0, 3)
    for (const mentor of lowConfMentors) {
      add(makePin(mentor.id, 'mentor_note', 'lavender',
        `From: ${mentor.author}`, mentor.body, 9, idx++, { tag: mentor.tag }))
    }
  }

  // ── Rule 3: Limited support → scholarships + emergency fund (priority 8) ──
  if (limitedSupport || firstGen) {
    const matchScholarships = scholarships
      .filter((s) => !firstGen || s.forFirstGen)
      .slice(0, 2)
    for (const sch of matchScholarships) {
      add(makePin(sch.id, 'opportunity', 'cream',
        sch.title,
        `${sch.body} Amount: ${sch.amount}. Deadline: ${sch.deadline}`,
        8, idx++, { tag: 'Scholarship', ctaLabel: 'Apply', ctaUrl: sch.ctaUrl }))
    }
    const efTip = budgetTips.find((b) => b.category === 'emergency-fund')
    if (efTip) {
      add(makePin(efTip.id, 'money_move', 'yellow',
        efTip.title, efTip.body, 8, idx++, { tag: efTip.tag }))
    }
  }

  // ── Rule 4: High spending categories → purchase pause (priority 7) ────────
  for (const cat of spending.slice(0, 2)) {
    const pause = purchasePauseTips.find((p) =>
      p.category === cat.toLowerCase() ||
      cat.toLowerCase().includes(p.category) ||
      p.category.includes(cat.toLowerCase())
    ) ?? purchasePauseTips[0]
    add(makePin(pause.id, 'purchase_pause', 'rose',
      pause.title, pause.body, 7, idx++, { tag: pause.tag }))
  }

  // ── Rule 5: Women-only opportunities (priority 6) ─────────────────────────
  if (womenOnly) {
    const womenOpps = opportunities.filter((o) => o.womenOnly).slice(0, 3)
    for (const opp of womenOpps) {
      add(makePin(opp.id, 'opportunity', 'cream',
        opp.title, opp.body, 6, idx++,
        { tag: opp.tag, ctaLabel: opp.ctaLabel, ctaUrl: opp.ctaUrl }))
    }
  }

  // ── Rule 6: Community events (priority 5) ────────────────────────────────
  const communityGoalsList = state.community?.communityPostPreferences ?? []
  const matchedEvents = communityEvents
    .filter((e) => communityGoalsList.length === 0 || e.communityGoals.some((g) => communityGoalsList.includes(g)))
    .slice(0, 2)
  for (const ev of matchedEvents) {
    add(makePin(ev.id, 'ask_board', 'sage',
      ev.title, ev.body, 5, idx++, { tag: ev.tag }))
  }

  // ── Rule 7: Backfill to 18 pins (priority 1–4) ───────────────────────────
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
  ]

  for (const [sourceId, type, color, _title, priority] of backfillSources) {
    if (pins.length >= 18) break
    if (usedSourceIds.has(sourceId)) continue
    const entry =
      mentorNotes.find((m) => m.id === sourceId) ||
      budgetTips.find((b) => b.id === sourceId) ||
      careerSteps.find((c) => c.id === sourceId) ||
      opportunities.find((o) => o.id === sourceId) ||
      communityEvents.find((e) => e.id === sourceId)
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
    add(makePin(sourceId, type, color, title, body, priority, idx++, { tag, ctaLabel, ctaUrl }))
  }

  return pins.sort((a, b) => b.priority - a.priority)
}
