import Card from "../Cards";
import TicketChart from "./charts/TicketChart";
import TopScorer from "./TopScorer";
import TicketStatus from "./TicketStatus";
import { useState } from "react";
import ChartHeader from "./ChartHeader";
import TicketStatusToday from "./TicketStatusToday";

const options = ["daily","weekly", "monthly", "yearly"] as const;
type Range = (typeof options)[number];

const MainSection = () => {
  const [range, setRange] = useState<Range>("daily");
  


  return (
    <main className="flex-1 bg-[#1b1433] text-white p-6 space-y-6">

      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-4 gap-6">

        {/* CSAT */}
        <Card className="rounded-xl p-6 flex flex-col justify-between h-full">
          <h3 className="text-sm text-gray-400">CSAT this month</h3>

          <div className="flex items-center justify-center flex-1">
            <span className="text-4xl font-bold">95%</span>
          </div>

          <span className="text-xs text-gray-500">80% – 100%</span>
        </Card>

        {/* TOP SOLVERS */}
        <Card className="rounded-xl h-full p-6 ">
          <TopScorer />
        </Card>

        {/* TICKET STATUS */}
        <Card className="rounded-xl h-full p-6">
          <TicketStatus />
        </Card>

        {/* QA */}
        <Card className="rounded-xl p-6 h-full flex flex-col">
          <h3 className="text-sm text-gray-400 mb-3">QA this week</h3>

          <div className="flex justify-center mb-3">
            <span className="text-3xl font-bold">88%</span>
          </div>

          <div className="space-y-1 text-sm mt-auto">
            <div className="flex justify-between">
              <span>Zander Hardin</span>
              <span>91%</span>
            </div>
            <div className="flex justify-between">
              <span>Vance Blanchard</span>
              <span>91%</span>
            </div>
            <div className="flex justify-between">
              <span>Ava Gilbert</span>
              <span>90%</span>
            </div>
          </div>
        </Card>

      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="grid grid-cols-4 gap-6">

        {/* TODAY PANEL */}
       <TicketStatusToday/>

        {/* TICKET VOLUME */}
        <Card className="rounded-xl p-6 col-span-2 h-full">
          
          <div className="h-full">
            <ChartHeader value={range} onChange={setRange} />
            <TicketChart range={range} />
          </div>
        </Card>

        {/* AGENT SCORES */}
        <Card className="rounded-xl p-6 col-span-1 h-[360px]">
          <h3 className="text-sm text-gray-400 mb-4">Agent scores</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Zander Hardin</span><span>91%</span></div>
            <div className="flex justify-between"><span>Vance Blanchard</span><span>91%</span></div>
            <div className="flex justify-between"><span>Ava Gilbert</span><span>90%</span></div>
            <div className="flex justify-between"><span>Kaisley Burton</span><span>89%</span></div>
            <div className="flex justify-between"><span>Aron Barnett</span><span>88%</span></div>
            <div className="flex justify-between"><span>Nalini Prince</span><span>86%</span></div>
            <div className="flex justify-between"><span>Vada Proctor</span><span>85%</span></div>
            <div className="flex justify-between"><span>Loretta Hebert</span><span>85%</span></div>
            <div className="flex justify-between"><span>Guillermo Carson</span><span>85%</span></div>
          </div>
        </Card>

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