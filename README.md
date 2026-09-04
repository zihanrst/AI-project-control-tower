# AI Project Control Tower

An explainable decision-support MVP that detects shared-resource pressure across concurrent engineering projects, compares mitigation scenarios, and keeps the final decision with a human.

## Live Demo

Vercel URL: _coming soon_

## Problem

Traditional project dashboards report current KPIs, but often leave managers to identify cross-project constraints themselves. A local project view can miss portfolio-level pressure and the lead time needed to respond.

## Solution

**Observe → Detect → Assess → Recommend → Human approve → Track**

The first vertical slice calculates resource utilisation, creates a structured risk, explains its evidence, compares three mitigation choices, and reveals the later historical outcome only after the recommendation stage.

## Dataset

The MVP is back-tested using historical decision data from a multi-project engineering simulation involving four concurrent projects and shared specialist resources. Only a small reconstructed dataset is included. No original teaching materials are distributed.

## Flagship case

Four projects share one Designer pool: Period 1 `24 / 24`; Period 2 `24 / 24`; historical decision Recruit +4; Period 3 observed outcome `28 / 28`.

The product identifies **capacity pressure**, not a proven shortage. It does not claim four designers were precisely required or that delays were inevitable without recruitment.

## Architecture

```text
Structured project state → Resource Engine → Risk Layer → Scenario Engine
→ Recommendation → Human approval → Historical outcome validation
```

## Design principles

- Deterministic calculations for quantitative logic
- Explainable recommendations and human approval
- Strict separation of initial inputs and future outcome data
- No fabricated precision or unsupported counterfactual claims
- Useful without an API key, database, authentication, or LLM

## Tech stack

Next.js App Router, TypeScript, React, Lucide icons, responsive CSS, and Vercel.

## Run locally

```bash
npm install
npm run dev
```

Quality checks: `npm test`, `npm run lint`, and `npm run build`.

## Roadmap

Future work: schedule/dependency risk, rework propagation, portfolio forecast confidence, commercial/supplier risk, and AI tool orchestration. These are not part of v0.1.
