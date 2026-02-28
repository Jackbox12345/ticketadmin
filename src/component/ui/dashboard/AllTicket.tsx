import { useDashboard } from "../../../context/DashboardContext";
import Skeleton from "./Skeleton";

export default function AllTicket() {
  const { totalTickets, loading, error } = useDashboard();

  if (error)
    return <div className="px-3 text-red-400">{error}</div>;

  return (
    <div className="flex flex-col h-full px-3">
      <h3 className="text-xl text-white font-bold mb-4">
        Total Tickets
      </h3>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Skeleton className="h-12 w-40" />
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <span className="text-5xl font-bold">
            {(totalTickets?.allTimeTotal ?? 0).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}