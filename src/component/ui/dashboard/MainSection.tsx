import Card from "../Cards";
import TicketChart from "./charts/TicketChart";

import ChartHeader from "./ChartHeader";

import TopRequester from "./TopRequester";

import AllTicket from "./AllTicket";
import TopResolver from "./TopResolver";
import ChartData from "./ChartData";
import { useDashboard } from "../../../context/DashboardContext";
import ChangeControl from "./ChangeControl";

const MainSection = () => {
  const { averageStatus,range} = useDashboard();
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

function getTitle(range: string) {
    switch (range) {
      case "daily":
        return "Daily Ticket Activity Summary";
      case "weekly":
        return "Weekly Ticket Activity Summary";
      case "monthly":
        return "Monthly Ticket Activity Summary";
      case "yearly":
        return "Yearly Ticket Activity Summary";
      default:
        return "Tickets";
    }
  }

  return (
    <main className="flex-1 bg-[#1b1433] text-white p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">

          {/* ROW 1 — FULL WIDTH */}
          <Card className="rounded-xl md:col-span-2">
            <div className="w-full flex items-center p-8 justify-between ">
              <div className="bg-white px-2 rounded-xl shadow-md">
                <img
                  className="w-[210px] h-[65px] object-contain"
                  src="/images/panasiatic_logo3.png"
                  alt="logo"
                />
              </div>
              <ChartHeader />
            </div>
          </Card>

          {/* ROW 2 — FULL WIDTH (FIXED) */}
        <Card className="rounded-xl p-6 md:col-span-2 h-[650px] min-h-[400px] max-h-[470px] overflow-hidden">
          <ChartData />
        </Card>

        </div>

        {/* TICKET STATUS */}
        <Card className="rounded-xl p-6">
          <AllTicket />
        </Card>

        <TopResolver />
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <ChangeControl />

        <Card className="rounded-xl p-6 lg:col-span-2">
          <div className="flex flex-row justify-between" >
          <h3 className="text-xl text-white font-bold mb-4">{getTitle(range)}</h3>
          <div className="flex flex-row gap-5 ">
            <div className="text-3xl  font-bold">
              <div className="text-xs text-gray-400">
                Avg first response time
              </div>
              {formatSeconds(
                averageStatus?.avgFirstResponseSeconds ?? 0
              )}
            </div>
            
            <div className="text-2xl font-bold">
              <div className="text-xs text-gray-400">
              Avg full resolution time
              </div>
              {formatSeconds(
                averageStatus?.avgFullResponseSeconds ?? 0
              )}
            </div>
            
          </div>
          </div>
          <TicketChart />
        </Card>

        <TopRequester />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500 pt-1">
        <span>SysAid Helpdesk Dashboard</span>
        <span>ver. 1.0</span>
      </div>
    </main>
  );
};

export default MainSection;