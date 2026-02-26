import { chartRanges } from "../../../misc/types";
import type { Range } from "../../../misc/types";

interface ChartHeaderProps {
  value: Range;
  onChange: (value: Range) => void;
}

export default function ChartHeader({
  value,
  onChange,
}: ChartHeaderProps) {
  return (
   <div className="flex items-center justify-between mb-3">
  <h3 className="text-sm text-white">
    Ticket volume
  </h3>

  <div className="flex gap-2">
    {chartRanges.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        
       className={`px-2 py-[2px] text-[11px] leading-none rounded-md transition-all ${
              value === option
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