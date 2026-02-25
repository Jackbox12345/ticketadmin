import React from 'react'
import Card from '../Cards'
import { useEffect,useState } from 'react';
import { connectSocket, disconnectSocket  } from '../../../services/socket';

const TopScorer = () => {
    const [topScorer, setTopScorer] = useState<{ name: string; score: number } | null>(null);

useEffect(() => {
  const ws = connectSocket((data) => {
    console.log("WS DATA:", data);
    if (data.type === "top_scorers") {
      setTopScorer(data.data);
    }
  });

  return () => {
    disconnectSocket();
  };
}, []);
  return (
    <>
    <Card className="row-span-2 flex flex-col justify-between">
                    <h3 className="text-sm text-[var(--text-secondary)]">
                    Top ticket solvers
                    </h3>
                    <div className='flex justify-between'>
                    <p className="text-xl font-semibold">{topScorer?.name}</p>
                    <p className="text-xl font-semibold">{topScorer?.score}</p>
                    </div>
                   
    </Card>
    </>
  )
}

export default TopScorer