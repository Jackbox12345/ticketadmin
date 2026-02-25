import React from "react";
import Card from "../Cards";
import { useEffect, useState } from "react";

interface TopScorer {
  update_user: string;
  ClosedCount: number;
}

const TopScorer = () => {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3010/api/test");
      const data = await res.json();
      console.log("API DATA:", data);
      setTopScorers(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchData(); 

  const interval = setInterval(fetchData, 5000); // 5 seconds

  return () => clearInterval(interval); // cleanup
}, []);

  return (
    <Card className="row-span-2 flex flex-col">
      <h3 className="text-sm text-[var(--text-secondary)]">
        Top ticket solvers
      </h3>

      <div className="mt-4 space-y-2">
        {topScorers.map((scorer, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-xl font-semibold">{scorer.update_user}</p>
            <p className="text-xl font-semibold">{scorer.ClosedCount}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopScorer;