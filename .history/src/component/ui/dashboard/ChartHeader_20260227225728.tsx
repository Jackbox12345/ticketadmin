import { chartRanges } from "../../../misc/types";
import { useDashboard } from "../../context/DashboardProvider";

export default function ChartHeader() {
  const { range, setRange } = useDashboard();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {chartRanges.map((option) => (
          <button
            key={option}
            onClick={() => setRange(option)}
            className={`px-2 py-[2px] text-[11px] leading-none rounded-md transition-all ${
              range === option
                ? "bg-[var(--bg-card)] text-white ring-2 ring-[var(--primary)]"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-white hover:ring-1 hover:ring-[var(--primary)]"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}