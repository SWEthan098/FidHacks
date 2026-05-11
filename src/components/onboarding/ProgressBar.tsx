'use client'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  label: string
}

export function ProgressBar({ currentStep, totalSteps, label }: ProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100)
  return (
    <div className="w-full px-6 py-4 bg-warm-white border-b border-border-beige/50">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-xs text-warm-brown/60 uppercase tracking-widest">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="font-sans text-xs text-muted-gold font-semibold">{label}</span>
        </div>
        <div className="h-1.5 bg-border-beige rounded-full overflow-hidden">
          <div
            className="h-full bg-muted-gold rounded-full transition-all duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
