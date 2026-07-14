export const sampleExtraction = {
  company_name: "Not mentioned",
  problem_statement:
    "Citizens in tier 2 cities have very poor access to quality healthcare. When it comes to specialty healthcare, it is practically non-existent. Focus is on the pediatric care segment as there is a large gap between demand and supply.",
  solution:
    "A technology-enabled solution with a centralized pool of experienced multi-disciplinary pediatric specialists who support local doctors & medical staff in on-ground centers in tier 2 cities.",
  target_market:
    "Low-income households with limited access to quality healthcare in Rajasthan, with Kota, Jaisalmer and Udaipur earmarked for the first phase.",
  tam_estimate:
    "Rs.20,000 crore market from the consulting side. Additionally, medicines, diagnostics and commissions from hospitals is a Rs.20,000 crore opportunity.",
  business_model:
    "Local doctors enrolled as representative centres operating under the brand's framework. Patients pay Rs.500 per 15-minute consultation, plus optional yearly individual/family subscriptions. Local doctors set their own additional fees.",
  team_members: "NO TEAM SLIDE FOUND",
  traction_metrics: {
    revenue: "Not mentioned",
    users_customers: "Near 100% capacity utilization from day 1 in both clinics",
    growth_rate: "Not mentioned",
    other_metrics:
      "2 clinics operating in Kota, 2 super-specialists on panel in Gurgaon. 100% success onboarding doctors.",
  },
  technology_differentiation:
    "Assisted medical care platform built for V3 — Voice, Video, Vernacular. Aadhaar-enabled KYC, biometric authentication, APIs for integration with connected devices and diagnostic labs.",
  funding_ask: "Rs.X cr",
  use_of_funds: "18-month runway to reach 10 clinics.",
  financial_projections_mentioned:
    "Targeting 100 tier-2 cities in 5 years, implying 200+ clinics [UNCLEAR/INCONSISTENT]. Later states 2000 clinics [UNCLEAR/INCONSISTENT] with revenue ~Rs.500 [UNCLEAR/INCONSISTENT].",
};

export const sampleAnalysis = {
  dimension_scores: [
    {
      dimension: "TAM",
      score: 3,
      justification:
        "Rs.20,000cr figures are top-down with zero bottom-up derivation. No sizing of the actual 3-city launch market against the go-to-market plan.",
    },
    {
      dimension: "Team",
      score: 1,
      justification:
        "NO TEAM SLIDE FOUND is disqualifying, not neutral, given the operational and regulatory complexity of clinical healthcare delivery.",
    },
    {
      dimension: "Traction",
      score: 7,
      justification:
        "Real revenue signal: Rs.50,000/day/clinic across 2 live clinics with near-100% utilization and 100% doctor onboarding success — genuine early demand, not vanity metrics.",
    },
    {
      dimension: "Technology Moat",
      score: 3,
      justification:
        "KYC, biometrics, and V3 UX are increasingly standard telemedicine infrastructure, replicable by a well-funded competitor in 6 months. Real defensibility (if any) is the doctor network, not the tech.",
    },
    {
      dimension: "Business Model",
      score: 5,
      justification:
        "Pricing is concrete (Rs.500/15min) but no unit economics or revenue-split with local doctors is disclosed.",
    },
    {
      dimension: "Why Now",
      score: 2,
      justification:
        "No specific regulatory, technological, or behavioral trigger cited anywhere in the deck.",
    },
    {
      dimension: "Financials",
      score: 2,
      justification:
        "Funding ask is a placeholder, and clinic-count math jumps 2 orders of magnitude with no bridge — internally inconsistent.",
    },
    {
      dimension: "Risk Disclosure Quality",
      score: 2,
      justification:
        "No proactive risk-naming despite operating in a regulated, trust-critical healthcare sector.",
    },
  ],
  weighted_overall_score: 3.3,
  unfair_advantage:
    "The branded local-doctor network paired with a centralized specialist pool is slower for a well-capitalized competitor to replicate than the technology layer — though thin and unproven at scale.",
  fatal_flaw:
    "Missing team and inconsistent financials compound in a regulated, biometric-data-handling healthcare business — an investor has no way to evaluate who is running this or whether the unit economics hold.",
  one_line_verdict:
    "Encouraging early traction is undercut by a missing team, an unsubstantiated top-down TAM, no why-now, and internally inconsistent financials.",
  financial_summary: {
    year_1_revenue_cr: 5.85,
    year_2_revenue_cr: 15.0,
    year_3_revenue_cr: 27.9,
    year_1_ebitda_cr: -0.34,
    year_2_ebitda_cr: 1.5,
    year_3_ebitda_cr: 4.67,
    monthly_burn_lakh: 6.8,
    breakeven_timeline: "~Month 18-20 (independently converges with the deck's own 18-month claim)",
    largest_data_gap:
      "Funding ask is a literal placeholder ('Rs.X cr') — cannot verify whether the raise covers the modeled burn.",
    top_assumptions: [
      "Mature-clinic utilization held at 90%, not the claimed 100% (unproven at scale)",
      "Clinic count Year 1-3 (8/16/28) is extrapolated beyond the deck's own 10-clinic/18-month milestone",
      "The deck's own 2000-clinic revenue claim is excluded entirely — no unit, timeline, or bridge provided",
    ],
  },
};
