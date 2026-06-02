import React from 'react';
import type { Devices, GeoRow } from '../types';
interface AudienceSectionProps {
    geo: GeoRow[] | undefined;
    devices: Devices | undefined;
}
export declare function AudienceSection({ geo, devices }: AudienceSectionProps): React.JSX.Element;
export {};
