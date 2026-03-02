# Hidden MSP MRR Calculator — Project Instructions

## Project Overview

**App Name:** The "Hidden MSP MRR" Calculator
**Subtitle:** Find Out How Much Revenue Is Hiding in Your Existing Customer Base.
**Purpose:** Lead generation tool for Bridgepointe, a technology advisory company that acquires healthy MSPs. Prospects input their financial and company data; the app calculates how much recurring revenue they are leaving on the table by not selling Network, UCaaS, CX, Cloud, Colocation, and Security services — services Bridgepointe can help them sell.

**Deployment:**
- GitHub: https://github.com/triumph4000/value_calc
- Platform: Vercel
- Framework: Next.js (App Router)

---

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts/Visualizations:** Recharts
- **Form State:** React Hook Form + Zod validation
- **Deployment:** Vercel

---

## Brand & Design Direction

- **Client:** Bridgepointe Technologies
- **Tone:** Professional, confident, data-driven — B2B SaaS feel
- **Color palette:** Deep navy (#0F172A), electric blue (#3B82F6), white, light slate grays. Accent green for positive metrics, red/orange for whitespace gaps.
- **Typography:** Clean sans-serif (Inter or Geist). Large, bold headline numbers for impact.
- **Overall feel:** Modern fintech/analytics dashboard. Make the numbers feel real and significant.
- No emojis in production UI unless a specific icon component is used intentionally.

---

## App Flow

### Landing / Hero Section

**Headline:**
> Most MSPs monetize less than 40% of their customer's total technology wallet.

**Body:**
> See how much recurring revenue you are leaving on the table with missed Network, UCaaS, CX, Cloud, Colocation, and Security Cross-Sell Opportunities.

**Subheadline:**
> In under 3 minutes, calculate your untapped cross-sell MRR.

**CTA Button:** "Calculate My Hidden Revenue"

---

### Multi-Step Form (Steps 1–4)

The form is broken into 4 labeled sections. Show a progress indicator. Do not navigate away from the page — use in-page state transitions.

---

#### SECTION A: Core Revenue Profile

| Field | Type | Notes |
|---|---|---|
| Total Active Customers | Number input | Required |
| Total Monthly Recurring Revenue (MRR) | Dollar input | Required |
| Average Monthly Revenue Per Customer | Display only | Auto-calculated: MRR ÷ Customers |
| % Revenue from UCaaS | Percentage input (0–100) | |
| % Revenue from Network (DIA/MPLS/SD-WAN/SASE/POTS) | Percentage input | |
| % Revenue from CCaaS/CX | Percentage input | |
| % Revenue from Cloud/Colocation | Percentage input | |
| % Revenue from Security | Percentage input | |

Revenue percentages do not need to sum to 100%. They are directional signals.

---

#### SECTION B: Product Penetration

Label: *"What percentage of your customers currently buy this from you?"*

Sliders (0–100%) for each:

1. UCaaS
2. SD-WAN
3. Cybersecurity
4. Managed Firewall
5. SASE
6. CCaaS / CX
7. Backup / DR
8. Cloud (IaaS / Colo)
9. AI / Automation
10. BPO / CX Enhancements

Show the current percentage value next to each slider in real time.

---

#### SECTION C: Customer Economics

| Field | Type |
|---|---|
| Average UCaaS Monthly Spend Per Customer | Dollar input |
| Average Network / Connectivity Spend | Dollar input |
| Average Security Spend | Dollar input |
| Average CCaaS / CX Spend | Dollar input |
| Average Cloud / Colocation Spend | Dollar input |
| Average Contract Term (months) | Number input |
| % of Customers Under Contract (vs Month-to-Month) | Percentage input |

---

#### SECTION D: Renewal & Expansion Sophistication

Toggle or checkbox (Yes / No) for each:

- Do you track contract expiration dates centrally?
- Do you proactively run QBRs (Quarterly Business Reviews)?
- Do you bundle multi-product deals?
- Do you have a dedicated account manager?

These four answers feed an **Operational Maturity Score** (0–4) used in the output.

---

### Results / Output Dashboard

Rendered on the same page after form submission. Key output sections:

#### 1. Hidden MRR Meter
Large visual gauge or bar showing estimated untapped MRR vs current MRR.

#### 2. Current Monetization Rate
Percentage: current MRR as a share of estimated total addressable wallet.

#### 3. Industry Potential Benchmark
Show "Industry avg attach rate" vs user's current rates per category.

#### 4. Top 3 Whitespace Categories
Cards showing the 3 product categories with the largest estimated revenue gap.

#### 5. 3-Year Revenue Impact
Projected MRR x 36 months (contract term can adjust this if entered).

#### 6. Exit Valuation Lift
If untapped MRR were captured: estimated EBITDA contribution x 5x multiple.
(Assume ~40% EBITDA margin on new MRR for the valuation calc.)

#### 7. Operational Maturity Score
Based on Section D answers. Score 0–4 with label:
- 0–1: "Reactive"
- 2: "Developing"
- 3: "Proactive"
- 4: "Best-in-Class"

---

### Lead Capture Gate

After results are shown (partial preview visible), display:

> **Want a custom Cross-Sell Blueprint built around your customer base?**
> Enter your email to unlock your full PDF report.

- Email input (required)
- Optional: First name, Company name
- Submit triggers: show full results + "Thank you" confirmation + notify Bridgepointe team

Lead data should be stored (at minimum logged to console or a simple API route) and email collected before full PDF/report access is granted.

---

## Calculation Logic

### Industry Benchmark Attach Rates (defaults, can be tuned)

| Product | Industry Benchmark |
|---|---|
| UCaaS | 55% |
| SD-WAN | 45% |
| Cybersecurity | 60% |
| Managed Firewall | 50% |
| SASE | 35% |
| CCaaS / CX | 30% |
| Backup / DR | 65% |
| Cloud (IaaS/Colo) | 40% |
| AI / Automation | 20% |
| BPO / CX Enhancements | 15% |

### Hidden MRR Formula (per product)

```
whitespace_customers = total_customers × max(0, benchmark_rate − current_penetration_rate)
hidden_mrr_per_product = whitespace_customers × avg_monthly_spend_per_product
```

### Default Average Monthly Spend Values (used if user leaves blank)

| Product | Default Avg Spend |
|---|---|
| UCaaS | $450 |
| SD-WAN | $800 |
| Cybersecurity | $600 |
| Managed Firewall | $350 |
| SASE | $700 |
| CCaaS / CX | $900 |
| Backup / DR | $300 |
| Cloud (IaaS/Colo) | $1,200 |
| AI / Automation | $500 |
| BPO / CX Enhancements | $1,500 |

### Totals

```
total_hidden_mrr = sum of hidden_mrr across all products

contract_months = user input (default 36 if blank)
three_year_value = total_hidden_mrr × contract_months

annual_commission = total_hidden_mrr × 12 × 0.15

ebitda_contribution = total_hidden_mrr × 0.40
exit_valuation_lift = ebitda_contribution × 12 × 5
```

---

## File Structure

```
/app
  /page.tsx              — Hero/landing + calculator entry
  /api
    /leads/route.ts      — POST endpoint to capture lead data
/components
  /calculator
    /StepA.tsx
    /StepB.tsx
    /StepC.tsx
    /StepD.tsx
    /Results.tsx
    /LeadCapture.tsx
  /ui                    — shadcn components
/lib
  /calculations.ts       — All calculation logic, pure functions
  /constants.ts          — Benchmark rates, default spend values, labels
  /types.ts              — Shared TypeScript interfaces
/public
  /bridgepointe-logo.svg — Add when available
```

---

## Key Conventions

- All calculation logic lives in `/lib/calculations.ts` as pure functions with no side effects.
- Constants (benchmark rates, default spend values) live in `/lib/constants.ts` so they can be tuned without touching calculation logic.
- Form state is managed with React Hook Form. Zod schema validates before advancing each step.
- Do not use `any` types. Define all data shapes in `/lib/types.ts`.
- Use Tailwind for all styling. No CSS modules or styled-components.
- Use shadcn/ui primitives (Slider, Input, Switch, Button, Card, Progress) wherever appropriate.
- Currency values are always displayed formatted (e.g., `$68,400/mo` not `68400`).
- Percentages are stored as decimals (0.0–1.0) internally and displayed as whole numbers (0–100) in the UI.
- Mobile-responsive layout required. The calculator must work cleanly on phones.

---

## Lead Data Schema

```typescript
interface LeadSubmission {
  email: string
  firstName?: string
  company?: string
  submittedAt: string // ISO timestamp
  inputs: CalculatorInputs
  results: CalculatorResults
}
```

At minimum, POST to `/api/leads` and log to console. Future integration: webhook to CRM or email to Bridgepointe team.

---

## Notes for Future Enhancements

- PDF report generation (React PDF or Puppeteer)
- CRM webhook (HubSpot or Salesforce)
- Admin dashboard to view all lead submissions
- A/B test headline variants
- Animated number counters on results reveal
