import Card from "../Cards";
import TicketChart from "./charts/TicketChart";
import ChartHeader from "./ChartHeader";

import AllTicket from "./AllTicket";
import TopResolver from "./TopResolver";
import ChartData from "./ChartData";
import { useDashboard } from "../../../context/DashboardContext";
import ChangeControl from "./ChangeControl";
import { useMemo } from "react";

const MainSection = () => {
  const { totalTickets, topResolver, range } = useDashboard();

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

  const { overallFullAvg, overallFirstAvg } = useMemo(() => {
    if (!topResolver?.length) {
      return { overallFullAvg: 0, overallFirstAvg: 0 };
    }

    let fullWeightedSum = 0;
    let firstWeightedSum = 0;
    let totalClosed = 0;

    topResolver.forEach(row => {
      const count = row.ClosedCount || 0;
      fullWeightedSum += (row.AvgFullResponseSeconds || 0) * count;
      firstWeightedSum += (row.AvgFirstResponseSeconds || 0) * count;
      totalClosed += count;
    });

    if (!totalClosed) return { overallFullAvg: 0, overallFirstAvg: 0 };

    return {
      overallFullAvg: Math.ceil(fullWeightedSum / totalClosed),
      overallFirstAvg: Math.ceil(firstWeightedSum / totalClosed)
    };
  }, [topResolver]);

  function getTitle(range: string) {
    switch (range) {
      case "daily": return "Daily Ticket Activity Summary";
      case "weekly": return "Weekly Ticket Activity Summary";
      case "monthly": return "Monthly Ticket Activity Summary";
      case "yearly": return "Yearly Ticket Activity Summary";
      default: return "Tickets";
    }
  }

  return (
    <main className="bg-[#1b1433] text-white p-6">

      {/* MAIN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch gap-6">

        {/* LEFT SIDE */}
        <div className="lg:col-span-3 h-full space-y-6">

          {/* ROW 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#2A2145] rounded-xl h-[100px] flex items-center justify-center">
              <img
                className="h-[25px] object-contain scale-150"
                src="/images/LogoSysaid31.png"
                alt="SysAid"
              />
            </Card>

            <Card className="bg-[#2A2145] rounded-xl md:col-span-2 h-[100px] flex items-center justify-around px-6">
              <ChartHeader />
            </Card>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch gap-6">

            <Card className="rounded-xl p-6 lg:col-span-3 min-h-[10px]">
              <h3 className="text-xl font-bold mb-4">Category Tree Map</h3>
              <ChartData />
            </Card>

            <Card className="rounded-xl p-6">
              <AllTicket />
            </Card>

          </div>

          {/* ROW 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            <ChangeControl />

            <Card className="rounded-xl p-6 lg:col-span-3 h-full">
              <div className="flex justify-between flex-wrap gap-4">

                <h3 className="text-xl font-bold">
                  {getTitle(range)}: {totalTickets?.rangeTotal}
                </h3>

                <div className="flex gap-5">
                  <div className="text-3xl font-bold">
                    <div className="text-xs text-gray-400">
                      Avg first response time
                    </div>
                    {formatSeconds(overallFirstAvg)}
                  </div>

                  <div className="text-2xl font-bold">
                    <div className="text-xs text-gray-400">
                      Avg full resolution time
                    </div>
                    {formatSeconds(overallFullAvg)}
                  </div>
                </div>

              </div>

              <TicketChart />
            </Card>

          </div>

        </div>

        {/* RIGHT SIDE (NO FIXED HEIGHT, NO GAP) */}
        <div className="lg:sticky lg:top-6 self-stretch">
          <TopResolver />
        </div>

      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-500 pt-4">
        <span>SysAid Helpdesk Dashboard</span>
        <span>ver. 1.0</span>
      </div>

    </main>
  );
};

export default MainSection;
