import { useEffect, useState } from "react";

interface TicketStatus {
  openCount: number;
  resolveCount: number;
  pendingCount: number;
  // totalCount: number;
}

export default function TicketStatus() {
  const [data, setData] = useState<TicketStatus | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://localhost:3010/api/getTicketStatus"
      );
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  const total =
    data.openCount + data.resolveCount + data.pendingCount;

  const percent = (value: number) =>
    total === 0 ? 0 : (value / total) * 100;

  return (
    <div className="space-y-6 px-3">
      <h3 className="text-xl text-white font-bold mb-6">
        Tickets by Status this Month
      </h3>

      {[
        { label: "Open", value: data.openCount },
        { label: "Resolved", value: data.resolveCount },
        { label: "Pending", value: data.pendingCount },
        // { label: "Total tickets this month", value: data.totalCount },
      ].map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>

          <div className="w-full bg-[#2d2157] rounded-lg h-2">
            <div
              className="bg-[var(--primary)] h-2 rounded-lg transition-all duration-500"
              style={{ width: `${percent(item.value)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}