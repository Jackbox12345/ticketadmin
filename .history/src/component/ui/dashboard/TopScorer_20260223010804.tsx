import React from 'react'
import Card from '../Cards'
import { useEffect } from 'react';

const TopScorer = () => {
    


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