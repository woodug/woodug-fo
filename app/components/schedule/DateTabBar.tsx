'use client'

import { useEffect, useRef, useState } from 'react'
import {
  addDays,
  addWeeks,
  format,
  parseISO,
  startOfWeek,
  subWeeks,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import CalendarGrid from '../common/CalendarGrid'

const DAYS = ['월', '화', '수', '목', '금', '토', '일']

function toKey(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

function buildWeek(monday: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(monday, i)
    return { key: toKey(d), date: d, day: DAYS[i] }
  })
}

function getMondayOf(date: Date) {
  return startOfWeek(date, { weekStartsOn: 1 })
}

type Props = {
  base: Date
  selectedKey: string
  onSelect: (key: string) => void
}

export default function DateTabBar({ base, selectedKey, onSelect }: Props) {
  const [currentMonday, setCurrentMonday] = useState(() =>
    getMondayOf(parseISO(selectedKey)),
  )
  // 슬라이드 방향: 'left' = 다음주(왼쪽으로), 'right' = 이전주(오른쪽으로), null = 정지
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)
  const week = buildWeek(currentMonday)

  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(parseISO(selectedKey))

  function goNext() {
    setSlideDir('left')
    setCurrentMonday((m) => addWeeks(m, 1))
  }
  function goPrev() {
    setSlideDir('right')
    setCurrentMonday((m) => subWeeks(m, 1))
  }

  // 애니메이션 클래스가 붙은 후 제거
  useEffect(() => {
    if (!slideDir) return
    const id = setTimeout(() => setSlideDir(null), 300)
    return () => clearTimeout(id)
  }, [slideDir])

  // 스와이프 감지
  const touchStartX = useRef<number | null>(null)
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
  }

  // selectedKey가 현재 주 범위 밖이면 해당 주로 이동
  useEffect(() => {
    const selectedDate = parseISO(selectedKey)
    const selectedMonday = getMondayOf(selectedDate)
    if (toKey(selectedMonday) !== toKey(currentMonday)) {
      setTimeout(() => {
        setCurrentMonday(selectedMonday)
      }, 0)
    }
  }, [selectedKey]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleCalendarSelect(date: Date) {
    onSelect(toKey(date))
    setCurrentMonday(getMondayOf(date))
    setShowCalendar(false)
  }

  const animClass =
    slideDir === 'left'
      ? 'animate-slide-left'
      : slideDir === 'right'
        ? 'animate-slide-right'
        : ''

  return (
    <div className="relative bg-white">
      <div className="flex items-center gap-1 px-2 py-3 overflow-hidden">
        {/* 탭 7개 — 슬라이드 애니메이션 */}
        <div
          key={toKey(currentMonday)}
          className={`grid grid-cols-7 gap-1 flex-1 ${animClass}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {week.map((tab) => {
            const isActive = tab.key === selectedKey
            return (
              <button
                key={tab.key}
                onClick={() => onSelect(tab.key)}
                className={`flex flex-col items-center justify-center rounded-2xl py-2 transition-colors ${
                  isActive ? 'bg-blue-500' : 'bg-gray-100'
                }`}
              >
                <span
                  className={`text-[11px] font-bold leading-tight ${isActive ? 'text-blue-200' : 'text-gray-400'}`}
                >
                  {tab.day}
                </span>
                <span
                  className={`font-black text-sm leading-tight mt-0.5 ${isActive ? 'text-white' : 'text-gray-800'}`}
                >
                  {format(tab.date, 'd')}
                </span>
              </button>
            )
          })}
        </div>

        {/* 캘린더 버튼 고정 */}
        <button
          onClick={() => setShowCalendar((v) => !v)}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center text-gray-400 bg-gray-100 rounded-2xl ml-1"
        >
          <CalendarDays size={16} strokeWidth={2} />
        </button>
      </div>

      {showCalendar && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setShowCalendar(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-30 px-4 pt-4 pb-3">
            <CalendarGrid
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              selected={parseISO(selectedKey)}
              onSelect={handleCalendarSelect}
            />
          </div>
        </>
      )}
    </div>
  )
}
