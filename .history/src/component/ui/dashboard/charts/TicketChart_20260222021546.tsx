import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", tickets: 120 },
  { day: "Tue", tickets: 210 },
  { day: "Wed", tickets: 180 },
  { day: "Thu", tickets: 240 },
  { day: "Fri", tickets: 190 },
  { day: "Sat", tickets: 140 },
  { day: "Sun", tickets: 90 },
];

export default function TicketChart() {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="var(--text-secondary)" />
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