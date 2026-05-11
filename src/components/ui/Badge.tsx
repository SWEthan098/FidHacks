import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  variant?: 'gold' | 'sage' | 'forest'
  className?: string
}

export function Badge({ label, variant = 'gold', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold tracking-wide uppercase',
        variant === 'gold' && 'bg-muted-gold/15 text-muted-gold',
        variant === 'sage' && 'bg-sage text-fidelity',
        variant === 'forest' && 'bg-forest text-warm-white',
        className
      )}
    >
      {label}
    </span>
  )
}
