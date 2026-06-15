'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, Check } from 'lucide-react'
import TeamLogo from '../common/TeamLogo'
import { KBO_TEAMS, type KBOTeam } from '../../data/teams'

type Props = {
  currentTeam: KBOTeam
  onClose: () => void
  onConfirm: (team: KBOTeam) => void
}

export default function MyTeamModal({
  currentTeam,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState<KBOTeam>(currentTeam)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const isChanged = selected.name !== currentTeam.name

  const handleConfirm = () => {
    onConfirm(selected)
  }

  return (
    <div className="fixed inset-0 bg-white z-100 flex flex-col max-w-xl mx-auto left-0 right-0">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 flex-shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-sm font-semibold text-gray-700"
        >
          <ChevronLeft size={18} strokeWidth={2} />
          취소
        </button>
        <h3 className="text-base font-black text-gray-900">응원팀 설정</h3>
        <div className="w-10" />
      </div>

      {/* 팀 선택 그리드 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {KBO_TEAMS.map((team) => {
            const isSelected = team.name === selected.name
            const isCurrent = team.name === currentTeam.name

            return (
              <button
                key={team.name}
                onClick={() => setSelected(team)}
                className={`relative rounded-2xl shadow-sm border-2 p-4 flex flex-col items-center gap-2 transition-colors ${
                  isSelected
                    ? 'bg-blue-50 border-blue-900'
                    : 'bg-white border-gray-100'
                }`}
              >
                <TeamLogo src={team.logo} alt={team.name} size={48} />
                <span className="text-xs font-bold text-gray-900 text-center leading-tight">
                  {team.name}
                </span>

                {/* 선택 체크 배지 */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-900 rounded-full flex items-center justify-center">
                    <Check size={14} strokeWidth={3} className="text-white" />
                  </div>
                )}

                {/* 현재 팀 표시 */}
                {isCurrent && !isSelected && (
                  <span className="text-[10px] font-bold text-gray-400">
                    현재
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="px-4 py-4 border-t border-gray-100 flex-shrink-0">
        <button
          onClick={() => setShowConfirm(true)}
          disabled={!isChanged}
          className={`w-full py-3 rounded-xl font-black text-sm transition-colors ${
            isChanged ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          변경하기
        </button>
      </div>

      {/* 확인 다이얼로그 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 mx-4 w-full max-w-sm shadow-lg">
            <p className="text-base font-black text-gray-900 mb-4 text-center">
              응원팀을 변경할까요?
            </p>
            <p className="text-sm text-gray-600 text-center mb-6">
              <span className="font-bold">{currentTeam.name}</span>
              <span className="text-gray-400"> → </span>
              <span className="font-bold">{selected.name}</span>
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-900 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-blue-900 text-white font-bold text-sm transition-colors hover:bg-blue-800"
              >
                변경하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
