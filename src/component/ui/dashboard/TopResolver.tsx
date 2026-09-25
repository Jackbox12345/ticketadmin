import { useDashboard } from "../../../context/DashboardContext";
import Card from "../Cards";
import Skeleton from "./Skeleton";

export default function TopResolver() {
  const { topResolver, loading, error } = useDashboard();

  if (loading) {
    return (
      <Card
        className="rounded-xl p-6 h-full"
        aria-label="Loading top resolvers"
        aria-busy="true"
      >
        <Skeleton className="mb-4 h-7 w-40" />
        <div className="mb-3 grid grid-cols-3 gap-3 px-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="ml-auto h-3 w-12" />
          <Skeleton className="ml-auto h-3 w-24" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 15 }, (_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
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
  function formatHMS(seconds: number) {
  if (!seconds) return "0s";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return [
    h > 0 ? `${h}h` : null,
    m > 0 ? `${m}m` : null,
    `${s}s`,
  ]
    .filter(Boolean)
    .join(" ");
}

  return (
  <Card className="rounded-xl p-6 h-full overflow-hidden flex flex-col">
    <h3 className="text-xl text-white font-bold mb-4">
      Top Resolvers
    </h3>

    <div className="space-y-3 text-sm flex-1">

      {/* HEADER */}
      <div className="grid grid-cols-3 px-2 text-gray-400 text-xs">
        <div>Name</div>
        <div className="text-right">Tickets</div>
        <div className="text-right">Average Handle Time</div>
      </div>

      {topResolver.length === 0 ? (
        <div className="text-gray-400">No data</div>
      ) : (
        topResolver.slice(0, 15).map((user, index) => {
          const isFirst = index === 0;

          return (
            <div
              key={`${user.first_name}-${index}`}
              className={`grid grid-cols-3 items-center rounded-md px-2 py-2 transition-all duration-300
                ${
                  isFirst
                    ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 border border-yellow-400 shadow-lg scale-[1.03]"
                    : "bg-[#2b1f55]"
                }`}
            >
              {/* NAME */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${
                    isFirst ? "animate-bounce" : ""
                  }`}
                >
                  {getMedal(index)}
                </span>

                <span
                  className={`break-words ${
                    isFirst
                      ? "text-yellow-300 font-bold"
                      : "text-white"
                  }`}
                >
                  {user.first_name} {user.last_name}
                </span>
              </div>

              {/* TICKETS */}
              <div
                className={`text-right font-semibold ${
                  isFirst ? "text-yellow-300" : "text-white"
                }`}
              >
                {user.ClosedCount}
              </div>

              {/* RESPONSE */}
              <div
                className={`text-right font-semibold ${
                  isFirst ? "text-yellow-300" : "text-white"
                }`}
              >
                {formatHMS(user.AvgFullResponseSeconds)}
              </div>
            </div>
          );
        })
      )}
    </div>
          <a
            href="#/resolver-analytics"
            aria-label="View ticket trends"
            className="mt-auto self-end text-white text-lg px-2 py-1 rounded hover:bg-gray-700"
          >
            ▶
          </a>

  </Card>
);
}
