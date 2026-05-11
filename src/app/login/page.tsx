import { BotanicalSplash } from '@/components/auth/BotanicalSplash'
import { LoginCard } from '@/components/auth/LoginCard'

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <BotanicalSplash />
      <div className="flex items-center justify-center bg-cream p-6 py-12">
        <LoginCard />
      </div>
    </div>
  )
}
