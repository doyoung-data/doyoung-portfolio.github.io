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


if __name__ == "__main__":
    unittest.main()
