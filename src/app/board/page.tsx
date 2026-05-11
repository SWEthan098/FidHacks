'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { BoardCanvas } from '@/components/board/BoardCanvas'
import { PinModal } from '@/components/board/PinModal'
import { RefreshCw } from 'lucide-react'

export default function BoardPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  useEffect(() => {
    if (!state.user) { router.replace('/login'); return }
    if (!state.ui.boardGenerated || state.board.length === 0) {
      router.replace('/generate-board')
    }
  }, [state.user, state.ui.boardGenerated, state.board.length, router])

  const activePinId = state.ui.activePinId
  const activePin = activePinId ? state.board.find((p) => p.id === activePinId) : null
  const name = state.user?.firstName ?? 'there'

  if (!state.user || state.board.length === 0) return null

  return (
    <AppShell>
      {/* Board header */}
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl text-forest font-semibold">
            {name}&apos;s Board
          </h1>
          <p className="font-sans text-xs text-warm-brown/50">{state.board.length} pins · personalized for you</p>
        </div>
        <button
          onClick={() => router.push('/generate-board')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border-beige text-warm-brown/60 hover:text-forest hover:border-muted-gold text-xs font-sans transition-all cursor-pointer"
        >
          <RefreshCw size={12} />
          Refresh Board
        </button>
      </div>

      {/* Board canvas */}
      <BoardCanvas
        pins={state.board}
        onPinClick={(id) => dispatch({ type: 'OPEN_PIN_MODAL', payload: id })}
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
    </AppShell>
  )
}
