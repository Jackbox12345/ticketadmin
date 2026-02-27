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
    const response = await fetch(endpoint, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(id);
  }
}

/* ================= TYPES ================= */

export type Range = "daily" | "weekly" | "monthly" | "yearly";

export interface TicketStatusResponse {
  openCount: number;
  resolveCount: number;
  pendingCount: number;
  totalCount: number;
}

export interface ChartPoint {
  bucket: string;
  value: number;
}

export interface DashboardResponse {
  range: Range;
  chart: ChartPoint[];
  status: TicketStatusResponse;
}

/* ================= CONTEXT TYPE ================= */

interface DashboardContextType {
  range: Range;
  setRange: (r: Range) => void;

  chart: ChartPoint[];
  ticketStatus: TicketStatusResponse | null;

  loading: boolean;
  error: string | null;

  refreshDashboard: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const DashboardContext = createContext<
  DashboardContextType | undefined
>(undefined);

/* ================= PROVIDER ================= */

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range>("daily");
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [ticketStatus, setTicketStatus] =
    useState<TicketStatusResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------ LOAD DASHBOARD ------------ */

  async function loadDashboard(selectedRange = range) {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData<DashboardResponse>(
        `http://localhost:3010/api/dashboard?range=${selectedRange}`
      );

      setChart(data.chart);
      setTicketStatus(data.status);
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  /* ------------ reload when range changes ------------ */

  useEffect(() => {
    loadDashboard(range);
  }, [range]);

  /* ------------ auto refresh every 10s ------------ */

  useEffect(() => {
    const interval = setInterval(() => {
      loadDashboard(range);
      console.log("Dashboard Reloading");
    }, 10000);

    return () => clearInterval(interval);
  }, [range]);

  /* ------------ context value ------------ */

  return (
    <DashboardContext.Provider
      value={{
        range,
        setRange,
        chart,
        ticketStatus,
        loading,
        error,
        refreshDashboard: () => loadDashboard(range),
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