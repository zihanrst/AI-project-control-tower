export type Project = "Albania" | "Croatia" | "Finland" | "Honduras";
export type RiskStatus = "Open" | "Mitigating";
export type Impact = "None" | "Low" | "Medium" | "High";

export interface PeriodData {
  id: number;
  capacity: number;
  allocations: Record<Project, number>;
}

export interface DemoData {
  metadata: {
    name: string;
    projects: Project[];
    resource: string;
    recruitmentLeadTimePeriods: number;
  };
  periods: PeriodData[];
  historicalDecision: {
    period: number;
    action: string;
    quantity: number;
    resource: string;
    effectivePeriod: number;
  };
}

export interface ResourceSignal {
  periodId: number;
  totalAllocated: number;
  utilisation: number;
  spareCapacity: number;
  projectCount: number;
  isAtCapacity: boolean;
  hasLeadTimeExposure: boolean;
}

export interface PortfolioRisk {
  id: string;
  title: string;
  category: "Resource";
  scope: "Portfolio";
  severity: "High";
  status: RiskStatus;
  detectedAt: string;
  evidence: string[];
  recommendation: string;
}

export interface Scenario {
  id: "maintain" | "reallocate" | "recruit";
  title: string;
  description: string;
  resultingCapacity: number;
  capacityImpact: string;
  costImpact: Impact;
  disruption: Impact;
  leadTime: string;
  residualRisk: Impact;
  advantages: string[];
  tradeoffs: string[];
  recommended: boolean;
}
