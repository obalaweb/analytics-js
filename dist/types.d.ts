export type RangeKey = '24h' | '7d' | '30d' | '90d' | '1y';
export interface TrendSeries {
    cur: number[];
    cmp: number[];
}
export interface TrendRange {
    visitors: TrendSeries;
    pageviews: TrendSeries;
    conversions: TrendSeries;
}
export interface AnalyticsTrends {
    '24h'?: TrendRange;
    '7d'?: TrendRange;
    '30d'?: TrendRange;
    '90d'?: TrendRange;
    '1y'?: TrendRange;
}
export interface AnalyticsKpi {
    key: string;
    icon: string;
    hue: number;
    label: string;
    value: number;
    prev: number;
    fmt: 'int' | 'pct' | 'dur';
    good: 'up' | 'down';
    spark: number[];
}
export interface TrafficSource {
    key: string;
    name: string;
    hue: number;
    visitors: number;
    sessions: number;
    conv: number;
    delta: number;
}
export interface ContentRow {
    path: string;
    title: string;
    views: number;
    uniques: number;
    avgTime: number;
    bounce: number;
    conv: number;
}
export interface GeoRow {
    country: string;
    code: string;
    visitors: number;
    share: number;
    delta: number;
    city: string;
}
export interface DeviceSplit {
    name: string;
    share: number;
    bounce: number;
    hue: number;
}
export interface DeviceItem {
    name: string;
    share: number;
}
export interface Devices {
    split: DeviceSplit[];
    browsers: DeviceItem[];
    os: DeviceItem[];
    screens: DeviceItem[];
}
export interface FunnelStage {
    stage: string;
    count: number;
    hue: number;
}
export interface LeadChannel {
    name: string;
    icon: string;
    count: number;
    delta: number;
    hue: number;
}
export interface LeadGen {
    funnel: FunnelStage[];
    channels: LeadChannel[];
    total: number;
    rate: number;
    prevRate: number;
}
export interface Insight {
    tone: 'ok' | 'warn' | 'info' | 'accent';
    icon: string;
    metric: string;
    title: string;
    body: string;
    tag: string;
}
export interface RealtimeEvent {
    type: string;
    label: string;
    page: string;
    city: string;
    id: number;
    t: number;
}
export interface RealtimePage {
    path: string;
    title: string;
    count: number;
}
export interface RealtimeLocation {
    city: string;
    country: string;
    count: number;
}
export interface RealtimeData {
    active: number;
    spark: number[];
    pages: RealtimePage[];
    events: RealtimeEvent[];
    locations: RealtimeLocation[];
}
export interface AnalyticsDashboardData {
    kpis: AnalyticsKpi[];
    trends: AnalyticsTrends;
    sources: TrafficSource[];
    content: ContentRow[];
    geo: GeoRow[];
    devices: Devices;
    leadgen: LeadGen;
    insights: Insight[];
}
export interface AnalyticsEndpoints {
    dashboard: string;
    realtime: string;
}
export interface AnalyticsDashboardProps {
    data: AnalyticsDashboardData | null;
    realtime: RealtimeData | null;
    loading?: boolean;
    error?: string | null;
    onExport?: () => void;
    siteUrl?: string;
}
/** Legacy shape — kept for backwards compat with existing getDashboard response */
export interface AnalyticsOverview {
    views: number;
    visitors: number;
    sessions: number;
}
/** @deprecated Use AnalyticsDashboardData instead */
export interface LegacyAnalyticsDashboardData {
    overview: AnalyticsOverview;
    top_pages: {
        path: string;
        views: number;
    }[];
    countries: {
        country: string;
        views: number;
    }[];
    referrers: {
        referrer: string;
        views: number;
    }[];
}
