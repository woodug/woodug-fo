import { CalendarDays, ChevronRight } from 'lucide-react'

export default function MyTeamCard() {
  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-sm">
      {/* 팀 정보 */}
      <div className="bg-red-600 flex items-center px-4 py-3 gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl flex-shrink-0">
          ⚾
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-base">LG 트윈스</span>
            <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded-full">2위</span>
          </div>
          <p className="text-red-200 text-xs mt-0.5">33승 2무 20패 &nbsp;|&nbsp; 승률 0.623</p>
        </div>
        <button className="bg-white text-red-600 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-0.5">
          팀 페이지 <ChevronRight size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* 다음 경기 */}
      <div className="bg-red-700 flex items-center px-4 py-2.5 gap-2">
        <CalendarDays size={14} className="text-red-300 flex-shrink-0" />
        <p className="text-white text-xs font-medium flex-1">
          다음 경기&nbsp;&nbsp;6.10(화) 18:30 vs KT 수원
        </p>
        <span className="bg-red-900 text-red-200 text-xs font-bold px-2.5 py-1 rounded-full">D-2</span>
      </div>
    </div>
  )
}
