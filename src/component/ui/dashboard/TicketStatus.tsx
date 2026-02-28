
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
    <div className="flex flex-col h-full px-4 py-2">
      <h3 className="text-2xl text-white font-bold mb-10">
        {getTitle(range)}
      </h3>

      <div className="flex flex-col justify-evenly flex-1 space-y-8">
        {[
          { label: "Open", value: ticketStatus.openCount, color: "bg-blue-400" },
          { label: "Closed", value: ticketStatus.resolveCount, color: "bg-green-400" },
          { label: "Pending", value: ticketStatus.pendingCount, color: "bg-yellow-400" },
        ].map((item) => (
          <div key={item.label} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">{item.label}</span>
              <span className="text-lg font-bold">{item.value}</span>
            </div>

            <div className="w-full bg-[#2d2157] rounded-xl h-6">
              <div
                className={`${item.color} h-6 rounded-xl transition-all duration-700`}
                style={{ width: `${percent(item.value)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}