import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `You are ConnectHer's financial advisor AI — a warm, supportive guide for first-year college women navigating money, salary, and career decisions for the first time.

Keep every response:
- Under 120 words
- Practical and specific (give a number, a script, or a concrete first step)
- Warm and nonjudgmental — never shame-based
- Relevant to college students (campus jobs, internships, student loans, budgeting on a limited income)

Topics you cover: budgeting, salary negotiation, internships, scholarships, student loans, investing basics (Roth IRA, index funds), credit scores, emergency funds, overspending patterns, career planning.

Never give professional legal or tax advice — add "check with a financial advisor for your specific situation" only when the question requires it.`

const FALLBACKS: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['negotiate', 'negotiat', 'offer'],
    reply: "Research the market rate on Levels.fyi or LinkedIn Salary first. Then say: \"I'm excited about this role. Based on my research, I was hoping we could discuss getting closer to $X.\" Pause and let them respond — the first person to speak after that loses leverage.",
  },
  {
    keywords: ['internship', 'intern', 'apply'],
    reply: "Apply even if you only meet 60% of the requirements — that's the industry secret. Use Handshake, LinkedIn, and company career pages. Send 5 applications this week. Volume beats perfection at the internship stage.",
  },
  {
    keywords: ['save', 'saving', 'emergency fund'],
    reply: "Start with $10/week — that's $520/year and a fully funded emergency fund in under a year. Automate the transfer the day after payday so you never see it. Build to $500 first before any investing.",
  },
  {
    keywords: ['budget', 'spending', 'overspend', 'track'],
    reply: "Don't budget yet — just track for 7 days first. Write down every purchase with no judgment. Once you see the pattern, one category will stand out. That's where you make your first cut.",
  },
  {
    keywords: ['invest', 'roth', 'ira', 'stock', 'index'],
    reply: "Open a Roth IRA at Fidelity (no minimum). If you have earned income, you can contribute up to $7,000/year. Put it in a target-date index fund. $50/month starting at 20 becomes over $150,000 by 60.",
  },
  {
    keywords: ['loan', 'debt', 'student loan'],
    reply: "First, know what type you have. Subsidized federal loans don't accrue interest while you're enrolled. Unsubsidized loans accrue daily. Log into studentaid.gov to see your exact balances and interest rates.",
  },
  {
    keywords: ['credit', 'credit score', 'credit card'],
    reply: "Get a secured credit card or become an authorized user on a family member's account. Use it for one small recurring purchase. Pay it in full every month. This builds credit with zero risk of debt.",
  },
]

function getFallbackReply(message: string): string {
  const lower = message.toLowerCase()
  for (const { keywords, reply } of FALLBACKS) {
    if (keywords.some((k) => lower.includes(k))) return reply
  }
  return "Great question. Pick one small action this week and do it. You're already ahead of most people just by asking. Start where you are — the first step matters more than the perfect plan."
}

export async function POST(req: NextRequest) {
  const { message, history } = await req.json()

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({ reply: getFallbackReply(message), source: 'fallback' })
  }

  try {
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...(history ?? [])
        .filter((m: { role: string; text: string }) => m.text?.trim())
        .map((m: { role: string; text: string }) => ({
          role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text,
        })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 200,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content?.trim() ?? getFallbackReply(message)
    return NextResponse.json({ reply, source: 'groq' })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Groq error:', msg)

    if (msg.includes('429') || msg.includes('rate') || msg.includes('quota')) {
      return NextResponse.json({ reply: getFallbackReply(message), source: 'fallback' })
    }
    return NextResponse.json(
      { reply: "I'm having a moment — try again shortly.", source: 'error' },
      { status: 500 }
    )
  }
}
