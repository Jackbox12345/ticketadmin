import Card from "../Cards";
import { useDashboard } from "../../../context/DashboardContext";

export default function TotalTickets() {
  const { totalTickets, loading, error,range } = useDashboard();
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

  if (loading)
    return (
      <Card className="rounded-xl p-6 flex items-center justify-center">
        Loading...
      </Card>
    );

  if (error)
    return (
      <Card className="rounded-xl p-6 flex items-center justify-center">
        {error}
      </Card>
    );

  return (
    <Card className="rounded-xl p-6 flex flex-col justify-between">
      <h3 className="text-lg text-center text-gray-400">
       {getTitle(range)}
      </h3>

      <div className="flex items-center justify-center flex-1">
        <span className="text-4xl font-bold">
          {totalTickets?.count.toLocaleString() ?? 0}
        </span>
      </div>

      <span className="text-lg text-center text-gray-400">
        Tickets
      </span>
    </Card>
  );
}