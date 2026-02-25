import { useState, useEffect } from "react";
import Card from "../Cards";

interface TicketStatus {
  open_count: number;
  resolve_count: number;
  pending_count: number;
}

const TicketStatus = () => {
  const [ticketStatus, setTicketStatus] = useState<TicketStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3010/api/getTicketStatus");
      const data = await res.json();
      setTicketStatus(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="row-span-2 flex flex-col justify-between">
      <h3 className="text-sm text-[var(--text-secondary)]">
        Tickets by status
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-16 space-x-2">
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce" />
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.2s]" />
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.4s]" />
        </div>
      ) : ticketStatus ? (
        <div className="space-y-2">
          <p className="text-lg font-semibold">
            {ticketStatus.open_count} Open
          </p>
          <p className="text-lg font-semibold">
            {ticketStatus.resolve_count} Resolved
          </p>
          <p className="text-lg font-semibold">
            {ticketStatus.pending_count} Pending
          </p>
        </div>
      ) : (
        <p>No data</p>
      )}
    </Card>
  );
};

export default TicketStatus;