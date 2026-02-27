import { useEffect, useState } from "react";
import { useDashboard } from "../../../context/DashboardContext";



export default function TopScorer() {
// const { scores, loading, error } = useDashboard();
//  if (error) return <div>{error}</div>;
  

  return (
    <div className="flex flex-col h-full px-3">
      <h3 className="text-xl text-white font-bold mb-4">
        Top Ticket Solvers
      </h3>

      {/* {loading ? (
        <div className="flex justify-center items-center flex-1">
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce" />
        </div>
      ) : (
        <div className="space-y-3">
          {scores.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center"
            >
              <span className="font-small">
                {item.first_name} {item.last_name}
              </span>
              <span className="font-bold">
                {item.ClosedCount}
              </span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
}