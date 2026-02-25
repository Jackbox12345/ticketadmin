
export const chartRanges = ["daily", "weekly", "monthly", "yearly"] as const;
export type Range = (typeof chartRanges)[number];