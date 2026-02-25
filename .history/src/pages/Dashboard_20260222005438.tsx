import React from 'react'

const Dashboard = () => {
  return (
   <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-[var(--text-secondary)]">
            Semantic design token example
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-lg
                     bg-[var(--primary)]
                     hover:opacity-90
                     transition">
          Action Button
        </button>

      </div>
    </div>

  )
}

export default Dashboard