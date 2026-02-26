// src/context/DashboardContext.tsx

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

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

    return (await response.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

/* ---------- API RESPONSE TYPES ---------- */

export interface ScoreResponse {
  first_name: string;
  last_name: string;
  ClosedCount: number;
}

export interface TicketStatusResponse {
  open: number;
  closed: number;
}

/* ---------- CONTEXT TYPE ---------- */

interface DashboardContextType {
  getScore: () => Promise<ScoreResponse>;
  getTicketStatus: () => Promise<TicketStatusResponse>;
}

/* ---------- CONTEXT ---------- */

const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

/* ---------- PROVIDER ---------- */

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const getScore = () =>
    fetchData<ScoreResponse>(
      "http://localhost:3010/api/getScores"
    );

  const getTicketStatus = () =>
    fetchData<TicketStatusResponse>(
      "http://localhost:3010/api/getTicketStatus"
    );

  return (
    <DashboardContext.Provider
      value={{ getScore, getTicketStatus }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/* ---------- HOOK ---------- */

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}