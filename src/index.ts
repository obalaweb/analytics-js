export { AnalyticsProvider } from './AnalyticsProvider';

export interface AnalyticsOverview {
  views: number;
  visitors: number;
  sessions: number;
}

export interface AnalyticsDashboardData {
  overview: AnalyticsOverview;
  top_pages: { path: string; views: number }[];
  countries: { country: string; views: number }[];
  referrers: { referrer: string; views: number }[];
}
