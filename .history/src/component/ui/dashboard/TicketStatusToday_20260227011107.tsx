import React from 'react'
import Card from '../Cards'
import { useDashboard } from '../../../context/DashboardContext'



const TicketStatusToday = () => {
    const {ticketStatusToday} = useDashboard();
    // console.log(ticketStatusToday);

  return (
    <>
     <Card className="rounded-xl p-6 col-span-1 h-[360px] flex flex-col justify-between">
    
              <div>
                <h3 className="text-sm text-gray-400 mb-6">Today</h3>
    
                <div className="mb-6">
                  <div className="text-3xl font-bold">{ticketStatusToday?.firstResponseMinutes}m</div>
                  <div className="text-xs text-gray-400">First response time</div>
                </div>
    
                <div>
                  <div className="text-2xl font-bold">{ticketStatusToday?.fullResponseMinutes}m</div>
                  <div className="text-xs text-gray-400">Full resolution time</div>
                </div>
              </div>
    
              <div className="bg-[#2b1f55] border border-red-500 rounded-lg p-4">
                <div className="text-3xl font-bold text-red-400">{ticketStatusToday?.unassignedCount}</div>
                <div className="text-xs text-gray-400">Unassigned tickets</div>
              </div>
            </Card>
    </>
  )
}

export default TicketStatusToday