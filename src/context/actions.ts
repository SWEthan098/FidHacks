import type {
  User,
  OnboardingState,
  UserProfile,
  IdentityProfile,
  FinancialProfile,
  CareerProfile,
  CommunityProfile,
  ActivitiesProfile,
  BoardPin,
  AppState,
} from '@/types'

export type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'UPDATE_ONBOARDING_USER'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_ONBOARDING_IDENTITY'; payload: Partial<IdentityProfile> }
  | { type: 'UPDATE_ONBOARDING_FINANCIAL'; payload: Partial<FinancialProfile> }
  | { type: 'UPDATE_ONBOARDING_CAREER'; payload: Partial<CareerProfile> }
  | { type: 'UPDATE_ONBOARDING_COMMUNITY'; payload: Partial<CommunityProfile> }
  | { type: 'UPDATE_ONBOARDING_ACTIVITIES'; payload: Partial<ActivitiesProfile> }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_BOARD'; payload: BoardPin[] }
  | { type: 'SAVE_PIN'; payload: string }
  | { type: 'UNSAVE_PIN'; payload: string }
  | { type: 'OPEN_PIN_MODAL'; payload: string }
  | { type: 'CLOSE_PIN_MODAL' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'LOGOUT' }
  | { type: 'HYDRATE_FROM_STORAGE'; payload: Partial<AppState> }
