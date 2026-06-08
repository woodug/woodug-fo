import { Megaphone, ChevronRight } from 'lucide-react'

export default function NoticeBanner() {
  return (
    <div className="mx-4 mt-3 bg-[#1a2744] rounded-2xl flex items-center px-4 py-3 gap-3">
      <Megaphone size={18} className="text-yellow-400 flex-shrink-0" />
      <p className="text-white text-xs font-medium flex-1 leading-snug">
        6/9(월) LG vs 두산 경기 30분 후 시작!
      </p>
      <button className="text-gray-400 flex items-center gap-0.5 flex-shrink-0">
        <span className="text-xs font-semibold">더보기</span>
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
