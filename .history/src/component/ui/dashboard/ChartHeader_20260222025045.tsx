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

      <div className="flex  rounded-lg p-1">
        {options.map((option) => (
         <button
  key={option}
  onClick={() => onChange(option)}
  className={`px-4 py-1.5 text-sm rounded-md transition-all duration-200 ${
    value === option
      ? "bg-[var(--bg-card)] text-white ring-2 ring-[var(--primary)] shadow-[0_0_12px_var(--primary)]"
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