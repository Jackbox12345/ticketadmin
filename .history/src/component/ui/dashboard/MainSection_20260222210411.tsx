
import Card from '../Cards';
import TicketChart from './charts/TicketChart';
import ChartHeader from './ChartHeader';
import { useState, useEffect } from 'react';
// import type { Range } from "../../../misc/types";
import { connectSocket, sendMessage } from "../../../services/socket";
import TopScorer from './TopScorer';


const options = ["daily","weekly", "monthly", "yearly"] as const;
type Range = (typeof options)[number];

const MainSection = () => {
    const [range, setRange] = useState<Range>("weekly");
   const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = connectSocket((data) => {
      if (data.type === "message") {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket?.close();
    };
  }, []);


  return (
    <>
    {/* Main */}
      <main className="flex-1 p-8 space-y-8 w-full"  >

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 auto-rows-[120px]">

            <Card className="row-span-2 flex flex-col justify-between">
                {/* <h3 className="text-sm text-[var(--text-secondary)]">
                CSAT this month
                </h3>
                <p className="text-4xl font-bold">95%</p> */}
                <div className="p-6">
                  <button
                    onClick={() => sendMessage("Hello from React")}
                    className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg"
                  >
                    Send Message
                  </button>

                  <div className="mt-4 space-y-2">
                    {messages.map((msg, i) => (
                      <div key={i} className="text-sm">
                        {msg}
                      </div>
                    ))}
                  </div>
                </div>
            </Card>
            {/*top scorer*/}
            
            <TopScorer/>

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
            <ChartHeader value={range} onChange={setRange} />

            <div className="h-60 bg-[var(--bg-surface)] rounded-lg">
                <TicketChart range={range} />
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