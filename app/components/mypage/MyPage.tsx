'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Bell, LogOut } from 'lucide-react'
import { useAuth } from '@/app/hooks/useAuth'
import { useNotification } from '@/app/hooks/useNotification'
import TeamLogo from '../common/TeamLogo'
import { type KBOTeam } from '@/app/data/teams'

interface MyPageProps {
  myTeam: KBOTeam
  onOpenTeamModal: () => void
}

export default function MyPage({ myTeam, onOpenTeamModal }: MyPageProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { enabled, toggleEnabled, permission } = useNotification()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* 프로필 */}
      <div className="px-5 py-6 border-b border-gray-100">
        {user ? (
          <>
            <p className="text-xl font-black text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
          </>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-3">로그인이 필요합니다</p>
            <Link
              href="/login"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-blue-900 text-white text-sm font-bold"
            >
              로그인하기
            </Link>
          </div>
        )}
      </div>

      {/* 내 응원팀 */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
          내 응원팀
        </p>
        <button
          onClick={onOpenTeamModal}
          className="w-full flex items-center justify-between py-3"
        >
          <div className="flex items-center gap-3">
            <TeamLogo src={myTeam.logo} alt={myTeam.name} size={36} />
            <span className="text-sm font-bold text-gray-900">
              {myTeam.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold">
            변경 <ChevronRight size={14} strokeWidth={2} />
          </div>
        </button>
      </div>

      <div className="h-px bg-gray-100 mx-5" />

      {/* 알림 설정 */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
          알림 설정
        </p>
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-gray-500" />
            <span className="text-sm font-bold text-gray-900">
              경기 시작 알림
            </span>
          </div>
          <button
            role="switch"
            aria-checked={enabled}
            onClick={() => toggleEnabled(!enabled)}
            disabled={permission !== 'granted'}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
              enabled ? 'bg-blue-600' : 'bg-gray-200'
            } disabled:opacity-40`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {permission !== 'granted' && (
          <p className="text-xs text-red-400 pb-2">
            브라우저 설정에서 알림을 허용해주세요
          </p>
        )}
      </div>

      {user && (
        <>
          <div className="h-px bg-gray-100 mx-5" />
          <div className="px-5 pt-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              계정
            </p>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full flex items-center gap-3 py-3"
            >
              <LogOut size={18} className="text-red-500" />
              <span className="text-sm font-bold text-red-500">로그아웃</span>
            </button>
          </div>
        </>
      )}

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
            <p className="text-base font-black text-gray-900 text-center mb-2">로그아웃</p>
            <p className="text-sm text-gray-500 text-center mb-6">정말 로그아웃 하시겠어요?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-sm text-gray-900"
              >
                취소
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
