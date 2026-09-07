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
      statement: "고객의 업무 문제를 이해하고,<br>운영되는 Agentic AI 서비스로 전환합니다.",
      heroDescription: "RAG·NL2SQL·Tool Calling으로 사내 데이터를 자연어로 조회하는 자비스를 구축하고, 데이터 수집·가공·파이프라인부터 AWS 배포·평가·운영까지 직접 담당했습니다. 이 경험으로 LG CNS의 고객 현장에 적용되는 AI(AX) 서비스 구축에 기여하고자 합니다.",
      note: "LG CNS AI(AX) · Agentic AI · RAG · Data Pipeline",
      consoleFile: "lgcns_ai_ax_fit.yml",
      console: '<span class="code-key">target</span>: LG CNS · AI(AX)\n<span class="code-key">match</span>:\n  - agentic AI · RAG · tool calling\n  - data pipeline · service delivery\n  - evaluation · guarded operations\n<span class="code-key">evidence</span>: in use · 92 regression cases',
      fitKicker: "LG CNS · POSITION FIT",
      fitTitle: "LG CNS AI(AX)가 찾는 경험을<br>실제 업무에서 수행했습니다.",
      fitSummary: "공고의 핵심인 고객 문제의 AI 서비스화, Agentic AI 구현, 데이터 파이프라인과 운영 경험을 현재 업무의 결과로 보여드립니다.",
      fitItems: [
        {
          label: "AGENTIC AI",
          heading: "RAG·NL2SQL·Tool Calling 기반 자비스",
          body: "업무 지식과 실데이터를 연결하고, 질문에 맞는 도구를 선택해 기준일·수치·근거를 답하는 사내 AI Agent를 구축했습니다."
        },
        {
          label: "SERVICE DELIVERY",
          heading: "데이터 파이프라인부터 배포·운영까지",
          body: "API·CSV·크롤링 수집, 데이터 정규화·검증, FastAPI 서비스와 AWS 운영 환경을 하나의 흐름으로 직접 구성했습니다."
        },
        {
          label: "QUALITY & SAFETY",
          heading: "92문항 평가와 읽기 전용 안전장치",
          body: "숫자·합계·근거·추정 구분을 회귀 평가하고 허용 데이터와 SELECT 조회만 사용하도록 통제해 AI 답변의 신뢰성을 높였습니다."
        }
      ],
      contributionTitle: "LG CNS에서 기여하고 싶은 방향",
      contributionBody: "고객마다 다른 업무와 데이터 구조를 빠르게 파악하고, AI Agent가 실제 서비스 환경에서 안전하게 동작하도록 설계·검증·운영하는 AI(AX) 엔지니어로 기여하겠습니다.",
      scopeKicker: "CUSTOMER AI TRANSFORMATION",
      scopeTitle: "고객 문제를 AI 서비스로<br>전환해 운영합니다.",
      scopeSummary: "현업 요구사항을 구조화하고 신뢰할 수 있는 데이터와 LLM을 연결해, 고객이 실제로 사용하는 AI 서비스를 배포하고 품질을 개선합니다.",
      workKicker: "LG CNS · RELEVANT EXPERIENCE",
      workTitle: "AI(AX) 직무와 연결되는 대표 경험",
      workSummary: "Agentic AI 구현, 데이터 파이프라인, 평가·안전장치와 현업 적용을 중심으로 정리했습니다.",
      contactTitle: "LG CNS의 고객 현장에<br>적용되는 AI를 만들겠습니다.",
      contactSummary: "비즈니스 문제를 이해하고 Agentic AI와 데이터 기반 서비스로 구현해 운영까지 책임지는 AI(AX) 엔지니어가 되겠습니다.",
      projectOrder: ["jarvis", "data-platform", "order-ai"]
    },
    lotte: {
      company: "롯데이노베이트",
      role: "AI 서비스 엔지니어",
      title: "권도영 | 롯데이노베이트 AI 서비스 엔지니어 지원 포트폴리오",
      description: "AI 서비스 API, 데이터 파이프라인과 클라우드 운영을 직접 구축한 권도영의 롯데이노베이트 AI 서비스 엔지니어 지원 포트폴리오입니다.",
      brand: "롯데이노베이트 · AI 서비스",
      eyebrow: "롯데이노베이트 AI 서비스 엔지니어 · 지원 포트폴리오",
      statement: "LLM과 데이터를 실제 서비스 API와<br>운영 가능한 파이프라인으로 연결합니다.",
      heroDescription: "Python·FastAPI 기반 AI 서비스와 REST API를 구현하고, 10개 이상의 데이터 원천을 수집·검증·제공하는 파이프라인과 AWS 운영 환경을 구축했습니다. 서비스 발굴부터 개발·품질 검증·운영 고도화까지 이어지는 경험으로 롯데이노베이트 AI서비스팀에 기여하고자 합니다.",
      note: "롯데이노베이트 · AI Service · Backend · Data Pipeline · Cloud",
      consoleFile: "lotte_ai_service_fit.yml",
      console: '<span class="code-key">target</span>: 롯데이노베이트 · AI 서비스 엔지니어\n<span class="code-key">match</span>:\n  - FastAPI · REST API · backend\n  - collection · validation · pipeline\n  - cloud operations · quality tuning\n<span class="code-key">evidence</span>: 10+ sources · production services',
      fitKicker: "LOTTE INNOVATE · POSITION FIT",
      fitTitle: "AI 서비스의 백엔드부터 운영까지<br>직접 연결해봤습니다.",
      fitSummary: "공고의 AI 서비스 API 개발, 데이터 파이프라인 구축, 클라우드 운영과 품질 검증을 현재 회사의 실사용 시스템에서 수행했습니다.",
      fitItems: [
        {
          label: "AI SERVICE BACKEND",
          heading: "Python·FastAPI 기반 사내 AI 서비스",
          body: "자비스와 발주 AI의 조회·분석 기능을 백엔드 서비스로 구현하고 REST API, 인증·세션과 관리자 기능을 운영했습니다."
        },
        {
          label: "DATA PIPELINE",
          heading: "10개 이상 원천의 수집·검증·제공",
          body: "API·CSV·크롤링 데이터를 공통 SKU와 날짜 기준으로 통합하고 DB, Google Sheets와 사내 통계 화면까지 자동 연결했습니다."
        },
        {
          label: "CLOUD & QUALITY",
          heading: "AWS 운영과 AI 품질 고도화",
          body: "서버·도메인·예약 실행·로그·재시도·백업을 관리하고, 92문항 회귀 평가와 실사용 오류를 바탕으로 답변 품질을 개선했습니다."
        }
      ],
      contributionTitle: "롯데이노베이트에서 기여하고 싶은 방향",
      contributionBody: "AI 서비스 아이디어를 빠르게 검증하고 API·데이터 파이프라인·클라우드 운영으로 연결해, 여러 현업 조직이 신뢰하고 사용할 수 있는 서비스로 고도화하겠습니다.",
      scopeKicker: "AI SERVICE ENGINEERING",
      scopeTitle: "AI 서비스를 백엔드·데이터·운영까지<br>하나의 흐름으로 만듭니다.",
      scopeSummary: "비즈니스 요구를 이해한 뒤 데이터 파이프라인과 AI 기능을 API로 구현하고, 배포 이후의 품질 검증과 장애 대응까지 수행합니다.",
      workKicker: "LOTTE INNOVATE · RELEVANT EXPERIENCE",
      workTitle: "AI 서비스 엔지니어 직무와 연결되는 경험",
      workSummary: "AI 서비스 백엔드, 데이터 파이프라인, 클라우드 운영과 실사용 품질 개선을 중심으로 정리했습니다.",
      contactTitle: "롯데이노베이트에서<br>계속 사용되는 AI 서비스를 만들겠습니다.",
      contactSummary: "AI 기능을 API와 데이터 파이프라인으로 서비스화하고, 배포 후 품질과 운영까지 책임지는 AI 서비스 엔지니어로 성장하겠습니다.",
      projectOrder: ["jarvis", "data-platform", "order-ai"]
    },
    dbinc: {
      company: "DB Inc.",
      role: "S/W엔지니어(AX)",
      title: "권도영 | DB Inc. S/W엔지니어(AX) 지원 포트폴리오",
      description: "AI Agent와 생성형 AI 기반 업무 서비스를 설계·개발·운영한 권도영의 DB Inc. S/W엔지니어(AX) 지원 포트폴리오입니다.",
      brand: "DB Inc. · S/W엔지니어(AX)",
      eyebrow: "DB Inc. S/W엔지니어(AX) · 지원 포트폴리오",
      statement: "현업의 반복 업무를 이해하고,<br>끝까지 수행하는 AI Agent로 바꿉니다.",
      heroDescription: "사내 데이터를 자연어로 조회·분석하는 자비스와 담당자의 발주 검토를 돕는 발주 AI를 처음부터 구축했습니다. 데이터 수집·검증·도구 호출·결과 제시와 사람의 최종 확인을 하나의 업무 흐름으로 연결한 경험으로 DB Inc.의 AX 서비스 설계·개발에 기여하고자 합니다.",
      note: "DB Inc. S/W엔지니어(AX) · AI Agent · Workflow · Generative AI",
      consoleFile: "dbinc_ax_fit.yml",
      console: '<span class="code-key">target</span>: DB Inc. · S/W엔지니어(AX)\n<span class="code-key">match</span>:\n  - AI Agent · generative AI service\n  - workflow automation · human review\n  - data verification · service operations\n<span class="code-key">evidence</span>: Jarvis · Order AI · internal adoption',
      fitKicker: "DB INC. · POSITION FIT",
      fitTitle: "AI Agent가 업무를 완결하도록<br>서비스 흐름을 설계했습니다.",
      fitSummary: "공고의 AI Agent 및 생성형 AI 기반 서비스 설계·개발과 가장 가까운 자비스, 발주 AI, 업무 자동화 운영 경험을 먼저 보여드립니다.",
      fitItems: [
        {
          label: "AI AGENT SERVICE",
          heading: "질문부터 실데이터 조회까지 수행하는 자비스",
          body: "RAG로 업무 지식을 찾고 NL2SQL과 Tool Calling으로 필요한 값을 조회해 근거와 함께 답하는 생성형 AI 서비스를 구축했습니다."
        },
        {
          label: "WORKFLOW AUTOMATION",
          heading: "판단 근거와 검토 대상을 만드는 발주 AI",
          body: "판매·재고·입고·MOQ를 함께 검토해 추천량과 예외를 제시하고 담당자가 최종 결정하는 Human-in-the-loop 흐름을 구현했습니다."
        },
        {
          label: "ADOPTION & OPERATIONS",
          heading: "현업 적용 이후까지 이어지는 AX",
          body: "내부 사용자의 기준과 피드백을 반영하고 데이터 검증, 로그, 재시도, 접근 통제와 평가 문항으로 서비스를 계속 개선했습니다."
        }
      ],
      contributionTitle: "DB Inc.에서 기여하고 싶은 방향",
      contributionBody: "현업의 반복 업무를 단계별로 구조화하고 데이터 조회·검증·결과 제시까지 수행하는 AI Agent를 설계해, 담당자는 최종 판단과 더 중요한 업무에 집중하도록 만들겠습니다.",
      scopeKicker: "AI AGENT FOR BUSINESS WORKFLOW",
      scopeTitle: "업무 단위의 AI Agent를<br>설계하고 운영합니다.",
      scopeSummary: "사람이 반복하던 조회·정리·검토 과정을 데이터와 생성형 AI로 연결하고, 안전장치와 사람의 최종 판단을 포함한 서비스로 운영합니다.",
      workKicker: "DB INC. · RELEVANT EXPERIENCE",
      workTitle: "S/W엔지니어(AX) 직무와 연결되는 경험",
      workSummary: "AI Agent 서비스 설계·개발, 업무 워크플로 자동화와 현업 적용 경험을 중심으로 정리했습니다.",
      contactTitle: "DB Inc.의 업무 현장에<br>실제로 쓰이는 Agent를 만들겠습니다.",
      contactSummary: "업무를 이해하고 생성형 AI와 데이터로 구현해, 반복 작업을 끝까지 수행하는 AX 서비스를 만드는 엔지니어가 되겠습니다.",
      projectOrder: ["jarvis", "order-ai", "data-platform"]
    }
  };

  const aliases = {
    lg: "lgcns",
    "lg-cns": "lgcns",
    lotteinnovate: "lotte",
    "lotte-innovate": "lotte",
    db: "dbinc",
    "db-inc": "dbinc"
  };

  function profileKeyFromLocation() {
    const params = new URLSearchParams(window.location.search);
    const requested = (params.get("target") || params.get("company") || "").trim().toLowerCase();
    return profiles[requested] ? requested : aliases[requested];
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
    setMeta('meta[property="og:url"]', window.location.href.split("#")[0]);

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

    setText("[data-profile-scope-kicker]", profile.scopeKicker);
    setHtml("[data-profile-scope-title]", profile.scopeTitle);
    setText("[data-profile-scope-summary]", profile.scopeSummary);
    setText("[data-profile-work-kicker]", profile.workKicker);
    setText("[data-profile-work-title]", profile.workTitle);
    setText("[data-profile-work-summary]", profile.workSummary);
    setHtml("[data-profile-contact-title]", profile.contactTitle);
    setText("[data-profile-contact-summary]", profile.contactSummary);

    reorderProjects(profile.projectOrder);

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
