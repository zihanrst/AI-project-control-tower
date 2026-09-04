import type { PeriodData, Project, ResourceSignal } from "@/lib/types";

const projectColours: Record<Project, string> = {
  Albania: "#17806d",
  Croatia: "#3178a5",
  Finland: "#d28b28",
  Honduras: "#7a68a6",
};

interface ResourceAllocationProps {
  period: PeriodData;
  signal: ResourceSignal;
}

export function ResourceAllocation({ period, signal }: ResourceAllocationProps) {
  return (
    <section className="panel allocation-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Designer capacity</p>
          <h2>Shared resource allocation</h2>
        </div>
        <div className="capacity-total">
          <strong>{signal.totalAllocated} / {period.capacity}</strong>
          <span>designers booked</span>
        </div>
      </div>

      <div className="capacity-track" aria-label={`${Math.round(signal.utilisation * 100)} percent utilised`}>
        {(Object.entries(period.allocations) as [Project, number][]).map(([project, allocation]) => (
          <div
            key={project}
            className="capacity-segment"
            style={{ width: `${(allocation / period.capacity) * 100}%`, background: projectColours[project] }}
            title={`${project}: ${allocation}`}
          />
        ))}
      </div>

      <div className="allocation-list">
        {(Object.entries(period.allocations) as [Project, number][]).map(([project, allocation]) => (
          <div className="allocation-row" key={project}>
            <span className="project-dot" style={{ background: projectColours[project] }} />
            <span>{project}</span>
            <div className="mini-track"><i style={{ width: `${(allocation / period.capacity) * 100 * 2.5}%`, background: projectColours[project] }} /></div>
            <strong>{allocation}</strong>
          </div>
        ))}
      </div>

      <div className="capacity-footer">
        <span className="status-pill critical">At capacity</span>
        <span>{signal.spareCapacity} available buffer</span>
        <span>{Math.round(signal.utilisation * 100)}% utilised</span>
      </div>
    </section>
  );
}
