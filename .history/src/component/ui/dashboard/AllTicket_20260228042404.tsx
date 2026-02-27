import { useEffect, useState } from "react";
import { useDashboard } from "../../../context/DashboardContext";



export default function AllTicket() {
  const { totalTickets, loading, error,range } = useDashboard();
// const { scores, loading, error } = useDashboard();
//  if (error) return <div>{error}</div>;
  

  return (
    <div className="flex flex-col h-full px-3">
      <h3 className="text-xl text-white font-bold mb-4">
        Total Ticket Count 
      </h3>

      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce" />
        </div>
      ) : (
        <div className="space-y-3">
          
        </div>
      )}
    </div>
  );
}