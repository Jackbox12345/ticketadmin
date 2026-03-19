import { useDashboard } from "../../../context/DashboardContext";
import Skeleton from "./Skeleton";

export default function AllTicket() {
  const { topCategory, loading, error } = useDashboard();

  if (error) {
    return <div className="px-3 text-red-400">{error}</div>;
  }

  return (
    <div className="flex flex-col h-full px-3">
      <h3 className="text-xl text-white font-bold mb-4">Top Categories</h3>

      {loading ? (
        <Skeleton className="h-32 w-full" />
      ) : (
        <div className="space-y-2">
          {topCategory?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between bg-white/5 px-3 py-2 rounded-md"
            >
              <span className="text-sm text-gray-200">
                {item.problem_type ?? "Unknown"}
              </span>

              <span className="text-sm font-bold text-white">
                {item.Count?.toLocaleString() ?? 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
