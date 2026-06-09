import { MapPin } from 'lucide-react'
import { Viewing } from '../../data/viewings'
import TeamLogo from '../common/TeamLogo'
import InfoTag from '../common/InfoTag'
import StatusBadge from '../common/StatusBadge'

type Props = {
  viewing: Viewing
}

const MY_TEAM = 'SSG 랜더스'

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-')
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  return `${Number(m)}월 ${Number(d)}일(${dayNames[date.getDay()]})`
}

export default function ViewingCard({ viewing }: Props) {
  const isFinished = viewing.status === '종료'
  const isUpcoming = viewing.status === '예정' || viewing.status === '진행중'
  const homeScore = viewing.homeScore ?? 0
  const awayScore = viewing.awayScore ?? 0
  const homeWon = isFinished && homeScore > awayScore
  const awayWon = isFinished && awayScore > homeScore

  const myTeamIsHome = viewing.homeTeam === MY_TEAM
  const myTeamIsAway = viewing.awayTeam === MY_TEAM
  const myTeamPlayed = myTeamIsHome || myTeamIsAway

  type BadgeVariant = 'win' | 'lose' | 'draw' | 'pre'
  let badge: BadgeVariant | null = null
  if (isUpcoming) {
    badge = 'pre'
  } else if (myTeamPlayed) {
    if (homeScore === awayScore) badge = 'draw'
    else if ((myTeamIsHome && homeWon) || (myTeamIsAway && awayWon)) badge = 'win'
    else badge = 'lose'
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      {/* 상단: 날짜 + 배지 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-700">{formatDate(viewing.date)}</span>
        {badge && <StatusBadge variant={badge} size="sm" />}
      </div>

      {/* 중앙: 팀 — 스코어/투수 */}
      <div className="flex items-center gap-2">
        {/* 원정팀 (왼쪽) */}
        <div className="flex items-center gap-2 flex-1">
          <TeamLogo src={viewing.awayLogo} alt={viewing.awayTeam} />
          <p className="font-black text-gray-900 text-base">{viewing.awayShort}</p>
        </div>

        {/* 중앙 */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
          {isFinished ? (
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-black ${awayWon ? 'text-gray-900' : 'text-gray-300'}`}>{awayScore}</span>
              <span className="text-gray-200 font-bold">:</span>
              <span className={`text-2xl font-black ${homeWon ? 'text-gray-900' : 'text-gray-300'}`}>{homeScore}</span>
            </div>
          ) : (
            <>
              <span className="text-sm font-bold text-blue-500">{viewing.time}</span>
              {viewing.awayPitcher && viewing.homePitcher && (
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="text-[13px] font-bold text-gray-600">{viewing.awayPitcher}</span>
                  <span className="text-xs font-black text-blue-400">VS</span>
                  <span className="text-[13px] font-bold text-gray-600">{viewing.homePitcher}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* 홈팀 (오른쪽) */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <p className="font-black text-gray-900 text-base">{viewing.homeShort}</p>
          <TeamLogo src={viewing.homeLogo} alt={viewing.homeTeam} />
        </div>
      </div>

      {/* 하단: 구장 태그 */}
      <div className="flex gap-2 mt-3">
        <InfoTag icon={MapPin} label={viewing.stadium} />
      </div>
    </div>
  )
}
