'use client'

import { useState } from 'react'
import { ChevronRight, Settings } from 'lucide-react'
import TopBar from './components/layout/TopBar'
import BottomNav, { Tab } from './components/layout/BottomNav'
import DateTabBar from './components/schedule/DateTabBar'
import NoticeBanner from './components/schedule/NoticeBanner'
import GameCard from './components/schedule/GameCard'
import MyTeamCard from './components/schedule/MyTeamCard'
import ViewingPage from './components/viewing/ViewingPage'
import { scheduleData } from './data/schedule'

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

export default function Home() {
  const [selectedKey, setSelectedKey] = useState<string>(toKey(BASE_DATE))
  const [activeTab, setActiveTab] = useState<Tab>('일정')

  const games = scheduleData[selectedKey] ?? []

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      {activeTab === '일정' ? (
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
              <button className="text-xs text-gray-400 font-semibold flex items-center gap-0.5">
                설정 <Settings size={13} strokeWidth={2} className="ml-0.5" />
              </button>
            </div>
            <MyTeamCard />
          </div>
        </>
      ) : activeTab === '직관' ? (
        <ViewingPage />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-32">
          <span className="text-5xl">🚧</span>
          <p className="text-gray-400 font-medium">{activeTab} 탭은 준비 중이에요</p>
        </div>
      )}

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
