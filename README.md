# 권도영 포트폴리오

현업의 복잡한 문제를 데이터와 LLM·RAG·AI Agent 기반 서비스로 전환하고 운영한 경험을 정리한 AI/AX 엔지니어 포트폴리오입니다.

## Live

https://doyoung-data.github.io/doyoung-portfolio.github.io/

## 지원 회사별 포트폴리오

하나의 검증된 경력 사실을 유지하면서, 공고별 핵심 역량과 대표 프로젝트 순서를 다르게 보여줍니다.

- LG CNS AI(AX): https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=lgcns
- 롯데이노베이트 AI 서비스 엔지니어: https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=lotte
- DB Inc. S/W엔지니어(AX): https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=dbinc

각 주소는 첫 화면의 지원 문구, 직무 적합 근거, 기여 방향, 프로젝트 우선순위와 메타 정보를 해당 회사에 맞게 변경합니다. 기본 주소는 범용 AI/AX 포트폴리오로 유지됩니다.

## 주요 내용

- 현업 질문을 코드·업무 지식 RAG와 검증형 NL2SQL로 연결한 사내 AI 자비스
- 숫자·합계·근거·추정 구분을 확인하는 92문항 회귀 평가와 읽기 전용 안전장치
- 10개 이상 이커머스 원천의 수집·통합, 품질 검증과 목적별 조회 데이터셋
- 운영 DB, 60개 이상 Google Sheets 탭과 사내 통계 사이트로 이어지는 데이터 제공 구조
- 쿠팡 판매가 트래킹과 부분 실패 복구 설계
- 판매·재고·입고·MOQ를 함께 검토하는 수요예측·발주 AI
- 리뷰 수집·분석 도구와 관리자·AWS 운영 기반
- 내부 고객과 지표·예외·결과 화면을 조율하고 실사용 피드백을 반영한 AX 수행 경험
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
node --check js/company-portfolio.js
```

