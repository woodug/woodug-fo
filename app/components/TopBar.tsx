'use client'

import Image from 'next/image'
import { Menu, Bell, User } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <button className="w-9 h-9 flex items-center justify-center text-gray-700">
        <Menu size={22} strokeWidth={2} />
      </button>

      {/* 로고 */}

      <Image
        src="/logo.png"
        alt="우덕 로고"
        width={72}
        height={28}
        className="object-contain"
      />

      {/* 우측 아이콘 */}
      <div className="flex items-center gap-1">
        <button className="w-9 h-9 flex items-center justify-center relative text-gray-700">
          <Bell size={20} strokeWidth={2} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <User size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
