import { useDashboard } from "../../../context/DashboardContext";
import Card from "../Cards";


export default function TopResolver() {
  const { topResolver, loading, error } = useDashboard();

  if (loading) return <Card className="rounded-xl p-6 h-[400px]">Loading...</Card>;
  if (error) return <Card className="rounded-xl p-6 h-[400px]">{error}</Card>;

  return (
    <Card className="rounded-xl p-6 h-[400px]">
      <h3 className="text-xl text-white font-bold mb-4">
        Top Resolvers
      </h3>

      <div className="space-y-3 text-sm">
        {topResolver.length === 0 ? (
          <div className="text-gray-400">No data</div>
        ) : (
          topResolver.map((user) => (
            <div key={user.first_name} className="flex justify-between">
              <span>{user.first_name} {user.last_name}</span>
              <span className="text-white font-semibold">{user.ClosedCount}</span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}