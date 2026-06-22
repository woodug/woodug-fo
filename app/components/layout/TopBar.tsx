'use client'

import Image from 'next/image'
import { Bell } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="relative flex items-center justify-center px-4 bg-white border-b border-gray-100">
      <Image
        src="/main-logo.png"
        alt="우덕 로고"
        width={72}
        height={48}
      />
      <button className="absolute right-4 w-9 h-9 flex items-center justify-center text-gray-700">
        <Bell size={20} strokeWidth={2} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
      </button>
    </div>
  )
}
