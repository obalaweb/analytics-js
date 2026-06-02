import type { AnalyticsDashboardData, RealtimeData, AnalyticsEndpoints } from './types';
export interface UseAnalyticsDashboardOptions {
    endpoints: AnalyticsEndpoints;
    getToken: () => Promise<string | null>;
}
export interface UseAnalyticsDashboardResult {
    data: AnalyticsDashboardData | null;
    realtime: RealtimeData | null;
    loading: boolean;
    error: string | null;
    refresh: () => void;
}
export declare function useAnalyticsDashboard({ endpoints, getToken, }: UseAnalyticsDashboardOptions): UseAnalyticsDashboardResult;
