// src/components/MainSection.tsx

import Card from "../Cards";
import TicketChart from "./charts/TicketChart";
import TicketStatus from "./TicketStatus";
import ChartHeader from "./ChartHeader";
import TicketStatusToday from "./TicketStatusToday";
import TopRequester from "./TopRequester";
import TotalTickets from "./TotalTickets";
import AllTicket from "./AllTicket";
import TopResolver from "./TopResolver";

const MainSection = () => {
  return (
    <div className="w-full overflow-x-auto">

      {/* This prevents layout collapse */}
      <main
        className="
          min-w-[1200px]
          max-w-[1600px]
          mx-auto
          flex-1
          bg-[#1b1433]
          text-white
          p-6
          space-y-6
        "
      >

        {/* ================= TOP SECTION ================= */}
        <div className="grid grid-cols-4 gap-6">

          <div className="grid grid-cols-2 gap-6 col-span-2">

            <Card className="rounded-xl col-span-2">
              <div className="flex items-center justify-between p-6">

                <div className="bg-white px-4 py-2 rounded-xl shadow-md">
                  <img
                    className="w-[210px] h-[65px] object-contain"
                    src="/images/panasiatic_logo3.png"
                    alt="logo"
                  />
                </div>

                <ChartHeader />
              </div>
            </Card>

            <TotalTickets />

            <Card className="rounded-xl p-6">
              <AllTicket />
            </Card>

          </div>

          <Card className="rounded-xl p-6">
            <TicketStatus />
          </Card>

          <TopResolver />

        </div>

        {/* ================= SECOND ROW ================= */}
        <div className="grid grid-cols-4 gap-6">

          <TicketStatusToday />

          <Card className="rounded-xl p-6 col-span-2">
            <h3 className="text-xl font-bold mb-4">Chart</h3>
            <TicketChart />
          </Card>

          <TopRequester />

        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between text-xs text-gray-500 pt-2">
          <span>SysAid Helpdesk Dashboard</span>
          <span>ver. 1.0</span>
        </div>

      </main>
    </div>
  );
};

export default MainSection;