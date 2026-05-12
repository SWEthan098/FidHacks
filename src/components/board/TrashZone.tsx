'use client'

import { Trash2 } from 'lucide-react'

interface TrashZoneProps {
  active: boolean
  onDrop: () => void
}

export function TrashZone({ active, onDrop }: TrashZoneProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        transform: active ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.28s cubic-bezier(0.34,1.1,0.64,1)',
        pointerEvents: active ? 'all' : 'none',
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
      }}
      onDrop={(e) => {
        e.preventDefault()
        onDrop()
      }}
    >
      <div
        className="flex items-center justify-center gap-3 py-10"
        style={{
          background: 'linear-gradient(to top, rgba(38,61,40,0.97), rgba(38,61,40,0.85))',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-2xl px-6 py-3">
          <Trash2 size={18} className="text-warm-white/80" />
          <span className="font-sans text-sm text-warm-white/90 font-medium">Drop here to remove pin</span>
        </div>
      </div>
    </div>
  )
}
