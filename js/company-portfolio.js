(function () {
  "use strict";

  const profiles = {
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
      heroDescription: "AI팀의 1인 개발자로 Python·FastAPI 기반 사내 서비스와 데이터 파이프라인을 구축했습니다. AWS 계정·서버 구성부터 인증·관리자 기능, 예약 실행·장애 대응과 AI 품질 개선까지 담당했습니다.",
      note: "직접 수행 · REST API · 데이터 파이프라인 · AWS 운영",
      consoleFile: "lotte_ai_service_fit.yml",
      console: '<span class="code-key">수집</span>  API · CSV · 크롤링\n<span class="code-key">가공</span>  상품 매핑 · 결측 구분 · 검증\n<span class="code-key">제공</span>  REST API · 업무 화면 · AI\n<span class="code-key">운영</span>  인증 · 로그 · 재시도 · 백업',
      fitKicker: "LOTTE INNOVATE · POSITION FIT",
      fitTitle: "백엔드·데이터·운영을<br>하나로 연결한 경험",
      fitSummary: "데이터가 수집된 뒤 사용자의 화면과 AI 답변에 도달하기까지, 서비스의 각 단계를 직접 구현했습니다.",
      fitItems: [
        {
          label: "백엔드 개발",
          heading: "Python·FastAPI 기반 사내 AI 서비스",
          body: "사내 데이터·AI 기능을 API와 업무 화면에 연결했습니다. 회원 등록·비밀번호 변경·OTP 인증·세션과 로그 조회 기능도 구현했습니다."
        },
        {
          label: "파이프라인 구축",
          heading: "수집부터 실무 화면까지 이어지는 데이터",
          body: "API·CSV·크롤링 데이터를 공통 SKU와 날짜 기준으로 통합하고 DB, Google Sheets와 사내 통계 화면까지 자동 연결했습니다."
        },
        {
          label: "운영과 품질",
          heading: "AWS 운영과 AI 품질 고도화",
          body: "서버·도메인·예약 실행·로그·재시도·백업을 관리하고, 원천 데이터 대조와 AI 회귀 평가로 오류를 확인하고 개선했습니다."
        }
      ],
      contributionTitle: "롯데이노베이트에서 기여하고 싶은 방향",
      contributionBody: "롯데그룹의 AI 내재화와 실행 중심 방향을, 현업이 계속 사용하는 서비스로 연결하고 싶습니다. 요구사항을 API·데이터 파이프라인으로 구현하고, 배포 후 오류 대응과 사용자 피드백까지 맡아 업무 적용을 지원하겠습니다.",
      directionSource: { label: "참고 · 2026 롯데그룹 신년사", url: "https://www.lotte.co.kr/pr/newsView.do?srchNewsSeq=1697" },
      scopeKicker: "AI SERVICE ENGINEERING",
      scopeTitle: "AI 서비스를 백엔드·데이터·운영까지<br>하나의 흐름으로 만듭니다.",
      scopeSummary: "비즈니스 요구를 이해한 뒤 데이터 파이프라인과 AI 기능을 API로 구현하고, 배포 이후의 품질 검증과 장애 대응까지 수행합니다.",
      workKicker: "LOTTE INNOVATE · RELEVANT EXPERIENCE",
      workTitle: "데이터 기반을 만들고 AI로 확장한 경험",
      workSummary: "데이터 플랫폼을 먼저 구축하고, 같은 기반을 자비스와 발주 검토 서비스에 연결했습니다.",
      contactTitle: "롯데이노베이트에서<br>계속 사용되는 AI 서비스를 만들겠습니다.",
      contactSummary: "AI 기능을 API와 데이터 파이프라인으로 서비스화하고, 배포 후 품질과 운영까지 책임지는 AI 서비스 엔지니어로 성장하겠습니다.",
      blindRecruitment: true,
      projectOrder: ["data-platform", "jarvis", "order-ai"],
      projectSummaries: {
        "data-platform": "API·CSV·크롤링 수집에서 정규화·DB 적재·화면 제공까지 데이터 파이프라인을 구현했습니다. 서로 다른 상품·옵션 기준을 매핑하고 결측과 실패를 보존했으며, AWS 예약 실행·로그·재시도·백업을 구성해 배포 이후 운영까지 담당했습니다.",
        jarvis: "Python·FastAPI 기반 사내 서비스에 자연어 데이터 조회·분석 기능을 연결했습니다. 화면의 상품·기간 조건을 AI에 전달하고, 읽기 전용 SQL과 도구 호출로 확인한 값을 답하도록 구성했습니다. 모델 응답 중단과 수치 오류를 평가·검증하고 대체 응답 경로를 보강했습니다.",
        "order-ai": "판매·재고·입고 데이터를 발주 추천량과 우선 검토 대상으로 가공하는 기능을 구현했습니다. 최소 주문수량·배송 기간·입고 예정 등 업무 제약을 반영하고, 담당자가 근거를 확인한 뒤 발주 여부를 결정하도록 사내 업무에 연결했습니다."
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
      title: "권도영 | 다우기술 AI 개발 지원 포트폴리오",
      description: "이커머스 현업의 데이터 통합, 사내 AI Agent와 업무 자동화 서비스를 직접 구축·운영한 권도영의 다우기술 AI 개발 지원 포트폴리오입니다.",
      brand: "다우기술 · AI 개발",
      eyebrow: "다우기술 AI 개발 · 지원 포트폴리오",
      statement: "판매자의 복잡한 업무를 이해하고,<br>데이터와 AI로 연결합니다.",
      heroDescription: "이커머스 기업 AI팀의 1인 개발자로 판매·광고·재고 데이터를 통합하고, 자비스와 발주 검토 AI를 구축했습니다. 실무자가 상품과 지표를 직접 비교하고 다음 업무를 판단할 수 있도록 시트·통계 사이트·AI를 연결했습니다.",
      note: "직접 수행 · 커머스 데이터 · 사내 AI · 업무 자동화",
      consoleFile: "daou_ai_development_fit.yml",
      console: '<span class="code-key">현업</span>  판매 · 마케팅 · 재고 · 발주\n<span class="code-key">데이터</span>  판매처별 상품·옵션 기준 통합\n<span class="code-key">AI</span>  자연어 조회 · 근거 · 검토안\n<span class="code-key">적용</span>  업무 화면과 사용자 피드백',
      fitKicker: "DAOU TECH · POSITION FIT",
      fitTitle: "커머스 현장의 문제를<br>AI 기능으로 연결한 경험",
      fitSummary: "상품 기준이 다른 판매처 데이터를 연결하고, 담당자의 반복 조회와 비교·검토를 돕는 서비스를 만들었습니다.",
      fitItems: [
        {
          label: "사내 업무 AI",
          heading: "업무 데이터에 답하는 자비스",
          body: "판매·광고·재고 질문을 업무 지식 검색과 실데이터 조회로 연결했습니다. 답변의 근거와 기준일을 제공하고 오류 사례를 반복 검증했습니다."
        },
        {
          label: "커머스 데이터 이해",
          heading: "상품·옵션·번들의 서로 다른 기준 통합",
          body: "채널별 상품코드와 옵션·세트 구성을 매핑하고 판매·광고비·재고·입고를 함께 조회하도록 구성했습니다. 수집 자동화보다 어려웠던 기준 통합을 직접 해결했습니다."
        },
        {
          label: "사용자 중심 개발",
          heading: "실무자가 직접 쓰는 화면과 도구",
          body: "통계 사이트와 Google Sheets에 지표를 제공하고, 발주 검토 AI·가격 추적·리뷰 분석 도구를 개발했습니다. 현업 피드백을 기능과 예외 처리에 반영했습니다."
        }
      ],
      contributionTitle: "다우기술에서 기여하고 싶은 방향",
      contributionBody: "판매·광고·재고 업무의 데이터가 왜 어긋나는지 직접 해결해온 경험을 활용하겠습니다. 다우오피스·사방넷 등 업무·커머스 서비스의 사용자 문제를 이해하고, 실제 업무를 돕는 AI 기능 개발과 품질 개선에 기여하겠습니다.",
      directionSource: { label: "참고 · 다우기술 AX개발팀 직무 소개", url: "https://blog.naver.com/daoustory/224384496875" },
      scopeKicker: "COMMERCE & BUSINESS AI",
      scopeTitle: "현업의 문제를 이해하고,<br>사용자가 쓰는 기능으로 만듭니다.",
      scopeSummary: "상품 기준과 업무 예외를 데이터 처리 규칙으로 정리하고, AI의 답변이 실제 화면과 검토 업무로 이어지도록 구현했습니다.",
      workKicker: "DAOU TECH · RELEVANT EXPERIENCE",
      workTitle: "커머스 데이터에서 사내 AI까지",
      workSummary: "자비스, 상품·채널 데이터 통합, 발주 검토를 중심으로 이커머스 현업에 적용한 개발 경험을 정리했습니다.",
      contactTitle: "다우기술의 업무·커머스 서비스에<br>사용자가 체감하는 AI를 더하겠습니다.",
      contactSummary: "현업의 반복 작업과 데이터 문제를 이해한 경험으로, 실무에 적용할 AI 기능을 개발하고 사용자 피드백을 반영하겠습니다.",
      projectOrder: ["jarvis", "data-platform", "order-ai"],
      projectSummaries: {
        jarvis: "마케팅·영업·수요예측 담당자가 여러 자료를 찾아보던 업무를 자연어 데이터 조회로 연결했습니다. 판매·광고비·재고를 질문하면 업무 지식과 실제 조회값을 함께 활용해 답하도록 구현했습니다. 사용자의 화면 문맥을 반영하고 근거·기준일·예외를 제시하며 고도화하고 있습니다.",
        "data-platform": "판매처마다 다른 상품코드·옵션·세트 구성을 공통 기준으로 연결한 이커머스 데이터 플랫폼입니다. 판매·광고비·사내 및 쿠팡 재고·입고 예정 물량을 한 화면에서 비교하도록 구현했습니다. 실무자가 익숙한 Google Sheets에도 결과를 자동 제공해 반복 정리 작업을 줄였습니다.",
        "order-ai": "판매 흐름과 재고·입고 예정·배송 기간·최소 주문수량을 함께 확인하는 발주 검토 AI를 개발했습니다. 담당자가 자료를 모으는 대신 추천량과 근거·주의 상품부터 검토하도록 구성하고, 업무 예외와 최종 판단은 사람이 확인하도록 적용했습니다."
      }
    }
  };

  const aliases = {
    lg: "lgcns",
    "lg-cns": "lgcns",
    lotteinnovate: "lotte",
    "lotte-innovate": "lotte",
    db: "dbinc",
    "db-inc": "dbinc",
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
