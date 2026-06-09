import { LucideIcon } from 'lucide-react'

type Props = {
  icon: LucideIcon
  label: string
}

export default function InfoTag({ icon: Icon, label }: Props) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
      <Icon size={11} strokeWidth={2} />
      {label}
    </span>
  )
}
