'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { signupUser } from '@/lib/api'
import { useApp } from '@/context/AppContext'

export function SignupCard() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const user = await signupUser({ firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password })
      dispatch({ type: 'SET_USER', payload: user })
      dispatch({ type: 'UPDATE_ONBOARDING_USER', payload: { firstName: form.firstName, lastName: form.lastName, email: form.email } })
      router.push('/onboarding/about')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="font-serif text-2xl text-forest font-semibold mb-1 text-center">Create your account</h2>
      <p className="font-sans text-sm text-warm-brown/60 mb-6 text-center">Start your financial freedom journey</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-sans">{error}</div>
      )}

      <form onSubmit={handleSignup} className="flex flex-col gap-3.5">
        <div className="grid grid-cols-2 gap-3">
          <Input id="firstName" placeholder="First name" value={form.firstName} onChange={set('firstName')} icon={<User size={14} />} />
          <Input id="lastName" placeholder="Last name" value={form.lastName} onChange={set('lastName')} />
        </div>
        <Input id="email" type="email" placeholder="Email address" value={form.email} onChange={set('email')} icon={<Mail size={16} />} autoComplete="email" />
        <Input id="password" type="password" placeholder="Password" value={form.password} onChange={set('password')} icon={<Lock size={16} />} autoComplete="new-password" />
        <Input id="confirm" type="password" placeholder="Confirm password" value={form.confirm} onChange={set('confirm')} icon={<Lock size={16} />} autoComplete="new-password" />

        <Button type="submit" loading={loading} size="lg" className="w-full mt-2">
          Create Account →
        </Button>
      </form>

      <p className="font-sans text-xs text-warm-brown/40 text-center mt-4 leading-relaxed max-w-xs mx-auto">
        Some questions ahead are personal — we use your answers only to personalize your board.
      </p>

      <p className="font-sans text-center text-sm text-warm-brown/60 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-muted-gold hover:text-forest font-medium transition-colors">
          Log in
        </Link>
      </p>
    </div>
  )
}
