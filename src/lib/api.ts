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

export async function generateBoard(onboarding: OnboardingState): Promise<BoardPin[]> {
  await delay(100)
  return generatePersonalizedBoard(onboarding)
}

export async function savePin(_pinId: string): Promise<void> {
  await delay(100)
}

export async function unsavePin(_pinId: string): Promise<void> {
  await delay(100)
}

const ASK_REPLIES: Record<string, string> = {
  negotiate: 'Start by researching market rates on Levels.fyi or LinkedIn Salary. Then say: "I\'m excited about this role. Based on my research, I was hoping we could discuss getting closer to $X." Let them respond first.',
  internship: 'Look on Handshake, LinkedIn, and company career pages. Apply even if you only meet 60% of requirements — that\'s the secret most applicants don\'t know.',
  salary: 'For software internships, expect $25–$45/hr at major tech companies. Finance internships range $20–$35/hr. Always ask if compensation isn\'t listed upfront.',
  budget: 'Try the 50/30/20 rule: 50% needs, 30% wants, 20% savings. For students, adjust to 60/20/20 and track with a simple notes app.',
  invest: 'Start with a Roth IRA if you have earned income. You can contribute up to $7,000/year and the growth is tax-free. Fidelity and Schwab both have no minimum to open one.',
  loan: 'Know the difference between subsidized and unsubsidized loans. Subsidized loans don\'t accrue interest while you\'re in school — prioritize paying those last.',
  default: 'That\'s a great question. My advice: start with the basics, take one small action this week, and build momentum. You\'re already ahead by asking.',
}

export async function submitAskBoard(message: string): Promise<string> {
  await delay(800)
  const lower = message.toLowerCase()
  for (const [key, reply] of Object.entries(ASK_REPLIES)) {
    if (key !== 'default' && lower.includes(key)) return reply
  }
  return ASK_REPLIES.default
}
