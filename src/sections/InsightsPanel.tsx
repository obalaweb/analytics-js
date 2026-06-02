'use client';

import React from 'react';
import { Icon } from '../primitives/Icon';
import type { Insight } from '../types';

function InsightCard({ d }: { d: Insight }) {
  return (
    <div className={'card insight ' + d.tone}>
      <div className="top">
        <span className="ic"><Icon name={d.icon} /></span>
        <span className="tag">{d.tag}</span>
        <span className="metric">{d.metric}</span>
      </div>
      <h4>{d.title}</h4>
      <p>{d.body}</p>
    </div>
  );
}

interface InsightsPanelProps {
  insights: Insight[] | undefined;
  updatedLabel?: string;
}

export function InsightsPanel({ insights, updatedLabel = 'auto-generated' }: InsightsPanelProps) {
  if (!insights || insights.length === 0) return null;
  return (
    <>
      <div className="insights-head">
        <span className="ai-pill">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }}></span>
          Insights
        </span>
        <h2>What needs your attention</h2>
        <span className="upd">{updatedLabel}</span>
      </div>
      <div className="insight-grid">
        {insights.map((d, i) => <InsightCard key={i} d={d} />)}
      </div>
    </>
  );
}
