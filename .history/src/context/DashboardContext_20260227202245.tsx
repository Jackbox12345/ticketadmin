import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ================= FETCH UTILITY ================= */

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

/* ================= API TYPES ================= */

export interface TopScorerItem {
  first_name: string;
  last_name: string;
  ClosedCount: number;
}

export interface TicketStatusResponse {
  openCount: number;
  resolveCount: number;
  pendingCount: number;
  totalCount: number;
}

export interface TicketStatusToday {
  firstResponseMinutes: number;
  fullResponseMinutes: number;
  unassignedCount: number;
}

/* ================= CONTEXT TYPE ================= */

interface DashboardContextType {
  scores: TopScorerItem[];
  ticketStatus: TicketStatusResponse | null;
  ticketStatusToday: TicketStatusToday | null;
  loading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

/* ================= PROVIDER ================= */

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [scores, setScores] = useState<TopScorerItem[]>([]);
  const [ticketStatus, setTicketStatus] =
    useState<TicketStatusResponse | null>(null);
  const [ticketStatusToday, setTicketStatusToday] =
    useState<TicketStatusToday | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 async function loadDashboard(range: string = "today") {
  setError(null);

  // Only show loader first time
  if (!scores.length) {
    setLoading(true);
  }

  try {
    const data = await fetchData<{
      scores: TopScorerItem[];
      ticketStatus: TicketStatusResponse;
      ticketStatusToday: TicketStatusToday;
    }>(
      `http://localhost:3010/api/dashboard?range=${range}`
    );

    setScores(data.scores);
    setTicketStatus(data.ticketStatus);
    setTicketStatusToday(data.ticketStatusToday);

  } catch {
    setError("Failed to load dashboard data");
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadDashboard("today");

  const interval = setInterval(() => {
    loadDashboard("today");
    console.log("Dashboard Reloading");
  }, 10000);

  return () => clearInterval(interval);
}, []);

  return (
    <DashboardContext.Provider
      value={{
        scores,
        ticketStatus,
        ticketStatusToday,
        loading,
        error,
        refreshDashboard: loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
}