import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline' | 'secondary'
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    outline: 'border border-gray-600 text-gray-300',
    secondary: 'bg-gray-800 text-gray-300'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}