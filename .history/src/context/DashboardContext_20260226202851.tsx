// src/context/DashboardContext.tsx

import React,{
  createContext,
  useContext,
  
} from "react";
import type {ReactNode} from "react";
/**
 * Fetch utility with timeout using AbortController.
 */
async function fetchData<T>(
  endpoint: string,
  timeout = 5000
): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(id);
  }
}

/**
 * Context type definition.
 */
interface DashboardContextType {
  getScore: () => Promise<any>;
  getTicketStatus:() => Promise<any>;
}

/**
 * Create context.
 */
const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

/**
 * Provider component.
 */
export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getScore = async () => {
    return fetchData(
      "http://localhost:3010/api/getScores"
    );
  };
    const getTicketStatus = async () => {
    return fetchData(
      "http://localhost:3010/api/getTicketStatus"
    );
  };

  return (
    <DashboardContext.Provider value={{ getScore, getTicketStatus  }}>
      {children}
    </DashboardContext.Provider>
  );
}

/**
 * Custom hook for consuming context safely.
 */
export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}