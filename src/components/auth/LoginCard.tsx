'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { loginUser } from '@/lib/api'
import { useApp } from '@/context/AppContext'

export function LoginCard() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setError('')
    try {
      const user = await loginUser(email, password)
      dispatch({ type: 'SET_USER', payload: user })
      router.push('/onboarding/about')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto bg-warm-white rounded-3xl p-8 lg:p-10 shadow-card border border-border-beige/50">
      {/* Header stars */}
      <div className="flex justify-between mb-6 text-muted-gold">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l1.8 5.4L16 8l-6.2 2.6L8 16l-1.8-5.4L0 8l6.2-2.6z"/></svg>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0l1 3.1L9.5 5l-3.5 1.9L5 10l-1-3.1L0 5l3.5-1.9z"/></svg>
      </div>

      <h2 className="font-serif text-3xl text-forest font-semibold mb-1">Welcome to Her Wealth</h2>
      <p className="font-sans text-sm text-warm-brown/70 mb-7">Log in to continue your journey</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-sans">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={16} />}
          autoComplete="email"
        />
        <div className="relative">
          <Input
            id="password"
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={16} />}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-border-beige hover:text-muted-gold transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="text-right">
          <Link href="/login" className="font-sans text-xs text-muted-gold hover:text-forest transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} size="lg" className="w-full mt-1">
          Log In →
        </Button>
      </form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-border-beige" />
        <span className="font-sans text-xs text-border-beige">or</span>
        <div className="flex-1 h-px bg-border-beige" />
      </div>

      <Link href="/signup">
        <button className="w-full flex items-center justify-between border border-muted-gold rounded-2xl px-6 py-3.5 font-sans font-medium text-forest hover:bg-soft-beige transition-all duration-150 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C6.686 2 4 4.686 4 8s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" fill="#C39B3A" opacity="0.3"/>
            <path d="M10 2 Q8 5 8 8 Q8 11 10 14 Q12 11 12 8 Q12 5 10 2Z" fill="#C39B3A"/>
          </svg>
          Sign Up
          <span>→</span>
        </button>
      </Link>

      <p className="font-serif text-center text-sm text-warm-brown/50 mt-6 italic">
        Together, let&apos;s build <em className="text-muted-gold not-italic">your</em> tomorrow.
      </p>
    </div>
  )
}
