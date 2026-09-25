import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socket";

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

      if (
        typeof data === "object" &&
        data !== null &&
        "type" in data &&
        data.type === "top_scorers" &&
        "data" in data &&
        Array.isArray(data.data)
      ) {
        setTopScorers(data.data as TopScorer[]);
      }
    });

    return () => disconnectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ topScorers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
