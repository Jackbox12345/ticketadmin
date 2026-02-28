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
    <main className="flex-1 bg-[#1b1433] text-white p-6 space-y-6">

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">

          {/* ROW 1 — FULL WIDTH */}
          <Card className="rounded-xl md:col-span-2">
            <div className="w-full flex items-center mt-4 justify-between px-8 py-6">

              <div className="bg-white px-6 py-3 rounded-xl shadow-md">
                <img
                  className="w-[230px] h-[65px] object-contain"
                  src="/images/panasiatic_logo3.png"
                  alt="logo"
                />
              </div>

              <ChartHeader />
            </div>
          </Card>

          {/* ROW 2 — LEFT */}

          <TotalTickets />

          <Card className="rounded-xl p-6">
            <AllTicket />
          </Card>

        </div>

        {/* TICKET STATUS */}
        <Card className="rounded-xl p-6">
          <TicketStatus />
        </Card>

        <TopResolver />

      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* TODAY PANEL */}
        <TicketStatusToday />

        {/* TICKET VOLUME */}
        <Card className="rounded-xl p-6 lg:col-span-2">
          <h3 className="text-xl text-white font-bold mb-4">Chart</h3>
          <TicketChart />
        </Card>

        {/* AGENT SCORES */}
        <TopRequester />

      </div>

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between text-xs text-gray-500 pt-1">
        <span>SysAid Helpdesk Dashboard</span>
        <span>ver. 1.0</span>
      </div>

    </main>
  );
};

export default MainSection;