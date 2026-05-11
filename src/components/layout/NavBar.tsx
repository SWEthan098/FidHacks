'use client'

import Link from 'next/link'
import { Bell, Bookmark, Menu } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export function NavBar() {
  const { state, dispatch } = useApp()
  const name = state.user?.firstName ?? 'Her'
  const savedCount = state.savedPinIds.length

  return (
    <header className="sticky top-0 z-40 bg-warm-white border-b border-border-beige/60 px-4 md:px-6 h-14 flex items-center gap-4">
      {/* Sidebar toggle (mobile) */}
      <button
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
        className="md:hidden p-1.5 text-warm-brown/60 hover:text-forest transition-colors cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {/* Logo */}
      <Link href="/board" className="flex items-center gap-2 mr-auto">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="13" stroke="#C39B3A" strokeWidth="1.2"/>
          <path d="M14 4 Q9 9 9 14 Q9 19 14 24 Q19 19 19 14 Q19 9 14 4Z" fill="#DDE3D2" opacity="0.7"/>
          <path d="M12 18 Q13.5 13 14 9 Q14.5 13 16 18" stroke="#C39B3A" strokeWidth="0.8" fill="none"/>
        </svg>
        <span className="font-serif text-lg text-forest font-semibold hidden sm:block">Her Wealth</span>
      </Link>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        <Link href="/saved-pins" className="relative p-2 text-warm-brown/60 hover:text-forest transition-colors">
          <Bookmark size={18} />
          {savedCount > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-muted-gold rounded-full text-[9px] text-warm-white flex items-center justify-center font-sans font-bold">
              {savedCount}
            </span>
          )}
        </Link>
        <button className="p-2 text-warm-brown/60 hover:text-forest transition-colors cursor-pointer">
          <Bell size={18} />
        </button>
        <Link
          href="/profile"
          className="w-8 h-8 rounded-full bg-fidelity text-warm-white flex items-center justify-center font-serif text-sm font-semibold"
        >
          {name.charAt(0).toUpperCase()}
        </Link>
      </div>
    </header>
  )
}
