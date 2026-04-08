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

  //  MEMOIZED CUSTOM CONTENT
  const CustomContent = memo((props: any) => {
    const { x, y, width, height, name, size, index } = props;

    if (width < 40 || height < 30) return null; //  skip small tiles

    const percent =
      total > 0 ? ((size / total) * 100).toFixed(1) : 0;

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

        {width > 70 && height > 50 && (
          <>
            <text
              x={x + 6}
              y={y + 18}
              fill="#fff"
              fontSize={11}
            >
              {name}
            </text>

            <text
              x={x + 6}
              y={y + 32}
              fill="#fff"
              fontSize={12}
              fontWeight="bold"
            >
              {size}
            </text>

            <text
              x={x + 6}
              y={y + 46}
              fill="#fff"
              fontSize={10}
              opacity={0.8}
            >
              {percent}%
            </text>
          </>
        )}
      </g>
    );
  });

  if (loading) return <Skeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          content={<CustomContent />}
          isAnimationActive={true} //  BIG performance gain
          animationDuration={1200}
        >
          <Tooltip
            formatter={(value: any) =>
              Number(value).toLocaleString()
            }
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}