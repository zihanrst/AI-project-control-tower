import type { DemoData, PeriodData, ResourceSignal } from "./types";

export const CAPACITY_PRESSURE_THRESHOLD = 0.95;

export function analyseResource(
  period: PeriodData,
  leadTimePeriods: number,
): ResourceSignal {
  const totalAllocated = Object.values(period.allocations).reduce(
    (sum, allocation) => sum + allocation,
    0,
  );
  const utilisation = totalAllocated / period.capacity;

  return {
    periodId: period.id,
    totalAllocated,
    utilisation,
    spareCapacity: period.capacity - totalAllocated,
    projectCount: Object.keys(period.allocations).length,
    isAtCapacity: utilisation >= CAPACITY_PRESSURE_THRESHOLD,
    hasLeadTimeExposure: leadTimePeriods >= 2,
  };
}

export function detectSustainedPressure(
  data: Pick<DemoData, "metadata" | "periods">,
  throughPeriod = 2,
): boolean {
  const knownPeriods = data.periods.filter((period) => period.id <= throughPeriod);
  return (
    knownPeriods.length >= 2 &&
    knownPeriods.every(
      (period) =>
        analyseResource(period, data.metadata.recruitmentLeadTimePeriods)
          .isAtCapacity,
    )
  );
}
