import React from 'react';
import type { RealtimeData } from '../types';
interface LiveBarProps {
    realtime: RealtimeData | null;
}
export declare function LiveBar({ realtime }: LiveBarProps): React.JSX.Element;
export {};
