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
      router.push('/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="font-serif text-2xl text-forest font-semibold mb-1 text-center">Welcome back</h2>
      <p className="font-sans text-sm text-warm-brown/60 mb-7 text-center">Log in to continue your journey</p>

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

        <Button type="submit" loading={loading} size="lg" className="w-full mt-1">
          Log In →
        </Button>
      </form>

      <p className="font-sans text-center text-sm text-warm-brown/60 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-muted-gold hover:text-forest font-medium transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  )
}
