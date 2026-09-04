import type { PortfolioRisk, ResourceSignal, RiskStatus } from "./types";

export function createCapacityRisk(
  signal: ResourceSignal,
  leadTimePeriods: number,
  status: RiskStatus = "Open",
): PortfolioRisk | null {
  if (
    !signal.isAtCapacity ||
    signal.projectCount < 2 ||
    !signal.hasLeadTimeExposure
  ) {
    return null;
  }

  return {
    id: "R-001",
    title: "Designer Capacity Pressure",
    category: "Resource",
    scope: "Portfolio",
    severity: "High",
    status,
    detectedAt: `Period ${signal.periodId}`,
    evidence: [
      `${signal.totalAllocated} of ${signal.totalAllocated + signal.spareCapacity} designers allocated`,
      `${Math.round(signal.utilisation * 100)}% current utilisation`,
      "No spare capacity buffer",
      `${signal.projectCount} projects share the same designer pool`,
      `Additional hiring requires ${leadTimePeriods} periods`,
    ],
    recommendation:
      "Evaluate proactive capacity expansion before additional demand materialises.",
  };
}
