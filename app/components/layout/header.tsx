'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'
import { User } from '@/app/lib/types'

interface HeaderProps {
  user: User | null
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export function Header({ user, title, showBack, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border">
      <div className="max-w-[430px] mx-auto flex items-center justify-between h-14 px-4">
        {showBack ? (
          <button
            onClick={onBack}
            className="text-sm font-medium text-foreground-secondary"
          >
            ← 뒤로
          </button>
        ) : (
          <Link href="/" className="text-lg font-bold text-primary tracking-tight">
            우덕
          </Link>
        )}

        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-foreground">
            {title}
          </span>
        )}

        {user && (
          <button className="relative p-1.5 text-foreground-secondary hover:text-foreground transition-colors">
            <Bell size={22} />
          </button>
        )}

        {!user && !showBack && (
          <Link
            href="/login"
            className="text-sm font-medium text-primary"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  )
}
