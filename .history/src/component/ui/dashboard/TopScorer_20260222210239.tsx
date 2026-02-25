import React from 'react'
import Card from '../Cards'
import { useEffect,useState } from 'react';
import { connectSocket, disconnectSocket  } from '../../../services/socket';

const TopScorer = () => {
    const [topScorer, setTopScorer] = useState<{ name: string; score: number } | null>(null);

useEffect(() => {
  const ws = connectSocket((data) => {
    if (data.type === "top_scorer") {
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
                    <p className="text-xl font-semibold">Ava Gilbert</p>
                    <p className="text-xl font-semibold">20</p>
                    </div>
                    <div className='flex justify-between'>
                    <p className="text-xl font-semibold">john rey torres</p>
                    <p className="text-xl font-semibold">19</p>
                    </div>
                    <div className='flex justify-between'>
                    <p className="text-xl font-semibold">kent cabagua</p>
                    <p className="text-xl font-semibold">18</p>
                    </div>
                     <div className='flex justify-between'>
                    <p className="text-xl font-semibold">Christian Lapitan</p>
                    <p className="text-xl font-semibold">17</p>
                    </div>
                    <div className='flex justify-between'>
                    <p className="text-xl font-semibold">joshua Grijaldo</p>
                    <p className="text-xl font-semibold">18</p>
                    </div>
    </Card>
    </>
  )
}

export default TopScorer