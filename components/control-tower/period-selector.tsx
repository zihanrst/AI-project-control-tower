interface PeriodSelectorProps {
  periods: number[];
  selected: number;
  onChange: (period: number) => void;
}

export function PeriodSelector({ periods, selected, onChange }: PeriodSelectorProps) {
  return (
    <div className="period-selector" aria-label="Select analysis period">
      {periods.map((period) => (
        <button
          type="button"
          key={period}
          className={selected === period ? "period-button active" : "period-button"}
          aria-pressed={selected === period}
          onClick={() => onChange(period)}
        >
          Period {period}
        </button>
      ))}
    </div>
  );
}
