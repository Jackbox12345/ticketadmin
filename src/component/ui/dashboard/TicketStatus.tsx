
import Skeleton from "./Skeleton";
import { useDashboard } from "../../../context/DashboardContext";

function getTitle(range: string) {
  switch (range) {
    case "daily":
      return "Tickets in the last 24 hours";
    case "weekly":
      return "Tickets in the last 7 days";
    case "monthly":
      return "Tickets this month";
    case "yearly":
      return "Tickets this year";
    default:
      return "Tickets";
  }
}

export default function TicketStatus() {
  const { ticketStatus, loading, error, range } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6 px-3">
        <Skeleton className="h-6 w-60" />

        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!ticketStatus) return null;

  const total =
    ticketStatus.openCount +
    ticketStatus.resolveCount +
    ticketStatus.pendingCount;

  const percent = (value: number) =>
    total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="space-y-6 px-3">
      <h3 className="text-xl text-white font-bold mb-15">
        {getTitle(range)}
      </h3>

      {[
        { label: "Open", value: ticketStatus.openCount },
        { label: "Closed", value: ticketStatus.resolveCount },
        { label: "Pending", value: ticketStatus.pendingCount },
      ].map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          <div className="w-full bg-[#2d2157] rounded-md h-4">
            <div
              className="bg-[var(--primary)] h-4 rounded-md transition-all duration-500"
              style={{ width: `${percent(item.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}