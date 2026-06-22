'use client'

import { useState } from 'react'
import TopBar from './components/layout/TopBar'
import BottomNav, { Tab } from './components/layout/BottomNav'
import SchedulePage from './components/schedule/SchedulePage'
import MyTeamModal from './components/schedule/MyTeamModal'
import ViewingPage from './components/viewing/ViewingPage'
import StatsPage from './components/stats/StatsPage'
import MyPage from './components/mypage/MyPage'
import { DEFAULT_TEAM, type KBOTeam } from './data/teams'

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('일정')
  const [myTeam, setMyTeam] = useState<KBOTeam>(DEFAULT_TEAM)
  const [showTeamModal, setShowTeamModal] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      {activeTab === '일정' ? (
        <SchedulePage myTeam={myTeam} onOpenTeamModal={() => setShowTeamModal(true)} />
      ) : activeTab === '직관' ? (
        <ViewingPage myTeam={myTeam.name} />
      ) : activeTab === '통계' ? (
        <StatsPage myTeam={myTeam.name} />
      ) : activeTab === '마이페이지' ? (
        <MyPage myTeam={myTeam} onOpenTeamModal={() => setShowTeamModal(true)} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 pb-32">
          <span className="text-5xl">🚧</span>
          <p className="text-gray-400 font-medium">{activeTab} 탭은 준비 중이에요</p>
        </div>
      )}

      {showTeamModal && (
        <MyTeamModal
          currentTeam={myTeam}
          onClose={() => setShowTeamModal(false)}
          onConfirm={(team) => {
            setMyTeam(team)
            setShowTeamModal(false)
          }}
        />
      )}

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  )
}
