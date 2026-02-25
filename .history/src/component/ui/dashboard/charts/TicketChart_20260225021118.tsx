import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import type { Range } from "../../../../misc/types";

interface TicketChartProps {
  range: Range;
}

export default function TicketChart({ range }: TicketChartProps) {
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    if (range === "weekly") {
      fetch("http://localhost:3010/api/getTicketweeklyData")
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((item: any) => ({
            label: item.DayName.slice(0, 3), // Mon, Tue, Wed
            tickets: item.TotalRequests,
            dayNumber: item.DayNumber,
          }));

          // Sort Monday → Sunday
          formatted.sort((a: any, b: any) => a.dayNumber - b.dayNumber);

          setWeeklyData(formatted);
        })
        .catch((err) => console.error(err));
    }
  }, [range]);

  const dataMap = {
    weekly: weeklyData,
    monthly: [],
    yearly: [],
    daily: [],
  };

  const data = dataMap[range] || [];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 25, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="tickets"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}