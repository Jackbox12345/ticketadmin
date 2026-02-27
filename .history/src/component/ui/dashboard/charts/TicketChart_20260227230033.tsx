import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { useDashboard } from "../../../../context/DashboardContext";


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
      return `WE ${String(date.getMonth() + 1).padStart(2, "0")}-${String(
        date.getDate()
      ).padStart(2, "0")}`;

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
  const { chart, range } = useDashboard();

  /* transform once for recharts */
  const data = chart.map((p) => ({
    label: formatLabel(p.bucket, range),
    value: p.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#836ec9" />
        <XAxis dataKey="label" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#19baf4"
          strokeWidth={3}
          dot={false}
        />
        <RechartsDevtools />
      </LineChart>
    </ResponsiveContainer>
  );
}