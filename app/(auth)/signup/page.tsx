'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { teams } from '@/app/data/teams'
import { cn } from '@/app/lib/utils'
import { Check } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', confirm: '', name: '' })
  const [favoriteTeam, setFavoriteTeam] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password || !form.name) {
      setError('모든 필드를 입력해주세요.')
      return
    }
    if (form.password !== form.confirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    if (!favoriteTeam) {
      setError('응원팀을 선택해주세요.')
      return
    }
    setIsLoading(true)
    setError('')
    const result = signup(form.email, form.password, form.name, favoriteTeam)
    if (result.ok) {
      router.push('/')
    } else {
      setError(result.error ?? '회원가입에 실패했습니다.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-[430px]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-primary tracking-tight">우덕</h1>
        </div>

        <div className="bg-card rounded-[20px] shadow-sm border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">회원가입</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="이름"
              placeholder="홍길동"
              value={form.name}
              onChange={set('name')}
              autoComplete="name"
            />
            <Input
              label="이메일"
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="6자 이상"
              value={form.password}
              onChange={set('password')}
              autoComplete="new-password"
            />
            <Input
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.confirm}
              onChange={set('confirm')}
              autoComplete="new-password"
            />

            {/* 응원팀 선택 */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">응원팀</label>
              <div className="grid grid-cols-5 gap-2">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    type="button"
                    onClick={() => setFavoriteTeam(team.id)}
                    className={cn(
                      'relative flex flex-col items-center gap-1 p-2 rounded-[10px] border transition-all',
                      favoriteTeam === team.id
                        ? 'border-primary bg-blue-50'
                        : 'border-border bg-white'
                    )}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                      style={{ backgroundColor: team.color }}
                    >
                      {team.shortName}
                    </div>
                    <span className="text-[9px] text-foreground-secondary leading-tight text-center">
                      {team.shortName}
                    </span>
                    {favoriteTeam === team.id && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                        <Check size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-sm text-danger text-center">{error}</p>
            )}

            <Button type="submit" size="full" disabled={isLoading} className="mt-2">
              {isLoading ? '처리 중...' : '가입하기'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary font-semibold">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
