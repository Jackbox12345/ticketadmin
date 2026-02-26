// src/context/DashboardContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
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

/* ---------- API TYPES ---------- */

export interface TopScorerItem {
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
  scores: TopScorerItem[];
  ticketStatus: TicketStatusResponse | null;
  loading: boolean;
  error: string | null;
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
  const [scores, setScores] = useState<TopScorerItem[]>([]);
  const [ticketStatus, setTicketStatus] =
    useState<TicketStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [scoresData, ticketStatusData] =
          await Promise.all([
            fetchData<TopScorerItem[]>(
              "http://localhost:3010/api/getScores"
            ),
            fetchData<TicketStatusResponse>(
              "http://localhost:3010/api/getTicketStatus"
            ),
          ]);

        setScores(scoresData);
        setTicketStatus(ticketStatusData);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ scores, ticketStatus, loading, error }}
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