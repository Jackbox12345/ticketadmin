import { useDashboard } from "../../../context/DashboardContext";
import Card from "../Cards";
import Skeleton from "./Skeleton";

export default function TopRequester() {
  const { topRequester, loading, error } = useDashboard();

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}.`;
  };

  if (loading) {
    return (
      <Card className="rounded-xl p-6 h-[400px] space-y-4">
        <Skeleton className="h-6 w-40" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </Card>
    );
  }

  if (error)
    return (
      <Card className="rounded-xl p-6 h-[400px] flex items-center justify-center">
        {error}
      </Card>
    );

  return (
    <Card className="rounded-xl p-6 h-[400px]">
      <h3 className="text-xl text-white font-bold mb-4">
        Top Requesters
      </h3>

      <div className="space-y-3 text-sm">
        {topRequester.length === 0 ? (
          <div className="text-gray-400">No data</div>
        ) : (
          topRequester.slice(0, 5).map((user, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={`${user.first_name}-${index}`}
                className={`flex justify-between items-center px-4 py-2 rounded-md transition-all duration-300
                  ${
                    isFirst
                      ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 border border-yellow-400 shadow-lg"
                      : "bg-[#2b1f55]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-lg ${
                      isFirst ? "animate-bounce" : ""
                    }`}
                  >
                    {getMedal(index)}
                  </span>

                  <span
                    className={`${
                      isFirst
                        ? "text-yellow-300 font-bold"
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
                  {user.Count}
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}