'use client'

import { useState } from 'react'
import { ChevronRight, Settings } from 'lucide-react'
import DateTabBar from './DateTabBar'
import NoticeBanner from './NoticeBanner'
import GameCard from './GameCard'
import MyTeamCard from './MyTeamCard'
import { scheduleData } from '../../data/schedule'
import { type KBOTeam } from '../../data/teams'

const BASE_DATE = new Date(2026, 5, 8)

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getSectionLabel(key: string) {
  const [, m, d] = key.split('-')
  const date = new Date(2026, Number(m) - 1, Number(d))
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const isToday = key === toKey(BASE_DATE)
  return isToday
    ? '오늘의 경기'
    : `${Number(m)}월 ${Number(d)}일(${dayNames[date.getDay()]}) 경기`
}

interface SchedulePageProps {
  myTeam: KBOTeam
  onOpenTeamModal: () => void
}

export default function SchedulePage({ myTeam, onOpenTeamModal }: SchedulePageProps) {
  const [selectedKey, setSelectedKey] = useState<string>(toKey(BASE_DATE))

  const games = scheduleData[selectedKey] ?? []

  return (
    <>
      <NoticeBanner />
      <DateTabBar base={BASE_DATE} selectedKey={selectedKey} onSelect={setSelectedKey} />

      <div className="flex-1 overflow-y-auto pb-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-gray-900">
            {getSectionLabel(selectedKey)}{' '}
            <span className="text-red-500">{games.length}</span>
          </h2>
          <button className="text-xs text-gray-400 font-semibold flex items-center gap-0.5">
            전체 보기 <ChevronRight size={14} strokeWidth={2} />
          </button>
        </div>

        <div className="px-4 space-y-3">
          {games.length > 0 ? (
            games.map((game) => <GameCard key={game.id} game={game} />)
          ) : (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-5xl">⚾</span>
              <p className="text-gray-400 font-medium text-sm">이날은 경기가 없어요</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 pt-6 pb-3">
          <h2 className="text-lg font-black text-gray-900">내 응원팀</h2>
          <button onClick={onOpenTeamModal} className="text-xs text-gray-400 font-semibold flex items-center gap-0.5">
            설정 <Settings size={13} strokeWidth={2} className="ml-0.5" />
          </button>
        </div>
        <MyTeamCard myTeam={myTeam} />
      </div>
    </>
  )
}
