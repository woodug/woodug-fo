'use client'

import { useState, useCallback } from 'react'
import { Game } from '@/app/lib/types'
import { notificationStorage } from '@/app/store/storage'

export function useNotification() {
  const permission: NotificationPermission = 'granted'
  const [enabled, setEnabledState] = useState(() =>
    typeof window !== 'undefined' ? notificationStorage.isEnabled() : false
  )

  const requestPermission = useCallback(async () => true, [])

  const toggleEnabled = useCallback((value: boolean) => {
    notificationStorage.setEnabled(value)
    setEnabledState(value)
  }, [])

  const scheduleGameNotification = useCallback(
    (game: Game, teamName: string) => {
      if (!enabled) return

      const gameDateTime = new Date(`${game.date}T${game.time}:00`)
      const notifyAt = gameDateTime.getTime() - 30 * 60 * 1000
      const delay = notifyAt - Date.now()

      if (delay < 0) return

      setTimeout(() => {
        new Notification('⚾ 경기 시작 30분 전!', {
          body: `${teamName} 경기가 곧 시작됩니다. (${game.time} ${game.stadium})`,
          icon: '/favicon.ico',
        })
      }, delay)
    },
    [enabled]
  )

  return { permission, enabled, requestPermission, toggleEnabled, scheduleGameNotification }
}
