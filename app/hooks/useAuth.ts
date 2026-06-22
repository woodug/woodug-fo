'use client'

import { useState, useCallback } from 'react'
import { User } from '@/app/lib/types'
import { userStorage, sessionStorage } from '@/app/store/storage'

export function useAuth() {
  const [initialAuthState] = useState(() => ({
    user: sessionStorage.get(),
    isLoading: false,
  }))
  const [user, setUser] = useState<User | null>(initialAuthState.user)
  const isLoading = initialAuthState.isLoading

  const login = useCallback((email: string, password: string): { ok: boolean; error?: string } => {
    const found = userStorage.findByEmail(email)
    if (!found) return { ok: false, error: '이메일이 존재하지 않습니다.' }

    const stored = userStorage.getAll().find(
      (u) => u.email === email && (u as User & { password: string }).password === password
    )
    if (!stored) return { ok: false, error: '비밀번호가 올바르지 않습니다.' }

    sessionStorage.set(stored)
    setUser(stored)
    return { ok: true }
  }, [])

  const signup = useCallback(
    (
      email: string,
      password: string,
      name: string,
      favoriteTeam: string
    ): { ok: boolean; error?: string } => {
      if (userStorage.findByEmail(email)) {
        return { ok: false, error: '이미 사용 중인 이메일입니다.' }
      }
      const newUser: User & { password: string } = {
        id: crypto.randomUUID(),
        email,
        password,
        name,
        favoriteTeam,
        createdAt: new Date().toISOString(),
      }
      userStorage.add(newUser as unknown as User)
      sessionStorage.set(newUser as unknown as User)
      setUser(newUser as unknown as User)
      return { ok: true }
    },
    []
  )

  const logout = useCallback(() => {
    sessionStorage.clear()
    setUser(null)
  }, [])

  const updateFavoriteTeam = useCallback(
    (teamId: string) => {
      if (!user) return
      userStorage.update(user.id, { favoriteTeam: teamId })
      const updated = { ...user, favoriteTeam: teamId }
      sessionStorage.set(updated)
      setUser(updated)
    },
    [user]
  )

  return { user, isLoading, login, signup, logout, updateFavoriteTeam }
}
