# 권도영 포트폴리오

현업의 복잡한 문제를 데이터와 LLM·RAG·AI Agent 기반 서비스로 전환하고 운영한 경험을 정리한 AI/AX 엔지니어 포트폴리오입니다.

## Live

https://doyoung-data.github.io/doyoung-portfolio.github.io/

## 지원 회사별 포트폴리오

하나의 검증된 경력 사실을 유지하면서, 공고별 핵심 역량과 대표 프로젝트 순서를 다르게 보여줍니다.

- LG CNS AI(AX): https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=lgcns
- 롯데이노베이트 AI 서비스 엔지니어: https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=lotte
- DB Inc. S/W엔지니어(AX): https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=dbinc
- 다우기술 AI 개발: https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=daou

각 주소는 첫 화면, 직무 적합 근거, 기여 방향, 대표 프로젝트 설명·순서와 메타 정보를 해당 회사에 맞게 변경합니다. 기본 주소는 범용 AI/AX 포트폴리오로 유지됩니다. 다른 지원 회사로 이동하는 메뉴는 노출하지 않습니다.

| 지원 직무 | 강조 내용 | 대표 프로젝트 순서 |
| --- | --- | --- |
| LG CNS AI(AX) | 현업 문제 정의, AI 구현, 근거 검증과 품질 개선 | 자비스 → 데이터 플랫폼 → 발주 AI |
| 롯데이노베이트 AI 서비스 | REST API, 데이터 파이프라인, 인증과 AWS 운영 | 데이터 플랫폼 → 자비스 → 발주 AI |
| DB Inc. AX | Agent 도구 호출, 읽기 전용 검증, 사람의 최종 판단 | 자비스 → 발주 AI → 데이터 플랫폼 |
| 다우기술 AI 개발 | 커머스 상품 기준 통합, 사내 업무 AI, 사용자 피드백 | 자비스 → 데이터 플랫폼 → 발주 AI |

롯데용 화면에서는 학교·학과와 교내 과정 항목을 제거합니다. 이는 해당 화면의 표기 조정이며, 연결된 외부 GitHub·블로그까지 익명화하지는 않습니다. 실제 첨부 문서와 지원서도 별도로 블라인드 기준을 확인해야 합니다.

기존 경험을 회사별로 해석하되 GCP·Vertex AI·Kubernetes·모델 서빙 등 미확인 기술을 수행 경험에 추가하지 않습니다. 발주 AI는 추천·검토 지원이며 최종 발주 자동 실행으로 표현하지 않습니다. `92문항`은 기존 평가 문항 수이며 통과율이나 정확도를 뜻하지 않습니다.

직무 참고: [LG CNS 채용 안내](https://stat.yonsei.ac.kr/stat/board/job.do?articleNo=478661&mode=view), [롯데 공식 공고](https://recruit.lotte.co.kr/apply/announcement/detail/21933850?compcd=30007), [DB Inc. 공식 공고](https://dbgroup.recruiter.co.kr/career/jobs/125826), [다우기술 공식 직무 소개](https://blog.naver.com/daoustory/224384496875).

### 2026 방향 반영 기준

기업 소개가 포트폴리오를 대신하지 않도록 회사 방향은 기여 문단 한 곳에만 반영했습니다. 회사별 화면은 직무 요약 다음에 대표 프로젝트가 먼저 나오고, 상세 개발 과정이 이어집니다.

- LG CNS: [2026 신년사 보도](https://v.daum.net/v/20260102155844904)의 프로젝트 실행 역량과 [공식 AX Fair 2026](https://www.lgcns.com/kr/moa/event/detail.245)의 현장 적용 방향을 참고했습니다. 사이트에는 공식 행사 자료를 연결합니다.
- 롯데이노베이트: [2026 롯데그룹 신년사](https://www.lotte.co.kr/pr/newsView.do?srchNewsSeq=1697)의 AI 내재화·실행 방향을 참고했습니다. 계열사 대표의 신년사로 표기하지 않습니다.
- DB Inc.: 2026 신년사 원문을 확인하지 못해 [공식 AI Agent 서비스](https://agent.dbinc.co.kr/)와 공고를 참고했습니다.
- 다우기술: 2026 신년사 원문을 확인하지 못해 [공식 AX개발팀 직무 소개](https://blog.naver.com/daoustory/224384496875)를 참고했습니다.

2026-09-07 코드 점검 기준, 자비스의 문서 검색은 TF-IDF와 제목·본문 일치 점수를 사용하며 문서명·수정일을 컨텍스트로 제공합니다. 임베딩 모델 기반 검색이나 Vector DB 운영 경험으로 확대해 표현하지 않습니다. 기본 92문항과 판매 분석 100문항은 별도 평가셋이며, 중복 제거한 총 문항 수나 전체 통과율로 합산하지 않습니다. 신규 개선 제안은 구현·검증 전까지 수행 실적으로 공개하지 않습니다.

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

재직 회사명, 계정, 실제 상품, 매출, 재고, 내부 URL과 운영 소스는 포함하지 않습니다. 지원 대상 회사명은 맞춤 주소에서만 표시합니다. 데모 화면의 상품명과 수치는 포트폴리오용 합성 데이터입니다.

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

자비스 프로젝트는 업무 효과와 직접 수행 범위를 먼저 보여주고, `설계와 문제 해결`에서 조회 구조와 두 오류 개선 사례를 펼칩니다. 92개 기본 질문과 판매 분석 100문항은 별도 평가셋이며, 개수를 합산하거나 정확도로 표시하지 않습니다.

`#journey-jarvis` 또는 프로젝트의 시연 링크로 합성 데이터 시연에 바로 진입할 수 있습니다. 공개 시연은 브라우저 내 규칙 기반 응답이며 실제 LLM·SQL·사내 DB를 실행하지 않습니다. 판매처별 부분합 대조는 현재 선택한 상품·기간·옵션·판매처의 합성 데이터만 검산합니다. 운영 AI의 검색·답변 성능을 측정한 결과가 아닙니다.

개선 사례에는 운영 중 확인한 문제 유형과 대응 구조만 기재하고, 회사 원천 데이터·내부 경로·실제 질의 로그는 공개하지 않습니다. 제한 답변은 질문을 완전히 해결한 답변과 구분합니다.

```powershell
python -m unittest discover -s tests -v
node --check js/company-portfolio.js
node --check js/portfolio.js
node --check js/product-intelligence.js
```

Playwright가 설치된 환경에서는 로컬 서버 실행 후 회사별 렌더링·모바일·메뉴·테마·데모를 확인할 수 있습니다.

```powershell
node tests/check_company_portfolios.cjs
```

`PORTFOLIO_TEST_URL`로 테스트 주소, `PORTFOLIO_BROWSER_CHANNEL`로 설치된 브라우저(`msedge` 등), `PORTFOLIO_SCREENSHOTS`로 선택적 스크린샷 출력 폴더를 지정할 수 있습니다.

