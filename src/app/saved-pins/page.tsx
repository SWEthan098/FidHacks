'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { PinGrid } from '@/components/board/PinGrid'
import { PinModal } from '@/components/board/PinModal'
import { Bookmark } from 'lucide-react'

export default function SavedPinsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  useEffect(() => {
    if (!state.user) router.replace('/login')
  }, [state.user, router])

  const savedPins = state.board.filter((p) => state.savedPinIds.includes(p.id))
  const activePin = state.ui.activePinId ? state.board.find((p) => p.id === state.ui.activePinId) : null

  if (!state.user) return null

  return (
    <AppShell showRightPanel={false}>
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-3">
        <div className="flex items-center gap-2">
          <Bookmark size={16} className="text-muted-gold" />
          <h1 className="font-serif text-xl text-forest font-semibold">Saved Pins</h1>
        </div>
        <p className="font-sans text-xs text-warm-brown/50 mt-0.5">{savedPins.length} saved</p>
      </div>

      {savedPins.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-soft-beige flex items-center justify-center">
            <Bookmark size={24} className="text-border-beige" />
          </div>
          <h3 className="font-serif text-2xl text-forest">No saved pins yet.</h3>
          <p className="font-sans text-sm text-warm-brown/60 max-w-xs">
            Click any pin on your board and tap &ldquo;Save Pin&rdquo; to collect ideas here.
          </p>
          <button
            onClick={() => router.push('/board')}
            className="text-sm text-fidelity hover:text-forest font-sans font-medium underline-offset-2 hover:underline cursor-pointer"
          >
            Go to my board →
          </button>
        </div>
      ) : (
        <div
          className="flex-1 overflow-y-auto"
          style={{ background: 'linear-gradient(135deg, #EFE6D6 0%, #E8DDD0 100%)' }}
        >
          <PinGrid
            pins={savedPins}
            onPinClick={(id) => dispatch({ type: 'OPEN_PIN_MODAL', payload: id })}
            onRemovePin={(id) => dispatch({ type: 'REMOVE_PIN', payload: id })}
          />
        </div>
      )}

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
