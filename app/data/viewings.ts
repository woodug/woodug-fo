export type Viewing = {
  id: number
  date: string
  status: '종료' | '예정' | '진행중'
  homeTeam: string
  homeShort: string
  homeLogo: string
  homePitcher?: string
  awayTeam: string
  awayShort: string
  awayLogo: string
  awayPitcher?: string
  homeScore?: number
  awayScore?: number
  time?: string
  stadium: string
  stadiumShort: string
  seat?: string
  memo?: string
}

export const viewings: Viewing[] = [
  {
    id: 1,
    date: '2026-06-09',
    status: '예정',
    time: '18:30',
    homeTeam: 'SSG 랜더스',
    homeShort: 'SSG',
    homeLogo: '/logo/landers.svg',
    homePitcher: '김광현',
    awayTeam: '삼성 라이온즈',
    awayShort: '삼성',
    awayLogo: '/logo/lions.png',
    awayPitcher: '최채흥',
    stadium: '인천 SSG 랜더스필드',
    stadiumShort: '문학',
  },
  {
    id: 2,
    date: '2026-06-08',
    status: '종료',
    homeTeam: 'KIA 타이거즈',
    homeShort: 'KIA',
    homeLogo: '/logo/tigers.png',
    awayTeam: 'SSG 랜더스',
    awayShort: 'SSG',
    awayLogo: '/logo/landers.svg',
    homeScore: 3,
    awayScore: 5,
    stadium: '광주-기아 챔피언스 필드',
    stadiumShort: '광주',
    memo: '원정 응원 직관, 역전승!',
  },
  {
    id: 3,
    date: '2026-05-24',
    status: '종료',
    homeTeam: 'SSG 랜더스',
    homeShort: 'SSG',
    homeLogo: '/logo/landers.svg',
    awayTeam: '두산 베어스',
    awayShort: '두산',
    awayLogo: '/logo/bears.png',
    homeScore: 7,
    awayScore: 3,
    stadium: '인천 SSG 랜더스필드',
    stadiumShort: '문학',
    seat: '1루 응원석 2구역',
  },
  {
    id: 4,
    date: '2026-05-10',
    status: '종료',
    homeTeam: 'SSG 랜더스',
    homeShort: 'SSG',
    homeLogo: '/logo/landers.svg',
    awayTeam: 'LG 트윈스',
    awayShort: 'LG',
    awayLogo: '/logo/twins.png',
    homeScore: 2,
    awayScore: 4,
    stadium: '인천 SSG 랜더스필드',
    stadiumShort: '문학',
    seat: '3루 내야석',
    memo: '연장 끝에 아쉽게 패배',
  },
  {
    id: 5,
    date: '2026-04-20',
    status: '종료',
    homeTeam: '한화 이글스',
    homeShort: '한화',
    homeLogo: '/logo/eagles.png',
    awayTeam: 'SSG 랜더스',
    awayShort: 'SSG',
    awayLogo: '/logo/landers.svg',
    homeScore: 1,
    awayScore: 1,
    stadium: '대전 한화생명 이글스파크',
    stadiumShort: '대전',
  },
]
