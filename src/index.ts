export { AnalyticsProvider } from './AnalyticsProvider';
export { AnalyticsDashboard } from './AnalyticsDashboard';
export { useAnalyticsDashboard } from './useAnalyticsDashboard';

// Charts
export { Sparkline } from './charts/Sparkline';
export { AreaChart } from './charts/AreaChart';
export { Donut } from './charts/Donut';

// Sections (exported for custom composition)
export { LiveBar } from './sections/LiveBar';
export { KpiGrid } from './sections/KpiGrid';
export { InsightsPanel } from './sections/InsightsPanel';
export { TrendsCard } from './sections/TrendsCard';
export { LeadGenSection } from './sections/LeadGenSection';
export { SourcesCard } from './sections/SourcesCard';
export { ContentTable } from './sections/ContentTable';
export { AudienceSection } from './sections/AudienceSection';
export { RealtimeCards } from './sections/RealtimeCards';

// Utils
export { fmtNum, fmtFull, fmtDur, fmtVal, deltaPct, deltaSpan, sum, ANALYTICS_RANGES } from './utils';
export type { AnalyticsRange } from './utils';

// Types
export type {
  AnalyticsDashboardData,
  AnalyticsDashboardProps,
  AnalyticsEndpoints,
  AnalyticsKpi,
  AnalyticsTrends,
  TrendRange,
  TrendSeries,
  TrafficSource,
  ContentRow,
  GeoRow,
  Devices,
  DeviceSplit,
  DeviceItem,
  LeadGen,
  FunnelStage,
  LeadChannel,
  Insight,
  RealtimeData,
  RealtimePage,
  RealtimeEvent,
  RealtimeLocation,
  // Legacy
  AnalyticsOverview,
  LegacyAnalyticsDashboardData,
} from './types';

export type { UseAnalyticsDashboardOptions, UseAnalyticsDashboardResult } from './useAnalyticsDashboard';
