export interface User {
  id: string
  email: string
  name: string
  favoriteTeam: string
  createdAt: string
}

export interface Team {
  id: string
  name: string
  shortName: string
  color: string
  textColor: string
  stadium: string
}

export interface Stadium {
  id: string
  name: string
  location: string
}

export interface Game {
  id: string
  date: string
  time: string
  homeTeam: string
  awayTeam: string
  stadium: string
  status: 'scheduled' | 'live' | 'finished'
  homeScore?: number
  awayScore?: number
}

export interface GameRecord {
  id: string
  userId: string
  gameId?: string
  date: string
  homeTeam: string
  awayTeam: string
  stadium: string
  myTeam: string
  result: 'win' | 'lose' | 'draw'
  homeScore: number
  awayScore: number
  memo?: string
  createdAt: string
}

export interface StandingEntry {
  rank: number
  teamId: string
  games: number
  wins: number
  losses: number
  draws: number
  winRate: number
  streak: string
}

export type GameResult = 'win' | 'lose' | 'draw'

export interface WinRateStat {
  win: number
  lose: number
  draw: number
  total: number
  winRate: number
}
