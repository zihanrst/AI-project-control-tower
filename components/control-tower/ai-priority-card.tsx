import { BrainCircuit, ChevronDown, ChevronUp, Search } from "lucide-react";
import { RiskDetail } from "./risk-detail";
import type { PortfolioRisk } from "@/lib/types";

interface AiPriorityCardProps {
  risk: PortfolioRisk;
  expanded: boolean;
  onToggleEvidence: () => void;
  onAnalyse: () => void;
}

export function AiPriorityCard({ risk, expanded, onToggleEvidence, onAnalyse }: AiPriorityCardProps) {
  return (
    <section className="panel priority-panel">
      <div className="priority-topline">
        <span className="ai-marker"><BrainCircuit size={16} /> AI priority</span>
        <span className="severity"><i /> {risk.severity} severity</span>
      </div>
      <h2>{risk.title}</h2>
      <p>Designer capacity is fully utilised across four concurrent projects. With no buffer and a two-period recruitment lead time, additional workload or disruption could create downstream constraints.</p>
      <div className="fact-row">
        <span><b>Historical fact</b> 24 of 24 allocated</span>
        <span><b>AI assessment</b> Capacity exposure</span>
      </div>
      <div className="button-row">
        <button type="button" className="primary-button" onClick={onAnalyse}><Search size={16} /> Analyse capacity</button>
        <button type="button" className="secondary-button" onClick={onToggleEvidence}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />} View evidence
        </button>
      </div>
      {expanded && <RiskDetail risk={risk} />}
    </section>
  );
}
