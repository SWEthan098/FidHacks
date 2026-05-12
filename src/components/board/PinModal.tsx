'use client'

import { useEffect } from 'react'
import type { BoardPin, PinColor } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Bookmark, BookmarkCheck, X, ExternalLink, Mail } from 'lucide-react'

const HEADER_BG: Record<PinColor, string> = {
  yellow:   'bg-pin-yellow',
  sage:     'bg-pin-sage',
  blue:     'bg-pin-blue',
  cream:    'bg-pin-cream',
  rose:     'bg-pin-rose',
  lavender: 'bg-pin-lavender',
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
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
      <div
        className="w-full max-w-lg bg-warm-white rounded-3xl overflow-hidden shadow-2xl"
        style={{ animation: 'modal-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
      >
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

          {/* Author in header */}
          {pin.author && (
            <div className="flex items-center gap-2 mt-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-sans font-bold text-forest"
                style={{ backgroundColor: pin.avatarColor ?? '#DDE3D2' }}
              >
                {getInitials(pin.author)}
              </div>
              <span className="font-sans text-xs text-warm-brown/70 font-medium">{pin.author}</span>
              {pin.isUserCreated && (
                <span className="font-sans text-[10px] bg-warm-white/60 text-fidelity px-2 py-0.5 rounded-full font-semibold">Community</span>
              )}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="font-sans text-sm text-warm-brown leading-relaxed">{pin.body}</p>

          {/* Resources section */}
          {pin.resources && pin.resources.length > 0 && (
            <div className="mt-4">
              <p className="font-sans text-xs text-warm-brown/50 uppercase tracking-widest font-semibold mb-2">Resources</p>
              <div className="flex flex-col gap-1.5">
                {pin.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-sans text-sm text-fidelity hover:text-forest transition-colors"
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Contact email */}
          {pin.contactEmail && (
            <div className="mt-3 flex items-center gap-2">
              <Mail size={13} className="text-muted-gold shrink-0" />
              <a
                href={`mailto:${pin.contactEmail}`}
                className="font-sans text-sm text-fidelity hover:text-forest transition-colors"
              >
                {pin.contactEmail}
              </a>
            </div>
          )}
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
