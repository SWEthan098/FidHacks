import { PlantIllustration } from '@/components/auth/BotanicalSplash'
import { LoginCard } from '@/components/auth/LoginCard'
import { AuthDecorations } from '@/components/auth/AuthDecorations'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden">
      <AuthDecorations />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5 mb-6">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="#C39B3A" strokeWidth="1.5"/>
            <path d="M20 6 Q13 13 13 20 Q13 27 20 34 Q27 27 27 20 Q27 13 20 6Z" fill="#DDE3D2" opacity="0.6"/>
            <path d="M17 26 Q19 18 20 12 Q21 18 23 26" stroke="#C39B3A" strokeWidth="1" fill="none"/>
          </svg>
          <span className="font-serif text-2xl text-forest font-semibold">ConnectHer</span>
        </div>

        {/* Tree */}
        <PlantIllustration className="mb-6" />

        {/* Tagline */}
        <h1 className="font-serif text-3xl text-forest font-semibold text-center leading-snug mb-8">
          Your future.<br />
          <em className="text-muted-gold">Your freedom.</em>
        </h1>

        {/* Form */}
        <LoginCard />
      </div>
    </div>
  )
}
