export interface SpendingCategory {
  label: string
  spent: number
  budget: number
  color: string
}

export interface SpendingAlert {
  id: string
  level: 'critical' | 'warning' | 'info'
  category: string
  message: string
  detail: string
  action: string
}

export const SPENDING_CATEGORIES: SpendingCategory[] = [
  { label: 'Food & Dining', spent: 340, budget: 200, color: '#526A49' },
  { label: 'Shopping',      spent: 180, budget: 150, color: '#C39B3A' },
  { label: 'Transport',     spent: 65,  budget: 80,  color: '#DDE3D2' },
  { label: 'Subscriptions', spent: 47,  budget: 30,  color: '#F4D9D5' },
  { label: 'Beauty',        spent: 90,  budget: 60,  color: '#E8E1F2' },
  { label: 'Social',        spent: 110, budget: 100, color: '#DCEAF6' },
]

export const SPENDING_ALERTS: SpendingAlert[] = [
  {
    id: 'alert_001',
    level: 'critical',
    category: 'Food & Dining',
    message: 'You\'re 70% over your food budget this month.',
    detail: '$340 spent vs. $200 budget — $140 over.',
    action: 'Set a $10/day food limit for the rest of the month to get back on track.',
  },
  {
    id: 'alert_002',
    level: 'warning',
    category: 'Shopping',
    message: 'You\'re nearing your shopping limit.',
    detail: '$180 spent vs. $150 budget — $30 over.',
    action: 'Try a 48-hour cart rule before your next purchase.',
  },
  {
    id: 'alert_003',
    level: 'warning',
    category: 'Subscriptions',
    message: '3 subscriptions detected you may not be using.',
    detail: '$47/month total — $17 above your $30 subscription budget.',
    action: 'Review and cancel unused subscriptions to save ~$200/year.',
  },
  {
    id: 'alert_004',
    level: 'info',
    category: 'Emergency Fund',
    message: 'You\'re 68% toward your $500 emergency fund goal.',
    detail: '$340 saved of $500 target.',
    action: 'Save $20 more this week to hit your goal in 8 days.',
  },
]

export const MONTHLY_STATS = {
  totalSaved: 340,
  savingsGoal: 500,
  totalSpent: 832,
  monthlyBudget: 620,
  goalsActive: 5,
  opportunitiesMatched: 12,
  monthlyChange: { saved: +85, spent: +212 },
}
