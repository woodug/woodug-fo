import { Megaphone, ChevronRight } from 'lucide-react'
import { type Game } from '../../data/schedule'

type Props = { games: Game[] }

export default function NoticeBanner({ games }: Props) {
  const featured = games.find(g => g.status === '진행중') ?? games.find(g => g.status === '예정')

  if (!featured) return null

  const isLive = featured.status === '진행중'
  const text = isLive
    ? `${featured.awayShort} vs ${featured.homeShort} 경기 진행 중!`
    : `${featured.awayShort} vs ${featured.homeShort}  ${featured.time} 시작 예정`

  return (
    <div className="mx-4 mt-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl flex items-center px-4 py-3.5 gap-3">
      <Megaphone size={18} className="text-white flex-shrink-0" />
      <p className="text-white text-[11px] font-medium flex-1 leading-snug">{text}</p>
      <button className="text-white flex items-center gap-0.5 flex-shrink-0">
        <span className="text-xs font-semibold">경기 보러가기</span>
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
