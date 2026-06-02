import React from 'react';
interface SparklineProps {
    data: number[];
    hue?: number;
    up?: boolean;
    height?: number;
    fill?: boolean;
}
export declare function Sparkline({ data, hue, up, height, fill }: SparklineProps): React.JSX.Element | null;
export {};
