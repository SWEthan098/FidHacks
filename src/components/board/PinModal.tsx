'use client'

import { useEffect } from 'react'
import type { BoardPin, PinColor } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Bookmark, BookmarkCheck, X, ExternalLink } from 'lucide-react'

const HEADER_BG: Record<PinColor, string> = {
  yellow:   'bg-pin-yellow',
  sage:     'bg-pin-sage',
  blue:     'bg-pin-blue',
  cream:    'bg-pin-cream',
  rose:     'bg-pin-rose',
  lavender: 'bg-pin-lavender',
}

interface PinModalProps {
  pin: BoardPin
  onClose: () => void
  onSave: (pinId: string) => void
  onUnsave: (pinId: string) => void
}

export function PinModal({ pin, onClose, onSave, onUnsave }: PinModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-brown/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg bg-warm-white rounded-3xl overflow-hidden shadow-2xl animate-fade-in">
        {/* Header */}
        <div className={`${HEADER_BG[pin.color]} px-6 pt-8 pb-5 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-warm-white/60 hover:bg-warm-white transition-colors cursor-pointer"
          >
            <X size={16} className="text-warm-brown" />
          </button>
          {pin.tag && <Badge label={pin.tag} variant="gold" className="mb-3" />}
          <h3 className="font-serif text-2xl text-forest font-semibold leading-snug">{pin.title}</h3>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="font-sans text-sm text-warm-brown leading-relaxed">{pin.body}</p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex items-center gap-3 flex-wrap">
          {pin.ctaLabel && pin.ctaUrl && (
            <a href={pin.ctaUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="sm" className="gap-1.5">
                <ExternalLink size={13} />
                {pin.ctaLabel}
              </Button>
            </a>
          )}
          <button
            onClick={() => pin.isSaved ? onUnsave(pin.id) : onSave(pin.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-muted-gold text-muted-gold hover:bg-soft-beige transition-all text-sm font-sans font-medium cursor-pointer"
          >
            {pin.isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {pin.isSaved ? 'Saved' : 'Save Pin'}
          </button>
          <button
            onClick={onClose}
            className="ml-auto text-xs text-warm-brown/50 hover:text-warm-brown font-sans cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
