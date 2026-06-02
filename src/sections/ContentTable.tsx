'use client';

import React, { useMemo } from 'react';
import { DataTable, TableToolbar, useListState, Column } from '../primitives/DataTable';
import { fmtFull, fmtDur } from '../utils';
import type { ContentRow } from '../types';

type ContentRowWithId = ContentRow & { id: string };

function bounceColor(b: number): string {
  if (b < 30) return 'var(--ok)';
  if (b < 42) return 'var(--warn)';
  return 'var(--danger)';
}

interface ContentTableProps {
  content: ContentRow[] | undefined;
}

export function ContentTable({ content }: ContentTableProps) {
  const rows: ContentRowWithId[] = useMemo(
    () => (content ?? []).map((c, i) => ({ id: c.path + i, ...c })),
    [content],
  );

  const state = useListState(rows, ['title', 'path'] as (keyof ContentRowWithId)[]);

  const columns: Column<ContentRowWithId>[] = [
    {
      key: 'title', label: 'Page', sortable: true,
      render: r => (
        <div>
          <div className="cell-strong">{r.title}</div>
          <div className="ct-path">{r.path}</div>
        </div>
      ),
    },
    { key: 'views', label: 'Views', sortable: true, align: 'right', render: r => <span className="num">{fmtFull(r.views)}</span> },
    { key: 'uniques', label: 'Unique', sortable: true, align: 'right', render: r => <span className="num">{fmtFull(r.uniques)}</span> },
    { key: 'avgTime', label: 'Avg. time', sortable: true, align: 'right', render: r => <span className="num">{fmtDur(r.avgTime)}</span> },
    {
      key: 'bounce', label: 'Bounce', sortable: true, align: 'right',
      render: r => (
        <span className="bounce-cell" style={{ justifyContent: 'flex-end' }}>
          <span className="bounce-pip">
            <span style={{ width: Math.min(r.bounce, 100) + '%', background: bounceColor(r.bounce) }}></span>
          </span>
          <span className="num">{r.bounce.toFixed(1)}%</span>
        </span>
      ),
    },
    {
      key: 'conv', label: 'Conv. rate', sortable: true, align: 'right',
      render: r => (
        <span className="num" style={{ color: r.conv >= 8 ? 'var(--ok)' : 'var(--ink)', fontWeight: 600 }}>
          {r.conv.toFixed(1)}%
        </span>
      ),
    },
  ];

  return (
    <div className="card">
      <div className="panel-head">
        <h3>Top performing content</h3>
        <span className="badge neutral mono" style={{ marginLeft: 'auto' }}>by conversion impact</span>
      </div>
      <TableToolbar state={state} placeholder="Filter pages…" countLabel="pages" />
      <DataTable
        columns={columns}
        state={state}
        rowKey={r => r.id}
        empty={{ title: 'No page data yet' }}
        emptySearch={{ title: 'No pages match' }}
      />
    </div>
  );
}
