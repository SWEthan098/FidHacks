'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { generateBoard } from '@/lib/api'

const MESSAGES = [
  'Analyzing your career goals…',
  'Finding salary insights for your field…',
  'Pinning advice from women ahead of you…',
  'Matching women-only opportunities…',
  'Building your first money moves…',
  'Creating your ConnectHer board…',
]

export default function GenerateBoardPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!state.onboarding.isComplete) {
      router.replace('/onboarding/about')
      return
    }

    // Fast path: animation already seen — generate silently and bounce to /board
    if (state.ui.hasSeenGenAnimation) {
      generateBoard(state.onboarding, state.boardVariant).then((pins) => {
        dispatch({ type: 'SET_BOARD', payload: pins })
        router.replace('/board')
      })
      return
    }

    // Slow path: first time — run the 5-message animation
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= MESSAGES.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 500)

    generateBoard(state.onboarding, state.boardVariant).then((pins) => {
      dispatch({ type: 'SET_BOARD', payload: pins })
    })

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (done && state.board.length > 0) {
      dispatch({ type: 'SET_HAS_SEEN_GEN_ANIMATION' })
      const t = setTimeout(() => router.push('/board'), 800)
      return () => clearTimeout(t)
    }
  }, [done, state.board.length, router, dispatch])

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" stroke="#C39B3A" strokeWidth="1.5"/>
          <path d="M20 6 Q13 13 13 20 Q13 27 20 34 Q27 27 27 20 Q27 13 20 6Z" fill="#DDE3D2" opacity="0.6"/>
          <path d="M17 26 Q19 18 20 12 Q21 18 23 26" stroke="#C39B3A" strokeWidth="1" fill="none"/>
        </svg>
        <div>
          <p className="font-serif text-2xl text-forest font-semibold">ConnectHer</p>
          <p className="font-sans text-[10px] text-warm-brown/60 tracking-widest uppercase">Building your board</p>
        </div>
      </div>

      {/* Animated messages */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {MESSAGES.map((msg, i) => (
          <div
            key={i}
            className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: i < visibleCount ? 1 : 0, transform: i < visibleCount ? 'translateY(0)' : 'translateY(8px)' }}
          >
            {i < visibleCount - 1 ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="#526A49"><path d="M3 8l4 4 6-7"/></svg>
            ) : i === visibleCount - 1 ? (
              <span className="inline-block w-4 h-4 border-2 border-muted-gold border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="w-4 h-4 rounded-full border border-border-beige" />
            )}
            <span className={`font-sans text-sm ${i < visibleCount ? 'text-warm-brown' : 'text-border-beige'}`}>{msg}</span>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-12">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ backgroundColor: i < visibleCount ? '#C39B3A' : '#D7CDBA' }}
          />
        ))}
      </div>
    </div>
  )
}
