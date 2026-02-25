const options = ["weekly", "monthly", "yearly"] as const;
type Range = (typeof options)[number];

interface ChartHeaderProps {
  value: Range;
  onChange: (value: Range) => void;
}

export default function ChartHeader({
  value,
  onChange,
}: ChartHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm text-[var(--text-secondary)]">
        Ticket volume
      </h3>

      <div className="flex bg-[var(--bg-surface)] rounded-lg p-1">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-1.5 mx-4 text-sm rounded-md transition ${
              value === option
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--text-secondary)] hover:text-white"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}