// src/components/MainSection.tsx

import { useState } from "react";
import Card from "../Cards";
import TicketChart from "./charts/TicketChart";
import TopScorer from "./TopScorer";
import TicketStatus from "./TicketStatus";
import ChartHeader from "./ChartHeader";
import TicketStatusToday from "./TicketStatusToday";

const options = ["daily", "weekly", "monthly", "yearly"] as const;
type Range = (typeof options)[number];

const MainSection = () => {
  const [range, setRange] = useState<Range>("daily");

  return (
    <main className="flex-1 bg-[#1b1433] text-white p-6 space-y-6">
      
      {/* ================= TOP ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">

        {/* ROW 1 — FULL WIDTH */}
        <Card className="rounded-xl p-6 md:col-span-2">
          <div className="w-full flex justify-between">
            <img className="w-[120px]"
             src="/images/panasiatic_logo3.png" alt="logo" />
          <ChartHeader value={range} onChange={setRange} />
          </div>
        </Card>

        {/* ROW 2 — LEFT */}
        <Card className="rounded-xl p-6 flex flex-col justify-between">
          <h3 className="text-lg text-center text-gray-400">
            Total Tickets
          </h3>

          <div className="flex items-center justify-center flex-1">
            <span className="text-4xl font-bold">95%</span>
          </div>

          <span className="text-lg text-center text-gray-400">
            Tickets
          </span>
        </Card>

        
        <Card className="rounded-xl p-6">
          <TopScorer />
        </Card>

      </div>

        {/* TICKET STATUS */}
        <Card className="rounded-xl p-6">
          <TicketStatus />
        </Card>

        {/* QA */}
        <Card className="rounded-xl p-6 flex flex-col">
          <h3 className="text-sm text-gray-400 mb-3">
            QA this week
          </h3>

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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* TODAY PANEL */}
        <TicketStatusToday />

        {/* TICKET VOLUME */}
        <Card className="rounded-xl p-6 lg:col-span-2">
          <TicketChart range={range} />
        </Card>

        {/* AGENT SCORES */}
        <Card className="rounded-xl p-6 h-[360px]">
          <h3 className="text-sm text-gray-400 mb-4">
            Agent scores
          </h3>

          <div className="space-y-3 text-sm">
            {[
              ["Zander Hardin", "91%"],
              ["Vance Blanchard", "91%"],
              ["Ava Gilbert", "90%"],
              ["Kaisley Burton", "89%"],
              ["Aron Barnett", "88%"],
              ["Nalini Prince", "86%"],
              ["Vada Proctor", "85%"],
              ["Loretta Hebert", "85%"],
              ["Guillermo Carson", "85%"],
            ].map(([name, score]) => (
              <div key={name} className="flex justify-between">
                <span>{name}</span>
                <span>{score}</span>
              </div>
            ))}
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