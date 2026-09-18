import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
PROFILE_SCRIPT = ROOT / "js" / "company-portfolio.js"


class CompanyPortfolioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.index = INDEX.read_text(encoding="utf-8")
        cls.script = PROFILE_SCRIPT.read_text(encoding="utf-8")

    def test_all_company_profiles_are_available(self):
        for key, company, role in (
            ("lgcns", "LG CNS", "AI(AX)"),
            ("lotte", "롯데이노베이트", "AI 서비스 엔지니어"),
            ("dbinc", "DB Inc.", "S/W엔지니어(AX)"),
            ("daou", "다우기술", "AI 개발"),
            ("sempio", "샘표", "플랫폼 개발자(정규직)"),
            ("hanwha", "한화금융", "AI/데이터 · Engineer"),
            ("hyundai", "현대엘리베이터", "데이터/AI개발 · 신입"),
        ):
            with self.subTest(key=key):
                self.assertIn(f"{key}: {{", self.script)
                self.assertIn(f'company: "{company}"', self.script)
                self.assertIn(f'role: "{role}"', self.script)

    def test_recruiter_snapshot_has_three_evidence_rows(self):
        self.assertIn('id="position-fit"', self.index)
        for index in range(3):
            self.assertIn(f'data-profile-fit-label="{index}"', self.index)
            self.assertIn(f'data-profile-fit-heading="{index}"', self.index)
            self.assertIn(f'data-profile-fit-body="{index}"', self.index)

    def test_primary_projects_have_stable_keys(self):
        for project in ("jarvis", "data-platform", "order-ai"):
            self.assertEqual(
                self.index.count(f'data-project-key="{project}"'),
                1,
            )

    def test_company_profile_runs_before_shared_interactions(self):
        company_script = self.index.index("js/company-portfolio.js")
        portfolio_script = self.index.index("js/portfolio.js")
        self.assertLess(company_script, portfolio_script)

    def test_lotte_academic_identifiers_are_marked(self):
        self.assertEqual(self.index.count("data-academic-identity"), 2)
        self.assertIn("blindRecruitment: true", self.script)

    def test_graduation_month_is_distinct_from_training_end_month(self):
        self.assertIn(
            'data-academic-identity><div class="timeline-date">2019 — 2025.02</div>',
            self.index,
        )
        self.assertIn('class="timeline-date">2024.12 — 2025.03</div>', self.index)

    def test_every_profile_has_project_specific_summaries(self):
        self.assertEqual(self.script.count("projectSummaries: {"), 7)

    def test_unknown_targets_do_not_resolve_object_prototypes(self):
        self.assertIn("Object.prototype.hasOwnProperty.call(profiles, requested)", self.script)
        self.assertIn("Object.prototype.hasOwnProperty.call(aliases, requested)", self.script)

    def test_crawler_volume_uses_consistent_supported_lower_bound(self):
        self.assertIn("2,000개 이상 가격 추적", self.index)
        self.assertIn("2,000개 이상의 상품·번들 판매가", self.index)
        self.assertIn("<strong>2,000+</strong><span>상품·번들</span>", self.index)
        for stale_count in ("2,280", "2280", "2,500개 이상", "2500개 이상"):
            self.assertNotIn(stale_count, self.index + self.script)

    def test_company_direction_sources_and_evaluation_scope_are_explicit(self):
        self.assertEqual(self.script.count("directionSource: {"), 7)
        self.assertIn("롯데백화점 브랜드 AI 구축", self.script)
        self.assertIn("TF-IDF 기반 문서 RAG", self.index)
        self.assertIn("판매 분석 100문항", self.index)
        self.assertIn("통과율이나 답변 정확도를 뜻하지 않습니다", self.index)

    def test_jarvis_engineering_has_cases_scope_and_demo_boundary(self):
        self.assertEqual(self.index.count('id="jarvis-engineering"'), 1)
        self.assertIn('data-open-journey="jarvis"', self.index)
        self.assertIn("실제 실패를 검증 규칙으로 바꾼 두 사례", self.index)
        self.assertIn("질문 전체를 해결한 것으로 보지 않습니다", self.index)
        self.assertIn("실제 LLM·사내 DB에는 연결하지 않습니다", self.index)
        for field in ("scope", "subtotals", "check"):
            self.assertEqual(self.index.count(f"data-demo-{field}"), 1)

    def test_daou_interview_content_preserves_new_grad_and_evidence_scope(self):
        daou = self.script.split("    daou: {", 1)[1].split("  const aliases", 1)[0]
        self.assertIn("AI 개발 신입", daou)
        for post_id in ("224388659565", "224389961466"):
            self.assertIn(f"https://blog.naver.com/daoustory/{post_id}", daou)
        for evidence in ("952시간·349시간", "복잡한 질문의 완결성", "마케팅·영업·수요예측"):
            self.assertIn(evidence, daou)
        for unsupported in ("LLM 게이트웨이를 구축", "모델 서빙을 구축", "정확도 100%", "비용을 절감했습니다"):
            self.assertNotIn(unsupported, daou)
        for field in ("experience-title", "experience-summary", "foundation-title", "foundation-summary", "supporting-source"):
            self.assertEqual(self.index.count(f"data-profile-{field}"), 1)

    def test_sempio_leads_with_platform_delivery_and_confirmed_collaboration(self):
        sempio = self.script.split("    sempio: {", 1)[1].split("    lgcns: {", 1)[0]
        self.assertIn('projectOrder: ["data-platform", "order-ai", "jarvis"]', sempio)
        self.assertIn("판매처별 전용 페이지", sempio)
        self.assertIn("미완료 항목", sempio)
        self.assertIn("제조·구매 등 새롭게 접할 업무 기준", sempio)
        self.assertIn("Codex를 활용한 코드 분석·구현에도 원천 대조와 결과 검증", sempio)
        self.assertIn('value: "Web · API"', sempio)
        self.assertIn('id="platform-engineering"', self.index)
        self.assertIn('data-profile-only="sempio lotte hanwha hyundai" hidden', self.index)
        self.assertIn('data-open-journey="site"', self.index)
        for unsupported in ("SAP 구축", "ERP를 구축했습니다", "Java 실무", "Spring Boot 개발", "전 직원이 전환"):
            self.assertNotIn(unsupported, sempio)

    def test_lotte_targets_service_delivery_without_inventing_cloud_experience(self):
        lotte = self.script.split("    lotte: {", 1)[1].split("    dbinc: {", 1)[0]
        for evidence in ("판매처별 전용 페이지", "미완료 작업 재처리", "합계 대조", "답변 완결성"):
            self.assertIn(evidence, lotte)
        for date in ("2025.12", "2026.03", "2026.07"):
            self.assertIn(date, lotte)
        self.assertIn("/company/news/press/list/0/931", lotte)
        self.assertIn("/announcement/detail/21933850?compcd=30007", lotte)
        self.assertIn('value: "FastAPI"', lotte)
        self.assertIn("교육 실습과 사내 운영 경험은 구분", lotte)
        self.assertEqual(self.index.count('data-profile-only="lotte"'), 2)
        self.assertIn('profileOnly.split(/\\s+/).includes(key)', self.script)
        for unsupported in ("Kubernetes 운영", "Docker 배포", "L.Cloud 구축", "온톨로지를 구축", "정확도 100%"):
            self.assertNotIn(unsupported, lotte)

    def test_hanwha_targets_engineering_and_preserves_evidence_boundaries(self):
        hanwha = self.script.split("    hanwha: {", 1)[1].split("    sempio: {", 1)[0]
        self.assertIn('projectOrder: ["data-platform", "jarvis", "order-ai"]', hanwha)
        for evidence in ("데이터 파이프라인", "업무 대시보드", "SQLD·ADsP", "읽기 전용", "합계·부분합", "판매처별 전용 페이지", "평가하며 개선 중"):
            self.assertIn(evidence, hanwha)
        self.assertIn("금융 상품과 업무 절차, 개인정보 처리 기준은 담당자와 함께 배우고", hanwha)
        self.assertIn("https://www.recruit-hanwhafinance.com/#section02", hanwha)
        self.assertIn("rtSeq=19498", hanwha)
        for unsupported in ("MLOps를 구축", "금융 AI를 운영", "전사 거버넌스를 수립", "Vector DB", "정확도 100%"):
            self.assertNotIn(unsupported, hanwha)
        self.assertIn('"hanwha-finance": "hanwha"', self.script)

    def test_hyundai_connects_data_modeling_to_observed_workflow_changes(self):
        hyundai = self.script.split("    hyundai: {", 1)[1].split("    hanwha: {", 1)[0]
        self.assertIn('projectOrder: ["data-platform", "jarvis", "order-ai"]', hyundai)
        for evidence in ("상품·옵션", "현재 마스터", "날짜별 이력", "실제 0", "오프라인 테스트", "실제 화면", "최종 광고·발주 결정"):
            self.assertIn(evidence, hyundai)
        self.assertIn("생성·사용 기준을 배우겠습니다", hyundai)
        self.assertIn("https://careers.hyundaigroup.com/jobs/RC20260828033768", hyundai)
        self.assertIn("https://careers.hyundaigroup.com/people-bigdata", hyundai)
        for unsupported in ("28%", "만족도가 상승", "만족도가 높아", "예지보전을 구축", "Vector DB", "정확도 100%"):
            self.assertNotIn(unsupported, hyundai)
        self.assertIn('"hyundai-elevator": "hyundai"', self.script)
        self.assertEqual(self.index.count('id="hyundai-data-modeling"'), 1)
        self.assertIn('class="hyundai-outcomes" data-profile-only="hyundai" hidden', self.index)


if __name__ == "__main__":
    unittest.main()
