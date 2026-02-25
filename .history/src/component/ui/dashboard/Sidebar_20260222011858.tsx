

const Sidebar = () => {
  return (
    <>
   
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
          </>
  )
}

export default Sidebar