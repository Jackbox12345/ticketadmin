import { useEffect } from "react";
import { connectSocket } from "../../../services/socket";

const TopScorer = () => {
  useEffect(() => {
    connectSocket((data) => {
      console.log("🔥 WS RECEIVED:", data);
    });
  }, []);

  return null; // nothing rendered
};

export default TopScorer;