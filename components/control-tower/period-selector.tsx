import { LockKeyhole } from "lucide-react";

interface PeriodSelectorProps {
  periods: number[];
  selected: number;
  lockedPeriods?: number[];
  onChange: (period: number) => void;
}

export function PeriodSelector({ periods, selected, lockedPeriods = [], onChange }: PeriodSelectorProps) {
  return (
    <div className="period-selector" aria-label="Select analysis period">
      {periods.map((period) => {
        const isLocked = lockedPeriods.includes(period);

        return (
          <button
            type="button"
            key={period}
            className={`${selected === period ? "period-button active" : "period-button"}${isLocked ? " locked" : ""}`}
            aria-pressed={selected === period}
            aria-label={isLocked ? `Period ${period} locked until historical outcome is revealed` : `Period ${period}`}
            disabled={isLocked}
            onClick={() => onChange(period)}
          >
            Period {period} {isLocked && <LockKeyhole size={11} aria-hidden="true" />}
          </button>
        );
      })}
    </div>
  );
}
