'use client'

import { useEffect, useState } from 'react'
import { X, Plus, Trash2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { PinColor } from '@/types'

const COLORS: { value: PinColor; label: string; bg: string }[] = [
  { value: 'yellow',   label: 'Yellow',   bg: '#FFF3B0' },
  { value: 'sage',     label: 'Sage',     bg: '#DDE8D4' },
  { value: 'blue',     label: 'Blue',     bg: '#DCEAF6' },
  { value: 'rose',     label: 'Rose',     bg: '#F4D9D5' },
  { value: 'lavender', label: 'Lavender', bg: '#E8E1F2' },
  { value: 'cream',    label: 'Cream',    bg: '#FDF8ED' },
]

interface CreateNoteModalProps {
  authorName: string
  onClose: () => void
}

export function CreateNoteModal({ authorName, onClose }: CreateNoteModalProps) {
  const [step, setStep] = useState<'form' | 'thanks'>('form')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [color, setColor] = useState<PinColor>('yellow')
  const [contactEmail, setContactEmail] = useState('')
  const [resources, setResources] = useState<{ label: string; url: string }[]>([{ label: '', url: '' }])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function addResource() {
    setResources((r) => [...r, { label: '', url: '' }])
  }

  function removeResource(i: number) {
    setResources((r) => r.filter((_, idx) => idx !== i))
  }

  function updateResource(i: number, field: 'label' | 'url', val: string) {
    setResources((r) => r.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }

  function handleSubmit() {
    if (!title.trim() || !body.trim()) return
    setStep('thanks')
  }

  if (step === 'thanks') {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-brown/40 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className="w-full max-w-md bg-warm-white rounded-3xl p-10 text-center shadow-2xl"
          style={{ animation: 'modal-pop 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-forest" />
          </div>
          <h3 className="font-serif text-2xl text-forest font-semibold mb-2">Thank you for sharing!</h3>
          <p className="font-sans text-sm text-warm-brown/70 leading-relaxed mb-6">
            Your note has been shared with the ConnectHer community. It will appear on boards of women with similar goals and aspirations — you&apos;re helping someone you haven&apos;t met yet.
          </p>
          <Button onClick={onClose} variant="primary" size="md">Back to Board</Button>
        </div>
      </div>
    )
  }

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
        <div className="bg-forest px-6 pt-7 pb-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-warm-white/15 hover:bg-warm-white/25 transition-colors cursor-pointer"
          >
            <X size={16} className="text-warm-white" />
          </button>
          <p className="font-sans text-xs text-sage/70 uppercase tracking-widest mb-1">Share Your Experience</p>
          <h3 className="font-serif text-2xl text-warm-white font-semibold">Add a sticky note</h3>
          <p className="font-sans text-xs text-sage/80 mt-1">Your story helps other women in ConnectHer.</p>
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {/* Color picker */}
          <div>
            <p className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest font-semibold mb-2">Note Color</p>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className="w-8 h-8 rounded-full border-2 transition-all cursor-pointer"
                  style={{
                    backgroundColor: c.bg,
                    borderColor: color === c.value ? '#263D28' : 'transparent',
                    transform: color === c.value ? 'scale(1.15)' : 'scale(1)',
                  }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest font-semibold mb-1.5 block">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How I landed my first internship"
              className="w-full bg-cream border border-border-beige rounded-xl px-4 py-2.5 font-sans text-sm text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors"
            />
          </div>

          {/* Body */}
          <div>
            <label className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest font-semibold mb-1.5 block">
              What happened / what you did <span className="text-red-400">*</span>
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your experience, tips, or advice in a few sentences..."
              rows={3}
              className="w-full bg-cream border border-border-beige rounded-xl px-4 py-2.5 font-sans text-sm text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors resize-none"
            />
          </div>

          {/* Resources */}
          <div>
            <p className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest font-semibold mb-2">
              Resources <span className="text-warm-brown/30 normal-case tracking-normal">(optional)</span>
            </p>
            <div className="flex flex-col gap-2">
              {resources.map((r, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={r.label}
                    onChange={(e) => updateResource(i, 'label', e.target.value)}
                    placeholder="Label (e.g. Handshake)"
                    className="flex-1 bg-cream border border-border-beige rounded-lg px-3 py-2 font-sans text-xs text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors"
                  />
                  <input
                    value={r.url}
                    onChange={(e) => updateResource(i, 'url', e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-cream border border-border-beige rounded-lg px-3 py-2 font-sans text-xs text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors"
                  />
                  <button
                    onClick={() => removeResource(i)}
                    className="p-1.5 text-warm-brown/30 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button
                onClick={addResource}
                className="flex items-center gap-1.5 text-xs font-sans text-fidelity hover:text-forest transition-colors cursor-pointer mt-1"
              >
                <Plus size={13} />
                Add resource
              </button>
            </div>
          </div>

          {/* Contact email */}
          <div>
            <label className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest font-semibold mb-1.5 block">
              Contact email <span className="text-warm-brown/30 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="yourname@email.com"
              type="email"
              className="w-full bg-cream border border-border-beige rounded-xl px-4 py-2.5 font-sans text-sm text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 pt-2 flex items-center gap-3 border-t border-border-beige/50">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="md"
            disabled={!title.trim() || !body.trim()}
          >
            Share with the community
          </Button>
          <button
            onClick={onClose}
            className="font-sans text-sm text-warm-brown/50 hover:text-warm-brown transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
