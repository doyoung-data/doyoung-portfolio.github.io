# 권도영 포트폴리오

Python 백엔드, 이커머스 데이터 플랫폼, 업무자동화와 AI 서비스 개발 경험을 정리한 정적 포트폴리오입니다.

## Live

https://doyoung-data.github.io/doyoung-portfolio.github.io/

## 주요 내용

- 이커머스 다중 원천 데이터 통합과 Google Sheets 자동 갱신
- 쿠팡 판매가 트래킹과 부분 실패 복구 설계
- 사내 AI 자비스와 수요예측·발주 AI
- 리뷰 수집·분석 도구와 관리자·AWS 운영 기반
- 합성 데이터로 재현한 통계 사이트, 발주 검토, AI 질의 데모
- 로컬 메타데이터만 집계한 Codex 개발 활동과 최근 52주 히트맵

## 공개 원칙

회사명, 계정, 실제 상품, 매출, 재고, 내부 URL과 운영 소스는 포함하지 않습니다. 화면에 표시되는 상품명과 수치는 포트폴리오용 합성 데이터입니다.

## 로컬 실행

정적 사이트이므로 간단한 HTTP 서버에서 확인할 수 있습니다.

```bash
python -m http.server 4173
```

브라우저에서 `http://127.0.0.1:4173/`을 엽니다.

## Codex 활동 집계

`scripts/build_codex_activity.py`는 로컬 Codex rollout의 `token_count` 이벤트만 읽어 `data/codex-activity.json`을 만듭니다. 대화 내용, 코드, 회사 데이터, 프로젝트명과 파일 경로는 결과에 포함하지 않습니다.

```powershell
python scripts/build_codex_activity.py
```

집계 기준은 Codex 로컬 기록이며 공식 프로필과 갱신 시점 또는 수치가 다를 수 있습니다. 포트폴리오 화면에도 이 기준을 명시합니다.

## 자동 갱신

`scripts/publish_codex_activity.ps1`은 깨끗한 `main` 브랜치에서만 실행되며, `data/codex-activity.json` 외 파일이 바뀌면 커밋하지 않고 중단합니다. 새 활동이 있을 때만 JSON을 커밋하고 GitHub Pages에 푸시합니다.

매일 23:55 KST에 실행되는 Windows 예약 작업 설치:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/install_codex_activity_task.ps1
```

예약 작업 제거:

```powershell
Unregister-ScheduledTask -TaskName "DoyoungPortfolioCodexActivity" -Confirm:$false
```

실행 기록은 `%LOCALAPPDATA%\DoyoungPortfolio\codex-activity.log`에 저장됩니다.

## 테스트

```powershell
python -m unittest discover -s tests -v
```

