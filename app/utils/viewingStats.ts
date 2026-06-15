import { Viewing } from '../data/viewings'

export const MY_TEAM = 'SSG 랜더스'
export const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

export type GameResult = 'win' | 'lose' | 'draw'

export type WinRateStat = {
  win: number
  lose: number
  draw: number
  total: number
  winRate: number
}

export function getViewingResult(viewing: Viewing, myTeam: string = MY_TEAM): GameResult | null {
  // 종료된 경기만 집계
  if (viewing.status !== '종료') {
    return null
  }

  // 점수 정보 없으면 null
  if (viewing.homeScore === undefined || viewing.awayScore === undefined) {
    return null
  }

  const myTeamIsHome = viewing.homeTeam === myTeam
  const myTeamIsAway = viewing.awayTeam === myTeam

  // 내 팀이 경기에 참여하지 않으면 null
  if (!myTeamIsHome && !myTeamIsAway) {
    return null
  }

  const homeScore = viewing.homeScore
  const awayScore = viewing.awayScore

  // 무승부
  if (homeScore === awayScore) {
    return 'draw'
  }

  // 홈팀이 내 팀인 경우
  if (myTeamIsHome) {
    return homeScore > awayScore ? 'win' : 'lose'
  }

  // 어웨이팀이 내 팀인 경우
  return awayScore > homeScore ? 'win' : 'lose'
}

export function calculateWinRate(results: GameResult[]): WinRateStat {
  const total = results.length
  const win = results.filter(r => r === 'win').length
  const lose = results.filter(r => r === 'lose').length
  const draw = results.filter(r => r === 'draw').length

  const winRate = total === 0 ? 0 : Math.round((win / total) * 100)

  return {
    win,
    lose,
    draw,
    total,
    winRate,
  }
}

export function getStadiumStats(viewings: Viewing[], myTeam: string = MY_TEAM): Map<string, WinRateStat> {
  const stadiumGroups = new Map<string, GameResult[]>()

  for (const viewing of viewings) {
    const result = getViewingResult(viewing, myTeam)
    if (result === null) continue

    const stadium = viewing.stadium
    if (!stadiumGroups.has(stadium)) {
      stadiumGroups.set(stadium, [])
    }
    stadiumGroups.get(stadium)!.push(result)
  }

  const statsMap = new Map<string, WinRateStat>()
  for (const [stadium, results] of stadiumGroups) {
    statsMap.set(stadium, calculateWinRate(results))
  }

  return statsMap
}

export function getDayOfWeekStats(viewings: Viewing[], myTeam: string = MY_TEAM): Map<number, WinRateStat> {
  const dayGroups = new Map<number, GameResult[]>()

  for (const viewing of viewings) {
    const result = getViewingResult(viewing, myTeam)
    if (result === null) continue

    const [y, m, d] = viewing.date.split('-')
    const date = new Date(Number(y), Number(m) - 1, Number(d))
    const dayOfWeek = date.getDay()

    if (!dayGroups.has(dayOfWeek)) {
      dayGroups.set(dayOfWeek, [])
    }
    dayGroups.get(dayOfWeek)!.push(result)
  }

  const statsMap = new Map<number, WinRateStat>()
  for (const [day, results] of dayGroups) {
    statsMap.set(day, calculateWinRate(results))
  }

  return statsMap
}
