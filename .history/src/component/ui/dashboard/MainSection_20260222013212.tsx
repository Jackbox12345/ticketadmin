import React from 'react'
import Card from '../Cards';

const MainSection = () => {
  return (
    <>
    {/* Main */}
      <main className="flex-1 p-8 space-y-8 w-full"  >

        {/* Top Stats */}
        <div className="grid grid-cols-4 grid-rows-3 gap-6">
          <Card className="row-span-2" fullHeight>
            <h3 className="text-sm text-[var(--text-secondary)]">CSAT this month</h3>
            <p className="text-4xl font-bold mt-4">95%</p>
          </Card>

          <Card className="row-span-2" fullHeight>
            <h3 className="text-sm text-[var(--text-secondary)]">Top ticket solvers</h3>
            <p className="text-2xl font-semibold mt-4">Ava Gilbert</p>
          </Card>

          <Card className="row-span-2" fullHeight>
            <h3 className="text-sm text-[var(--text-secondary)]">Tickets by status</h3>
            <p className="text-2xl font-semibold mt-4">589 Resolved</p>
          </Card>

          <Card className="row-span-2" fullHeight>
            <h3 className="text-sm text-[var(--text-secondary)]">QA this week</h3>
            <p className="text-4xl font-bold mt-4">88%</p>
          </Card>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-6">
          
          <Card className="col-span-2">
            <h3 className="text-sm text-[var(--text-secondary)] mb-4">
              Ticket volume this week
            </h3>
            <div className="h-48 bg-[var(--bg-surface)] rounded-lg flex items-center justify-center text-[var(--text-secondary)]">
              Chart Placeholder
            </div>
          </Card>

          <Card>
            <h3 className="text-sm text-[var(--text-secondary)] mb-4">
              IT Scores
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Zander Hardin</span>
                <span>91%</span>
              </div>
              <div className="flex justify-between">
                <span>Vance Blanchard</span>
                <span>91%</span>
              </div>
              <div className="flex justify-between">
                <span>Ava Gilbert</span>
                <span>90%</span>
              </div>
            </div>
          </Card>

        </div>
      </main>
    </>
  )
}

export default MainSection