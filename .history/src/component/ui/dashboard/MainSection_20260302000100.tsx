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
    <main className="flex-1 bg-[#1b1433] text-white p-4 sm:p-6 space-y-6">

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* LEFT SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:col-span-2">

          {/* HEADER CARD */}
          <Card className="rounded-xl md:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 md:p-6">

              {/* Logo */}
              <div className="bg-white px-4 py-3 rounded-xl shadow-md w-fit">
                <img
                  className="w-[180px] sm:w-[210px] h-[60px] object-contain"
                  src="/images/panasiatic_logo3.png"
                  alt="logo"
                />
              </div>

              {/* Chart Controls */}
              <div className="w-full md:w-auto">
                <ChartHeader />
              </div>

            </div>
          </Card>

          {/* TOTAL TICKETS */}
          <TotalTickets />

          {/* ALL TICKETS */}
          <Card className="rounded-xl p-4 sm:p-6">
            <AllTicket />
          </Card>

        </div>

        {/* RIGHT SIDE */}
        <Card className="rounded-xl p-4 sm:p-6">
          <TicketStatus />
        </Card>

        <TopResolver />

      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        <TicketStatusToday />

        <Card className="rounded-xl p-4 sm:p-6 xl:col-span-2">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Chart</h3>
          <TicketChart />
        </Card>

        <TopRequester />

      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2 pt-2">
        <span>SysAid Helpdesk Dashboard</span>
        <span>ver. 1.0</span>
      </div>

    </main>
  );
};

export default MainSection;