import Card from "../Cards";
import { useSocket } from "../../../context/SocketContext";

const TopScorer = () => {
  const { topScorers } = useSocket();

  return (
    <Card className="row-span-2 flex flex-col">
      <h3 className="text-sm text-[var(--text-secondary)]">
        Top ticket solvers
      </h3>

      <div className="mt-4 space-y-2">
        {topScorers.map((scorer, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-xl font-semibold">{scorer.name}</p>
            <p className="text-xl font-semibold">{scorer.score}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TopScorer;