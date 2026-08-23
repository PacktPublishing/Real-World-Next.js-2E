import { clsx } from 'clsx'

export function StatusBadge({
  variant,
  children,
}: {
  variant: 'success' | 'error' | 'warning'
  children: React.ReactNode
}) {
  return (
    <span
      className={clsx('px-2 py-1 rounded-full text-sm font-medium', {
        // Each class is included only when its value is truthy
        'bg-green-100 text-green-800': variant === 'success',
        'bg-red-100 text-red-800': variant === 'error',
        'bg-yellow-100 text-yellow-800': variant === 'warning',
      })}
    >
      {children}
    </span>
  )
}
