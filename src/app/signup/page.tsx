import { BotanicalSplash } from '@/components/auth/BotanicalSplash'
import { SignupCard } from '@/components/auth/SignupCard'

export default function SignupPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <BotanicalSplash />
      <div className="flex items-center justify-center bg-cream p-6 py-12">
        <SignupCard />
      </div>
    </div>
  )
}
