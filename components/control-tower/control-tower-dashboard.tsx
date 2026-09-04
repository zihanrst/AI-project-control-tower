"use client";

import { useMemo, useState } from "react";
import { Activity, Database, ShieldCheck } from "lucide-react";
import { analyseResource } from "@/lib/resource-engine";
import { createCapacityRisk } from "@/lib/risk-engine";
import { generateScenarios } from "@/lib/scenario-engine";
import type { DemoData, RiskStatus } from "@/lib/types";
import { AiPriorityCard } from "./ai-priority-card";
import { HistoricalOutcome } from "./historical-outcome";
import { PeriodSelector } from "./period-selector";
import { PortfolioSummary } from "./portfolio-summary";
import { ResourceAllocation } from "./resource-allocation";
import { ScenarioPlanner } from "./scenario-planner";

export function ControlTowerDashboard({ data }: { data: DemoData }) {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [riskStatus, setRiskStatus] = useState<RiskStatus>("Open");
  const [outcomeRevealed, setOutcomeRevealed] = useState(false);

  const period = data.periods.find((item) => item.id === selectedPeriod) ?? data.periods[0];
  const signal = useMemo(() => analyseResource(period, data.metadata.recruitmentLeadTimePeriods), [data, period]);
  const risk = createCapacityRisk(signal, data.metadata.recruitmentLeadTimePeriods, riskStatus);
  const scenarios = generateScenarios(data.periods[0].capacity, data.historicalDecision.quantity, data.metadata.recruitmentLeadTimePeriods);
  const outcome = analyseResource(data.periods.find((item) => item.id === data.historicalDecision.effectivePeriod)!, data.metadata.recruitmentLeadTimePeriods);

  function openAnalysis() {
    setAnalysisOpen(true);
    window.setTimeout(() => document.getElementById("scenario-planner")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  return (
    <main>
      <header className="topbar">
        <div className="brand-mark"><Activity size={19} /></div>
        <div className="brand"><strong>AI Project Control Tower</strong><span>Decision intelligence workspace</span></div>
        <div className="topbar-meta"><span><Database size={14} /> Historical Backtest</span><span><ShieldCheck size={14} /> Explainable logic</span></div>
      </header>

      <div className="dashboard-shell">
        <section className="page-heading">
          <div><p className="eyebrow">Portfolio command view</p><h1>Multi-project resource risk<br />&amp; decision support</h1><p>Proactive analysis for shared specialist capacity across four concurrent engineering projects.</p></div>
          <PeriodSelector
            periods={data.periods.map((item) => item.id)}
            selected={selectedPeriod}
            lockedPeriods={outcomeRevealed ? [] : [data.historicalDecision.effectivePeriod]}
            onChange={setSelectedPeriod}
          />
        </section>

        <section className="workflow-strip" aria-label="Agent decision workflow">
          <span>Observe</span><i>→</i><span>Detect</span><i>→</i><span>Assess</span><i>→</i><span>Recommend</span><i>→</i><span>Human Approve</span><i>→</i><span>Track</span>
        </section>

        <PortfolioSummary projectCount={data.metadata.projects.length} capacity={period.capacity} utilisation={signal.utilisation} riskCount={risk ? 1 : 0} />

        <div className="primary-grid">
          <ResourceAllocation period={period} signal={signal} />
          {risk && <AiPriorityCard risk={risk} expanded={evidenceOpen} onToggleEvidence={() => setEvidenceOpen((value) => !value)} onAnalyse={openAnalysis} />}
        </div>

        {analysisOpen && <ScenarioPlanner scenarios={scenarios} riskStatus={riskStatus} onApprove={() => setRiskStatus("Mitigating")} />}
        <HistoricalOutcome canReveal={analysisOpen} revealed={outcomeRevealed} outcome={outcome} onReveal={() => setOutcomeRevealed(true)} />
        <footer><span>AI Project Control Tower · MVP v0.1.1</span><span>Deterministic analysis · Human-controlled decisions</span></footer>
      </div>
    </main>
  );
}
