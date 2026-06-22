import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/app/lib/utils'
import { HTMLAttributes } from 'react'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      variant: {
        win: 'bg-blue-100 text-primary',
        lose: 'bg-red-100 text-accent',
        draw: 'bg-gray-100 text-foreground-secondary',
        live: 'bg-accent text-white animate-pulse',
        scheduled: 'bg-muted text-muted-foreground',
        finished: 'bg-gray-100 text-foreground-secondary',
        team: 'bg-primary text-white',
      },
    },
    defaultVariants: {
      variant: 'scheduled',
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
