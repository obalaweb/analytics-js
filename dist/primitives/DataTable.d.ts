import React from 'react';
export interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'right' | 'center';
    width?: string | number;
    render?: (row: T) => React.ReactNode;
}
export interface ListState<T> {
    rows: T[];
    setRows: (rows: T[]) => void;
    query: string;
    setQuery: (q: string) => void;
    sort: {
        key: keyof T | null;
        dir: 'asc' | 'desc';
    };
    toggleSort: (key: keyof T) => void;
    view: T[];
    filtered: boolean;
}
export declare function useListState<T extends object>(initialItems: T[], searchKeys: (keyof T)[]): ListState<T>;
interface DataTableProps<T extends object> {
    columns: Column<T>[];
    state: ListState<T>;
    empty?: {
        title?: string;
        body?: string;
    };
    emptySearch?: {
        title?: string;
        body?: string;
    };
    rowKey: (row: T) => string;
}
export declare function DataTable<T extends object>({ columns, state, empty, emptySearch, rowKey }: DataTableProps<T>): React.JSX.Element;
interface TableToolbarProps<T extends object> {
    state: ListState<T>;
    placeholder?: string;
    countLabel?: string;
}
export declare function TableToolbar<T extends object>({ state, placeholder, countLabel }: TableToolbarProps<T>): React.JSX.Element;
export {};
