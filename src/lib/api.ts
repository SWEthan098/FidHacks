import type { User, OnboardingState, BoardPin } from '@/types'
import { generatePersonalizedBoard } from './boardGenerator'

// Mock delay to simulate network
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function loginUser(email: string, _password: string): Promise<User> {
  await delay(400)
  const name = email.split('@')[0]
  return {
    id: `user_${Date.now()}`,
    email,
    firstName: name.charAt(0).toUpperCase() + name.slice(1),
    lastName: '',
    createdAt: new Date().toISOString(),
  }
}

export async function signupUser(data: {
  firstName: string
  lastName: string
  email: string
  password: string
}): Promise<User> {
  await delay(500)
  return {
    id: `user_${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    createdAt: new Date().toISOString(),
  }
}

export async function generateBoard(onboarding: OnboardingState, variant = 0): Promise<BoardPin[]> {
  await delay(100)
  return generatePersonalizedBoard(onboarding, variant)
}

export async function savePin(_pinId: string): Promise<void> {
  await delay(100)
}

export async function unsavePin(_pinId: string): Promise<void> {
  await delay(100)
}

export async function submitAskBoard(
  message: string,
  history: { role: string; text: string }[] = []
): Promise<string> {
  try {
    const res = await fetch('/api/ask-board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    })
    const data = await res.json()
    return data.reply ?? "I'm not sure — try rephrasing your question."
  } catch {
    return "I'm having trouble connecting right now. Please try again in a moment."
  }
}
