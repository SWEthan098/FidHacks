// ── Auth ──────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  createdAt: string
}

// ── Onboarding Profiles ───────────────────────────────────────────────────────
export interface UserProfile {
  firstName: string
  lastName: string
  preferredName: string
  email: string
  school: string
  major: string
  minor: string
  graduationYear: string
  yearInSchool: string
  location: string
  firstGenStudent: string
}

export interface IdentityProfile {
  genderIdentity: string
  raceEthnicity: string[]
  communityIdentities: string[]
}

export interface FinancialProfile {
  familySupportLevel: string
  familyFinancialResponsibility: string
  expensesPaid: string[]
  hasStudentLoans: string
  hasBudget: string
  trackingMethod: string
  topSpendingCategories: string[]
  regretFrequency: string
  savingFrequency: string
  investingStatus: string
  weeklySavingsAbility: string
  financialGoals: string[]
  topFinancialPriorities: string[]
  emergencyFundTarget: string
}

export interface CareerProfile {
  careerInterests: string[]
  careerStage: string
  opportunityTypes: string[]
  careerConcerns: string[]
  negotiationExperience: string
  negotiationConfidence: number
  salaryResearchConfidence: string
  salaryHelpTypes: string[]
  womenOnlyInterest: boolean
  dreamRole: string
  targetSalary: string
}

export interface CommunityProfile {
  mentorPreferences: string[]
  communityPostPreferences: string[]
  wouldPostAnonymously: string
  wantsMentorMatching: string
}

export interface ActivitiesProfile {
  currentActivities: string[]
  hoursWorkedPerWeek: string
  weeklyTimeForGrowth: string
}

export interface OnboardingState {
  user: Partial<UserProfile>
  identity: Partial<IdentityProfile>
  financial: Partial<FinancialProfile>
  career: Partial<CareerProfile>
  community: Partial<CommunityProfile>
  activities: Partial<ActivitiesProfile>
  isComplete: boolean
}

// ── Board Pins ────────────────────────────────────────────────────────────────
export type PinType =
  | 'mentor_note'
  | 'salary_check'
  | 'money_move'
  | 'purchase_pause'
  | 'opportunity'
  | 'ask_board'
  | 'career_action'
  | 'financial_plan'

export type PinColor = 'yellow' | 'sage' | 'blue' | 'cream' | 'rose' | 'lavender'

export interface PinResource {
  label: string
  url: string
}

export interface BoardPin {
  id: string
  type: PinType
  color: PinColor
  rotation: number
  title: string
  body: string
  tag?: string
  ctaLabel?: string
  ctaUrl?: string
  isSaved: boolean
  priority: number
  sourceId: string
  author?: string
  avatarColor?: string
  resources?: PinResource[]
  contactEmail?: string
  isUserCreated?: boolean
}

// ── Mock Data Pool Entries ────────────────────────────────────────────────────
export interface OpportunityEntry {
  id: string
  title: string
  body: string
  tag: string
  ctaLabel: string
  ctaUrl: string
  industry: string[]
  womenOnly: boolean
  deadline?: string
}

export interface SalaryDataEntry {
  id: string
  role: string
  industry: string
  entryLevel: number
  midLevel: number
  tip: string
}

export interface MentorNoteEntry {
  id: string
  body: string
  author: string
  tag: string
  targetConfidenceLevels: number[]
}

export interface ScholarshipEntry {
  id: string
  title: string
  body: string
  amount: string
  deadline: string
  forFirstGen: boolean
  industry: string[]
  ctaUrl: string
}

export interface BudgetTipEntry {
  id: string
  title: string
  body: string
  category: string
  tag: string
}

export interface CareerStepEntry {
  id: string
  title: string
  body: string
  industry: string[]
  tag: string
  timeNeeded: string
}

export interface CommunityEventEntry {
  id: string
  title: string
  body: string
  tag: string
  communityGoals: string[]
}

export interface PurchasePauseTipEntry {
  id: string
  title: string
  body: string
  category: string
  tag: string
}

// ── App State UI ──────────────────────────────────────────────────────────────
export interface AppState {
  user: User | null
  onboarding: OnboardingState
  board: BoardPin[]
  savedPinIds: string[]
  boardVariant: number
  ui: {
    sidebarOpen: boolean
    activePinId: string | null
    boardGenerated: boolean
    hasSeenGenAnimation: boolean
  }
}
