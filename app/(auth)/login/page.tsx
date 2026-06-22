'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/app/hooks/useAuth'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setIsLoading(true)
    setError('')
    const result = login(email, password)
    if (result.ok) {
      router.push('/')
    } else {
      setError(result.error ?? '로그인에 실패했습니다.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-[430px]">
        {/* 로고 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-primary tracking-tight">우덕</h1>
          <p className="mt-2 text-sm text-muted-foreground">KBO 직관 기록 서비스</p>
        </div>

        <div className="bg-card rounded-[20px] shadow-sm border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">로그인</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="이메일"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            {error && (
              <p className="text-sm text-danger text-center">{error}</p>
            )}

            <Button type="submit" size="full" disabled={isLoading} className="mt-2">
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-primary font-semibold">
              회원가입
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            로그인 없이 경기 일정 보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}
