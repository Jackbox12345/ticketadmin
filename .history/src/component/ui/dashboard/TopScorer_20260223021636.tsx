import React from "react";
import Card from "../Cards";
import { useEffect, useState } from "react";

interface TopScorer {
  update_user: string;
  ClosedCount: number;
}

const TopScorer = () => {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3010/api/test");
      const data = await res.json();
      setTopScorers(data);
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
    <Card className="row-span-2 flex flex-col">
      <h3 className="text-sm text-[var(--text-secondary)]">
        Top ticket solvers
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-24">
          <div className="w-6 h-6 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {topScorers.map((scorer, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-xl font-semibold">{scorer.update_user}</p>
              <p className="text-xl font-semibold">{scorer.ClosedCount}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TopScorer;