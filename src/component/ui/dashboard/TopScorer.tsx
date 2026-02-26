import { useEffect, useState } from "react";

interface TopScorerData {
  first_name: string;
  last_name: string;
  ClosedCount: number;
}

export default function TopScorer() {
  const [data, setData] = useState<TopScorerData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3010/api/getScores");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("TopScorer error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      await fetchData();
    };

    load();
    const interval = setInterval(load, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col h-full px-3">
      <h3 className="text-xl text-white font-bold mb-4">
        Top Ticket Solvers
      </h3>

      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce" />
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
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
      )}
    </div>
  );
}