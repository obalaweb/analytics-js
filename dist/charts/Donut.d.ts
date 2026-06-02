import React from 'react';
interface DonutSegment {
    value: number;
    color: string;
}
interface DonutProps {
    segments: DonutSegment[];
    size?: number;
    thickness?: number;
    centerLabel?: string;
    centerSub?: string;
}
export declare function Donut({ segments, size, thickness, centerLabel, centerSub }: DonutProps): React.JSX.Element;
export {};
