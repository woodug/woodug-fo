import Image from 'next/image'
import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      <Link href="/" className="mb-8">
        <Image
          src="/main-logo.png"
          alt="우덕 로고"
          width={96}
          height={64}
          priority
        />
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
