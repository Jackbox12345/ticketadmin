import { useDashboard } from "../../../context/DashboardContext";
import { Card } from "../Card"; // adjust path if needed

export default function TopRequester() {
  const { topRequester, loading, error } = useDashboard();

  if (loading) return <Card className="rounded-xl p-6 h-[360px]">Loading...</Card>;
  if (error) return <Card className="rounded-xl p-6 h-[360px]">{error}</Card>;

  return (
    <Card className="rounded-xl p-6 h-[360px]">
      <h3 className="text-sm text-gray-400 mb-4">
        Top Requesters
      </h3>

      <div className="space-y-3 text-sm">
        {topRequester.length === 0 ? (
          <div className="text-gray-400">No data</div>
        ) : (
          topRequester.map((user) => (
            <div key={user.first_name} className="flex justify-between">
              <span>{user.first_name} {user.last_name}</span>
              <span className="text-white font-semibold">{user.Count}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}