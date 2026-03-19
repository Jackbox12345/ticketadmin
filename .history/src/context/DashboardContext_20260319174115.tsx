// src/context/DashboardContext.tsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/* ================= FETCH UTILITY ================= */

async function fetchData<T>(endpoint: string, timeout = 5000): Promise<T> {
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

export interface AverageStatus {
  avgFirstResponseSeconds: number;
  avgFullResponseSeconds: number;
  unassignedCount: number;
}

export interface TopResolver {
  first_name: string;
  last_name: string;
  ClosedCount: number;
}
export interface TopCategory {
  problem_type: string;
  Count: number;
}

export interface ChartPoint {
  bucket: string;
  totalValue: number;
  closedValue: number;
}

export interface TopRequester {
  first_name: string;
  last_name: string;
  Count: number;
}

export interface TotalTickets {
  rangeTotal: number;
  allTimeTotal: number;
}

export interface DashboardResponse {
  range: Range;
  chart: ChartPoint[];
  status: TicketStatusResponse;
  averageStatus: AverageStatus;
  topRequester: TopRequester[];
  topResolver: TopResolver[];
  totalTickets: TotalTickets;
  topCategory: TopCategory[];
}

/* ================= CONTEXT TYPE ================= */

interface DashboardContextType {
  range: Range;
  setRange: (r: Range) => void;

  chart: ChartPoint[];
  ticketStatus: TicketStatusResponse | null;
  averageStatus: AverageStatus | null;
  topRequester: TopRequester[];
  topResolver: TopResolver[];
  totalTickets: TotalTickets | null;
  topCategory: TopCategory[];

  loading: boolean;
  error: string | null;
  refreshDashboard: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
);

/* ================= PROVIDER ================= */

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range>("daily");
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [ticketStatus, setTicketStatus] = useState<TicketStatusResponse | null>(
    null,
  );
  const [averageStatus, setAverageStatus] = useState<AverageStatus | null>(
    null,
  );
  const [topCategory, setTopCategory] = useState<TopCategory[]>([]);
  const [topRequester, setTopRequester] = useState<TopRequester[]>([]);
  const [topResolver, setTopResolver] = useState<TopResolver[]>([]);
  const [totalTickets, setTotalTickets] = useState<TotalTickets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------ LOAD DASHBOARD ------------ */

  async function loadDashboard(selectedRange = range) {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData<DashboardResponse>(
        `http://localhost:3010/api/dashboard?range=${selectedRange}`,
      );

      setChart(data.chart);
      setTicketStatus(data.status);
      setAverageStatus(data.averageStatus);
      setTopRequester(data.topRequester);
      setTopResolver(data.topResolver);
      setTotalTickets(data.totalTickets);
      setTopCategory(data.topCategory);
    } catch {
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
    }, 60000);

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
        averageStatus,
        topRequester,
        topResolver,
        topCategory,
        totalTickets,
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
    throw new Error("useDashboard must be used inside DashboardProvider");
  }

  return context;
}
