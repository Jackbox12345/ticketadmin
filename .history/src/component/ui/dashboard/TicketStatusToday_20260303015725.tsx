import Card from "../Cards";
import { useDashboard } from "../../../context/DashboardContext";

function formatSeconds(totalSeconds: number | null | undefined): string {
  const seconds = Math.floor(Number(totalSeconds) || 0);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

const TicketStatusToday = () => {
  const { averageStatus } = useDashboard();

  return (
    <Card className="rounded-xl p-6 col-span-1 h-[400px] flex flex-col justify-between">

      <h3 className="text-xl text-white font-bold mb-4">
        Average Status
      </h3>

      <div className="mb-6">
        <div className="text-3xl font-bold">
          {formatSeconds(averageStatus?.avgFirstResponseSeconds ?? 0)}
        </div>
        <div className="text-xs text-gray-400">
          Avg first response time
        </div>
      </div>

      <div>
        <div className="text-2xl font-bold">
          {formatSeconds(averageStatus?.avgFullResponseSeconds ?? 0)}
        </div>
        <div className="text-xs text-gray-400">
          Avg full resolution time
        </div>
      </div>

      <div className="bg-[#2b1f55] border border-red-500 rounded-lg p-4">
        <div className="text-3xl font-bold text-red-400">
          {averageStatus?.unassignedCount ?? 0}
        </div>
        <div className="text-xs text-gray-400">
          Unassigned tickets
        </div>
      </div>

    </Card>
  );
};

export default TicketStatusToday;