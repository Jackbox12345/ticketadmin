import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../component/ui/Cards";
import Skeleton from "../component/ui/dashboard/Skeleton";

interface TrendItem {
  close_year: number;
  close_month: number;
  month_name: string;
  problem_type: string;
  total: number;
  ranking: string;
}

interface TrendResponse {
  trend: TrendItem[];
}

type ChartRow = {
  sortKey: number;
  label: string;
  [problemType: string]: string | number | null;
};

const TREND_API_URL =
  import.meta.env.VITE_TREND_API_URL ?? "http://bac-dev08:8050/api/trend";

const LINE_COLORS = [
  "#19baf4",
  "#a78bfa",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#22d3ee",
  "#f472b6",
  "#fb923c",
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const CHART_HEIGHT = "clamp(480px, calc(100vh - 320px), 720px)";
const YEAR_OPTIONS = Array.from(
  { length: currentYear - 2019 },
  (_, index) => currentYear - index,
);

export default function TrendAnalytics() {
  const [startYear, setStartYear] = useState(currentYear);
  const [endYear, setEndYear] = useState(currentYear);
  const [trend, setTrend] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    async function loadTrend() {
      setLoading(true);
      setError(null);

      try {
        const query = new URLSearchParams({
          startYear: String(startYear),
          endYear: String(endYear),
        });
        const response = await fetch(`${TREND_API_URL}?${query}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Trend request failed: ${response.status}`);
        }

        const result = (await response.json()) as TrendResponse;
        setTrend(Array.isArray(result.trend) ? result.trend : []);
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === "AbortError"
        ) {
          return;
        }

        setTrend([]);
        setError("Failed to load ticket trend data");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadTrend();
    return () => controller.abort();
  }, [startYear, endYear]);

  const { chartData, problemTypes, legendData } = useMemo(() => {
    const rows = new Map<number, ChartRow>();
    const types = new Set<string>();
    const totalsByType = new Map<string, number>();
    const spansMultipleYears = startYear !== endYear;

    for (let year = startYear; year <= endYear; year += 1) {
      MONTH_NAMES.forEach((monthName, monthIndex) => {
        const month = monthIndex + 1;
        const sortKey = year * 100 + month;
        const label = spansMultipleYears
          ? `${monthName.slice(0, 3)} ${year}`
          : monthName.slice(0, 3);

        rows.set(sortKey, { sortKey, label });
      });
    }

    trend
      .filter((item) => {
        const year = Number(item.close_year);
        return year >= startYear && year <= endYear;
      })
      .forEach((item) => {
      const year = Number(item.close_year);
      const month = Number(item.close_month);
      const total = Number(item.total) || 0;
      const problemType = item.problem_type || "Unknown";
      const sortKey = year * 100 + month;
      const row = rows.get(sortKey);

      if (!row) return;

      row[problemType] = total;
      types.add(problemType);
      totalsByType.set(
        problemType,
        (totalsByType.get(problemType) ?? 0) + total,
      );
      });

    const sortedRows = [...rows.values()].sort((a, b) => a.sortKey - b.sortKey);
    const sortedTypes = [...types]
      .sort(
        (first, second) =>
          (totalsByType.get(second) ?? 0) -
          (totalsByType.get(first) ?? 0),
      )
      .slice(0, 5);

    sortedRows.forEach((row) => {
      sortedTypes.forEach((problemType) => {
        if (!(problemType in row)) row[problemType] = null;
      });
    });

    const totals = sortedTypes.map((problemType, index) => ({
      problemType,
      color: LINE_COLORS[index % LINE_COLORS.length],
      total: sortedRows.reduce((sum, row) => {
        const value = row[problemType];
        return sum + (typeof value === "number" ? value : 0);
      }, 0),
    }));

    return {
      chartData: sortedRows,
      problemTypes: sortedTypes,
      legendData: totals,
    };
  }, [trend, startYear, endYear]);

  return (
    <main className="min-h-screen bg-[#1b1433] p-4 text-white animate-slide-in">
      <div className="flex min-h-[calc(100vh-2rem)] w-full flex-col gap-4">
        <Card
          variant="surface"
          className="flex flex-wrap items-center justify-between gap-4 rounded-xl px-6 py-5"
        >
          <div>
            <p className="text-sm text-gray-400">SysAid Helpdesk Dashboard</p>
            <h1 className="text-2xl font-bold">Ticket Trends</h1>
          </div>

          <a
            href="#/"
            className="rounded-lg border border-[#3BBFF5] px-4 py-2 text-[#3BBFF5] transition hover:bg-[#3BBFF5]/10"
          >
            ← Back to dashboard
          </a>
        </Card>

        <Card className="flex flex-1 flex-col rounded-xl p-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold">Ticket Trends Overview</h2>
              <p className="mt-1 text-sm text-gray-400">
                Monthly ticket totals grouped by problem type.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex flex-col gap-1 text-sm text-gray-300">
                Start year
                <select
                  value={startYear}
                  onChange={(event) => setStartYear(Number(event.target.value))}
                  className="min-w-32 rounded-lg border border-[var(--border)] bg-[#1e1b3a] px-3 py-2 text-white outline-none focus:border-[#3BBFF5]"
                >
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year} disabled={year > endYear}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm text-gray-300">
                End year
                <select
                  value={endYear}
                  onChange={(event) => setEndYear(Number(event.target.value))}
                  className="min-w-32 rounded-lg border border-[var(--border)] bg-[#1e1b3a] px-3 py-2 text-white outline-none focus:border-[#3BBFF5]"
                >
                  {YEAR_OPTIONS.map((year) => (
                    <option key={year} value={year} disabled={year < startYear}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="w-full">
            {loading ? (
              <div
                className="space-y-5"
                aria-label="Loading ticket trends"
                aria-busy="true"
              >
                <div
                  className="flex flex-col justify-between rounded-lg border border-[#3b376a] p-5"
                  style={{ height: CHART_HEIGHT }}
                >
                  {[95, 82, 90, 76, 88, 70].map((width) => (
                    <div key={width} style={{ width: `${width}%` }}>
                      <Skeleton className="h-px w-full" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Skeleton key={index} className="h-9 w-full" />
                  ))}
                </div>
              </div>
            ) : error ? (
              <div
                className="flex items-center justify-center text-red-300"
                style={{ height: CHART_HEIGHT }}
              >
                {error}
              </div>
            ) : problemTypes.length === 0 ? (
              <div
                className="flex items-center justify-center text-gray-400"
                style={{ height: CHART_HEIGHT }}
              >
                No trend data for the selected years.
              </div>
            ) : (
              <>
                <div className="w-full overflow-x-auto pb-3">
                  <div
                    style={{
                      height: CHART_HEIGHT,
                      minWidth: Math.max(1100, chartData.length * 90),
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
                      >
                        <CartesianGrid stroke="#5b4d91" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="label"
                          stroke="#94a3b8"
                          angle={startYear === endYear ? 0 : -35}
                          textAnchor={startYear === endYear ? "middle" : "end"}
                          height={startYear === endYear ? 30 : 70}
                          interval={0}
                        />
                        <YAxis stroke="#94a3b8" allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1e1b3a",
                            border: "1px solid #3b376a",
                            borderRadius: "8px",
                          }}
                          formatter={(value) => Number(value).toLocaleString()}
                        />
                        {problemTypes.map((problemType, index) => (
                          <Line
                            key={problemType}
                            type="monotone"
                            dataKey={problemType}
                            name={problemType}
                            stroke={LINE_COLORS[index % LINE_COLORS.length]}
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: LINE_COLORS[index % LINE_COLORS.length],
                            }}
                            activeDot={{ r: 6 }}
                            connectNulls={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4">
                  {legendData.map((item) => (
                    <div
                      key={item.problemType}
                      className="flex items-center justify-between gap-3 rounded bg-slate-800 px-3 py-2"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="truncate text-gray-200">
                          {item.problemType}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-300">
                        {item.total.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        <footer className="flex justify-between text-xs text-gray-500">
          <span>SysAid Helpdesk Dashboard</span>
          <span>ver. 1.0</span>
        </footer>
      </div>
    </main>
  );
}
