'use client';

import React from 'react';
import { Icon } from '../primitives/Icon';
import { fmtNum, sum, deltaSpan } from '../utils';
import type { TrafficSource } from '../types';

interface SourcesCardProps {
  sources: TrafficSource[] | undefined;
}

export function SourcesCard({ sources }: SourcesCardProps) {
  if (!sources || sources.length === 0) {
    return <div className="card"><div className="an-sk" style={{ height: 240 }} /></div>;
  }

  const maxVis = Math.max(...sources.map(s => s.visitors));
  const totalVis = sum(sources.map(s => s.visitors));

  return (
    <div className="card">
      <div className="panel-head">
        <h3>Traffic sources</h3>
        <span className="badge neutral mono" style={{ marginLeft: 'auto' }}>{fmtNum(totalVis)} visitors</span>
      </div>
      <div className="src-list">
        {sources.map(s => {
          const dl = deltaSpan(s.delta, 'up');
          return (
            <div className="src-row" key={s.key}>
              <div className="src-name">
                <span className="swatch" style={{ background: `oklch(64% 0.17 ${s.hue})` }}></span>
                <span className="nm">{s.name}</span>
              </div>
              <div className="src-bar-wrap">
                <span className="src-bar">
                  <span style={{ width: (s.visitors / maxVis * 100) + '%', background: `linear-gradient(90deg, oklch(54% 0.15 ${s.hue}), oklch(66% 0.17 ${s.hue}))` }}></span>
                </span>
                <span className="src-vis">{fmtNum(s.visitors)}</span>
              </div>
              <div className="src-stats">
                <span className="src-conv" title="Conversion rate">{s.conv.toFixed(1)}%</span>
                <span className={'src-delta ' + dl.cls}><Icon name={dl.icon} />{dl.txt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
