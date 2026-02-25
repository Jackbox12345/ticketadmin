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
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  // =========================
  // FETCH WEEKLY
  // =========================
  useEffect(() => {
    if (range === "weekly") {
      fetch("http://localhost:3010/api/getTicketweeklyData")
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((item: any) => ({
            label: item.DayName.slice(0, 3),
            tickets: item.TotalRequests,
            dayNumber: item.DayNumber,
          }));

          formatted.sort((a: any, b: any) => a.dayNumber - b.dayNumber);
          setWeeklyData(formatted);
        })
        .catch((err) => console.error(err));
    }
  }, [range]);

  // =========================
  // FETCH MONTHLY
  // =========================
  useEffect(() => {
    if (range === "monthly") {
      fetch("http://localhost:3010/api/getmonthlyData")
        .then((res) => res.json())
        .then((data) => {
          const weeks = [1, 2, 3, 4, 5];

          const formatted = weeks.map((week) => {
            const found = data.find(
              (item: any) => item.WeekOfMonth === week
            );

            return {
              label: `Week ${week}`,
              tickets: found ? found.TotalRequests : 0,
              weekNumber: week,
            };
          });

          setMonthlyData(formatted);
        })
        .catch((err) => console.error(err));
    }
  }, [range]);

  // =========================
  // FETCH DAILY (LAST 24 HOURS)
  // =========================
  useEffect(() => {
    if (range === "daily") {
      fetch("http://localhost:3010/api/getdailyData")
        .then((res) => res.json())
        .then((data) => {
          const hours = Array.from({ length: 24 }, (_, i) => i);

          const formatted = hours.map((hour) => {
            const found = data.find(
              (item: any) =>
                new Date(item.HourBucket).getHours() === hour
            );

            const label =
              hour === 0
                ? "12am"
                : hour < 12
                ? `${hour}am`
                : hour === 12
                ? "12pm"
                : `${hour - 12}pm`;

            return {
              label,
              tickets: found ? found.TotalRequests : 0,
              hourNumber: hour,
            };
          });

          setDailyData(formatted);
        })
        .catch((err) => console.error(err));
    }
  }, [range]);

  // =========================
  // FETCH YEARLY
  // =========================

  useEffect(() => {
  if (range === "yearly") {
    console.log("Fetching YEARLY data...");

    fetch("http://localhost:3010/api/getyearlyData")
      .then((res) => res.json())
      .then((data) => {
        console.log("YEARLY API RESPONSE:", data);

        const months = [
          "Jan","Feb","Mar","Apr","May","Jun",
          "Jul","Aug","Sep","Oct","Nov","Dec"
        ];

        const formatted = months.map((month, index) => {
          const found = data.find(
            (item: any) => item.MonthNumber === index + 1
          );

          return {
            label: month,
            tickets: found ? found.TotalRequests : 0,
          };
        });

        console.log("FORMATTED YEARLY:", formatted);
        setYearlyData(formatted);
      })
      .catch((err) => console.error("YEARLY ERROR:", err));
  }
}, [range]);
  // useEffect(() => {
  //   if (range === "yearly") {
  //     fetch("http://localhost:3010/api/getyearlyData")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const months = [
  //           "Jan","Feb","Mar","Apr","May","Jun",
  //           "Jul","Aug","Sep","Oct","Nov","Dec"
  //         ];

  //         const formatted = months.map((month, index) => {
  //           const found = data.find(
  //             (item: any) => item.MonthNumber === index + 1
  //           );

  //           return {
  //             label: month,
  //             tickets: found ? found.TotalRequests : 0,
  //             monthNumber: index + 1,
  //           };
  //         });

  //         setYearlyData(formatted);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }, [range]);

  // =========================
  // DATA MAPPING
  // =========================
  const dataMap: any = {
    weekly: weeklyData,
    monthly: monthlyData,
    daily: dailyData,
    yearly: yearlyData,
  };

  const data = dataMap[range] || [];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 25, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
          />
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