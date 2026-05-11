'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { AppShell } from '@/components/layout/AppShell'
import { Button } from '@/components/ui/Button'
import { submitAskBoard } from '@/lib/api'
import { Send, MessageSquare } from 'lucide-react'

const SUGGESTED = [
  'How do I ask if an internship is paid?',
  'How do I start saving money on a campus job?',
  'What salary should I expect as a software engineering intern?',
  'How do I negotiate my first job offer?',
  'What is a Roth IRA and should I open one?',
  'How do I stop overspending on food?',
]

interface Message { role: 'user' | 'board'; text: string }

export default function AskBoardPage() {
  const router = useRouter()
  const { state } = useApp()
  const [messages, setMessages] = useState<Message[]>([
    { role: 'board', text: "Hi! I'm your Her Wealth board. Ask me anything about money, salary, internships, or career moves." },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { if (!state.user) router.replace('/login') }, [state.user, router])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function handleSend(text?: string) {
    const msg = text ?? input.trim()
    if (!msg) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const reply = await submitAskBoard(msg)
      setMessages((m) => [...m, { role: 'board', text: reply }])
    } finally {
      setLoading(false)
    }
  }

  if (!state.user) return null

  return (
    <AppShell showRightPanel={false}>
      <div className="bg-warm-white border-b border-border-beige/60 px-6 py-3 flex items-center gap-2">
        <MessageSquare size={16} className="text-muted-gold" />
        <h1 className="font-serif text-xl text-forest font-semibold">Ask the Board</h1>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {/* Suggested questions */}
        <div className="bg-cream border-b border-border-beige/40 px-6 py-3">
          <p className="font-sans text-xs text-warm-brown/50 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-3 py-1.5 rounded-full bg-warm-white border border-border-beige text-xs font-sans text-warm-brown hover:border-muted-gold hover:text-forest transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-sm rounded-2xl px-4 py-3 font-sans text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-fidelity text-warm-white rounded-br-sm'
                    : 'bg-warm-white border border-border-beige text-warm-brown rounded-bl-sm'
                }`}
              >
                {msg.role === 'board' && (
                  <p className="text-[10px] text-muted-gold font-semibold uppercase tracking-widest mb-1">Her Wealth</p>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-warm-white border border-border-beige rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-border-beige rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-border-beige rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-border-beige rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border-beige/60 bg-warm-white px-6 py-4">
          <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about money, salary, internships…"
              className="flex-1 bg-cream border border-border-beige rounded-2xl px-4 py-2.5 font-sans text-sm text-warm-brown placeholder:text-border-beige focus:outline-none focus:border-muted-gold transition-colors"
            />
            <Button type="submit" size="sm" disabled={!input.trim() || loading}>
              <Send size={14} />
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  )
}
