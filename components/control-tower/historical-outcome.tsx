import { ArrowDown, Eye, LockKeyhole } from "lucide-react";
import type { ResourceSignal } from "@/lib/types";

interface HistoricalOutcomeProps {
  canReveal: boolean;
  revealed: boolean;
  outcome: ResourceSignal;
  onReveal: () => void;
}

export function HistoricalOutcome({ canReveal, revealed, outcome, onReveal }: HistoricalOutcomeProps) {
  if (!revealed) {
    return (
      <section className="outcome-gate">
        <div><span className="source-label outcome">Future data boundary</span><h2>Validate against the historical outcome</h2><p>Period 3 remains locked until the historical outcome is revealed.</p></div>
        <button type="button" className="reveal-button" disabled={!canReveal} onClick={onReveal}>
          {canReveal ? <Eye size={17} /> : <LockKeyhole size={17} />} Reveal historical outcome
        </button>
      </section>
    );
  }

  return (
    <section className="panel outcome-panel">
      <div className="outcome-heading"><span className="source-label outcome">Observed outcome</span><h2>Additional capacity was fully utilised</h2><p>Future data is shown only after the recommendation boundary.</p></div>
      <div className="timeline">
        <div><span>Period 1</span><strong>24 / 24</strong><small>100% utilised</small></div>
        <ArrowDown size={20} />
        <div className="decision-node"><span>Historical action</span><strong>Recruit +4</strong><small>2-period lead time</small></div>
        <ArrowDown size={20} />
        <div><span>Period 3</span><strong>{outcome.totalAllocated} / {outcome.totalAllocated + outcome.spareCapacity}</strong><small>{Math.round(outcome.utilisation * 100)}% utilised</small></div>
      </div>
      <p className="outcome-note">This supports the value of proactive planning, but does not prove that delay was inevitable without recruitment.</p>
    </section>
  );
}
