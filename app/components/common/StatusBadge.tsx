import { cva, type VariantProps } from 'class-variance-authority'

const badge = cva('rounded-full font-black', {
  variants: {
    variant: {
      pre:  'bg-blue-100 text-blue-600',
      live: 'bg-red-500 text-white',
      done: 'bg-gray-100 text-gray-400',
      win:  'bg-blue-100 text-blue-500',
      lose: 'bg-red-500 text-white',
      draw: 'bg-gray-200 text-gray-500',
    },
    size: {
      sm: 'text-xs px-3 py-1',
      md: 'text-xs px-3 py-1',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const LABELS: Record<string, string> = {
  pre:  '경기 전',
  live: '🔴 진행중',
  done: '종료',
  win:  '승리',
  lose: '패배',
  draw: '무승부',
}

type Props = VariantProps<typeof badge>

export default function StatusBadge({ variant, size }: Props) {
  if (!variant) return null
  return (
    <span className={badge({ variant, size })}>
      {LABELS[variant]}
    </span>
  )
}
