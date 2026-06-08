'use client'

import { Home, CalendarDays, BarChart2, Users } from 'lucide-react'

export type Tab = '홈' | '일정' | '직관기록' | '통계' | '친구'

type NavItem = {
  label: Tab
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { label: '홈', icon: <Home size={20} strokeWidth={2} /> },
  { label: '일정', icon: <CalendarDays size={20} strokeWidth={2} /> },
  { label: '직관기록', icon: null },
  { label: '통계', icon: <BarChart2 size={20} strokeWidth={2} /> },
  { label: '친구', icon: <Users size={20} strokeWidth={2} /> },
]

type Props = {
  active: Tab
  onChange: (tab: Tab) => void
}

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl bg-white border-t border-gray-100  z-50">
      <div className="flex items-end">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.label
          const isCenter = item.label === '직관기록'

          if (isCenter) {
            return (
              <button
                key={item.label}
                onClick={() => onChange(item.label)}
                className="flex-1 flex flex-col items-center pb-4 pt-1 -mt-5"
              >
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-200">
                  <span className="text-white text-3xl font-light leading-none mb-0.5">
                    +
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium mt-1">
                  직관 기록
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.label}
              onClick={() => onChange(item.label)}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
            >
              <span className={isActive ? 'text-red-500' : 'text-gray-300'}>
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-bold ${isActive ? 'text-red-500' : 'text-gray-400'}`}
              >
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
