import React from 'react'
import Card from '../Cards'
import { useEffect,useState  } from 'react';
interface TopScorer {
  name: string;
  score: number;
}

const TopScorer = () => {
    const [topScorer, setTopScorer] = useState<TopScorer | null>(null);

    useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setTopScorer(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  return (
    <>
    <Card className="row-span-2 flex flex-col justify-between">
                    <h3 className="text-sm text-[var(--text-secondary)]">
                    Top ticket solvers
                    </h3>
                    <div className='flex justify-between'>
                    <p className="text-xl font-semibold">Ava Gilbert</p>
                    <p className="text-xl font-semibold">20</p>
                    </div>
                   
    </Card>
    </>
  )
}

export default TopScorer