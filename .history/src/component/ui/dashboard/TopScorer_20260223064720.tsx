import React from "react";
import Card from "../Cards";
import { useEffect, useState } from "react";

interface TopScorer {
  first_name: string;
  last_name: string;
  ClosedCount: number;
}

const TopScorer = () => {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3010/api/getScores");
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
      <h2 className="text-l text-[var(--text-secondary)]">
        Top ticket solvers
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-24 space-x-2">
            <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2.5 h-2.5 bg-[var(--primary)] rounded-full animate-bounce" />
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          {topScorers.map((scorer, index) => (
            <div key={index} className="flex justify-between">
              <p className="text-xl font-semibold">{scorer.first_name} {scorer.last_name}</p>
              <p className="text-xl font-semibold">{scorer.ClosedCount}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TopScorer;