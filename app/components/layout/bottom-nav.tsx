'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Calendar, BookOpen, BarChart2, User } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { User as UserType } from '@/app/lib/types'

interface BottomNavProps {
  user: UserType | null
}

const navItems = [
  { href: '/', icon: Home, label: '홈', requireAuth: false },
  { href: '/schedule', icon: Calendar, label: '일정', requireAuth: true },
  { href: '/records', icon: BookOpen, label: '기록', requireAuth: true },
  { href: '/stats', icon: BarChart2, label: '통계', requireAuth: true },
  { href: '/mypage', icon: User, label: '마이', requireAuth: true },
]

export function BottomNav({ user }: BottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavClick = (
    e: React.MouseEvent,
    href: string,
    requireAuth: boolean
  ) => {
    if (requireAuth && !user) {
      e.preventDefault()
      router.push('/login')
    }
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border">
      <div className="max-w-[430px] mx-auto flex items-center justify-around h-16 px-2 pb-safe">
        {navItems.map(({ href, icon: Icon, label, requireAuth }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href, requireAuth)}
              className={cn(
                'flex flex-col items-center gap-0.5 flex-1 py-2 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span className={cn('text-[10px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
