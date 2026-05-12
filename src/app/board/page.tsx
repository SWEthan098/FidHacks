'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { BoardCanvas } from '@/components/board/BoardCanvas'
import { PinModal } from '@/components/board/PinModal'
import { CreateNoteModal } from '@/components/board/CreateNoteModal'
import { generateBoard } from '@/lib/api'
import { RefreshCw, LayoutDashboard, PlusSquare } from 'lucide-react'
import Link from 'next/link'

export default function BoardPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [showCreate, setShowCreate] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  async function handleRefresh() {
    if (refreshing) return
    setRefreshing(true)
    const nextVariant = (state.boardVariant + 1) % 3
    dispatch({ type: 'CYCLE_BOARD_VARIANT' })
    const pins = await generateBoard(state.onboarding, nextVariant)
    dispatch({ type: 'SET_BOARD', payload: pins })
    setRefreshing(false)
  }

  useEffect(() => {
    if (!state.user) { router.replace('/login'); return }
    if (!state.ui.boardGenerated || state.board.length === 0) {
      router.replace('/generate-board')
    }
  }, [state.user, state.ui.boardGenerated, state.board.length, router])

  const activePinId = state.ui.activePinId
  const activePin   = activePinId ? state.board.find((p) => p.id === activePinId) : null
  const name        = state.onboarding.user?.preferredName ?? state.user?.firstName ?? 'there'

  if (!state.user || state.board.length === 0) return null

  return (
    <AppShell>
      {/* Board header */}
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-3 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-serif text-xl text-forest font-semibold">
            {name}&apos;s Board
          </h1>
          <p className="font-sans text-xs text-warm-brown/50">
            8 pins · click any to expand
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest text-warm-white hover:bg-fidelity text-xs font-sans font-semibold transition-all cursor-pointer"
          >
            <PlusSquare size={12} />
            Add Your Note
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-beige text-warm-brown/60 hover:text-forest hover:border-muted-gold text-xs font-sans transition-all"
          >
            <LayoutDashboard size={12} />
            Dashboard
          </Link>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-beige text-warm-brown/60 hover:text-forest hover:border-muted-gold text-xs font-sans transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
          >
            <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Board canvas */}
      <BoardCanvas
        pins={state.board}
        onPinClick={(id) => dispatch({ type: 'OPEN_PIN_MODAL', payload: id })}
        onRemovePin={(id) => dispatch({ type: 'REMOVE_PIN', payload: id })}
      />

      {/* Pin modal */}
      {activePin && (
        <PinModal
          pin={activePin}
          onClose={() => dispatch({ type: 'CLOSE_PIN_MODAL' })}
          onSave={(id) => dispatch({ type: 'SAVE_PIN', payload: id })}
          onUnsave={(id) => dispatch({ type: 'UNSAVE_PIN', payload: id })}
        />
      )}

      {/* Create note modal */}
      {showCreate && (
        <CreateNoteModal
          authorName={name}
          onClose={() => setShowCreate(false)}
        />
      )}
    </AppShell>
  )
}
