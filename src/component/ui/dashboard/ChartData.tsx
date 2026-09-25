import {
  Treemap,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Skeleton from "./Skeleton";
import { useDashboard } from "../../../context/DashboardContext";
import { useMemo, memo } from "react";

const COLORS = [
  "#e63946",
  "#2a9d8f",
  "#f4a261",
  "#e9c46a",
  "#264653",
  "#457b9d",
  "#ff006e",
  "#8338ec",
  "#3a86ff",
  "#fb5607",
];

interface CustomContentProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  size?: number;
  index?: number;
  total: number;
}

function wrapText(text: string, maxLength = 10) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    if ((current + word).length > maxLength) {
      if (current) lines.push(current.trim());
      current = `${word} `;
    } else {
      current += `${word} `;
    }
  });

  if (current) lines.push(current.trim());
  return lines;
}

const CustomContent = memo(function CustomContent({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name = "Unknown",
  size = 0,
  index = 0,
  total,
}: CustomContentProps) {
  const percent = total > 0 ? ((size / total) * 100).toFixed(1) : "0.0";
  const lines = wrapText(name);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={COLORS[index % COLORS.length]}
        stroke="#fff"
        strokeWidth={1}
      />

      {width < 40 || height < 30 ? null : (
        <>
          <text x={x + 6} y={y + 16} fill="#fff" fontSize={11}>
            {lines.map((line, lineIndex) => (
              <tspan
                key={`${line}-${lineIndex}`}
                x={x + 6}
                dy={lineIndex === 0 ? 0 : 12}
              >
                {line}
              </tspan>
            ))}
          </text>

          {width > 70 && height > 50 && (
            <text
              x={x + 6}
              y={y + 16 + lines.length * 12 + 5}
              fill="#fff"
              fontSize={12}
              fontWeight="bold"
            >
              {size}
            </text>
          )}

          {width > 90 && height > 65 && (
            <text
              x={x + 6}
              y={y + 16 + lines.length * 12 + 20}
              fill="#fff"
              fontSize={10}
              opacity={0.8}
            >
              {percent}%
            </text>
          )}
        </>
      )}
    </g>
  );
});

export default function ChartData() {
  const { topCategory, loading, error } = useDashboard();

  //  MEMOIZE data
  const data = useMemo(() => {
    return (
      topCategory?.slice(0, 10).map((item) => ({
        name: item.problem_type ?? "Unknown",
        size: item.Count ?? 0,
      })) || []
    );
  }, [topCategory]);

  //  MEMOIZE total
  const total = useMemo(
    () => data.reduce((sum, d) => sum + d.size, 0),
    [data]
  );

  if (loading) {
    return (
      <div aria-label="Loading category data" aria-busy="true">
        <Skeleton className="h-[280px] w-full" />
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="70%">
        <Treemap
          data={data}
          dataKey="size"
          content={<CustomContent total={total} />}
          isAnimationActive={true} //  BIG performance gain
          animationDuration={1200}
        >
          <Tooltip formatter={(value) => Number(value).toLocaleString()} />
        </Treemap>
      </ResponsiveContainer>
      <div>
<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
  {data.map((item, index) => {
    const percent =
      total > 0
        ? ((item.size / total) * 100).toFixed(1)
        : 0;

    return (
      <div
        key={index}
        className="bg-slate-800 px-2 py-2 rounded flex justify-between gap-1"
      >
        {/* TOP: COLOR + NAME */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: COLORS[index % COLORS.length],
            }}
          />
          <span className="text-gray-200 truncate">
            {item.name}
          </span>
        </div>

        {/* PERCENT */}
        <div className="text-gray-400">
          {percent}%
        </div>
      </div>
    );
  })}
</div>
      </div>
    </div>
  );
}
