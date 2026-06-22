import { CalendarDays, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { type KBOTeam } from '../../data/teams'
import { scheduleData, type Game } from '../../data/schedule'

const BASE_DATE = new Date(2026, 5, 8)
const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

type GameWithDate = Game & { date: string }

function getTeamStats(teamName: string) {
  const sorted = Object.entries(scheduleData).sort(([a], [b]) => a.localeCompare(b))

  let rank: number | null = null
  let wins = 0, draws = 0, losses = 0
  let nextGame: GameWithDate | null = null

  for (const [date, games] of sorted) {
    for (const g of games) {
      const isHome = g.homeTeam === teamName
      const isAway = g.awayTeam === teamName
      if (!isHome && !isAway) continue

      if (g.status !== '예정') {
        rank = isHome ? g.homeRank : g.awayRank
      }

      if (g.status === '종료' && g.homeScore !== undefined && g.awayScore !== undefined) {
        if (g.homeScore === g.awayScore) draws++
        else {
          const won = isHome ? g.homeScore > g.awayScore : g.awayScore > g.homeScore
          if (won) wins++; else losses++
        }
      }

      if (g.status === '예정' && !nextGame) {
        nextGame = { ...g, date }
      }
    }
  }

  const winRate = wins + losses > 0 ? (wins / (wins + losses)).toFixed(3) : '-'
  return { rank, wins, draws, losses, winRate, nextGame }
}

type Props = { myTeam: KBOTeam }

export default function MyTeamCard({ myTeam }: Props) {
  const { rank, wins, draws, losses, winRate, nextGame } = getTeamStats(myTeam.name)

  let nextGameText = '예정된 경기가 없어요'
  let dDay: number | null = null

  if (nextGame) {
    const [, m, d] = nextGame.date.split('-')
    const gameDate = new Date(2026, Number(m) - 1, Number(d))
    const dayName = DAY_NAMES[gameDate.getDay()]
    const opponentShort = nextGame.homeTeam === myTeam.name ? nextGame.awayShort : nextGame.homeShort
    dDay = Math.ceil((gameDate.getTime() - BASE_DATE.getTime()) / (1000 * 60 * 60 * 24))
    nextGameText = `${Number(m)}.${Number(d)}(${dayName}) ${nextGame.time} vs ${opponentShort} ${nextGame.stadiumShort}`
  }

  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-blue-500 flex items-center px-4 py-4 gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Image src={myTeam.logo} alt={myTeam.name} width={36} height={36} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-base">{myTeam.name}</span>
            {rank !== null && (
              <span className="bg-white text-blue-600 text-xs font-black px-2 py-0.5 rounded-full">{rank}위</span>
            )}
          </div>
          <p className="text-blue-200 text-xs mt-0.5">
            {wins}승 {draws}무 {losses}패 &nbsp;|&nbsp; 승률 {winRate}
          </p>
        </div>
        <button className="bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-0.5">
          팀 페이지 <ChevronRight size={12} strokeWidth={2.5} />
        </button>
      </div>

      <div className="bg-blue-600 flex items-center px-4 py-3 gap-2">
        <CalendarDays size={14} className="text-blue-300 flex-shrink-0" />
        <p className="text-white text-xs font-medium flex-1">
          {nextGame ? `다음 경기  ${nextGameText}` : nextGameText}
        </p>
        {dDay !== null && (
          <span className="bg-blue-900 text-white text-xs font-black px-2.5 py-1 rounded-lg">
            {dDay === 0 ? 'D-Day' : `D-${dDay}`}
          </span>
        )}
      </div>
    </div>
  )
}
