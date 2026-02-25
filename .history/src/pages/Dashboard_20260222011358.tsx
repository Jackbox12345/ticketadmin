import React from 'react';
import Card from '../component/ui/Cards';

const Dashboard = () => {
  return (
   <>
    <div className="min-h-screen w-full bg-[var(--bg)] text-[var(--text-primary)] flex">

      {/* Sidebar */}
      <aside className="w-64 bg-[var(--bg-surface)] p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-8">Helpdesk</h2>
          <nav className="space-y-4 text-[var(--text-secondary)]">
            <div>Dashboard</div>
            <div>Tickets</div>
            <div>Customers</div>
            <div>Reports</div>
          </nav>
        </div>
        <div className="text-sm text-[var(--text-secondary)]">
          Helpdesk dashboard
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 p-8 space-y-8">

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6">
          <Card>
            <h3 className="text-sm text-[var(--text-secondary)]">CSAT this month</h3>
            <p className="text-4xl font-bold mt-4">95%</p>
          </Card>

          <Card>
            <h3 className="text-sm text-[var(--text-secondary)]">Top ticket solvers</h3>
            <p className="text-2xl font-semibold mt-4">Ava Gilbert</p>
          </Card>

          <Card>
            <h3 className="text-sm text-[var(--text-secondary)]">Tickets by status</h3>
            <p className="text-2xl font-semibold mt-4">589 Resolved</p>
          </Card>

          <Card>
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
              Agent scores
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
    </div>
   </>
  )
}

export default Dashboard