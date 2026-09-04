import demoData from "@/data/mmpe-demo.json";
import { ControlTowerDashboard } from "@/components/control-tower/control-tower-dashboard";
import type { DemoData } from "@/lib/types";

export default function Home() {
  return <ControlTowerDashboard data={demoData as DemoData} />;
}
