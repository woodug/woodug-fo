'use client'

import { useState, useCallback } from 'react'
import { Game } from '@/app/lib/types'
import { notificationStorage } from '@/app/store/storage'

export function useNotification() {
  const [initialNotificationState] = useState(() => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return {
        permission: 'default' as NotificationPermission,
        enabled: false,
      }
    }

    return {
      permission: Notification.permission,
      enabled: notificationStorage.isEnabled(),
    }
  })
  const [permission, setPermission] = useState<NotificationPermission>(
    initialNotificationState.permission
  )
  const [enabled, setEnabledState] = useState(initialNotificationState.enabled)

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) return false
    const result = await Notification.requestPermission()
    setPermission(result)
    if (result === 'granted') {
      notificationStorage.setEnabled(true)
      setEnabledState(true)
    }
    return result === 'granted'
  }, [])

  const toggleEnabled = useCallback(
    async (value: boolean) => {
      if (value && permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) return
      }
      notificationStorage.setEnabled(value)
      setEnabledState(value)
    },
    [permission, requestPermission]
  )

  const scheduleGameNotification = useCallback(
    (game: Game, teamName: string) => {
      if (!enabled || permission !== 'granted') return

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
    [enabled, permission]
  )

  return { permission, enabled, requestPermission, toggleEnabled, scheduleGameNotification }
}
