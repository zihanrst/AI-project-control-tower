import { ArrowRight } from "lucide-react";
import type { PortfolioRisk } from "@/lib/types";

export function RiskDetail({ risk }: { risk: PortfolioRisk }) {
  const stages = [
    { name: "Detect", copy: "Full utilisation across four projects." },
    { name: "Assess", copy: "No buffer and a two-period response time." },
    { name: "Mitigate", copy: "Compare three capacity options." },
    { name: "Track", copy: "Review the later observed outcome." },
  ];

  return (
    <div className="risk-detail">
      <div className="evidence-list">
        <p className="field-label">Evidence available at detection</p>
        {risk.evidence.map((item) => <div key={item}><span>✓</span>{item}</div>)}
      </div>
      <div className="lifecycle" aria-label="Risk lifecycle">
        {stages.map((stage, index) => (
          <div className="lifecycle-wrap" key={stage.name}>
            <div className="lifecycle-stage">
              <span>{index + 1}</span>
              <strong>{stage.name}</strong>
              <small>{stage.copy}</small>
            </div>
            {index < stages.length - 1 && <ArrowRight className="lifecycle-arrow" size={16} />}
          </div>
        ))}
      </div>
    </div>
  );
}
