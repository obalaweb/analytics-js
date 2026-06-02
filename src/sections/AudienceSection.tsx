'use client';

import React from 'react';
import { Donut } from '../charts/Donut';
import { fmtNum, deltaSpan } from '../utils';
import type { Devices, GeoRow } from '../types';

function GeoCard({ geo }: { geo: GeoRow[] }) {
  const max = Math.max(...geo.map(g => g.visitors));
  return (
    <div className="card">
      <div className="panel-head">
        <h3>Visitors by geography</h3>
        <span className="badge neutral mono" style={{ marginLeft: 'auto' }}>{geo.length} countries</span>
      </div>
      <div>
        {geo.map(g => {
          const dl = deltaSpan(g.delta, 'up');
          return (
            <div className="geo-row" key={g.code}>
              <span className="geo-flag">{g.code}</span>
              <div className="geo-mid">
                <div className="geo-cn">
                  {g.country}
                  {g.city !== '—' && <span className="city">{g.city}</span>}
                </div>
                <div className="geo-bar">
                  <span style={{ width: (g.visitors / max * 100) + '%' }}></span>
                </div>
              </div>
              <div className="geo-right">
                <div className="geo-vis">{fmtNum(g.visitors)}</div>
                <div className={'geo-dl ' + dl.cls}>{dl.txt}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DevicesCard({ devices }: { devices: Devices }) {
  const topSplit = devices.split[0];
  const segs = devices.split.map(d => ({ value: d.share, color: `oklch(64% 0.17 ${d.hue})` }));
  const cols = [
    { h: 'Browser', items: devices.browsers },
    { h: 'OS', items: devices.os },
    { h: 'Screen size', items: devices.screens },
  ];
  return (
    <div className="card">
      <div className="panel-head"><h3>Devices &amp; tech</h3></div>
      <div className="dev-top">
        <Donut
          segments={segs} size={128} thickness={15}
          centerLabel={topSplit ? topSplit.share + '%' : ''}
          centerSub={topSplit ? topSplit.name.toLowerCase() : ''}
        />
        <div className="dev-legend">
          {devices.split.map(d => (
            <div className="dev-leg" key={d.name}>
              <span className="sw" style={{ background: `oklch(64% 0.17 ${d.hue})` }}></span>
              <span className="nm">{d.name}</span>
              <span className="sh">{d.share}%</span>
              <span className="bn">{d.bounce}% bounce</span>
            </div>
          ))}
        </div>
      </div>
      <div className="dev-break">
        {cols.map(col => {
          const mx = Math.max(...col.items.map(x => x.share));
          return (
            <div className="dev-col" key={col.h}>
              <h5>{col.h}</h5>
              {col.items.map(it => (
                <div className="dev-item" key={it.name}>
                  <span className="dn">{it.name}</span>
                  <span className="dbar"><span style={{ width: (it.share / mx * 100) + '%' }}></span></span>
                  <span className="dp">{it.share}%</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface AudienceSectionProps {
  geo: GeoRow[] | undefined;
  devices: Devices | undefined;
}

export function AudienceSection({ geo, devices }: AudienceSectionProps) {
  if (!geo && !devices) {
    return (
      <div className="an-row an-2e">
        <div className="card"><div className="an-sk" style={{ height: 320 }} /></div>
        <div className="card"><div className="an-sk" style={{ height: 320 }} /></div>
      </div>
    );
  }
  return (
    <div className="an-row an-2e">
      {geo && geo.length > 0 ? <GeoCard geo={geo} /> : <div className="card an-empty"><p>No geography data yet</p></div>}
      {devices ? <DevicesCard devices={devices} /> : <div className="card an-empty"><p>No device data yet</p></div>}
    </div>
  );
}
