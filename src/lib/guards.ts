'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'

export function useRequireAuth() {
  const { state } = useApp()
  const router = useRouter()
  useEffect(() => {
    if (!state.user) router.replace('/login')
  }, [state.user, router])
  return state.user
}

export function useRequireOnboarding() {
  const { state } = useApp()
  const router = useRouter()
  useEffect(() => {
    if (!state.user) { router.replace('/login'); return }
    if (!state.onboarding.isComplete) router.replace('/onboarding/about')
  }, [state.user, state.onboarding.isComplete, router])
}

export function useRedirectIfAuthed() {
  const { state } = useApp()
  const router = useRouter()
  useEffect(() => {
    if (state.user) {
      router.replace(state.ui.boardGenerated ? '/board' : '/onboarding/about')
    }
  }, [state.user, state.ui.boardGenerated, router])
}
