# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**우덕(woodug)** — KBO 직관 기록 서비스의 프론트엔드 저장소.
KBO 팬이 직관 기록을 저장·분석하고 친구와 공유할 수 있는 서비스.

- **기술 스택**: Next.js 14+ (React 19), TypeScript, Tailwind CSS
- **역할**: 프론트엔드 전용 — 별도 백엔드 API 서버와 통신
- **저장소명**: woodug-fo (fo = frontend)

## 개발 환경 설정

### 초기 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start

# 린트 확인
npm run lint
```

### 기술 스택 상세

- **Next.js**: App Router 사용, src 디렉토리 없음
- **TypeScript**: 엄격한 타입 체크 활성화
- **Tailwind CSS**: 스타일링
- **ESLint**: 코드 품질 관리

## 주요 기능 도메인

1. **회원 기능** — 회원가입 / 로그인 / 로그아웃
2. **KBO 일정** — 날짜별 경기 조회, 팀 순위
3. **직관 기록** — 등록 / 수정 / 삭제 / 상세 조회
4. **사진 업로드** — 직관 기록에 사진 첨부
5. **직관 통계** — 전체 / 팀별 / 구장별 / 요일별 / 월별
6. **친구 기능** — 검색 / 요청 / 목록 / 삭제
7. **배지 시스템** — 게이미피케이션
8. **마이 페이지** — 프로필, 배지, 직관 목록
9. **알림** — 경기 시작, 친구 요청

## 프로젝트 구조

```
app/
├── layout.tsx          # Root 레이아웃
├── page.tsx            # 홈페이지
└── globals.css         # 글로벌 스타일 (Tailwind 포함)
public/                 # 정적 파일
next.config.ts          # Next.js 설정
tsconfig.json           # TypeScript 설정
tailwind.config.ts      # Tailwind CSS 설정
postcss.config.mjs      # PostCSS 설정
```

## 미확정 사항

프로젝트 초기 단계로 아래 항목은 아직 미결정 상태:
- 배지 지급 세부 조건
- 친구 피드 기능 포함 여부
- 소셜 로그인 지원 여부 (카카오·네이버 등)
- 알림 전달 방식 (푸시 / 인앱 / 이메일)
