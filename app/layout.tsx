import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '우덕 | KBO 직관 기록',
  description: 'KBO 팬의 직관 기록을 저장·분석·공유하는 서비스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} h-full`}>
      <body className="min-h-full font-[var(--font-noto)] antialiased">
        {/* 모바일 앱 컨테이너 */}
        <div className="relative mx-auto w-full max-w-xl min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
