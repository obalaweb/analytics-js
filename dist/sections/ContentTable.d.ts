import React from 'react';
import type { ContentRow } from '../types';
interface ContentTableProps {
    content: ContentRow[] | undefined;
}
export declare function ContentTable({ content }: ContentTableProps): React.JSX.Element;
export {};
