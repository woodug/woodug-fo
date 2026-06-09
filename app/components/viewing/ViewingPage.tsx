'use client'

import { useState } from 'react'
import { Plus, Glasses } from 'lucide-react'
import { viewings as initialViewings, Viewing } from '../../data/viewings'
import ViewingCard from './ViewingCard'
import AddViewingModal from './AddViewingModal'

export default function ViewingPage() {
  const [list, setList] = useState<Viewing[]>(initialViewings)
  const [showModal, setShowModal] = useState(false)

  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date))
  const nextId = Math.max(...list.map((v) => v.id), 0) + 1

  function handleAdd(viewing: Viewing) {
    setList((prev) => [...prev, viewing])
  }

  return (
    <div className="flex-1 overflow-y-auto pb-32">
      {/* 요약 카드 */}
      <div className="mx-4 mt-4 bg-blue-400 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-xs font-bold mb-1">나의 직관 기록</p>
          <p className="text-white text-2xl font-black">
            총 <span className="text-3xl">{list.length}</span>경기
          </p>
        </div>
        <Glasses size={48} strokeWidth={1.5} className="text-blue-200" />
      </div>

      {/* 경기 목록 */}
      <div className="px-4 mt-4 space-y-3">
        {sorted.map((viewing) => (
          <ViewingCard key={viewing.id} viewing={viewing} />
        ))}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-28 right-4 w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 z-40"
      >
        <Plus size={26} strokeWidth={2.5} className="text-white" />
      </button>

      {showModal && (
        <AddViewingModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
          nextId={nextId}
        />
      )}
    </div>
  )
}
