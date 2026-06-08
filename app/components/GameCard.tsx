'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, MapPin, Tv2 } from 'lucide-react'
import { Game } from '../data/schedule'

type Props = {
  game: Game
}

export default function GameCard({ game }: Props) {
  const [bookmarked, setBookmarked] = useState(false)
  const isFinished = game.status === '종료'
  const isLive = game.status === '진행중'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 상단 태그 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
          {game.stadiumShort} · {game.time}
        </span>
        <span className="text-xs text-gray-400 font-medium">KBO 리그</span>
      </div>

      {/* 팀 정보 */}
      <div className="flex items-center px-4 pb-4 gap-2">
        {/* 홈팀 */}
        <div className="flex items-center gap-2 flex-1">
          <Image
            src={game.homeLogo}
            alt={game.homeTeam}
            width={48}
            height={48}
            className="object-contain"
          />

          <div className="flex flex-col">
            <p className="font-black text-gray-900 text-base leading-tight">
              {game.homeShort}
            </p>
            <p className="text-xs text-gray-400 leading-tight mt-0.5">
              {game.homeRecord}
            </p>
            <p className="text-xs text-red-500 font-bold">
              ({game.homeRank}위)
            </p>
          </div>
        </div>

        {/* 중앙 — VS / 스코어 */}
        <div className="flex flex-col items-center gap-1 w-20 flex-shrink-0">
          {isFinished ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-gray-900">
                {game.homeScore}
              </span>
              <span className="text-gray-300 text-sm">:</span>
              <span className="text-xl font-black text-gray-900">
                {game.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-lg font-black text-gray-300">VS</span>
          )}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${
              isLive
                ? 'bg-red-500 text-white'
                : isFinished
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-blue-100 text-blue-600'
            }`}
          >
            {isLive ? '🔴 진행중' : isFinished ? '종료' : '경기 전'}
          </span>
        </div>

        {/* 원정팀 */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="flex flex-col items-end">
            <p className="font-black text-gray-900 text-base leading-tight">
              {game.awayShort}
            </p>
            <p className="text-xs text-gray-400 leading-tight mt-0.5">
              {game.awayRecord}
            </p>
            <p className="text-xs text-red-500 font-bold">
              ({game.awayRank}위)
            </p>
          </div>

          <Image
            src={game.awayLogo}
            alt={game.awayTeam}
            width={48}
            height={48}
            className="object-contain"
          />
        </div>

        {/* 관심 버튼 */}
        <button
          onClick={() => setBookmarked((b) => !b)}
          className="flex flex-col items-center gap-1 ml-2 flex-shrink-0"
        >
          <Star
            size={20}
            strokeWidth={1.5}
            className={
              bookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }
          />
          <span className="text-[10px] text-gray-400 font-medium">
            관심 경기
          </span>
        </button>
      </div>

      {/* 구장 / 중계 태그 */}
      <div className="flex gap-2 px-4 pb-3">
        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <MapPin size={11} strokeWidth={2} />
          {game.stadium}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
          <Tv2 size={11} strokeWidth={2} />
          {game.broadcast}
        </span>
      </div>
    </div>
  )
}
