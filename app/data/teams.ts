export type KBOTeam = {
  name: string
  short: string
  logo: string
}

export const KBO_TEAMS: KBOTeam[] = [
  { name: 'KIA 타이거즈', short: 'KIA', logo: '/logo/tigers.png' },
  { name: 'LG 트윈스', short: 'LG', logo: '/logo/twins.png' },
  { name: '삼성 라이온즈', short: '삼성', logo: '/logo/lions.png' },
  { name: 'SSG 랜더스', short: 'SSG', logo: '/logo/landers.svg' },
  { name: '두산 베어스', short: '두산', logo: '/logo/bears.png' },
  { name: '롯데 자이언츠', short: '롯데', logo: '/logo/giants.png' },
  { name: 'KT 위즈', short: 'KT', logo: '/logo/wiz.png' },
  { name: 'NC 다이노스', short: 'NC', logo: '/logo/dinos.png' },
  { name: '한화 이글스', short: '한화', logo: '/logo/eagles.png' },
  { name: '키움 히어로즈', short: '키움', logo: '/logo/heroes.png' },
]

export const DEFAULT_TEAM = KBO_TEAMS.find(t => t.name === 'SSG 랜더스')!
