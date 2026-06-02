import React from 'react';
import type { Insight } from '../types';
interface InsightsPanelProps {
    insights: Insight[] | undefined;
    updatedLabel?: string;
}
export declare function InsightsPanel({ insights, updatedLabel }: InsightsPanelProps): React.JSX.Element | null;
export {};
