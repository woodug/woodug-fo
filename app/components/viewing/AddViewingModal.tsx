'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Check } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { scheduleData, Game } from '../../data/schedule'
import { Viewing } from '../../data/viewings'
import StatusBadge from '../common/StatusBadge'
import CalendarGrid from '../common/CalendarGrid'

type Props = {
  onClose: () => void
  onAdd: (viewing: Viewing) => void
  nextId: number
}

function toKey(date: Date) {
  return format(date, 'yyyy-MM-dd')
}

function getGameDates() {
  return new Set(Object.keys(scheduleData).filter(k => scheduleData[k]?.length > 0))
}

export default function AddViewingModal({ onClose, onAdd, nextId }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const today = new Date(2026, 5, 8)
  const [calendarMonth, setCalendarMonth] = useState(today)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  const gameDates = Array.from(getGameDates())
  const selectedKey = selectedDate ? toKey(selectedDate) : null
  const gamesForDate = selectedKey ? (scheduleData[selectedKey] ?? []) : []

  function handleDateSelect(date: Date) {
    setSelectedDate(date)
    setSelectedGame(null)
    setCalendarMonth(date)
  }

  function handleAdd() {
    if (!selectedGame || !selectedKey) return
    onAdd({
      id: nextId,
      date: selectedKey,
      status: selectedGame.status,
      homeTeam: selectedGame.homeTeam,
      homeShort: selectedGame.homeShort,
      homeLogo: selectedGame.homeLogo,
      awayTeam: selectedGame.awayTeam,
      awayShort: selectedGame.awayShort,
      awayLogo: selectedGame.awayLogo,
      homeScore: selectedGame.homeScore,
      awayScore: selectedGame.awayScore,
      stadium: selectedGame.stadium,
      stadiumShort: selectedGame.stadiumShort,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col max-w-xl mx-auto left-0 right-0">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <h2 className="text-lg font-black text-gray-900">직관 추가</h2>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center text-gray-400">
          <X size={22} strokeWidth={2} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* 달력 */}
        <div className="px-4 pt-4">
          <CalendarGrid
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            selected={selectedDate}
            onSelect={handleDateSelect}
            markedDates={gameDates}
          />
        </div>

        {/* 경기 목록 */}
        {selectedDate && (
          <div className="px-4 mt-5">
            <p className="text-xs font-bold text-gray-400 mb-3">
              {format(selectedDate, 'M월 d일', { locale: ko })} 경기
            </p>

            {gamesForDate.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <span className="text-4xl">⚾</span>
                <p className="text-sm text-gray-400 font-medium">이날은 경기가 없어요</p>
              </div>
            ) : (
              <div className="space-y-2 pb-32">
                {gamesForDate.map((game) => {
                  const isSelected = selectedGame?.id === game.id
                  const statusVariant = game.status === '진행중' ? 'live' : game.status === '종료' ? 'done' : 'pre'
                  return (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(isSelected ? null : game)}
                      className={`w-full flex items-center gap-3 p-3 rounded-2xl border-2 transition-all ${isSelected ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-white'}`}
                    >
                      {/* 원정팀 */}
                      <div className="flex items-center gap-2 flex-1">
                        <Image src={game.awayLogo} alt={game.awayTeam} width={36} height={36} className="object-contain" />
                        <span className="font-black text-gray-900 text-sm">{game.awayShort}</span>
                      </div>

                      {/* 중앙 */}
                      <div className="flex flex-col items-center gap-1 w-20 flex-shrink-0">
                        {game.status === '종료' && game.homeScore != null && game.awayScore != null ? (
                          <div className="flex items-center gap-1.5">
                            <span className={`text-base font-black ${game.awayScore > game.homeScore ? 'text-gray-900' : 'text-gray-300'}`}>{game.awayScore}</span>
                            <span className="text-gray-200 text-xs font-bold">:</span>
                            <span className={`text-base font-black ${game.homeScore > game.awayScore ? 'text-gray-900' : 'text-gray-300'}`}>{game.homeScore}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-xs font-bold text-blue-500">{game.time}</span>
                            <span className="text-xs font-black text-gray-300">VS</span>
                          </>
                        )}
                        <StatusBadge variant={statusVariant} size="sm" />
                      </div>

                      {/* 홈팀 */}
                      <div className="flex items-center gap-2 flex-1 justify-end">
                        <span className="font-black text-gray-900 text-sm">{game.homeShort}</span>
                        <Image src={game.homeLogo} alt={game.homeTeam} width={36} height={36} className="object-contain" />
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check size={12} strokeWidth={3} className="text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 하단 추가 버튼 */}
      <div className="px-4 pt-4 pb-24 border-t border-gray-100">
        <button
          onClick={handleAdd}
          disabled={!selectedGame}
          className={`w-full py-3.5 rounded-2xl font-black text-base transition-all ${selectedGame ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-300'}`}
        >
          직관 추가
        </button>
      </div>
    </div>
  )
}
