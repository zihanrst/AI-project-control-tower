import { Check, CheckCircle2, Clock3 } from "lucide-react";
import type { RiskStatus, Scenario } from "@/lib/types";

interface ScenarioPlannerProps {
  scenarios: Scenario[];
  riskStatus: RiskStatus;
  onApprove: () => void;
}

export function ScenarioPlanner({ scenarios, riskStatus, onApprove }: ScenarioPlannerProps) {
  return (
    <section className="panel scenario-panel" id="scenario-planner">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Mitigation analysis</p>
          <h2>Compare capacity scenarios</h2>
          <p className="section-copy">Qualitative decision-support labels — not measured financial or schedule estimates.</p>
        </div>
        <span className={`status-pill ${riskStatus === "Open" ? "open" : "mitigating"}`}>Risk: {riskStatus}</span>
      </div>

      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <article className={`scenario-card${scenario.recommended ? " recommended" : ""}`} key={scenario.id}>
            {scenario.recommended && <span className="recommended-badge"><CheckCircle2 size={14} /> Recommended</span>}
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
            <div className="scenario-capacity"><strong>{scenario.resultingCapacity}</strong><span>resulting capacity</span></div>
            <dl>
              <div><dt>Cost impact</dt><dd>{scenario.costImpact}</dd></div>
              <div><dt>Disruption</dt><dd>{scenario.disruption}</dd></div>
              <div><dt>Lead time</dt><dd>{scenario.leadTime}</dd></div>
              <div><dt>Residual risk</dt><dd className={`risk-${scenario.residualRisk.toLowerCase()}`}>{scenario.residualRisk}</dd></div>
            </dl>
            <ul>{scenario.advantages.map((item) => <li key={item}><Check size={14} />{item}</li>)}</ul>
          </article>
        ))}
      </div>

      <div className="recommendation-bar">
        <div>
          <span className="source-label assessment">AI assessment</span>
          <strong>Proactive expansion provides the strongest capacity buffer.</strong>
          <p>Based only on Period 1 conditions and the known two-period recruitment lead time.</p>
        </div>
        {riskStatus === "Open" ? (
          <button type="button" className="primary-button" onClick={onApprove}><CheckCircle2 size={17} /> Approve recommendation</button>
        ) : (
          <div className="approval-confirmation"><CheckCircle2 size={20} /><span><strong>Mitigation approved</strong><small>Recruitment +4 · effective after 2 periods</small></span></div>
        )}
      </div>
      <div className="historical-decision"><Clock3 size={15} /><span className="source-label history">Historical decision</span> The team also chose Recruit +4 at Period 1.</div>
    </section>
  );
}
