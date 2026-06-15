'use client'

import { viewings } from '../../data/viewings'
import {
  getViewingResult,
  calculateWinRate,
  getStadiumStats,
  getDayOfWeekStats,
  type WinRateStat,
} from '../../utils/viewingStats'

function WinRateBar({ stat, showLabel = true }: { stat: WinRateStat | null; showLabel?: boolean }) {
  if (!stat || stat.total === 0) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 flex rounded-full overflow-hidden h-2.5 bg-gray-100" />
        {showLabel && <span className="text-xs text-gray-400">기록 없음</span>}
      </div>
    )
  }

  const { win, lose, draw, total, winRate } = stat
  const winPercent = (win / total) * 100
  const drawPercent = (draw / total) * 100

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex rounded-full overflow-hidden h-2.5 bg-gray-100">
        <div className="bg-blue-400 h-full" style={{ width: `${winPercent}%` }} />
        <div className="bg-gray-300 h-full" style={{ width: `${drawPercent}%` }} />
        <div className="bg-red-400 h-full" style={{ width: `${100 - winPercent - drawPercent}%` }} />
      </div>
      {showLabel && (
        <>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {win}승 {draw}무 {lose}패
          </span>
          <span className="text-sm font-black text-blue-900 w-10 text-right">{winRate}%</span>
        </>
      )}
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-sm font-bold text-gray-700 mb-3">{title}</h3>
      {children}
    </div>
  )
}

function TotalStatSection({ stat }: { stat: WinRateStat }) {
  const { win, lose, draw, total, winRate } = stat
  const winPercent = (win / total) * 100
  const drawPercent = (draw / total) * 100

  if (total === 0) {
    return (
      <div className="bg-blue-900 text-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-sm font-medium text-blue-200 mb-2">나의 직관 승률</p>
        <p className="text-gray-300 text-sm">아직 직관 기록이 없어요</p>
      </div>
    )
  }

  return (
    <div className="bg-blue-900 text-white rounded-2xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-blue-200">나의 직관 승률</p>
          <p className="text-3xl font-black mt-1">{winRate}%</p>
        </div>
        <p className="text-sm text-blue-200">전체 {total}경기</p>
      </div>

      <div className="flex gap-6 mb-4 text-sm">
        <div className="text-center">
          <p className="text-blue-300 text-xs mb-1">승</p>
          <p className="text-2xl font-black">{win}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-300 text-xs mb-1">무</p>
          <p className="text-2xl font-black">{draw}</p>
        </div>
        <div className="text-center">
          <p className="text-blue-300 text-xs mb-1">패</p>
          <p className="text-2xl font-black">{lose}</p>
        </div>
      </div>

      <div className="flex rounded-full overflow-hidden h-3 bg-blue-800">
        <div className="bg-blue-400 h-full" style={{ width: `${winPercent}%` }} />
        <div className="bg-gray-400 h-full" style={{ width: `${drawPercent}%` }} />
        <div className="bg-red-400 h-full" style={{ width: `${100 - winPercent - drawPercent}%` }} />
      </div>
    </div>
  )
}

function HomeAwaySection({
  homeResults,
  awayResults,
}: {
  homeResults: (WinRateStat | null)[]
  awayResults: (WinRateStat | null)[]
}) {
  const homeStat = homeResults[0] || null
  const awayStat = awayResults[0] || null

  return (
    <SectionCard title="홈 / 어웨이 승률">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm font-bold text-gray-700">홈</span>
          <WinRateBar stat={homeStat} />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-sm font-bold text-gray-700">어웨이</span>
          <WinRateBar stat={awayStat} />
        </div>
      </div>
    </SectionCard>
  )
}

function StadiumSection({ stadiumStats }: { stadiumStats: Map<string, WinRateStat> }) {
  if (stadiumStats.size === 0) {
    return (
      <SectionCard title="구장별 승률">
        <p className="text-xs text-gray-400">기록이 없어요</p>
      </SectionCard>
    )
  }

  return (
    <SectionCard title="구장별 승률">
      <div className="divide-y divide-gray-100 -mx-4">
        {Array.from(stadiumStats).map(([stadium, stat]) => (
          <div key={stadium} className="py-3 px-4">
            <p className="text-sm font-bold text-gray-700 mb-2">{stadium}</p>
            <WinRateBar stat={stat} />
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

function DayOfWeekSection({ dayStats }: { dayStats: Map<number, WinRateStat> }) {
  const dayOrder = [1, 2, 3, 4, 5, 6, 0] // 월화수목금토일
  const dayLabels = ['월', '화', '수', '목', '금', '토', '일']

  if (dayStats.size === 0) {
    return (
      <SectionCard title="요일별 승률">
        <p className="text-xs text-gray-400">기록이 없어요</p>
      </SectionCard>
    )
  }

  return (
    <SectionCard title="요일별 승률">
      <div className="grid grid-cols-7 gap-1">
        {dayOrder.map((dayIndex, idx) => {
          const stat = dayStats.get(dayIndex)
          const label = dayLabels[idx]

          if (!stat || stat.total === 0) {
            return (
              <div key={dayIndex} className="flex flex-col items-center">
                <p className="text-[10px] font-bold text-gray-400 mb-1">{label}</p>
                <div className="w-full aspect-square flex items-center justify-center rounded-xl bg-gray-50 text-gray-300 text-xs">
                  -
                </div>
              </div>
            )
          }

          // 승패에 따라 배경색 결정
          const bgColor =
            stat.win > stat.lose
              ? 'bg-blue-50'
              : stat.lose > stat.win
                ? 'bg-red-50'
                : 'bg-gray-50'

          const textColor = stat.lose > stat.win ? 'text-red-600' : 'text-gray-700'

          return (
            <div key={dayIndex} className="flex flex-col items-center">
              <p className="text-[10px] font-bold text-gray-400 mb-1">{label}</p>
              <div className={`w-full aspect-square flex flex-col items-center justify-center rounded-xl ${bgColor} ${textColor}`}>
                <p className="text-[11px] font-black">{stat.win}W</p>
                <p className="text-[11px] font-black">{stat.lose}L</p>
              </div>
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}

type Props = {
  myTeam: string
}

export default function StatsPage({ myTeam }: Props) {
  const finishedViewings = viewings.filter(v => v.status === '종료')

  // 전체 통계
  const allResults = finishedViewings
    .map(v => getViewingResult(v, myTeam))
    .filter((r): r is 'win' | 'lose' | 'draw' => r !== null)
  const totalStat = calculateWinRate(allResults)

  // 홈/어웨이 통계
  const homeResults = finishedViewings
    .filter(v => v.homeTeam === myTeam)
    .map(v => getViewingResult(v, myTeam))
    .filter((r): r is 'win' | 'lose' | 'draw' => r !== null)
  const homeStat = calculateWinRate(homeResults)

  const awayResults = finishedViewings
    .filter(v => v.awayTeam === myTeam)
    .map(v => getViewingResult(v, myTeam))
    .filter((r): r is 'win' | 'lose' | 'draw' => r !== null)
  const awayStat = calculateWinRate(awayResults)

  // 구장별/요일별 통계
  const stadiumStats = getStadiumStats(finishedViewings, myTeam)
  const dayStats = getDayOfWeekStats(finishedViewings, myTeam)

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      <div className="px-4 space-y-4 pt-4">
        <TotalStatSection stat={totalStat} />
        <HomeAwaySection homeResults={[homeStat]} awayResults={[awayStat]} />
        <StadiumSection stadiumStats={stadiumStats} />
        <DayOfWeekSection dayStats={dayStats} />
      </div>
    </div>
  )
}
