'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, PieChart, Bookmark, MessageSquare, User, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'

const NAV = [
  { href: '/dashboard',  label: 'Dashboard',  icon: PieChart },
  { href: '/board',      label: 'My Board',   icon: LayoutDashboard },
  { href: '/saved-pins', label: 'Saved Pins', icon: Bookmark },
  { href: '/ask-board',  label: 'Ask ConnectHer AI',  icon: MessageSquare },
  { href: '/profile',    label: 'Profile',    icon: User },
]

export function LeftPanel() {
  const pathname = usePathname()
  const { state } = useApp()

  if (!state.ui.sidebarOpen) return null

  return (
    <aside className="hidden md:flex flex-col w-52 shrink-0 bg-warm-white border-r border-border-beige/60 py-6 px-3">
      {/* Nav links */}
      <nav className="flex flex-col gap-1">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm transition-all',
              pathname === href
                ? 'bg-sage text-forest font-semibold'
                : 'text-warm-brown/70 hover:bg-soft-beige hover:text-forest'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Career goal snapshot */}
      {state.onboarding.career?.careerInterests && state.onboarding.career.careerInterests.length > 0 && (
        <div className="mt-auto pt-4 border-t border-border-beige/60">
          <p className="font-sans text-[10px] text-warm-brown/40 uppercase tracking-widest mb-2 px-3">Your Focus</p>
          <div className="px-3 flex flex-col gap-1">
            {state.onboarding.career.careerInterests.slice(0, 3).map((interest) => (
              <div key={interest} className="flex items-center gap-2">
                <Star size={10} className="text-muted-gold" />
                <span className="font-sans text-xs text-warm-brown">{interest}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
