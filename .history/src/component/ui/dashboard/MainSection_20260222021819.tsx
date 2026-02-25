import React from 'react'
import Card from '../Cards';
import TicketChart from './charts/TicketChart';

const MainSection = () => {
  return (
    <>
    {/* Main */}
      <main className="flex-1 p-8 space-y-8 w-full"  >

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 auto-rows-[120px]">

            <Card className="row-span-2 flex flex-col justify-between">
                <h3 className="text-sm text-[var(--text-secondary)]">
                CSAT this month
                </h3>
                <p className="text-4xl font-bold">95%</p>
            </Card>

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

            <Card className="row-span-2 flex flex-col justify-between">
                <h3 className="text-sm text-[var(--text-secondary)]">
                Tickets by status
                </h3>
                <p className="text-2xl font-semibold">589 Resolved</p>
            </Card>

            <Card className="row-span-2 flex flex-col justify-between">
                <h3 className="text-sm text-[var(--text-secondary)]">
                QA this week
                </h3>
                <p className="text-4xl font-bold">88%</p>
            </Card>

        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-2 gap-6">
          
          <Card className="col-span-2">
            <h3 className="text-sm text-[var(--text-secondary)] mb-4">
              Ticket volume this week
            </h3>
            <div className="h-60 bg-[var(--bg-surface)] rounded-lg items-center justify-center text-[var(--text-secondary)]">
              <TicketChart/>
            </div>
          </Card>

          <Card className='col-span-2 row-spa'>
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