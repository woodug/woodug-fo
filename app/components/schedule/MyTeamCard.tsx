import { CalendarDays, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function MyTeamCard() {
  return (
    <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-sm">
      {/* 팀 정보 */}
      <div className="bg-blue-500 flex items-center px-4 py-4 gap-3">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Image src="/logo/landers.svg" alt="SSG 랜더스" width={36} height={36} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-black text-base">SSG 랜더스</span>
            <span className="bg-white text-blue-600 text-xs font-black px-2 py-0.5 rounded-full">2위</span>
          </div>
          <p className="text-blue-200 text-xs mt-0.5">33승 2무 20패 &nbsp;|&nbsp; 승률 0.623</p>
        </div>
        <button className="bg-white text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0 flex items-center gap-0.5">
          팀 페이지 <ChevronRight size={12} strokeWidth={2.5} />
        </button>
      </div>

      {/* 다음 경기 */}
      <div className="bg-blue-600 flex items-center px-4 py-3 gap-2">
        <CalendarDays size={14} className="text-blue-300 flex-shrink-0" />
        <p className="text-white text-xs font-medium flex-1">다음 경기&nbsp;&nbsp;6.10(화) 18:30 vs KT 수원</p>
        <span className="bg-blue-900 text-white text-xs font-black px-2.5 py-1 rounded-lg">D-2</span>
      </div>
    </div>
  )
}
