import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type{ Range } from "../../../../misc/types";

// type Range = "weekly" | "weekly" | "monthly" | "yearly";

interface TicketChartProps {
  range: Range;
}

const weeklyData = [
  { label: "Mon", tickets: 120 },
  { label: "Tue", tickets: 210 },
  { label: "Wed", tickets: 180 },
  { label: "Thu", tickets: 240 },
  { label: "Fri", tickets: 190 },
  { label: "Sat", tickets: 140 },
  { label: "Sun", tickets: 90 },
];

const monthlyData = [
  { label: "Week 1", tickets: 800 },
  { label: "Week 2", tickets: 950 },
  { label: "Week 3", tickets: 1020 },
  { label: "Week 4", tickets: 880 },
];

const yearlyData = [
  { label: "Jan", tickets: 3200 },
  { label: "Feb", tickets: 2800 },
  { label: "Mar", tickets: 3500 },
  { label: "Apr", tickets: 4000 },
];
const dailyData = [
  { label: "12am", tickets: 3200 },
  { label: "1am", tickets: 2800 },
  { label: "2am", tickets: 3500 },
  { label: "3am", tickets: 4000 },
];

export default function TicketChart({ range }: TicketChartProps) {
  const dataMap = {
    weekly: weeklyData,
    monthly: monthlyData,
    yearly: yearlyData,
    daily:dailyData
  };

  const data = dataMap[range];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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