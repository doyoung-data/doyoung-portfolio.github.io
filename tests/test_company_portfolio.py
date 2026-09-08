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
        self.assertEqual(self.script.count("projectSummaries: {"), 4)

    def test_unknown_targets_do_not_resolve_object_prototypes(self):
        self.assertIn("Object.prototype.hasOwnProperty.call(profiles, requested)", self.script)
        self.assertIn("Object.prototype.hasOwnProperty.call(aliases, requested)", self.script)

    def test_company_direction_sources_and_evaluation_scope_are_explicit(self):
        self.assertEqual(self.script.count("directionSource: {"), 4)
        self.assertIn("2026 롯데그룹 신년사", self.script)
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


if __name__ == "__main__":
    unittest.main()
