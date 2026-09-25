import { useState, useEffect } from "react";
import Card from "../Cards";
import { useDashboard } from "../../../context/DashboardContext";
import Skeleton from "./Skeleton";

const ChangeControl = () => {
  const { changeControl, loading } = useDashboard();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only run the timer if there's data to cycle through
    if (!changeControl || changeControl.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        (prevIndex + 1) % changeControl.length
      );
    }, 5000); // 5000ms = 5 seconds

    // Cleanup: stop the timer when the component is removed from the page
    return () => clearInterval(interval);
  }, [changeControl]);

  const safeIndex = changeControl.length === 0
    ? 0
    : currentIndex % changeControl.length;
  const currentItem = changeControl[safeIndex];

  return (
    <Card className="p-4 h-full flex flex-col">
      <h3 className="text-white text-xl mt-2 font-bold mb-4">Change Enablement</h3>

      {loading ? (
        <div
          className="flex flex-1 flex-col gap-4"
          aria-label="Loading change enablement"
          aria-busy="true"
        >
          <Skeleton className="h-[260px] w-full rounded-lg" />
          <div className="flex items-center justify-between px-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      ) : changeControl?.length > 0 ? (
        <div className="space-y-3 flex flex-1 flex-col">

          {/* CAROUSEL CARD */}
          <div className="bg-slate-800 p-3 rounded-lg h-[260px]  overflow-auto transition-all duration-5000 mt-2 ">
            {/* ID */}
            <div className="flex flex-row justify-between">

            <div className="text-sm text-gray-400">
              SysAid ID: {currentItem.id}
            </div>
                      <div className="text-sm text-gray-500">
              {new Date(currentItem.insert_time).toLocaleString("en-US", {
                timeZone: "Asia/Manila",
              })}
            </div>
            </div>
            {/* DESCRIPTION */}
            <div className="text-white text-m mt-2 ">
              {currentItem.description}
            </div>
            {/* DATE */}

          </div>

          {/* DOTS NAVIGATION */}
          <div className="flex items-end justify-between mt-2 px-2  ">

            {/* LEFT ARROW */}
            <button
              aria-label="Previous change"
              onClick={() =>
                setCurrentIndex(
                  safeIndex === 0 ? changeControl.length - 1 : safeIndex - 1,
                )
              }
              className="text-white text-lg px-2 py-1 rounded hover:bg-gray-700 transition"
            >
              ◀
            </button>

            {/* COUNTER */}
            <div className="text-xs text-gray-400">
              {safeIndex + 1} / {changeControl.length}
            </div>

            {/* RIGHT ARROW */}
            <button
              aria-label="Next change"
              onClick={() =>
                setCurrentIndex((safeIndex + 1) % changeControl.length)
              }
              className="text-white text-lg px-2 py-1 rounded hover:bg-gray-700 transition"
            >
              ▶
            </button>

      </div>

  </div>
      ) : (
        <div className="text-gray-400">No data</div>
      )}
    </Card>
  );
};

export default ChangeControl;
