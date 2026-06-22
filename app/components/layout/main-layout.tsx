'use client'

import { useAuth } from '@/app/hooks/useAuth'
import { Header } from '@/app/components/layout/header'
import { BottomNav } from '@/app/components/layout/bottom-nav'

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
}

export function MainLayout({ children, title }: MainLayoutProps) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[430px] mx-auto">
        <Header user={user} title={title} />
        <main className="pb-20">{children}</main>
        <BottomNav user={user} />
      </div>
    </div>
  )
}
