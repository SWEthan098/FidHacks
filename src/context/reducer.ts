import type { AppState } from '@/types'
import type { AppAction } from './actions'

export const initialOnboarding: AppState['onboarding'] = {
  user: {},
  identity: {},
  financial: {},
  career: {},
  community: {},
  activities: {},
  isComplete: false,
}

export const initialState: AppState = {
  user: null,
  onboarding: initialOnboarding,
  board: [],
  savedPinIds: [],
  ui: {
    sidebarOpen: true,
    activePinId: null,
    boardGenerated: false,
  },
}

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }

    case 'UPDATE_ONBOARDING_USER':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          user: { ...state.onboarding.user, ...action.payload },
        },
      }

    case 'UPDATE_ONBOARDING_IDENTITY':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          identity: { ...state.onboarding.identity, ...action.payload },
        },
      }

    case 'UPDATE_ONBOARDING_FINANCIAL':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          financial: { ...state.onboarding.financial, ...action.payload },
        },
      }

    case 'UPDATE_ONBOARDING_CAREER':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          career: { ...state.onboarding.career, ...action.payload },
        },
      }

    case 'UPDATE_ONBOARDING_COMMUNITY':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          community: { ...state.onboarding.community, ...action.payload },
        },
      }

    case 'UPDATE_ONBOARDING_ACTIVITIES':
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          activities: { ...state.onboarding.activities, ...action.payload },
        },
      }

    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        onboarding: { ...state.onboarding, isComplete: true },
      }

    case 'SET_BOARD':
      return {
        ...state,
        board: action.payload,
        ui: { ...state.ui, boardGenerated: true },
      }

    case 'SAVE_PIN':
      return {
        ...state,
        savedPinIds: [...state.savedPinIds, action.payload],
        board: state.board.map((p) =>
          p.id === action.payload ? { ...p, isSaved: true } : p
        ),
      }

    case 'UNSAVE_PIN':
      return {
        ...state,
        savedPinIds: state.savedPinIds.filter((id) => id !== action.payload),
        board: state.board.map((p) =>
          p.id === action.payload ? { ...p, isSaved: false } : p
        ),
      }

    case 'OPEN_PIN_MODAL':
      return { ...state, ui: { ...state.ui, activePinId: action.payload } }

    case 'CLOSE_PIN_MODAL':
      return { ...state, ui: { ...state.ui, activePinId: null } }

    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
      }

    case 'LOGOUT':
      return { ...initialState }

    case 'HYDRATE_FROM_STORAGE':
      return { ...state, ...action.payload }

    default:
      return state
  }
}
