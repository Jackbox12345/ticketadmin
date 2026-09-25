import { useDashboard } from "../../../context/DashboardContext";
import { chartRanges } from "../../../misc/types";

export default function ChartHeader() {
  const { range, setRange } = useDashboard();

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {chartRanges.map((option) => (
          <button
            key={option}
            onClick={() => setRange(option)}
            aria-pressed={range === option}
            className={`px-4 py-1.5 text-xl font-medium rounded-lg border transition-all duration-150 ${
              range === option
                ? "text-[#3BBFF5] border-[#3BBFF5] bg-[#3BBFF5]/10"
                : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
