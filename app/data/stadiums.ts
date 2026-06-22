import { Stadium } from '@/app/lib/types'

export const stadiums: Stadium[] = [
  { id: 'jamsil', name: '잠실야구장', location: '서울' },
  { id: 'suwon', name: '수원KT위즈파크', location: '수원' },
  { id: 'incheon', name: '인천SSG랜더스필드', location: '인천' },
  { id: 'sajik', name: '사직야구장', location: '부산' },
  { id: 'daegu', name: '대구삼성라이온즈파크', location: '대구' },
  { id: 'daejeon', name: '한화생명이글스파크', location: '대전' },
  { id: 'gwangju', name: '광주기아챔피언스필드', location: '광주' },
  { id: 'changwon', name: '창원NC파크', location: '창원' },
  { id: 'gocheok', name: '고척스카이돔', location: '서울' },
]

export const getStadium = (id: string): Stadium | undefined =>
  stadiums.find((s) => s.id === id)
