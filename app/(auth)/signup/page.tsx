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

const signupSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요'),
    email: z.string().email('올바른 이메일을 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  })

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupForm) => {
    setServerError('')
    const result = signup(data.email, data.password, data.name, '')
    if (result.ok) {
      router.push('/')
    } else {
      setServerError(result.error ?? '회원가입에 실패했습니다.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="text-2xl font-black text-gray-900">회원가입</h1>
        <p className="text-sm text-gray-400 mt-1">직관 기록을 시작해보세요</p>
      </div>

      <Input
        label="이름"
        type="text"
        placeholder="홍길동"
        autoComplete="name"
        {...register('name')}
        error={errors.name?.message}
      />
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
        placeholder="6자 이상 입력해주세요"
        autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요"
        autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      {serverError && (
        <p className="text-sm text-red-500 text-center">{serverError}</p>
      )}

      <Button type="submit" size="full" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? '가입 중...' : '가입하기'}
      </Button>

      <p className="text-center text-sm text-gray-400 mt-2">
        이미 계정이 있으신가요?{' '}
        <Link href="/login" className="text-red-500 font-semibold">
          로그인
        </Link>
      </p>
    </form>
  )
}
