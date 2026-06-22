import { Game } from '@/app/lib/types'
import { getTeam } from '@/app/data/teams'
import { getStadium } from '@/app/data/stadiums'
import { Badge } from '@/app/components/ui/badge'
import { MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface GameCardProps {
  game: Game
  showRecordButton?: boolean
  compact?: boolean
}

const STATUS_LABEL = {
  scheduled: '예정',
  live: 'LIVE',
  finished: '종료',
} as const

export function GameCard({ game, showRecordButton = false, compact = false }: GameCardProps) {
  const home = getTeam(game.homeTeam)
  const away = getTeam(game.awayTeam)
  const stadium = getStadium(game.stadium)

  if (!home || !away) return null

  return (
    <div className="bg-card rounded-[14px] border border-border shadow-sm overflow-hidden">
      <div className={compact ? 'p-3' : 'p-4'}>
        {/* 상태 + 구장 */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant={game.status === 'live' ? 'live' : game.status === 'finished' ? 'finished' : 'scheduled'}>
            {STATUS_LABEL[game.status]}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin size={11} />
            {stadium?.name}
          </span>
        </div>

        {/* 팀 vs 팀 */}
        <div className="flex items-center justify-between gap-2">
          {/* 홈팀 */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: home.color }}
            >
              {home.shortName}
            </div>
            <span className="text-sm font-semibold text-foreground">{home.name}</span>
            <span className="text-xs text-muted-foreground">홈</span>
          </div>

          {/* 스코어 or 시간 */}
          <div className="flex flex-col items-center gap-0.5 min-w-[80px]">
            {game.status === 'finished' || game.status === 'live' ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">
                  {game.homeScore ?? 0}
                </span>
                <span className="text-muted-foreground text-sm">:</span>
                <span className="text-2xl font-bold text-foreground">
                  {game.awayScore ?? 0}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                <Clock size={13} className="text-muted-foreground" />
                {game.time}
              </div>
            )}
          </div>

          {/* 원정팀 */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: away.color }}
            >
              {away.shortName}
            </div>
            <span className="text-sm font-semibold text-foreground">{away.name}</span>
            <span className="text-xs text-muted-foreground">원정</span>
          </div>
        </div>

        {/* 기록하기 버튼 */}
        {showRecordButton && (
          <div className="mt-3 pt-3 border-t border-border">
            <Link
              href={`/records/new?gameId=${game.id}`}
              className="flex items-center justify-center h-9 w-full rounded-[10px] border border-primary text-primary text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              직관 기록하기
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
