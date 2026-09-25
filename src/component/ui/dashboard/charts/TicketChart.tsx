import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useDashboard } from "../../../../context/DashboardContext";
import Skeleton from "../Skeleton";

/* ---------- format label depending on range ---------- */

function formatLabel(bucket: string, range: string) {
  const date = new Date(bucket);

  switch (range) {
    case "daily":
      return date
        .toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
          timeZone: "Asia/Manila",
        })
        .replace(" ", "");

    case "weekly":
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        timeZone: "Asia/Manila",
      });

      case "monthly":
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Manila",
      });

    case "yearly":
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
        timeZone: "Asia/Manila",
      });

    default:
      return "";
  }
}

export default function TicketChart() {
  const { chart, range, loading } = useDashboard();

  const data = chart.map((p) => ({
    label: formatLabel(p.bucket, range),
    totalValue: p.totalValue,
    closedValue: p.closedValue,
  }));

  if (loading) {
    return (
      <div aria-label="Loading ticket activity" aria-busy="true">
        <Skeleton className="h-[289px] w-full" />
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={289}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#836ec9" />
        <XAxis
          dataKey="label"
          stroke="#aaa"
          interval={0} // ✅ show ALL labels
          angle={-45}  // optional (prevent overlap)
          textAnchor="end"
          tick={{ fontSize: 10 }}
        />
        <YAxis stroke="#aaa" />
        <Tooltip formatter={(value, name) => {
          if (name === "totalValue") return [value, "Total Ticket"];
          if (name === "closedValue") return [value, "Closed Ticket"];
          return [value, name];
        }} />
        <Legend />

        {/* Total Tickets - Blue */}
        <Line
          type="monotone"
          dataKey="totalValue"
          name="Total Ticket"
          stroke="#19baf4"
          strokeWidth={3}
          dot={false}
        />

        {/* Closed Tickets - Red */}
        <Line
          type="monotone"
          dataKey="closedValue"
          name="Closed Ticket"
          stroke="#ff4d4f"
          strokeWidth={3}
          dot={false}
        />

        {import.meta.env.DEV && <RechartsDevtools />}
      </LineChart>
    </ResponsiveContainer>
  );
}
