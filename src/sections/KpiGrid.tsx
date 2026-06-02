'use client';

import React from 'react';
import { Sparkline } from '../charts/Sparkline';
import { Icon } from '../primitives/Icon';
import { fmtVal, deltaPct, deltaSpan } from '../utils';
import type { AnalyticsKpi } from '../types';

interface KpiCardProps {
  k: AnalyticsKpi;
}

function KpiCard({ k }: KpiCardProps) {
  const pct = deltaPct(k.value, k.prev);
  const d = deltaSpan(pct, k.good);
  return (
    <div className="card kpi-a">
      <div className="head">
        <span className="ic" style={{ background: `linear-gradient(140deg, oklch(62% 0.17 ${k.hue}), oklch(50% 0.16 ${k.hue + 24}))` }}>
          <Icon name={k.icon} />
        </span>
        <span className="label">{k.label}</span>
      </div>
      <div className="val">{fmtVal(k.value, k.fmt)}</div>
      <div className="meta">
        <span className={'chg ' + d.cls}>
          <Icon name={d.icon} />
          {d.txt}
        </span>
        <span className="vs">vs prev</span>
      </div>
      <div className="spark-slot">
        <Sparkline data={k.spark} hue={k.hue} up={d.cls === 'up'} height={38} />
      </div>
    </div>
  );
}

interface KpiGridProps {
  kpis: AnalyticsKpi[] | undefined;
}

export function KpiGrid({ kpis }: KpiGridProps) {
  if (!kpis || kpis.length === 0) {
    return (
      <div className="kpi-grid-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card kpi-a">
            <div className="an-sk" style={{ height: 140 }} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="kpi-grid-8">
      {kpis.map(k => <KpiCard key={k.key} k={k} />)}
    </div>
  );
}
