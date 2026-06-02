'use client';

import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';

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
  sort: { key: keyof T | null; dir: 'asc' | 'desc' };
  toggleSort: (key: keyof T) => void;
  view: T[];
  filtered: boolean;
}

export function useListState<T extends object>(
  initialItems: T[],
  searchKeys: (keyof T)[],
): ListState<T> {
  const [rows, setRows] = useState<T[]>(initialItems);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<{ key: keyof T | null; dir: 'asc' | 'desc' }>({ key: null, dir: 'asc' });

  useEffect(() => { setRows(initialItems); }, [initialItems]);

  const toggleSort = (key: keyof T) =>
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });

  let view = rows;
  if (query.trim()) {
    const q = query.toLowerCase();
    view = view.filter(r => searchKeys.some(k => String((r as Record<string | symbol, unknown>)[k as string | symbol] ?? '').toLowerCase().includes(q)));
  }
  if (sort.key) {
    const sk = sort.key;
    view = [...view].sort((a, b) => {
      const av = (a as Record<string | symbol, unknown>)[sk as string | symbol];
      const bv = (b as Record<string | symbol, unknown>)[sk as string | symbol];
      if (typeof av === 'number' && typeof bv === 'number')
        return sort.dir === 'asc' ? av - bv : bv - av;
      const as = String(av ?? '').toLowerCase(), bs = String(bv ?? '').toLowerCase();
      return sort.dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }

  return { rows, setRows, query, setQuery, sort, toggleSort, view, filtered: !!query.trim() };
}

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  state: ListState<T>;
  empty?: { title?: string; body?: string };
  emptySearch?: { title?: string; body?: string };
  rowKey: (row: T) => string;
}

function SkeletonRows({ cols }: { cols: number }) {
  return (
    <tbody>
      {Array.from({ length: 6 }).map((_, r) => (
        <tr key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <td key={c}><div className="an-sk" style={{ height: 14, width: c === 0 ? '70%' : (c === cols - 1 ? 40 : '50%') }} /></td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function DataTable<T extends object>({ columns, state, empty, emptySearch, rowKey }: DataTableProps<T>) {
  const { view, sort, toggleSort, filtered, rows } = state;
  const loading = rows.length === 0 && !filtered;

  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>
            {columns.map(c => {
              const sorted = sort.key === c.key;
              return (
                <th
                  key={String(c.key)}
                  className={(c.sortable ? 'sortable ' : '') + (sorted ? 'sorted ' : '') + (sorted && sort.dir === 'desc' ? 'desc' : '')}
                  style={{ width: c.width, textAlign: c.align }}
                  onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                >
                  <span className="th-in" style={c.align === 'right' ? { flexDirection: 'row-reverse' } : undefined}>
                    {c.label}
                    {c.sortable && <Icon name="chevronUp" className="caret" size={13} />}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        {loading ? (
          <SkeletonRows cols={columns.length} />
        ) : view.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={columns.length}>
                <div className="an-empty">
                  <p>{filtered ? (emptySearch?.title ?? 'No matches') : (empty?.title ?? 'No data yet')}</p>
                  {!filtered && empty?.body && <p style={{ fontSize: '0.78rem' }}>{empty.body}</p>}
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {view.map(row => (
              <tr key={rowKey(row)}>
                {columns.map(c => (
                  <td key={String(c.key)} style={{ textAlign: c.align }}>
                    {c.render ? c.render(row) : <span className="cell-strong">{String((row as Record<string | symbol, unknown>)[c.key as string | symbol] ?? '')}</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

interface TableToolbarProps<T extends object> {
  state: ListState<T>;
  placeholder?: string;
  countLabel?: string;
}

export function TableToolbar<T extends object>({ state, placeholder, countLabel }: TableToolbarProps<T>) {
  const { query, setQuery, view } = state;
  return (
    <div className="toolbar">
      <div className="input-icon search">
        <Icon name="search" />
        <input
          className="input"
          placeholder={placeholder ?? 'Search…'}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-x" onClick={() => setQuery('')} aria-label="Clear">
            <Icon name="x" size={15} />
          </button>
        )}
      </div>
      <span className="count">{view.length} {countLabel ?? 'records'}</span>
    </div>
  );
}
