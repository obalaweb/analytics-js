'use client';

import React from 'react';
import { Icon } from './primitives/Icon';
import { LiveBar } from './sections/LiveBar';
import { KpiGrid } from './sections/KpiGrid';
import { InsightsPanel } from './sections/InsightsPanel';
import { TrendsCard } from './sections/TrendsCard';
import { LeadGenSection } from './sections/LeadGenSection';
import { SourcesCard } from './sections/SourcesCard';
import { ContentTable } from './sections/ContentTable';
import { AudienceSection } from './sections/AudienceSection';
import { RealtimeCards } from './sections/RealtimeCards';
import type { AnalyticsDashboardProps } from './types';

function SectionHead({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="an-sec-head">
      <h2>{title}</h2>
      <span className="desc">{desc}</span>
    </div>
  );
}

export function AnalyticsDashboard({
  data,
  realtime,
  loading = false,
  error = null,
  onExport,
  siteUrl,
}: AnalyticsDashboardProps) {
  if (error) {
    return (
      <div className="page-head">
        <div className="titles">
          <h1>Analytics</h1>
          <div className="sub" style={{ color: 'var(--danger-ink)' }}>Failed to load: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics">
      <div className="page-head">
        <div className="titles">
          <div className="eyebrow" style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', marginBottom: 4, fontFamily: 'var(--mono)' }}>
            codprez.com · web analytics
          </div>
          <h1>Analytics</h1>
          <div className="sub">How the site is performing, where visitors come from, and what turns them into leads.</div>
        </div>
        <div className="actions">
          {onExport && (
            <button className="btn btn-ghost" onClick={onExport}>
              <Icon name="download" />Export
            </button>
          )}
          {siteUrl && (
            <button className="btn btn-ghost" onClick={() => window.open(siteUrl, '_blank')}>
              <Icon name="external" />View site
            </button>
          )}
        </div>
      </div>

      <LiveBar realtime={realtime} />

      {loading && !data ? (
        <>
          <div className="kpi-grid-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card kpi-a"><div className="an-sk" style={{ height: 140 }} /></div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="card"><div className="an-sk" style={{ height: 320 }} /></div>
          </div>
        </>
      ) : (
        <>
          <KpiGrid kpis={data?.kpis} />

          <InsightsPanel insights={data?.insights} />

          <div className="an-row" style={{ gridTemplateColumns: '1fr' }}>
            <TrendsCard trends={data?.trends} />
          </div>

          <SectionHead title="Lead generation" desc="The business outcome — what converts visitors into pipeline." />
          <LeadGenSection leadgen={data?.leadgen} />

          <SectionHead title="Acquisition" desc="Where your visitors come from and which channels convert." />
          <div className="an-row" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
            <SourcesCard sources={data?.sources} />
          </div>

          <SectionHead title="Top performing content" desc="Which pages drive interest — sortable by any column." />
          <div className="an-row" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
            <ContentTable content={data?.content} />
          </div>

          <SectionHead title="Audience" desc="Who is visiting, from where, and on what." />
          <AudienceSection geo={data?.geo} devices={data?.devices} />

          <SectionHead title="Realtime" desc="Live activity on the site, refreshing automatically." />
          <RealtimeCards realtime={realtime} />
        </>
      )}
    </div>
  );
}
