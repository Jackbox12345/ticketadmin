import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import{RechartsDevtools}  from '@recharts/devtools';
interface Props {
  range: "daily" | "weekly" | "monthly" | "yearly";
}

export default function TicketChart({ range }: Props) {
  const [data, setData] = useState<any[]>([]);

  const endpointMap: Record<string, string> = {
    daily: "getdailyData",
    weekly: "getTicketweeklyData",
    monthly: "getmonthlyData",
    yearly: "getyearlyData",
  };

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3010/api/${endpointMap[range]}`
      );
      const result = await res.json();

      let formatted: any[] = [];

      if (range === "weekly") {
        formatted = result.map((item: any) => ({
          label: item.DayName.slice(0, 3),
          value: item.TotalRequests,
        }));
      }

      if (range === "daily") {
        formatted = result.map((item: any) => {
          const label = new Date(item.HourBucket).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            timeZone: "Asia/Manila",
          }).replace(" ", "");

          return {
            label,
            value: item.TotalRequests,
          };
        });
      }

      if (range === "monthly") {
        formatted = result.map((item: any) => {
          const date = new Date(item.WeekEnding);

          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          return {
            label: `WE ${month}-${day}`,
            value: item.TotalRequests,
          };
        });
      }

      if (range === "yearly") {
        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        formatted = result.map((item: any) => ({
          label: `${monthNames[item.MonthNumber - 1]} ${item.YearNumber}`,
          value: item.TotalRequests,
        }));
      }

      setData(formatted);
    } catch (err) {
      console.error("Chart error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [range]);

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#836ec9" />
        <XAxis dataKey="label" stroke="#aaa" />
        <YAxis  stroke="#aaa" />
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