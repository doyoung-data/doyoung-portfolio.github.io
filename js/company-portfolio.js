(function () {
  "use strict";

  const profiles = {
    hanwha: {
      company: "한화금융",
      role: "AI/데이터 · Engineer",
      title: "권도영 | 한화금융 AI/데이터 Engineer 지원 포트폴리오",
      description: "데이터 파이프라인·업무 대시보드·RAG 기반 AI 백엔드를 구축하고 검증·운영한 권도영의 한화금융 AI/데이터 Engineer 지원 포트폴리오입니다.",
      brand: "한화금융 · AI/데이터",
      eyebrow: "한화금융 · AI/데이터 Engineer",
      statement: "데이터의 기준을 맞추고,<br>근거를 확인하는 AI로 연결합니다.",
      heroDescription: "이커머스 기업 AI팀의 1인 개발자로 데이터 수집·통합, 업무 대시보드와 자연어 조회 AI를 구축·운영했습니다. 현업과 상품·지표 기준을 정리하고, Python·SQL·FastAPI로 조회와 답변을 연결했습니다. AWS 배포 이후에도 데이터 누락과 AI의 숫자 오류를 확인하며 검증·복구 흐름을 개선했습니다.",
      note: "직접 수행 · 데이터 파이프라인 → 업무 화면 → AI 백엔드 → 검증·운영",
      consoleFile: "hanwha_data_engineering.yml",
      console: '<span class="code-key">통합</span>  API · CSV → 상품·기간 기준 정리\n<span class="code-key">제공</span>  DB → 대시보드 · 업무 시트\n<span class="code-key">연결</span>  문서 RAG + NL2SQL · Tool Calling\n<span class="code-key">검증</span>  원천 대조 · 읽기 전용 · 실패 복구',
      heroFacts: [
        { value: "10+", label: "연동 데이터 원천" },
        { value: "60+", label: "자동 갱신 업무 시트 탭" },
        { value: "RAG · SQL", label: "업무 지식과 실데이터 조회" },
        { value: "AWS", label: "직접 배포·운영" }
      ],
      fitKicker: "HANWHA FINANCE · AI / DATA ENGINEER",
      fitTitle: "데이터 기반부터<br>업무에 쓰이는 AI까지",
      fitSummary: "데이터 파이프라인, RAG·Agent 백엔드, 업무 대시보드를 연결한 경험입니다. 기능뿐 아니라 집계 기준과 실제 사용 중 발생한 문제까지 직접 다뤘습니다.",
      fitItems: [
        { label: "데이터 파이프라인", heading: "서로 다른 원천을 같은 기준으로 연결", body: "API·CSV·크롤링 데이터를 Python·SQL로 통합했습니다. 상품·옵션·기간·단위 기준을 맞추고, 누락·수집 실패와 실제 0을 구분해 DB·시트·대시보드로 제공했습니다." },
        { label: "AI 서비스 백엔드", heading: "문서 검색과 최신 수치 조회를 분리", body: "사내 AI 자비스에서 업무 기준은 RAG로, 변하는 수치는 NL2SQL·Tool Calling으로 조회했습니다. 읽기 전용 접근과 답변 근거 표시, 합계·부분합 대조를 적용했습니다." },
        { label: "현업 연계와 운영", heading: "사용자의 판단 기준을 화면과 검증에 반영", body: "직원들이 시트에서 확인하는 지표와 이슈를 직접 묻고 판매처별 페이지를 만들었습니다. 배포 후에는 저장 결과 대조와 미완료 항목 재처리로 운영 중 실패에 대응했습니다." }
      ],
      contributionTitle: "한화금융에서 기여하고 싶은 방향",
      contributionBody: "현업의 기준을 데이터와 AI 서비스로 옮긴 경험을 한화금융의 데이터·플랫폼 업무에 활용하고 싶습니다. 금융 상품과 업무 절차, 개인정보 처리 기준은 담당자와 함께 배우고 확인하겠습니다. 팀의 설계·검토 기준에 맞춰 파이프라인과 AI 조회 기능을 구현하고, 실제 사용자 질문과 오류 사례로 품질을 개선하겠습니다.",
      directionSource: { label: "참고 · 한화금융 공식 직무 소개·인재상", url: "https://www.recruit-hanwhafinance.com/#section02" },
      supportingSource: { label: "공식 공고 · 2026 한화금융 신입공채", url: "https://www.hanwhain.com/portal/apply/recruit/detail?rtSeq=19498" },
      experienceTitle: "문제를 묻고,<br>판단의 근거를 만든 경험",
      experienceSummary: "시트를 선호하는 이유를 묻고 화면을 바꾼 경험, AI의 숫자 오류를 검증 규칙으로 바꾼 경험입니다. SQLD·ADsP와 전문교육에서 쌓은 기반을 실무에 적용하며, 운영에서 발견한 문제를 다시 학습하고 개선했습니다.",
      foundationTitle: "교육에서 구현하고, 실무로 확장한 데이터·AI 경험",
      foundationSummary: "FastAPI·RAG 챗봇과 데이터 파이프라인 팀 프로젝트, 모델 학습 경험입니다. 교육 과정의 실습과 사내 서비스 운영 범위를 구분해 정리했습니다.",
      scopeKicker: "DATA · SERVICE · QUALITY · OPERATIONS",
      scopeTitle: "수집한 데이터가<br>판단의 근거가 되기까지",
      scopeSummary: "무엇을 조회할지 현업과 정한 뒤, 데이터 구조와 AI 응답을 연결했습니다. 미확인 값과 실제 값을 구분하고 운영 중 발견한 실패를 검증 규칙에 반영했습니다.",
      scopeLanes: [
        { label: "01 · BUSINESS CONTEXT", title: "업무와 기준 이해", items: [
          ["사용 목적 질문", "담당자가 어떤 지표를 보고 어떤 이슈와 조치를 판단하는지 확인"],
          ["데이터 기준 정리", "상품·옵션·세트 구성과 조회 기간·단위를 현업과 조율"],
          ["사용자별 화면", "전체 현황 조회와 개별 판매처 담당자의 확인 흐름을 구분"],
          ["실사용 피드백", "기존 시트도 지원하고 사이트 사용 후 추가 요청을 개선에 반영"]
        ] },
        { label: "02 · DATA PIPELINE", title: "수집·통합·제공", items: [
          ["원천 수집", "API·CSV·크롤링 데이터를 Python으로 수집·처리"],
          ["정규화와 저장", "서로 다른 상품코드와 옵션을 공통 기준으로 매핑해 DB에 연결"],
          ["품질 확인", "누락·실패와 실제 0을 구분하고 기준일·단위·집계값을 대조"],
          ["업무 데이터 제공", "통계 사이트와 Google Sheets에 목적별 조회·집계 결과 제공"]
        ] },
        { label: "03 · AI BACKEND", title: "질문·조회·검증", items: [
          ["문서와 수치 구분", "업무 기준은 문서 RAG, 최신 수치는 NL2SQL·Tool Calling으로 조회"],
          ["서비스 연결", "FastAPI로 사용자 질문·화면 조건·조회 결과·응답 흐름 연결"],
          ["접근과 근거", "읽기 전용 조회와 답변 근거·기준일 표시 적용"],
          ["응답 검증", "합계·부분합을 대조하고 미확인 값은 확정하지 않도록 보완"]
        ] },
        { label: "04 · OPERATE & LEARN", title: "운영·복구·개선", items: [
          ["AWS 운영", "서버 구성·배포·예약 실행과 로그·백업 관리"],
          ["상태와 재처리", "수집·저장 오류를 분리하고 결과 보존·미완료 항목 재처리 적용"],
          ["전달 결과 확인", "저장한 상품 식별정보·가격·수집시간을 다시 읽어 대조"],
          ["실패에서 학습", "숫자 오류·빈 응답을 재현하고 검색·숫자·답변 완결성을 나눠 평가"]
        ] }
      ],
      workKicker: "HANWHA FINANCE · RELEVANT EXPERIENCE",
      workTitle: "데이터 기반 위에 업무 서비스와 AI를 연결했습니다",
      workSummary: "데이터 자동화는 2025.12, 통계 사이트는 2026.03, 자비스는 2026.07부터 개발·개선해 왔습니다. 각 프로젝트의 직접 수행 범위와 문제 해결 과정, 검증의 한계를 함께 정리했습니다.",
      contactTitle: "업무를 배우고,<br>데이터와 AI로 가치를 만들겠습니다.",
      contactSummary: "현업의 질문을 구현과 운영 개선으로 연결한 실행력을 바탕으로, 한화금융의 동료들과 데이터 기준·품질·사용 목적을 함께 확인하는 AI/데이터 Engineer로 성장하겠습니다.",
      projectOrder: ["data-platform", "jarvis", "order-ai"],
      projectSummaries: {
        "data-platform": "판매처별 상품코드·옵션·세트 기준이 달라 단순 수집만으로는 지표를 비교할 수 없었습니다. 현업과 공통 기준을 정리하고 Python·SQL로 수집·정규화·DB 저장·자동 갱신을 연결했습니다. 통계 사이트와 업무 시트에 같은 기준의 데이터를 제공하고, 담당자의 확인 흐름에 맞춰 판매처별 전용 페이지를 개발했습니다.",
        jarvis: "판매·광고·재고를 자연어로 조회하는 사내 AI를 구축했습니다. 설명이 필요한 업무 기준은 RAG로 검색하고 최신 수치는 NL2SQL·Tool Calling으로 조회하도록 분리했습니다. 숫자 오류와 응답 중단을 겪으며 읽기 전용 접근, 합계 대조, 근거 표시와 제한 답변을 보강했습니다. 검색·숫자·답변 완결성을 따로 평가하며 개선 중입니다.",
        "order-ai": "판매·재고·입고 예정과 배송 기간·최소 주문수량을 함께 반영해 발주 검토를 지원했습니다. 추천량과 판단 근거를 제시하고, 이력이 부족하거나 수요가 급변한 상품은 별도 검토 대상으로 분리했습니다. 결과를 자동 확정하지 않고 현업 담당자가 최종 판단하는 흐름으로 연결했습니다."
      },
      textOverrides: {
        "[data-profile-current-role]": "이커머스 기업 · AI팀 매니저",
        "[data-profile-support-kicker]": "BUSINESS CONTEXT · RELIABILITY",
        "#support-title": "현업이 신뢰하고 사용할 수 있도록",
        "[data-profile-support-summary]": "기능 개발에 더해 접근 범위, 데이터 기준과 사용자 피드백을 함께 다뤘습니다.",
        "[data-profile-adoption-title]": "질문에서 시작한 화면 개선",
        "[data-profile-adoption-body]": "직원들이 시트에서 확인하는 지표와 이슈를 묻고 판매처별 페이지에 반영했습니다. 일부 직원의 사이트 활용과 추가 기능 요청을 후속 개선으로 연결했습니다.",
        "#architecture-title": "업무 원천에서 데이터·AI 서비스까지",
        "[data-profile-architecture-summary]": "수집·표준화·저장·자동 갱신을 통계 사이트와 업무 시트에 연결하고, 같은 데이터를 AI 조회와 발주 검토에 활용했습니다.",
        "[data-project-key='data-platform'] h3": "데이터 파이프라인 · 업무 대시보드"
      }
    },
    sempio: {
      company: "샘표",
      role: "플랫폼 개발자(정규직)",
      title: "권도영 | 샘표 플랫폼 개발자 지원 포트폴리오",
      description: "현업 요구사항 분석부터 웹 기반 업무 시스템, 데이터·API 연동, AWS 배포와 유지보수까지 직접 수행한 권도영의 샘표 플랫폼 개발자 지원 포트폴리오입니다.",
      brand: "샘표 · 플랫폼 개발자",
      eyebrow: "샘표 플랫폼 개발자(정규직) · 지원 포트폴리오",
      statement: "현업의 업무를 이해하고,<br>매일 쓰는 시스템으로 만듭니다.",
      heroDescription: "이커머스 기업 AI팀의 1인 개발자로 통계 사이트와 데이터 연동 시스템을 구축·운영했습니다. 현업 요구사항을 조회·집계 로직과 화면으로 구현하고, AWS 배포·오류 복구까지 담당했습니다. 같은 데이터 기반에 AI 조회와 발주 검토 기능을 연결했습니다.",
      note: "직접 수행 · 요구사항 분석 → 시스템 설계·개발 → 배포·유지보수",
      consoleFile: "sempio_platform_delivery.yml",
      console: '<span class="code-key">요구</span>  담당자가 확인할 지표와 업무 기준\n<span class="code-key">구현</span>  데이터·API 연동 + 판매처별 화면\n<span class="code-key">검증</span>  원천 대조 + 저장 결과 재확인\n<span class="code-key">운영</span>  AWS + 예약 실행 + 부분 실패 복구',
      heroFacts: [
        { value: "10+", label: "연동 데이터 원천" },
        { value: "60+", label: "자동 갱신 시트 탭" },
        { value: "Web · API", label: "업무 화면과 외부 데이터 연동" },
        { value: "AWS", label: "직접 배포·운영·유지보수" }
      ],
      fitKicker: "SEMPIO · PLATFORM DEVELOPMENT",
      fitTitle: "업무 이해에서<br>시스템 운영까지",
      fitSummary: "실무자가 무엇을 확인하고 판단하는지 파악한 뒤, 데이터 구조·조회 로직·화면으로 구체화했습니다.",
      fitItems: [
        { label: "요구사항과 웹 개발", heading: "사용자의 업무에 맞춰 바꾼 통계 사이트", body: "통합 조회를 선호하지 않는 담당자의 의견을 듣고, 확인 지표와 이슈의 위치를 파악해 판매처별 전용 페이지를 구현했습니다." },
        { label: "데이터·API 연동", heading: "원천부터 업무 화면까지 이어지는 데이터", body: "판매처마다 다른 상품·옵션 기준을 맞추고 Python·SQL로 API·CSV·크롤링 데이터를 연결했습니다. DB·시트·통계 화면에 같은 기준을 적용했습니다." },
        { label: "배포와 유지보수", heading: "오류 이후에도 이어갈 수 있는 운영 구조", body: "AWS 서버와 예약 실행을 관리했습니다. 수집·저장 실패를 분리하고 상태 보존, 미완료 항목 재처리와 저장 결과 대조로 복구 흐름을 보완했습니다." }
      ],
      contributionTitle: "샘표에서 기여하고 싶은 방향",
      contributionBody: "판매·재고 업무를 시스템으로 구현한 경험을 바탕으로, 샘표의 현업 요구사항을 이해하고 웹 기반 업무 시스템의 개발·유지보수에 기여하고 싶습니다. 제조·구매 등 새롭게 접할 업무 기준은 담당자에게 배우고, 팀의 개발 표준과 검토 절차에 맞춰 기존 시스템과 안정적으로 연결하겠습니다.",
      directionSource: { label: "참고 · 샘표 공식 플랫폼 개발 직무 소개", url: "https://sempio.recruiter.co.kr/career/jobs" },
      supportingSource: { label: "지원 공고 · 플랫폼 개발자(정규직)", url: "https://sempio.recruiter.co.kr/career/jobs/127143" },
      experienceTitle: "직접 묻고,<br>설계를 바꾼 경험",
      experienceSummary: "개발은 혼자 담당했지만 요구사항과 판단 기준은 현업과 함께 정리했습니다. 익숙한 시트를 유지하면서 더 편한 조회 화면을 제공하는 방식으로 사용자의 선택을 넓혔습니다.",
      foundationTitle: "웹 서비스와 데이터 처리의 기반을 쌓은 프로젝트",
      foundationSummary: "FastAPI 백엔드·프론트엔드를 직접 구현한 챗봇, 팀장으로 수행한 데이터 파이프라인 프로젝트와 모델 학습 경험입니다. 교육 프로젝트와 사내 운영 실적은 구분합니다.",
      scopeKicker: "REQUIREMENTS · BUILD · OPERATE",
      scopeTitle: "화면을 만드는 일에서<br>계속 쓰이게 하는 일까지",
      scopeSummary: "현업의 확인 항목을 데이터·API·화면으로 옮기고, 배포 이후에는 처리 결과와 사용자 피드백을 다시 확인했습니다. Codex를 활용한 코드 분석·구현에도 원천 대조와 결과 검증을 적용합니다.",
      scopeLanes: [
        { label: "01 · REQUIREMENTS", title: "요구사항 분석", items: [
          ["업무 목적 확인", "기존 시트를 보는 이유, 추적 지표와 이슈를 찾는 위치를 담당자에게 질문"],
          ["집계 기준 합의", "상품·옵션·세트 구성, 기간·단위·누락값 처리 기준을 현업과 확인"],
          ["화면 범위 구분", "전체 현황을 보는 사용자와 개별 판매처 담당자의 조회 목적을 구분"],
          ["기존 흐름 유지", "시트도 자동화해 지원하고 두 도구를 비교·선택할 수 있는 환경 제공"]
        ] },
        { label: "02 · DESIGN & BUILD", title: "데이터·웹 시스템 개발", items: [
          ["데이터 연결", "Python·SQL로 API·CSV·크롤링 원천을 공통 상품 기준에 연결"],
          ["조회·집계 로직", "판매·광고·재고·입고 정보를 업무 목적별 조회 데이터셋으로 구성"],
          ["사용자 화면", "통합 조회와 판매처별 전용 페이지를 구현하고 현업 의견을 반영"],
          ["서비스 연동", "통계 사이트·Google Sheets·AI에서 데이터를 활용하도록 연결"]
        ] },
        { label: "03 · DEPLOY & VERIFY", title: "배포와 결과 검증", items: [
          ["AWS 환경", "계정·서버·도메인과 예약 실행을 구성하고 배포 이후 운영까지 담당"],
          ["원천 대조", "데이터의 기준일·단위·합계와 부분합을 확인하고 누락과 실제 0을 구분"],
          ["저장 결과 확인", "가격 저장 후 상품 식별정보·가격·수집시간을 다시 읽어 대조"],
          ["사용 경계", "회원·인증·세션 등 운영 기능과 AI의 읽기 전용 데이터 조회 적용"]
        ] },
        { label: "04 · MAINTAIN & IMPROVE", title: "유지보수와 기능 확장", items: [
          ["실패 원인 구분", "데이터 수집 중단과 저장 오류를 나눠 확인하고 처리 상태를 기록"],
          ["부분 실패 복구", "확보한 결과를 보존하고 미완료 항목부터 다시 진행하는 흐름 보완"],
          ["사용자 피드백", "일부 직원의 사이트 활용과 추가 요청을 후속 기능 개선으로 연결"],
          ["AI 기능 확장", "기존 데이터에 자연어 조회·발주 검토를 추가하고 최종 판단은 담당자가 수행"]
        ] }
      ],
      workKicker: "SEMPIO · RELEVANT EXPERIENCE",
      workTitle: "업무 시스템을 구축하고 확장한 경험",
      workSummary: "통계 사이트와 데이터 연동을 중심으로, 현업 피드백·운영 복구·AI 기능 확장까지 직접 수행했습니다.",
      contactTitle: "샘표의 업무를 이해하고,<br>현장에서 쓰이는 시스템을 만들겠습니다.",
      contactSummary: "요구사항을 데이터와 화면으로 구현한 실행력에 동료의 전문성과 개발 표준을 더해, 구축 이후의 운영까지 책임지는 플랫폼 개발자로 성장하겠습니다.",
      projectOrder: ["data-platform", "order-ai", "jarvis"],
      projectSummaries: {
        "data-platform": "판매·광고·재고 데이터를 수집·통합하고 담당자가 직접 조회하는 사내 통계 사이트를 구축했습니다. 현업과 상품·옵션·기간 기준을 정리한 뒤 DB·API·화면·Google Sheets를 연결했습니다. 통합 화면이 불편하다는 의견은 판매처별 전용 페이지와 조회·집계 로직 개선에 반영했습니다.",
        "order-ai": "판매·재고·입고 예정·배송 기간·최소 주문수량을 함께 확인하는 발주 검토 기능을 개발했습니다. 여러 자료를 대조하던 업무를 추천량·판단 근거·예외 상품으로 정리하고, 담당자가 검토 후 최종 결정하도록 기존 업무 흐름에 연결했습니다.",
        jarvis: "구축한 데이터 기반을 자연어 조회로 확장했습니다. 업무 기준은 문서 검색으로, 최신 수치는 읽기 전용 DB 조회로 확인합니다. 합계·부분합과 답변 근거를 검증하고, 응답이 중단되면 확인한 데이터만 제한적으로 제공합니다. 복잡한 질문의 완결성은 별도 평가하며 개선 중입니다."
      },
      textOverrides: {
        "[data-profile-current-role]": "이커머스 기업 · AI팀 매니저",
        "[data-profile-support-kicker]": "COLLABORATION · RELIABILITY",
        "#support-title": "업무 시스템이 현장에 정착하기 위한 일",
        "[data-profile-support-summary]": "요구사항 조율, 접근 관리, 오류 대응과 사용자 피드백까지 개발 범위로 다뤘습니다.",
        "[data-profile-security-title]": "업무 데이터와 접근 관리",
        "[data-profile-adoption-title]": "현업 피드백과 개선",
        "[data-profile-adoption-body]": "시트가 편한 이유와 필요한 기능을 묻고 판매처별 페이지로 반영했습니다. 사용 도구를 강제하지 않고, 추가 요청을 바탕으로 기능을 개선했습니다.",
        "#architecture-title": "데이터가 업무 화면에 도달하는 전체 흐름",
        "[data-profile-architecture-summary]": "원천 수집·정규화·저장·자동 갱신을 연결해 통계 사이트와 시트에 제공하고, 같은 기반을 AI 조회와 발주 검토로 확장했습니다.",
        "[data-profile-architecture-use]": "통계 사이트 · 시트 · 발주 검토 · AI 조회",
        "[data-project-key='data-platform'] h3": "통계 사이트 · 데이터 연동 플랫폼",
        "[data-project-key='order-ai'] h3": "판매·재고 기반 발주 검토 지원"
      }
    },
    lgcns: {
      company: "LG CNS",
      role: "AI(AX)",
      title: "권도영 | LG CNS AI(AX) 지원 포트폴리오",
      description: "RAG·NL2SQL·Tool Calling 기반 AI Agent와 데이터 파이프라인을 실제 업무에 구축·운영한 권도영의 LG CNS AI(AX) 지원 포트폴리오입니다.",
      brand: "LG CNS · AI(AX)",
      eyebrow: "LG CNS AI(AX) · 지원 포트폴리오",
      statement: "현업의 질문을 이해하고,<br>근거를 확인하는 AI로 구현합니다.",
      heroDescription: "AI팀의 1인 개발자로 사내 데이터 AI 자비스를 구축했습니다. 마케팅·영업·수요예측 담당자와 업무 기준을 맞추고, 데이터 통합부터 AI 개발·배포·답변 검증·운영까지 직접 담당했습니다.",
      note: "직접 수행 · 문제 정의 → 데이터 통합 → AI 개발 → 검증·운영",
      consoleFile: "lgcns_ai_ax_fit.yml",
      console: '<span class="code-key">문제</span>  흩어진 자료와 반복되는 질문\n<span class="code-key">구현</span>  업무 지식 검색 + 실데이터 조회\n<span class="code-key">검증</span>  합계 대조 + 근거·추정 구분\n<span class="code-key">운영</span>  읽기 전용 권한 + 오류 대응',
      fitKicker: "LG CNS · POSITION FIT",
      fitTitle: "현업에 적용하고,<br>검증하며 개선한 AI",
      fitSummary: "새로운 기능을 만드는 데서 멈추지 않고, 사용자의 질문과 오류 사례를 서비스 개선으로 연결했습니다.",
      fitItems: [
        {
          label: "업무 이해와 구현",
          heading: "현업의 질문을 데이터 AI로 전환",
          body: "담당자와 지표·조회 기간·예외 기준을 맞추고, 업무 지식 검색과 데이터 조회를 연결해 자비스를 구현했습니다."
        },
        {
          label: "데이터와 서비스",
          heading: "데이터 파이프라인부터 배포·운영까지",
          body: "API·CSV·크롤링 수집, 데이터 정규화·검증, FastAPI 서비스와 AWS 운영 환경을 하나의 흐름으로 직접 구성했습니다."
        },
        {
          label: "검증과 개선",
          heading: "답변의 숫자와 근거를 다시 검증",
          body: "회귀 평가, 최종 합계·부분합 대조와 읽기 전용 조회를 적용했습니다. 답변 중단 시에는 확보한 데이터만 제한적으로 제공합니다."
        }
      ],
      contributionTitle: "LG CNS에서 기여하고 싶은 방향",
      contributionBody: "LG CNS가 강조하는 산업 현장의 AX 실행에 기여하고 싶습니다. 내부 현업과 업무 기준을 맞춰온 경험을 고객 프로젝트로 확장하고, 요구사항·데이터·평가 기준을 연결해 적용 이후의 품질까지 개선하겠습니다.",
      directionSource: { label: "참고 · LG CNS AX Fair 2026", url: "https://www.lgcns.com/kr/moa/event/detail.245" },
      scopeKicker: "CUSTOMER AI TRANSFORMATION",
      scopeTitle: "고객 문제를 AI 서비스로<br>전환해 운영합니다.",
      scopeSummary: "현업 요구사항을 구조화하고 신뢰할 수 있는 데이터와 LLM을 연결해, 고객이 실제로 사용하는 AI 서비스를 배포하고 품질을 개선합니다.",
      workKicker: "LG CNS · RELEVANT EXPERIENCE",
      workTitle: "업무 질문을 AI 서비스로 바꾼 과정",
      workSummary: "자비스의 조회·검증 구조, 그 기반이 된 데이터 통합, 발주 검토로 확장한 경험입니다.",
      contactTitle: "LG CNS의 고객 현장에<br>적용되는 AI를 만들겠습니다.",
      contactSummary: "비즈니스 문제를 이해하고 Agentic AI와 데이터 기반 서비스로 구현해 운영까지 책임지는 AI(AX) 엔지니어가 되겠습니다.",
      projectOrder: ["jarvis", "data-platform", "order-ai"],
      projectSummaries: {
        jarvis: "판매·광고·재고를 묻는 현업 질문을 업무 지식 검색(RAG), NL2SQL, Tool Calling으로 연결했습니다. 조회값과 기준일·근거를 제공하고, 합계 대조·읽기 전용 권한·오류 시 제한 답변을 적용했습니다. 실사용 피드백을 평가 문항으로 반영하며 고도화하고 있습니다.",
        "data-platform": "AI가 답할 수 있으려면 먼저 서로 다른 데이터의 기준이 맞아야 했습니다. 판매처마다 다른 상품코드·옵션·세트 구성을 공통 SKU로 연결하고, 날짜·단위·결측 기준을 정리했습니다. 같은 데이터를 사내 통계 화면과 Google Sheets에도 제공해 실무자가 직접 비교하도록 구현했습니다.",
        "order-ai": "판매·재고·입고 예정과 발주 제약을 함께 검토하는 수요예측·발주 AI를 처음부터 구축했습니다. 추천량뿐 아니라 판단 근거와 예외 상품을 제공하고, 현업 담당자가 최종 확인하는 업무 흐름으로 적용했습니다."
      }
    },
    lotte: {
      company: "롯데이노베이트",
      role: "AI 서비스 엔지니어",
      title: "권도영 | 롯데이노베이트 AI 서비스 엔지니어 지원 포트폴리오",
      description: "AI 서비스 API, 데이터 파이프라인과 클라우드 운영을 직접 구축한 권도영의 롯데이노베이트 AI 서비스 엔지니어 지원 포트폴리오입니다.",
      brand: "롯데이노베이트 · AI 서비스",
      eyebrow: "롯데이노베이트 AI 서비스 엔지니어 · 지원 포트폴리오",
      statement: "AI 기능을 API로 연결하고,<br>데이터와 운영을 책임집니다.",
      heroDescription: "AI팀의 1인 개발자로 판매·광고·재고 데이터를 연결하고, Python·FastAPI 기반 업무 화면과 자연어 조회 AI를 구축했습니다. 현업 요구사항 정리부터 AWS 배포·운영까지 맡았으며, 수집·저장 실패와 AI의 숫자 오류를 확인하고 복구 흐름을 개선했습니다.",
      note: "직접 수행 · REST API · 데이터 파이프라인 · AWS 운영",
      consoleFile: "lotte_ai_service_fit.yml",
      console: '<span class="code-key">수집</span>  API · CSV · 크롤링\n<span class="code-key">가공</span>  상품 매핑 · 결측 구분 · 검증\n<span class="code-key">제공</span>  REST API · 업무 화면 · AI\n<span class="code-key">운영</span>  인증 · 로그 · 재시도 · 백업',
      heroFacts: [
        { value: "10+", label: "연동 데이터 원천" },
        { value: "60+", label: "자동 갱신 시트 탭" },
        { value: "FastAPI", label: "업무 데이터와 AI 서비스 연결" },
        { value: "AWS", label: "서버 구성부터 배포·운영" }
      ],
      fitKicker: "LOTTE INNOVATE · POSITION FIT",
      fitTitle: "백엔드·데이터·운영을<br>하나로 연결한 경험",
      fitSummary: "데이터가 수집된 뒤 사용자의 화면과 AI 답변에 도달하기까지, 서비스의 각 단계를 직접 구현했습니다.",
      fitItems: [
        {
          label: "백엔드 개발",
          heading: "Python·FastAPI 기반 사내 AI 서비스",
          body: "사용자의 질문과 화면의 상품·기간 조건을 받아 문서 검색·DB 조회·답변으로 연결했습니다. 조회는 읽기 전용으로 제한하고, 회원·인증·세션 등 서비스 운영 기능도 구현했습니다."
        },
        {
          label: "파이프라인 구축",
          heading: "수집부터 실무 화면까지 이어지는 데이터",
          body: "현업과 상품·옵션·집계 기준을 맞춘 뒤 API·CSV·크롤링 데이터를 DB로 통합했습니다. Google Sheets와 통계 사이트에 연결하고, 담당자 의견을 판매처별 전용 페이지에 반영했습니다."
        },
        {
          label: "운영과 품질",
          heading: "AWS 운영과 AI 품질 고도화",
          body: "AWS 서버·예약 실행·로그·백업을 관리했습니다. 미완료 작업 재처리, 저장 결과 대조, AI 합계 검증과 응답 중단 시 제한 답변으로 실패 상황에 대응했습니다."
        }
      ],
      contributionTitle: "롯데이노베이트에서 기여하고 싶은 방향",
      contributionBody: "롯데백화점 ‘브랜드 AI’ 사례에서 유통 데이터를 업무 맥락에 맞춰 연결하고, 사내 시스템 연계와 운영까지 구현한 점에 주목했습니다. 판매·광고·재고 데이터를 업무 화면과 AI로 연결한 경험을 바탕으로, 고객의 요구를 API·데이터 파이프라인으로 구현하고 배포 이후 품질을 개선하는 AI 서비스 엔지니어로 기여하고 싶습니다.",
      directionSource: { label: "공식 사례 · 롯데백화점 브랜드 AI 구축", url: "https://www.lotteinnovate.com/ko/company/news/press/list/0/931" },
      supportingSource: { label: "지원 공고 · AI 서비스 엔지니어(AI서비스팀)", url: "https://recruit.lotte.co.kr/apply/announcement/detail/21933850?compcd=30007" },
      experienceTitle: "현업의 확인 방식을 듣고,<br>서비스 설계를 바꿨습니다.",
      experienceSummary: "통합 화면을 선호하지 않는 담당자에게 시트가 편한 이유와 필요한 기능을 직접 물었습니다. 판매처별 전용 페이지를 만들고 기존 시트도 자동화하자, 일부 직원이 사이트를 사용하기 시작하고 추가 기능을 요청했습니다.",
      foundationTitle: "서비스 구현의 기본기를 쌓은 프로젝트",
      foundationSummary: "교육 프로젝트에서는 RAG·프롬프트·FastAPI·프론트엔드를 직접 연결한 챗봇과 팀장으로 수행한 데이터 파이프라인을 경험했습니다. 교육 실습과 사내 운영 경험은 구분합니다.",
      scopeKicker: "AI SERVICE ENGINEERING",
      scopeTitle: "AI 서비스를 백엔드·데이터·운영까지<br>하나의 흐름으로 만듭니다.",
      scopeSummary: "정상 실행뿐 아니라 누락·실패·응답 중단을 고려해 서비스를 구현했습니다. 데이터의 정확성, AI 답변의 근거, 질문 전체에 대한 답변 완결성을 나눠 검증합니다.",
      scopeLanes: [
        { label: "01 · BUSINESS & DATA", title: "업무 기준과 데이터", items: [
          ["업무 목적 확인", "담당자가 보는 지표, 예외 상황과 최종 판단 기준을 직접 질문"],
          ["원천 연결", "API·CSV·크롤링 데이터의 상품·옵션·날짜·단위를 공통 기준으로 정리"],
          ["데이터 보존", "미수집·실패·누락과 실제 0을 구분하고 미확인 상태를 유지"],
          ["조회 경로", "DB에 적재한 데이터를 Google Sheets·통계 화면·AI에서 활용"]
        ] },
        { label: "02 · API & SERVICE", title: "백엔드와 AI 연결", items: [
          ["FastAPI", "업무 데이터 조회와 AI 응답을 웹 화면에서 사용할 수 있도록 연결"],
          ["RAG · NL2SQL", "문서·코드는 업무 기준, 읽기 전용 DB는 변하는 숫자의 근거로 구분"],
          ["질문 문맥", "사용자의 질문에 화면의 상품·기간 조건을 함께 전달"],
          ["접근 관리", "회원·OTP·세션과 읽기 전용 SQL 검증으로 사용 경계 관리"]
        ] },
        { label: "03 · DEPLOY & RECOVER", title: "배포와 예외 처리", items: [
          ["AWS 운영", "서버·도메인·예약 실행·로그·백업 구성과 배포 이후 관리"],
          ["실패 단계 구분", "수집 중단과 시트 저장 오류를 분리하고 처리 상태를 보존"],
          ["미완료 작업 재처리", "확보한 결과를 유지하며 재개하고 저장값을 다시 읽어 대조"],
          ["응답 중단 대응", "빈 응답·시간 제한을 구분하고 확보한 근거만 제한적으로 제공"]
        ] },
        { label: "04 · QUALITY & FEEDBACK", title: "품질 검증과 현업 적용", items: [
          ["숫자 검증", "답변의 기준일·단위·전체 합계·부분합을 실제 조회 결과와 대조"],
          ["회귀 평가", "실패 질문을 다시 평가하며 수정 전후의 결과와 미해결 범위를 확인"],
          ["답변 완결성", "제한 답변 반환을 질문 전체 해결과 구분해 평가"],
          ["현업 피드백", "판매처별 페이지와 조회 로직을 개선하고 추가 요구사항을 반영"]
        ] }
      ],
      workKicker: "LOTTE INNOVATE · RELEVANT EXPERIENCE",
      workTitle: "데이터 기반을 만들고 AI로 확장한 경험",
      workSummary: "2025.12 데이터 자동화에서 시작해 2026.03 통계 사이트, 2026.07 자연어 조회 AI로 확장했습니다. 기능별 개발 시점을 구분하고 현재도 운영·개선하고 있습니다.",
      contactTitle: "롯데이노베이트에서<br>계속 사용되는 AI 서비스를 만들겠습니다.",
      contactSummary: "AI 기능을 API와 데이터 파이프라인으로 서비스화하고, 배포 후 품질과 운영까지 책임지는 AI 서비스 엔지니어로 성장하겠습니다.",
      blindRecruitment: true,
      projectOrder: ["data-platform", "jarvis", "order-ai"],
      projectSummaries: {
        "data-platform": "판매처마다 상품코드·옵션·세트 구성이 달라 지표를 바로 합칠 수 없었습니다. 현업과 집계 기준을 정리하고 Python·SQL로 수집·변환·DB 적재·시트 갱신을 연결했습니다. 같은 기반으로 통계 사이트를 구축하고, 담당자별 조회 목적에 맞춰 판매처별 전용 페이지를 개발했습니다.",
        jarvis: "판매·광고·재고를 자연어로 조회하는 사내 AI 서비스입니다. FastAPI 기반 서비스에서 문서 RAG는 업무 기준을, NL2SQL·Tool Calling은 최신 수치를 확인하도록 연결했습니다. 답변의 숫자 불일치와 중단 사례를 재현하고, 합계 대조·읽기 전용 조회·근거를 보존한 제한 답변으로 개선했습니다.",
        "order-ai": "판매·재고·입고 데이터를 발주 추천량과 우선 검토 대상으로 가공하는 기능을 구현했습니다. 최소 주문수량·배송 기간·입고 예정 등 업무 제약을 반영하고, 담당자가 근거를 확인한 뒤 발주 여부를 결정하도록 사내 업무에 연결했습니다."
      },
      textOverrides: {
        "[data-profile-current-role]": "이커머스 기업 · AI팀 매니저",
        "[data-profile-support-kicker]": "BUSINESS COMMUNICATION · SERVICE RELIABILITY",
        "#support-title": "개발 이후에도 사용자와 결과를 확인합니다.",
        "[data-profile-support-summary]": "현업과 기준을 합의하고, 예외 상황을 복구하며, 실제 사용 결과를 다음 개선으로 연결했습니다.",
        "[data-profile-adoption-title]": "사용자 의견을 설계에 반영",
        "[data-profile-adoption-body]": "익숙한 시트의 확인 순서를 담당자에게 묻고 판매처별 화면과 집계 로직에 반영했습니다. 기존 시트도 유지해 선택권을 제공했습니다.",
        "[data-project-key='data-platform'] h3": "데이터 파이프라인 · 통계 사이트",
        "[data-project-key='order-ai'] .case-brief p:nth-child(2)": "업무 적용 · 추천량·판단 근거·예외 상품을 한 흐름에서 검토하도록 지원합니다. 발주 확정은 담당자가 수행하며, 시간 단축이나 예측 정확도의 정량 성과는 별도로 검증해야 합니다."
      }
    },
    dbinc: {
      company: "DB Inc.",
      role: "S/W엔지니어(AX)",
      title: "권도영 | DB Inc. S/W엔지니어(AX) 지원 포트폴리오",
      description: "AI Agent와 생성형 AI 기반 업무 서비스를 설계·개발·운영한 권도영의 DB Inc. S/W엔지니어(AX) 지원 포트폴리오입니다.",
      brand: "DB Inc. · S/W엔지니어(AX)",
      eyebrow: "DB Inc. S/W엔지니어(AX) · 지원 포트폴리오",
      statement: "반복되는 조회와 검토를,<br>근거를 제시하는 AI로 바꿉니다.",
      heroDescription: "AI팀의 1인 개발자로 자연어 데이터 AI 자비스와 발주 검토 AI를 처음부터 구축했습니다. 질문에 맞는 데이터 조회·검증·결과 제시를 연결하고, 사람이 최종 판단하는 업무 흐름으로 적용했습니다.",
      note: "직접 수행 · AI Agent · 조회·검증 · 업무 적용",
      consoleFile: "dbinc_ax_fit.yml",
      console: '<span class="code-key">질문</span>  화면 문맥과 업무 기준 전달\n<span class="code-key">조회</span>  업무 지식 검색 · 도구 호출\n<span class="code-key">검증</span>  실제 조회값 · 합계 · 기준일\n<span class="code-key">결정</span>  근거 제시 후 담당자 최종 판단',
      fitKicker: "DB INC. · POSITION FIT",
      fitTitle: "데이터를 조회하는 AI,<br>판단을 돕는 업무 서비스",
      fitSummary: "생성형 AI가 맡는 조회·분석과 사람이 결정할 업무를 구분하고, 실제 사용자의 업무에 연결했습니다.",
      fitItems: [
        {
          label: "AI Agent 구현",
          heading: "질문부터 실데이터 조회까지 수행하는 자비스",
          body: "RAG로 업무 지식을 찾고 NL2SQL과 Tool Calling으로 필요한 값을 조회해 근거와 함께 답하는 생성형 AI 서비스를 구축했습니다."
        },
        {
          label: "업무 흐름 설계",
          heading: "판단 근거와 검토 대상을 만드는 발주 AI",
          body: "판매·재고·입고·MOQ를 함께 검토해 추천량과 예외를 제시하고 담당자가 최종 결정하는 Human-in-the-loop 흐름을 구현했습니다."
        },
        {
          label: "현업 적용과 개선",
          heading: "현업 적용 이후까지 이어지는 AX",
          body: "내부 사용자의 기준과 피드백을 반영하고 데이터 검증, 로그, 재시도, 접근 통제와 평가 문항으로 서비스를 계속 개선했습니다."
        }
      ],
      contributionTitle: "DB Inc.에서 기여하고 싶은 방향",
      contributionBody: "DB Inc.의 업무 특화 Agent 방향에 맞춰, 반복되는 조회·정리·검토를 하나의 흐름으로 연결하고 싶습니다. 자비스와 발주 AI를 구축한 경험을 활용해 업무 기준과 확인 절차를 설계하고, 담당자가 근거를 보고 최종 판단하는 서비스를 만들겠습니다.",
      directionSource: { label: "참고 · DB Inc. AI Agent 파견소", url: "https://agent.dbinc.co.kr/" },
      scopeKicker: "AI AGENT FOR BUSINESS WORKFLOW",
      scopeTitle: "업무 단위의 AI Agent를<br>설계하고 운영합니다.",
      scopeSummary: "사람이 반복하던 조회·정리·검토 과정을 데이터와 생성형 AI로 연결하고, 안전장치와 사람의 최종 판단을 포함한 서비스로 운영합니다.",
      workKicker: "DB INC. · RELEVANT EXPERIENCE",
      workTitle: "AI 조회부터 담당자의 판단까지",
      workSummary: "자비스의 도구 호출·답변 검증과 발주 AI의 추천·예외 처리를 중심으로 정리했습니다.",
      contactTitle: "DB Inc.의 업무 현장에<br>실제로 쓰이는 Agent를 만들겠습니다.",
      contactSummary: "업무 기준을 이해하고 생성형 AI의 조회·분석 기능을 구현해, 현업 담당자의 판단을 돕는 AX 서비스로 발전시키겠습니다.",
      projectOrder: ["jarvis", "order-ai", "data-platform"],
      projectSummaries: {
        jarvis: "사용자의 질문과 화면 문맥을 바탕으로 업무 지식을 찾고, 필요한 데이터를 도구 호출과 SQL로 조회하는 AI Agent를 구축했습니다. 조회 권한과 실행 범위를 제한하고, 수치·기준일·근거를 검증한 뒤 결과를 제공합니다. 확인하지 못한 값과 추정은 실제 조회값과 구분합니다.",
        "order-ai": "담당자가 여러 자료를 대조하던 발주 검토를 추천량·판단 근거·예외 목록으로 정리하는 AI를 구축했습니다. 이미 입고 예정인 물량과 최소 주문수량을 반영하고, 수요 급증·이력 부족 등은 별도 검토 대상으로 분리했습니다. 최종 발주 결정은 사람이 맡습니다.",
        "data-platform": "Agent가 사용할 수 있는 데이터 기반을 직접 구성했습니다. 판매처·광고·재고 자료의 상품·옵션·기간 기준을 통일하고, 누락과 실패를 0으로 바꾸지 않도록 검증했습니다. 업무 화면과 시트에서도 같은 데이터를 확인하도록 연결했습니다."
      }
    },
    daou: {
      company: "다우기술",
      role: "AI 개발",
      title: "권도영 | 다우기술 AI 개발 신입 지원 포트폴리오",
      description: "데이터·AI 전문교육을 바탕으로 사내 AI와 데이터 서비스를 기획·개발·배포하고, 현업 피드백과 답변 검증으로 개선한 권도영의 다우기술 AI 개발 신입 지원 포트폴리오입니다.",
      brand: "다우기술 · AI 개발 신입",
      eyebrow: "다우기술 AI 개발 신입 · 지원 포트폴리오",
      statement: "기획부터 배포까지,<br>현업이 쓰는 AI를 만듭니다.",
      heroDescription: "이커머스 기업 AI팀의 1인 개발자로 현업의 요구를 정리하고, 데이터 통합부터 자비스·발주 검토 AI의 개발과 AWS 배포·운영까지 맡았습니다. 사용 중 발견한 숫자 오류와 답변 중단을 평가 문항으로 재현하고, 데이터 처리와 응답 검증을 개선했습니다.",
      note: "직접 수행 · 요구사항 정리 → 데이터·AI 개발 → 배포 → 검증·개선",
      consoleFile: "daou_ai_development_fit.yml",
      console: '<span class="code-key">이해</span>  현업의 질문 · 지표 · 예외\n<span class="code-key">구현</span>  데이터 통합 · AI · 업무 화면\n<span class="code-key">검증</span>  숫자 대조 · 근거 · 실패 재현\n<span class="code-key">운영</span>  AWS · 권한 · 로그 · 피드백',
      fitKicker: "DAOU TECH · POSITION FIT",
      fitTitle: "기본기에서<br>실무와 운영까지",
      fitSummary: "전문교육에서 익힌 데이터·AI 기본기를 사내 서비스로 구현했습니다. 배포 후에는 실제 질문과 오류를 바탕으로 품질을 개선했습니다.",
      fitItems: [
        {
          label: "기획부터 배포까지",
          heading: "데이터·AI·사용자 화면을 직접 연결",
          body: "여러 자료를 대조하던 판매·광고·재고 업무를 자비스와 통계 화면으로 연결했습니다. Python·FastAPI 개발과 AWS 환경 구성부터 배포 후 오류 대응까지 담당했습니다."
        },
        {
          label: "데이터와 답변 품질",
          heading: "모델 응답을 원천 데이터와 대조",
          body: "상품·옵션·기간 기준을 맞추고, 답변의 합계·부분합·근거를 검증했습니다. 누락값은 0과 구분하고, 답변 중단 시 확인한 수치만 제공하도록 보강했습니다."
        },
        {
          label: "기본기와 협업",
          heading: "교육에서 익히고 현업과 함께 검증",
          body: "952시간·349시간의 빅데이터 전문교육에서 Python·SQL·머신러닝·파이프라인을 학습했습니다. 실무에서는 마케팅·영업·수요예측 담당자와 지표·예외 기준을 맞추고 피드백을 반영했습니다."
        }
      ],
      contributionTitle: "다우기술에서 기여하고 싶은 방향",
      contributionBody: "사내에서 사용자 요구를 AI 기능으로 바꿔온 경험을 AX개발팀의 B2B 서비스 프로젝트로 넓히고 싶습니다. 서비스별 업무와 데이터 기준을 먼저 배우고, 모델·백엔드 담당자와 구현·검증 기준을 맞추겠습니다. 맡은 기능은 배포 후 피드백까지 확인하며 개선하겠습니다.",
      directionSource: { label: "참고 · AX개발팀 면접관 인터뷰", url: "https://blog.naver.com/daoustory/224389961466" },
      supportingSource: { label: "참고 · AI 개발 선배 인터뷰", url: "https://blog.naver.com/daoustory/224388659565" },
      experienceTitle: "교육에서 쌓은 기본기,<br>현업과 함께 쌓은 경험",
      experienceSummary: "컴퓨터공학·정보통계학과 두 전문교육 과정에서 개발·분석의 기반을 쌓았습니다. 2025년 12월부터 이를 사내 서비스에 적용하며 데이터·응답 오류를 직접 확인하고 개선하고 있습니다.",
      foundationTitle: "데이터 처리부터 모델 학습까지 쌓은 기본기",
      foundationSummary: "파이프라인·시계열 예측·객체 탐지 프로젝트에서 데이터를 다루고 모델 결과를 확인하는 과정을 익혔습니다. 교육 프로젝트와 사내 운영 경험은 구분해 정리했습니다.",
      scopeKicker: "BUILD · VERIFY · OPERATE",
      scopeTitle: "한 번의 구현에서<br>운영과 개선으로 이어갑니다.",
      scopeSummary: "요구사항과 업무 예외를 먼저 정리하고, 데이터·AI·화면을 연결했습니다. 이후에는 권한·로그·백업을 관리하고 실제 사용 중 발견한 문제를 검증 규칙에 반영했습니다.",
      workKicker: "DAOU TECH · RELEVANT EXPERIENCE",
      workTitle: "실제 사용과 오류에서 배운 세 프로젝트",
      workSummary: "자비스의 응답 검증, 서로 다른 데이터 기준의 통합, 담당자가 최종 판단하는 발주 검토를 직접 구현했습니다.",
      contactTitle: "다우기술에서 함께 배우며,<br>맡은 AI 기능을 끝까지 개선하겠습니다.",
      contactSummary: "모르는 부분은 묻고 직접 검증하겠습니다. 현업과 소통하며 서비스를 운영해온 경험을 바탕으로, 모델·백엔드 동료와 함께 사용자가 믿고 활용할 수 있는 AI를 만들겠습니다.",
      projectOrder: ["jarvis", "data-platform", "order-ai"],
      projectSummaries: {
        jarvis: "담당자가 판매·광고·재고를 자연어로 묻는 사내 AI를 기획·개발·배포했습니다. 운영 중 숫자 오류와 빈 응답을 경험하며 모델 연결뿐 아니라 데이터 기준과 결과 검증이 중요함을 배웠습니다. 합계 대조·읽기 전용 권한·근거 표시·제한 답변을 보강했고, 복잡한 질문의 완결성은 별도로 검증하며 개선 중입니다.",
        "data-platform": "같은 상품도 판매처마다 코드·옵션·세트 구성이 달라 수집만으로는 비교할 수 없었습니다. 공통 SKU·기간 기준을 정리하고 누락·실패와 실제 0을 구분해 DB에 연결했습니다. 판매·광고비·재고·입고 정보를 통계 화면과 Google Sheets에 함께 제공해 담당자가 직접 비교하도록 구현했습니다.",
        "order-ai": "현업의 발주 검토를 돕기 위해 판매·재고·입고 예정·배송 기간·최소 주문수량을 함께 반영하는 AI를 처음부터 구축했습니다. 추천량과 판단 근거·예외 상품을 제시하고 최종 결정은 담당자가 내리도록 적용했습니다. 현업 피드백으로 검토 기준을 조정하며 고도화하고 있습니다."
      }
    }
  };

  const aliases = {
    "hanwha-finance": "hanwha",
    hanwhalife: "hanwha",
    lg: "lgcns",
    "lg-cns": "lgcns",
    lotteinnovate: "lotte",
    "lotte-innovate": "lotte",
    db: "dbinc",
    "db-inc": "dbinc",
    "sempio-platform": "sempio",
    daoutech: "daou",
    "daou-tech": "daou"
  };

  function profileKeyFromLocation() {
    const params = new URLSearchParams(window.location.search);
    const requested = (params.get("target") || params.get("company") || "").trim().toLowerCase();
    if (Object.prototype.hasOwnProperty.call(profiles, requested)) {
      return requested;
    }
    return Object.prototype.hasOwnProperty.call(aliases, requested) ? aliases[requested] : undefined;
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.textContent = value;
    }
  }

  function setHtml(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.innerHTML = value;
    }
  }

  function setMeta(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
      element.setAttribute("content", value);
    }
  }

  function reorderProjects(order) {
    const list = document.querySelector(".case-list");
    if (!list || !Array.isArray(order)) {
      return;
    }

    const detailSection = Array.from(list.children).find(function (child) {
      return child.matches("details.secondary-work");
    });

    order.forEach(function (key) {
      const project = Array.from(list.children).find(function (child) {
        return child.dataset.projectKey === key;
      });
      if (project) {
        list.insertBefore(project, detailSection || null);
      }
    });

    Array.from(list.children)
      .filter(function (child) { return child.dataset.projectKey; })
      .forEach(function (project, index) {
        project.classList.toggle("case-featured", index === 0);
        const caseIndex = project.querySelector(".case-index");
        if (caseIndex) {
          caseIndex.textContent = String(index + 1).padStart(2, "0");
        }
      });
  }

  function applyProfile(key) {
    const profile = profiles[key];
    if (!profile) {
      return;
    }

    document.documentElement.dataset.portfolioTarget = key;
    document.title = profile.title;
    setMeta('meta[name="description"]', profile.description);
    setMeta('meta[property="og:title"]', profile.title);
    setMeta('meta[property="og:description"]', profile.description);
    setMeta('meta[property="og:url"]', "https://doyoung-data.github.io/doyoung-portfolio.github.io/?target=" + key);

    setText("[data-profile-brand]", profile.brand);
    setText("[data-profile-eyebrow]", profile.eyebrow);
    setHtml("[data-profile-statement]", profile.statement);
    setText("[data-profile-description]", profile.heroDescription);
    setText("[data-profile-note]", profile.note);
    setText("[data-profile-console-file]", profile.consoleFile);
    setHtml("[data-profile-console]", profile.console);
    if (profile.heroFacts) {
      document.querySelector(".hero-metrics").setAttribute("aria-label", "플랫폼 개발 수행 범위");
      profile.heroFacts.forEach(function (fact, index) {
        setText(`.hero-metrics > div:nth-child(${index + 1}) strong`, fact.value);
        setText(`.hero-metrics > div:nth-child(${index + 1}) span`, fact.label);
      });
    }
    Object.entries(profile.textOverrides || {}).forEach(function ([selector, value]) {
      setText(selector, value);
    });
    document.querySelectorAll("[data-profile-only]").forEach(function (element) {
      element.hidden = !element.dataset.profileOnly.split(/\s+/).includes(key);
    });
    if (profile.scopeLanes) {
      profile.scopeLanes.forEach(function (lane, index) {
        const selector = `.operating-lane:nth-child(${index + 1})`;
        setText(`${selector} header span`, lane.label);
        setText(`${selector} header strong`, lane.title);
        lane.items.forEach(function (item, itemIndex) {
          setText(`${selector} .operating-lane-items > div:nth-child(${itemIndex + 1}) strong`, item[0]);
          setText(`${selector} .operating-lane-items > div:nth-child(${itemIndex + 1}) p`, item[1]);
        });
      });
    }

    setText("[data-profile-fit-kicker]", profile.fitKicker);
    setHtml("[data-profile-fit-title]", profile.fitTitle);
    setText("[data-profile-fit-summary]", profile.fitSummary);
    profile.fitItems.forEach(function (item, index) {
      setText(`[data-profile-fit-label="${index}"]`, item.label);
      setText(`[data-profile-fit-heading="${index}"]`, item.heading);
      setText(`[data-profile-fit-body="${index}"]`, item.body);
    });
    setText("[data-profile-contribution-title]", profile.contributionTitle);
    setText("[data-profile-contribution-body]", profile.contributionBody);
    const sourceLink = document.querySelector("[data-profile-direction-source]");
    if (sourceLink) {
      sourceLink.textContent = profile.directionSource.label;
      sourceLink.href = profile.directionSource.url;
      sourceLink.hidden = false;
    }
    const supportingLink = document.querySelector("[data-profile-supporting-source]");
    if (supportingLink && profile.supportingSource) {
      supportingLink.textContent = profile.supportingSource.label;
      supportingLink.href = profile.supportingSource.url;
      supportingLink.hidden = false;
    }

    setHtml("[data-profile-experience-title]", profile.experienceTitle);
    setText("[data-profile-experience-summary]", profile.experienceSummary);
    setText("[data-profile-foundation-title]", profile.foundationTitle);
    setText("[data-profile-foundation-summary]", profile.foundationSummary);

    setText("[data-profile-scope-kicker]", profile.scopeKicker);
    setHtml("[data-profile-scope-title]", profile.scopeTitle);
    setText("[data-profile-scope-summary]", profile.scopeSummary);
    setText("[data-profile-work-kicker]", profile.workKicker);
    setText("[data-profile-work-title]", profile.workTitle);
    setText("[data-profile-work-summary]", profile.workSummary);
    setHtml("[data-profile-contact-title]", profile.contactTitle);
    setText("[data-profile-contact-summary]", profile.contactSummary);

    Object.entries(profile.projectSummaries).forEach(function ([projectKey, summary]) {
      setText(`[data-project-key="${projectKey}"] .case-summary`, summary);
    });
    reorderProjects(profile.projectOrder);

    // Show concrete projects before the longer engineering workflow.
    const workSection = document.getElementById("work");
    const scopeSection = document.getElementById("scope");
    if (workSection && scopeSection && workSection.parentNode === scopeSection.parentNode) {
      scopeSection.before(workSection);
    }

    if (profile.blindRecruitment) {
      document.querySelectorAll("[data-academic-identity]").forEach(function (element) {
        element.remove();
      });
    }

    window.PORTFOLIO_TARGET = Object.freeze({
      key: key,
      company: profile.company,
      role: profile.role
    });
  }

  const profileKey = profileKeyFromLocation();
  if (profileKey) {
    applyProfile(profileKey);
  }
})();
