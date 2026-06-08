'use client'

import { CalendarDays } from 'lucide-react'

type DateTab = {
  key: string
  label: string
  sub: string
}

function buildTabs(base: Date): DateTab[] {
  const tabs: DateTab[] = []
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  for (let i = 0; i < 5; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const isToday = i === 0
    tabs.push({
      key,
      label: isToday ? '오늘' : `${d.getMonth() + 1}.${d.getDate()}`,
      sub: isToday
        ? `${d.getMonth() + 1}.${d.getDate()}(${dayNames[d.getDay()]})`
        : `(${dayNames[d.getDay()]})`,
    })
  }
  return tabs
}

type Props = {
  base: Date
  selectedKey: string
  onSelect: (key: string) => void
}

export default function DateTabBar({ base, selectedKey, onSelect }: Props) {
  const tabs = buildTabs(base)

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-white overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = tab.key === selectedKey
        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`flex-shrink-0 flex flex-col items-center justify-center rounded-2xl px-3 py-2 transition-all ${
              isActive ? 'bg-gray-900 text-white min-w-[72px]' : 'bg-gray-100 text-gray-600 min-w-[60px]'
            }`}
          >
            <span className={`font-black text-sm leading-tight ${isActive ? 'text-white' : 'text-gray-800'}`}>
              {tab.label}
            </span>
            <span className={`text-[10px] leading-tight mt-0.5 ${isActive ? 'text-gray-300' : 'text-gray-400'}`}>
              {tab.sub}
            </span>
          </button>
        )
      })}

      <button className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center ml-auto text-gray-500">
        <CalendarDays size={18} strokeWidth={2} />
      </button>
    </div>
  )
}
