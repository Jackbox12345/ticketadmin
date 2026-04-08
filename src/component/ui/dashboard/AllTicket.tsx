import { useDashboard } from "../../../context/DashboardContext";


const AllTicket = () => {
    const { unassignedTicket, loading} = useDashboard();
    console.log(unassignedTicket);
  return (
    <>
     
          <h3 className="text-white font-bold mb-4">
            Unassigned Ticket
          </h3>
          <div className="bg-[#2b1f55] border border-red-500 rounded-lg p-4 mb-5">
                <div className="text-3xl font-bold text-red-400">{unassignedTicket.length}</div>
                <div className="text-xs text-gray-400">Unassigned tickets</div>
        </div>
    
          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : unassignedTicket?.length > 0 ? (
            <div className="space-y-3 max-h-[430px] overflow-auto">
              {unassignedTicket.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-800 p-3 rounded-lg"
                >
                  {/* ID */}
                  <div className="text-xs text-gray-400">
                    ID: {item.id}
                  </div>
    
                  {/* DESCRIPTION */}
                  <div className="text-white text-sm mt-1">
                    {item.description}
                  </div>
    
                  {/* DATE */}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(item.insert_time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No data</div>
          )}
        
        </>
  )
}

export default AllTicket