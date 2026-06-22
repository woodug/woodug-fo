import { User, GameRecord } from '@/app/lib/types'

const KEYS = {
  users: 'woodug_users',
  session: 'woodug_session',
  records: 'woodug_records',
  notifications: 'woodug_notifications',
} as const

function parse<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function save(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(value))
}

// 사용자
export const userStorage = {
  getAll: (): User[] => parse<User[]>(KEYS.users) ?? [],
  findByEmail: (email: string): User | undefined =>
    userStorage.getAll().find((u) => u.email === email),
  add: (user: User) => {
    const users = userStorage.getAll()
    save(KEYS.users, [...users, user])
  },
  update: (id: string, data: Partial<User>) => {
    const users = userStorage.getAll().map((u) =>
      u.id === id ? { ...u, ...data } : u
    )
    save(KEYS.users, users)
  },
}

// 세션
export const sessionStorage = {
  get: (): User | null => parse<User>(KEYS.session),
  set: (user: User) => save(KEYS.session, user),
  clear: () => {
    if (typeof window !== 'undefined') localStorage.removeItem(KEYS.session)
  },
}

// 직관 기록
export const recordStorage = {
  getAll: (): GameRecord[] => parse<GameRecord[]>(KEYS.records) ?? [],
  getByUser: (userId: string): GameRecord[] =>
    recordStorage.getAll().filter((r) => r.userId === userId),
  getById: (id: string): GameRecord | undefined =>
    recordStorage.getAll().find((r) => r.id === id),
  add: (record: GameRecord) => {
    const records = recordStorage.getAll()
    save(KEYS.records, [...records, record])
  },
  update: (id: string, data: Partial<GameRecord>) => {
    const records = recordStorage.getAll().map((r) =>
      r.id === id ? { ...r, ...data } : r
    )
    save(KEYS.records, records)
  },
  remove: (id: string) => {
    const records = recordStorage.getAll().filter((r) => r.id !== id)
    save(KEYS.records, records)
  },
}

// 알림 설정
export const notificationStorage = {
  isEnabled: (): boolean => parse<boolean>(KEYS.notifications) ?? false,
  setEnabled: (enabled: boolean) => save(KEYS.notifications, enabled),
}
