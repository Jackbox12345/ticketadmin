import { useState, useEffect, useMemo } from "react";
import { useDashboard } from "../../../context/DashboardContext";
import Skeleton from "./Skeleton";

const AllTicket = () => {
  const { unassignedTicket, loading } = useDashboard();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getMedal = (index: number) => {
    if (index === 0) return "👑";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}.`;
  };

  //  AUTO SLIDE
  useEffect(() => {
    if (combined.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % combined.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [combined]);

  const safeIndex = combined.length === 0 ? 0 : currentIndex % combined.length;
  const currentItem = combined[safeIndex];

  //  GUARD
  if (loading) {
    return (
      <div className="space-y-5" aria-label="Loading active tickets" aria-busy="true">
        <Skeleton className="h-7 w-36" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-[86px] w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[260px] w-full rounded-lg" />
        <div className="flex items-center justify-between px-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    );
  }
  if (combined.length === 0)
    return <div className="text-gray-400">No data</div>;

  return (
    <>
      {/* COUNT CARDS */}
  <div className="mb-5">
  {/* TITLE */}
  <h3 className="text-xl text-white font-bold mb-5">
    Active Tickets
  </h3>

  {/* 3 BOXES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    <div className="bg-[#2b1f55] border text-center border-red-500 rounded-xl p-4 shadow-md hover:scale-[1.02] transition">
      <div className="text-3xl font-bold text-red-400">
        {unassignedTicket?.unassignedTicket?.length ?? 0}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Unassigned<br /> Tickets
      </div>
    </div>

    <div className="bg-[#2b1f55] border text-center border-green-500 rounded-xl p-4 shadow-md hover:scale-[1.02] transition">
      <div className="text-3xl font-bold text-green-400">
        {unassignedTicket?.openResult?.length ?? 0}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Open <br /> Tickets
      </div>
    </div>

    <div className="bg-[#2b1f55] border text-center border-yellow-500 rounded-xl p-4 shadow-md hover:scale-[1.02] transition">
      <div className="text-3xl font-bold text-yellow-400">
        {unassignedTicket?.pendingResult?.length ?? 0}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        Pending <br /> Tickets
      </div>
    </div>

  </div>
</div>

      {/* CARD */}
      <div className="flex flex-col">

        <div className="bg-slate-800 flex flex-col overflow-auto p-3 rounded-lg h-[260px]">

          {/* TOP */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>SysAid ID: {currentItem?.id}</span>
            <span>
              {currentItem?.insert_time
                ? new Date(currentItem.insert_time).toLocaleString("en-US", {
                    timeZone: "Asia/Manila",
                  })
                : ""}
            </span>
          </div>

          {/* BODY */}
          <div className="text-white text-sm mt-2">
            {currentItem?.description}
          </div>

          {/* STATUS (BOTTOM CENTER) */}
          <div className="mt-auto text-center text-sm text-white border-t border-gray-700 pt-2">
            Status: {statusTitle[currentItem?.status] || "Unknown"}
          </div>

        </div>

        {/* NAV */}
        <div className="flex items-center justify-between mt-4 px-2">
          <button
            aria-label="Previous active ticket"
            onClick={() =>
              setCurrentIndex(
                safeIndex === 0 ? combined.length - 1 : safeIndex - 1,
              )
            }
            className="text-white text-lg px-2 py-1 rounded hover:bg-gray-700"
          >
            ◀
          </button>

          <div className="text-xs text-gray-400">
            {safeIndex + 1} / {combined.length}
          </div>

          <button
            aria-label="Next active ticket"
            onClick={() =>
              setCurrentIndex((safeIndex + 1) % combined.length)
            }
            className="text-white text-lg px-2 py-1 rounded hover:bg-gray-700"
          >
            ▶
          </button>
        </div>

      </div>
    </>
  );
};

export default AllTicket;
