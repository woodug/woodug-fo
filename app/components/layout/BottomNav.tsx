'use client'

import { CalendarDays, BarChart2, Ticket, User } from 'lucide-react'

export type Tab = '일정' | '직관' | '통계' | '마이페이지'

type NavItem = {
  label: Tab
  icon: (active: boolean) => React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { label: '일정', icon: (a) => <CalendarDays size={22} strokeWidth={a ? 2.5 : 2} /> },
  { label: '직관', icon: (a) => <Ticket size={22} strokeWidth={a ? 2.5 : 2} /> },
  { label: '통계', icon: (a) => <BarChart2 size={22} strokeWidth={a ? 2.5 : 2} /> },
  { label: '마이페이지', icon: (a) => <User size={22} strokeWidth={a ? 2.5 : 2} /> },
]

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white border-t border-gray-100 z-50">
      <div className="flex items-center mx-2">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              onClick={() => onChange(item.label)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
            >
              <span className={isActive ? 'text-blue-500' : 'text-gray-400'}>
                {item.icon(isActive)}
              </span>
              <span className={`text-[10px] font-bold ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className="h-4 flex items-center justify-center">
        <div className="w-28 h-1 bg-gray-900 rounded-full opacity-10" />
      </div>
    </div>
  )
}
