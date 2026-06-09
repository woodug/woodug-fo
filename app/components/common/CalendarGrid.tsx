'use client'

import { DayPicker } from 'react-day-picker'
import { addMonths, subMonths, format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  month: Date
  onMonthChange: (month: Date) => void
  selected: Date | undefined
  onSelect: (date: Date) => void
  markedDates?: string[]
}

function toKey(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

export default function CalendarGrid({ month, onMonthChange, selected, onSelect, markedDates = [] }: Props) {
  const markedSet = new Set(markedDates)

  return (
    <div>
      {/* 월 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onMonthChange(subMonths(month, 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <span className="font-black text-gray-900 text-base">
          {format(month, 'yyyy년 M월', { locale: ko })}
        </span>
        <button
          onClick={() => onMonthChange(addMonths(month, 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <DayPicker
        mode="single"
        month={month}
        onMonthChange={onMonthChange}
        selected={selected}
        onSelect={(date) => date && onSelect(date)}
        locale={ko}
        hideNavigation
        classNames={{
          months: 'w-full',
          month: 'w-full',
          month_caption: 'hidden',
          month_grid: 'w-full border-collapse',
          weekdays: 'grid grid-cols-7 mb-1',
          weekday: 'text-center text-xs font-bold py-1 text-gray-400',
          weeks: 'w-full',
          week: 'grid grid-cols-7 gap-y-1',
          day: 'flex flex-col items-center',
          day_button: 'w-full flex flex-col items-center py-1 gap-0.5',
          outside: 'opacity-30',
          hidden: 'invisible',
          selected: '',
          today: '',
        }}
        components={{
          DayButton: ({ day, modifiers, onClick }) => {
            const key = toKey(day.date)
            const isSelected = modifiers.selected
            const hasGame = markedSet.has(key)
            const col = day.date.getDay()

            return (
              <button
                onClick={onClick}
                className="flex flex-col items-center py-1 gap-0.5 w-full"
              >
                <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-red-500 text-white'
                    : col === 0
                      ? 'text-red-400'
                      : col === 6
                        ? 'text-blue-400'
                        : 'text-gray-700'
                }`}>
                  {day.date.getDate()}
                </span>
                {hasGame && (
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-red-300' : 'bg-blue-400'}`} />
                )}
              </button>
            )
          },
        }}
      />
    </div>
  )
}
