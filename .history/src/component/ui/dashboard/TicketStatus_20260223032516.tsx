import {useState,useEffect} from 'react'
import Card from '../Cards'


interface ticketStatus {
  update_user: string;
  ClosedCount: number;
}

const TicketStatus = () => {
    const [ticketStatuse, setticketStatus] = useState<ticketStatus[]>([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3010/api/getTicketStatus");
        const data = await res.json();
        setticketStatus(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false); 
      }
    };
  
    useEffect(() => {
      fetchData();
  
      const interval = setInterval(fetchData, 5000);
      return () => clearInterval(interval);
    }, []);
  return (
    
    <>
    <Card className="row-span-2 flex flex-col justify-between">
                    <h3 className="text-sm text-[var(--text-secondary)]">
                    Tickets by status
                    </h3>

                    <p className="text-2xl font-semibold">589 Resolved</p>
    </Card>
    </>
  )
}

export default TicketStatus