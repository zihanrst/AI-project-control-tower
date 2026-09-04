import type { Scenario } from "./types";

export function generateScenarios(
  currentCapacity: number,
  recruitmentQuantity: number,
  leadTimePeriods: number,
): Scenario[] {
  return [
    {
      id: "maintain",
      title: "Maintain capacity",
      description: "Continue with the existing shared resource pool.",
      resultingCapacity: currentCapacity,
      capacityImpact: "No change",
      costImpact: "None",
      disruption: "Low",
      leadTime: "Immediate",
      residualRisk: "High",
      advantages: ["No recruitment cost", "No organisational change"],
      tradeoffs: ["Zero capacity buffer", "Exposure to workload or rework"],
      recommended: false,
    },
    {
      id: "reallocate",
      title: "Reallocate designers",
      description: "Reprioritise the existing pool between projects.",
      resultingCapacity: currentCapacity,
      capacityImpact: "Redistribution only",
      costImpact: "Low",
      disruption: "High",
      leadTime: "Immediate",
      residualRisk: "Medium",
      advantages: ["Avoids immediate recruitment", "Uses existing workforce"],
      tradeoffs: ["May transfer exposure", "Does not add portfolio capacity"],
      recommended: false,
    },
    {
      id: "recruit",
      title: `Recruit +${recruitmentQuantity}`,
      description: "Expand the shared designer pool after the hiring lead time.",
      resultingCapacity: currentCapacity + recruitmentQuantity,
      capacityImpact: `+${recruitmentQuantity}`,
      costImpact: "Medium",
      disruption: "Low",
      leadTime: `${leadTimePeriods} periods`,
      residualRisk: "Low",
      advantages: ["Increases total capacity", "Adds ability to absorb workload"],
      tradeoffs: ["Additional labour cost", "Capacity is not immediately available"],
      recommended: true,
    },
  ];
}
