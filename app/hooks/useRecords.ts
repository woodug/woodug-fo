'use client'

import { useState, useCallback } from 'react'
import { GameRecord } from '@/app/lib/types'
import { recordStorage } from '@/app/store/storage'

const getRecordsForUser = (userId: string | undefined) => {
  if (!userId) return []
  return recordStorage.getByUser(userId).sort((a, b) => b.date.localeCompare(a.date))
}

export function useRecords(userId: string | undefined) {
  const [records, setRecords] = useState<GameRecord[]>(() => getRecordsForUser(userId))
  const [prevUserId, setPrevUserId] = useState(userId)

  if (userId !== prevUserId) {
    setPrevUserId(userId)
    setRecords(getRecordsForUser(userId))
  }

  const addRecord = useCallback(
    (data: Omit<GameRecord, 'id' | 'userId' | 'createdAt'>) => {
      if (!userId) return
      const record: GameRecord = {
        ...data,
        id: crypto.randomUUID(),
        userId,
        createdAt: new Date().toISOString(),
      }
      recordStorage.add(record)
      setRecords((prev) => [record, ...prev])
      return record
    },
    [userId]
  )

  const updateRecord = useCallback(
    (id: string, data: Partial<GameRecord>) => {
      recordStorage.update(id, data)
      setRecords((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...data } : r))
      )
    },
    []
  )

  const deleteRecord = useCallback((id: string) => {
    recordStorage.remove(id)
    setRecords((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return { records, addRecord, updateRecord, deleteRecord }
}
