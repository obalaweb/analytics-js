'use client';

import React from 'react';
import { Icon } from '../primitives/Icon';
import { fmtFull, deltaPct, deltaSpan } from '../utils';
import type { LeadGen } from '../types';

function FunnelCard({ leadgen }: { leadgen: LeadGen }) {
  const f = leadgen.funnel;
  const top = f[0]?.count || 1;
  return (
    <div className="card">
      <div className="panel-head">
        <h3>Conversion funnel</h3>
        <span className="badge accent" style={{ marginLeft: 'auto' }}>
          <span className="dot"></span>{leadgen.rate}% overall
        </span>
      </div>
      <div className="funnel">
        {f.map((s, i) => {
          const pctOfTop = (s.count / top) * 100;
          const stepDrop = i > 0 ? (1 - s.count / f[i - 1].count) * 100 : 0;
          return (
            <div className="fn-row" key={s.stage}>
              <div className="fn-meta">
                <span className="fn-stage">{s.stage}</span>
                {i > 0 && <span className="fn-drop">−{stepDrop.toFixed(0)}%</span>}
                <span className="fn-count">{fmtFull(s.count)}</span>
                <span className="fn-pct">{pctOfTop.toFixed(1)}%</span>
              </div>
              <div className="fn-track">
                <div className="fn-fill" style={{ width: Math.max(pctOfTop, 6) + '%', background: `linear-gradient(90deg, oklch(50% 0.15 ${s.hue}), oklch(64% 0.17 ${s.hue}))` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChannelsCard({ leadgen }: { leadgen: LeadGen }) {
  const rateDelta = deltaPct(leadgen.rate, leadgen.prevRate);
  return (
    <div className="card">
      <div className="panel-head">
        <h3>Conversion channels</h3>
      </div>
      <div className="card-pad" style={{ padding: '16px 20px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
            {fmtFull(leadgen.total)}
          </span>
          <span className="chg up" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600 }}>
            <Icon name="trendUp" size={13} />+{rateDelta.toFixed(1)}%
          </span>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginTop: 4 }}>total conversions this month</div>
      </div>
      <div className="lc-grid">
        {leadgen.channels.map(ch => {
          const dl = deltaSpan(ch.delta, 'up');
          return (
            <div className="lc-row" key={ch.name}>
              <span className="ic" style={{ background: `linear-gradient(140deg, oklch(62% 0.16 ${ch.hue}), oklch(50% 0.15 ${ch.hue + 22}))` }}>
                <Icon name={ch.icon} />
              </span>
              <span className="lc-nm">{ch.name}</span>
              <span className="lc-ct">{fmtFull(ch.count)}</span>
              <span className={'lc-dl ' + dl.cls}><Icon name={dl.icon} />{dl.txt}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface LeadGenSectionProps {
  leadgen: LeadGen | undefined;
}

export function LeadGenSection({ leadgen }: LeadGenSectionProps) {
  if (!leadgen) {
    return (
      <div className="an-row an-2e">
        <div className="card"><div className="an-sk" style={{ height: 280 }} /></div>
        <div className="card"><div className="an-sk" style={{ height: 280 }} /></div>
      </div>
    );
  }
  return (
    <div className="an-row an-2e">
      <FunnelCard leadgen={leadgen} />
      <ChannelsCard leadgen={leadgen} />
    </div>
  );
}
