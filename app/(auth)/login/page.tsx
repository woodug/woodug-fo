'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { useAuth } from '@/app/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setServerError('')
    const result = login(data.email, data.password)
    if (result.ok) {
      router.push('/')
    } else {
      setServerError(result.error ?? '로그인에 실패했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-2xl font-black text-gray-900">로그인</h1>
        <p className="text-sm text-gray-400 mt-1">직관 기록을 이어서 관리해보세요</p>
      </div>

      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        autoComplete="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요"
        autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      <Button type="submit" size="full" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>

      <p className="text-center text-sm text-gray-400 mt-2">
        아직 계정이 없으신가요?{' '}
        <Link href="/signup" className="text-red-500 font-semibold">
          회원가입
        </Link>
      </p>
    </form>
  )
}
