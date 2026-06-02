'use client';

import React, { useState } from 'react';
import { AreaChart } from '../charts/AreaChart';
import { Icon } from '../primitives/Icon';
import { Switch } from '../primitives/Switch';
import { fmtFull, deltaPct, deltaSpan, sum, ANALYTICS_RANGES } from '../utils';
import type { AnalyticsTrends } from '../types';

const METRICS = [
  { key: 'visitors' as const, label: 'Visitors', hue: 262, fmt: (v: number) => fmtFull(v) },
  { key: 'pageviews' as const, label: 'Page views', hue: 200, fmt: (v: number) => fmtFull(v) },
  { key: 'conversions' as const, label: 'Conversions', hue: 150, fmt: (v: number) => fmtFull(v) },
];

type MetricKey = 'visitors' | 'pageviews' | 'conversions';

interface TrendsCardProps {
  trends: AnalyticsTrends | undefined;
}

export function TrendsCard({ trends }: TrendsCardProps) {
  const [range, setRange] = useState<typeof ANALYTICS_RANGES[number]>(ANALYTICS_RANGES[2]);
  const [metricKey, setMetricKey] = useState<MetricKey>('visitors');
  const [compare, setCompare] = useState(true);
  const metric = METRICS.find(m => m.key === metricKey)!;
  const rangeData = trends?.[range.key];
  const ser = rangeData?.[metricKey];
  const total = ser ? sum(ser.cur) : 0;
  const prevTotal = ser ? sum(ser.cmp) : 0;
  const pct = deltaPct(total, prevTotal);
  const d = deltaSpan(pct, 'up');

  return (
    <div className="card">
      <div className="chart-head">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h3>Traffic trends</h3>
            <span className={'chg ' + d.cls} style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              <Icon name={d.icon} size={12} />{d.txt}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
              {fmtFull(total)}
            </span>
            <span className="faint" style={{ fontSize: '0.82rem', color: 'var(--ink-3)' }}>
              {metric.label.toLowerCase()} · last {range.label}
            </span>
          </div>
        </div>
        <div className="chart-tabs" style={{ marginLeft: 'auto' }}>
          {METRICS.map(m => (
            <button key={m.key} className={metricKey === m.key ? 'on' : ''} onClick={() => setMetricKey(m.key)}>
              {m.label}
            </button>
          ))}
        </div>
        <div className="seg-ctrl" role="tablist" aria-label="Time range">
          {ANALYTICS_RANGES.map(r => (
            <button key={r.key} className={range.key === r.key ? 'on' : ''} aria-selected={range.key === r.key} onClick={() => setRange(r)}>
              {r.short}
            </button>
          ))}
        </div>
      </div>
      <div className="chart-head" style={{ paddingTop: 0, paddingBottom: 8 }}>
        <label className="cmp-toggle">
          <Switch on={compare} onChange={setCompare} />
          Compare to {range.compareLabel}
        </label>
        <div className="legend">
          <span className="lg-item">
            <span className="lg-swatch" style={{ background: `oklch(68% 0.17 ${metric.hue})` }}></span>
            Current
          </span>
          {compare && (
            <span className="lg-item">
              <span className="lg-swatch ghost"></span>
              {range.compareLabel}
            </span>
          )}
        </div>
      </div>
      <div className="chart-body">
        {ser ? (
          <AreaChart
            cur={ser.cur}
            cmp={ser.cmp}
            range={range}
            hue={metric.hue}
            height={272}
            valueFmt={metric.fmt}
            compareLabel={range.compareLabel}
            showCompare={compare}
          />
        ) : (
          <div className="an-empty"><p>No trend data for this range yet</p></div>
        )}
      </div>
    </div>
  );
}
