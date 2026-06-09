'use client'

import { useState } from 'react'
import { MapPin, Tv2 } from 'lucide-react'
import { Game } from '../../data/schedule'
import TeamLogo from '../common/TeamLogo'
import StatusBadge from '../common/StatusBadge'

type Props = {
  game: Game
}

export default function GameCard({ game }: Props) {
  const [bookmarked, setBookmarked] = useState(false)
  const isFinished = game.status === '종료'
  const isLive = game.status === '진행중'

  const statusVariant = isLive ? 'live' : isFinished ? 'done' : 'pre'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 팀 정보 */}
      <div className="flex items-center px-4 pt-5 pb-4">
        {/* 원정팀 (왼쪽) */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamLogo src={game.awayLogo} alt={game.awayTeam} size={56} />
          <p className="font-black text-gray-900 text-sm leading-tight">{game.awayShort}</p>
          <span className="text-[13px] font-bold text-blue-400">{game.awayRank}위</span>
        </div>

        {/* 중앙 */}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 w-28">
          {isFinished ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900">{game.awayScore}</span>
              <span className="text-gray-300 text-sm font-bold">:</span>
              <span className="text-xl font-black text-gray-900">{game.homeScore}</span>
            </div>
          ) : (
            <>
              <span className="text-sm font-bold text-blue-500">{game.time}</span>
              <div className="flex items-center gap-1.5 justify-center whitespace-nowrap">
                <span className="text-[13px] font-bold text-gray-700">{game.awayPitcher}</span>
                <span className="text-[11px] font-black text-blue-400">vs</span>
                <span className="text-[13px] font-bold text-gray-700">{game.homePitcher}</span>
              </div>
            </>
          )}
          <StatusBadge variant={statusVariant} />
        </div>

        {/* 홈팀 (오른쪽) */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <TeamLogo src={game.homeLogo} alt={game.homeTeam} size={56} />
          <p className="font-black text-gray-900 text-sm leading-tight">{game.homeShort}</p>
          <span className="text-[13px] font-bold text-blue-400">{game.homeRank}위</span>
        </div>
      </div>

      {/* 구장 / 중계 구분선 */}
      <div className="border-t border-gray-100 mx-0" />
      <div className="flex items-center divide-x divide-gray-100">
        <div className="flex items-center gap-1.5 flex-1 px-4 py-2.5">
          <MapPin size={13} className="text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500 font-medium truncate">{game.stadium}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-1 px-4 py-2.5">
          <Tv2 size={13} className="text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500 font-medium truncate">{game.broadcast}</span>
        </div>
      </div>
    </div>
  )
}
