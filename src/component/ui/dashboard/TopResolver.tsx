import { useDashboard } from "../../../context/DashboardContext";
import Card from "../Cards";
import Skeleton from "./Skeleton";

export default function TopResolver() {
  const { topResolver, loading, error } = useDashboard();

  if (loading) {
    return (
      <Card className="rounded-xl p-6 h-[400px] space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </Card>
    );
  }

  if (error)
    return <Card className="rounded-xl p-6 h-full">{error}</Card>;

  const getMedal = (index: number) => {
    if (index === 0) return "👑";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}.`;
  };

  return (
    <Card className="rounded-xl p-6 h-full overflow-hidden">
      <h3 className="text-xl text-white font-bold mb-4">
        Top Resolvers
      </h3>

      <div className="space-y-3 text-sm">
        {topResolver.length === 0 ? (
          <div className="text-gray-400">No data</div>
        ) : (
          topResolver.slice(0, 5).map((user, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={`${user.first_name}-${index}`}
                className={`flex justify-between items-center rounded-md px-4 py-3 transition-all duration-300
                  ${
                    isFirst
                      ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 border border-yellow-400 shadow-lg scale-[1.03]"
                      : "bg-[#2b1f55]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xl ${
                      isFirst ? "animate-bounce" : ""
                    }`}
                  >
                    {getMedal(index)}
                  </span>

                  <span
                    className={`${
                      isFirst
                        ? "text-lg font-bold text-yellow-300"
                        : "text-white"
                    }`}
                  >
                    {user.first_name} {user.last_name}
                  </span>
                </div>

                <span
                  className={`font-semibold ${
                    isFirst ? "text-yellow-300 text-lg" : "text-white"
                  }`}
                >
                  {user.ClosedCount}
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}