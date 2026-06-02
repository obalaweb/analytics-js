import React from 'react';
import type { AnalyticsKpi } from '../types';
interface KpiGridProps {
    kpis: AnalyticsKpi[] | undefined;
}
export declare function KpiGrid({ kpis }: KpiGridProps): React.JSX.Element;
export {};
