import React from 'react';
import type { AnalyticsRange } from '../utils';
interface AreaChartProps {
    cur: number[];
    cmp?: number[];
    range: AnalyticsRange;
    hue?: number;
    height?: number;
    valueFmt?: (v: number) => string;
    compareLabel?: string;
    showCompare?: boolean;
}
export declare function AreaChart({ cur, cmp, range, hue, height, valueFmt, compareLabel, showCompare, }: AreaChartProps): React.JSX.Element;
export {};
