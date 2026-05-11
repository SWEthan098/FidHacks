'use client'

import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  label?: string
  error?: string
}

export function Input({ icon, label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-sans text-warm-brown font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-border-beige">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={cn(
            'w-full bg-warm-white border border-border-beige rounded-2xl py-3 text-warm-brown placeholder:text-border-beige font-sans text-base transition-all duration-150',
            'focus:outline-none focus:border-muted-gold focus:ring-2 focus:ring-muted-gold/20',
            icon ? 'pl-10 pr-4' : 'px-4',
            error && 'border-red-400 focus:border-red-400 focus:ring-red-200',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 font-sans">{error}</p>}
    </div>
  )
}
