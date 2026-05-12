'use client'

import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import type { AppState } from '@/types'
import { reducer, initialState } from './reducer'
import type { AppAction } from './actions'
import { STORAGE_KEYS, loadFromStorage, saveToStorage } from '@/lib/storage'

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    const user = loadFromStorage(STORAGE_KEYS.USER, null)
    const onboarding = loadFromStorage(STORAGE_KEYS.ONBOARDING, initialState.onboarding)
    const board = loadFromStorage(STORAGE_KEYS.BOARD, [])
    const savedPinIds = loadFromStorage(STORAGE_KEYS.SAVED_PINS, [])

    dispatch({
      type: 'HYDRATE_FROM_STORAGE',
      payload: {
        user,
        onboarding,
        board,
        savedPinIds,
        ui: {
          sidebarOpen: true,
          activePinId: null,
          boardGenerated: board.length > 0,
          hasSeenGenAnimation: board.length > 0,
        },
      },
    })
  }, [])

  // Persist to localStorage on state changes (client only)
  useEffect(() => {
    if (state.user) saveToStorage(STORAGE_KEYS.USER, state.user)
  }, [state.user])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ONBOARDING, state.onboarding)
  }, [state.onboarding])

  useEffect(() => {
    if (state.board.length > 0) saveToStorage(STORAGE_KEYS.BOARD, state.board)
  }, [state.board])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SAVED_PINS, state.savedPinIds)
  }, [state.savedPinIds])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
