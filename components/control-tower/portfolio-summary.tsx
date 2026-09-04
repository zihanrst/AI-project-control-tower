import { AlertTriangle, BriefcaseBusiness, Gauge, Users } from "lucide-react";

interface PortfolioSummaryProps {
  projectCount: number;
  capacity: number;
  utilisation: number;
  riskCount: number;
}

export function PortfolioSummary({ projectCount, capacity, utilisation, riskCount }: PortfolioSummaryProps) {
  const cards = [
    { label: "Active projects", value: projectCount, note: "Concurrent portfolio", icon: BriefcaseBusiness },
    { label: "Designers", value: capacity, note: "Shared specialist pool", icon: Users },
    { label: "Capacity utilisation", value: `${Math.round(utilisation * 100)}%`, note: "Portfolio allocation", icon: Gauge },
    { label: "Priority risks", value: riskCount, note: "Requires attention", icon: AlertTriangle, alert: true },
  ];

  return (
    <section className="kpi-grid" aria-label="Portfolio summary">
      {cards.map(({ label, value, note, icon: Icon, alert }) => (
        <article className={`kpi-card${alert ? " alert" : ""}`} key={label}>
          <div className="kpi-label"><Icon size={17} /> {label}</div>
          <strong>{value}</strong>
          <span>{note}</span>
        </article>
      ))}
    </section>
  );
}
