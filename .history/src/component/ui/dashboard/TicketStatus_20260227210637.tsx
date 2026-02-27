// src/component/ui/dashboard/TicketStatus.tsx

import { useDashboard } from "../../../context/DashboardContext";

export default function TicketStatus() {
  const { ticketStatus, loading, error } = useDashboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!ticketStatus) return null;

  const total =
    ticketStatus.openCount +
    ticketStatus.resolveCount+ ticketStatus.pendingCount;

  const percent = (value: number) =>
    total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="space-y-6 px-3">
      <h3 className="text-xl text-white font-bold mb-6">
        Tickets by Status this Month
      </h3>

      {[
        { label: "Open", value: ticketStatus.openCount },
        { label: "Closed", value: ticketStatus.resolveCount },
        { label: "Pending", value: ticketStatus.pendingCount }
      ].map((item) => (
        <div key={item.label}>
          <div className="flex justify-center text-sm mb-1">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          <div className="w-full bg-[#2d2157] rounded-lg h-2">
            <div
              className="bg-[var(--primary)] h-2 rounded-lg transition-all duration-500"
              style={{ width: `${percent(item.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}