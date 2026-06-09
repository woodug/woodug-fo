'use client'

import { useState } from 'react'
import { MapPin, Tv2, Star } from 'lucide-react'
import { Game } from '../../data/schedule'
import TeamLogo from '../common/TeamLogo'
import InfoTag from '../common/InfoTag'
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
      {/* 팀 정보 */}
      <div className="flex items-center gap-2">
        {/* 원정팀 (왼쪽) */}
        <div className="flex items-center gap-3 flex-1">
          <TeamLogo src={game.awayLogo} alt={game.awayTeam} size={48} />
          <div className="flex flex-col">
            <p className="font-black text-gray-900 text-sm leading-tight">
              {game.awayShort}
            </p>
            <span className="text-[14px] font-bold text-blue-300 mt-1">
              {game.awayRank}위
            </span>
          </div>
        </div>

        {/* 중앙 */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0">
          {isFinished ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900">
                {game.awayScore}
              </span>
              <span className="text-gray-300 text-sm font-bold">:</span>
              <span className="text-xl font-black text-gray-900">
                {game.homeScore}
              </span>
            </div>
          ) : (
            <>
              <span className="text-sm font-bold text-blue-500">
                {game.time}
              </span>
              <div className="flex items-center gap-1.5 justify-center whitespace-nowrap">
                <span className="text-[14px] font-bold text-gray-600">
                  {game.awayPitcher}
                </span>
                <span className="text-[12px] font-black text-blue-500">VS</span>
                <span className="text-[14px] font-bold text-gray-600">
                  {game.homePitcher}
                </span>
              </div>
            </>
          )}
          <StatusBadge variant={statusVariant} />
        </div>

        {/* 홈팀 (오른쪽) */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <div className="flex flex-col items-end">
            <p className="font-black text-gray-900 text-sm leading-tight">
              {game.homeShort}
            </p>
            <span className="text-[14px] font-bold text-blue-300 mt-1">
              {game.homeRank}위
            </span>
          </div>
          <TeamLogo src={game.homeLogo} alt={game.homeTeam} size={48} />
        </div>
      </div>

      {/* 구장 / 중계 태그 */}
      <div className="flex items-center gap-2 mt-4">
        <InfoTag icon={MapPin} label={game.stadium} />
        <InfoTag icon={Tv2} label={game.broadcast} />
      </div>
    </div>
  )
}
