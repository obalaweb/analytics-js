import React from 'react';
interface IconProps {
    name: string;
    size?: number | string;
    className?: string;
    style?: React.CSSProperties;
}
export declare function Icon({ name, size, className, style }: IconProps): React.ReactSVGElement;
export {};
