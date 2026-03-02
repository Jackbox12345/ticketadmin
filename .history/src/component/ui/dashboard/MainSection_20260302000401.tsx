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
    <main
      className="
        flex-1
        bg-[#1b1433]
        text-white
        p-3 sm:p-4 md:p-6
        space-y-4 sm:space-y-6
        max-w-screen-2xl
        mx-auto
      "
    >
      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:col-span-2">

          {/* HEADER */}
          <Card className="rounded-xl md:col-span-2">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6">

              <div className="bg-white px-3 sm:px-4 py-2 rounded-xl shadow-md">
                <img
                  className="w-[160px] sm:w-[190px] md:w-[210px] h-[55px] sm:h-[60px] md:h-[65px] object-contain"
                  src="/images/panasiatic_logo3.png"
                  alt="logo"
                />
              </div>

              <ChartHeader />
            </div>
          </Card>

          <TotalTickets />

          <Card className="rounded-xl p-3 sm:p-4 md:p-6">
            <AllTicket />
          </Card>

        </div>

        <Card className="rounded-xl p-3 sm:p-4 md:p-6">
          <TicketStatus />
        </Card>

        <TopResolver />

      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">

        <TicketStatusToday />

        <Card className="rounded-xl p-3 sm:p-4 md:p-6 lg:col-span-2">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
            Chart
          </h3>
          <TicketChart />
        </Card>

        <TopRequester />

      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 pt-2">
        <span>SysAid Helpdesk Dashboard</span>
        <span>ver. 1.0</span>
      </div>
    </main>
  );
};

export default MainSection;