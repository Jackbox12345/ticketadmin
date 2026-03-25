// /components/AllTicket.tsx
import { useDashboard } from "../../../context/DashboardContext";
import Card from "../Cards";
import Skeleton from "./Skeleton";

export default function AllTicket() {
  const { topCategory, loading, error } = useDashboard();

  const iconMap: Record<string, string> = {
    "Access Control": "🔐",
    "Account Login": "👤",
    Announcements: "📢",
    "Basic Software": "💻",
    "BIOS/PUSH": "⚙️",
    "Change Control": "🔄",
    Hardware: "🖥️",
    Network: "🌐",
    none: "❓",
    "PAYSLIP ACCESS": "💰",
    "Production Tools": "🛠️",
    "Security Incident": "🚨",
    "Service Request": "📋",
    Software: "🧩",
    "Work Order": "📦",
  };

  const getIcon = (type?: string) => {
    if (!type) return "❓";
    return iconMap[type] || "📁";
  };

  if (loading) {
    return (
      <Card className="rounded-xl p-6 h-[400px] space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </Card>
    );
  }

  if (error) {
    return <Card className="rounded-xl p-6 h-full text-red-400">{error}</Card>;
  }

  return (
    <>
      <h3 className="text-xl text-white font-bold mb-4">Top Categories</h3>

      <div className="space-y-3 text-sm">
        {topCategory?.length === 0 ? (
          <div className="text-gray-400">No data</div>
        ) : (
          topCategory.slice(0, 10).map((item, index) => {
            const isFirst = index === 0;

            return (
              <div
                key={`${item.problem_type}-${index}`}
                className={`flex justify-between items-center rounded-md px-2 py-2 transition-all duration-300
                  ${
                    isFirst
                      ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/10 border border-yellow-400 shadow-lg scale-[1.03]"
                      : "bg-[#2b1f55]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  
                  <span className="text-lg">
                    {getIcon(item.problem_type)}
                  </span>

                  <span
                    className={`${
                      isFirst
                        ? "text-lg font-bold text-yellow-300"
                        : "text-white"
                    }`}
                  >
                    {item.problem_type ?? "Unknown"}
                  </span>
                </div>

                <span
                  className={`font-semibold ${
                    isFirst ? "text-yellow-300 text-lg" : "text-white"
                  }`}
                >
                  {item.Count?.toLocaleString() ?? 0}
                </span>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}