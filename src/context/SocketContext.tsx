import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket } from "../services/socket";

interface TopScorer {
  name: string;
  score: number;
}

interface SocketContextType {
  topScorers: TopScorer[];
}

const SocketContext = createContext<SocketContextType>({
  topScorers: [],
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [topScorers, setTopScorers] = useState<TopScorer[]>([]);

  useEffect(() => {
    connectSocket((data) => {
      console.log("🔥 GLOBAL WS:", data);

      if (data.type === "top_scorers") {
        setTopScorers(data.data);
      }
    });
  }, []);

  return (
    <SocketContext.Provider value={{ topScorers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);