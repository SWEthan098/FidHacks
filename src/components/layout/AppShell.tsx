'use client'

import type { ReactNode } from 'react'
import { NavBar } from './NavBar'
import { LeftPanel } from './LeftPanel'
import { RightPanel } from './RightPanel'

interface AppShellProps {
  children: ReactNode
  showRightPanel?: boolean
}

export function AppShell({ children, showRightPanel = true }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <NavBar />
      <div className="flex flex-1 min-h-0">
        <LeftPanel />
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {children}
        </main>
        {showRightPanel && <RightPanel />}
      </div>
    </div>
  )
}
