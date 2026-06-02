'use client';

import React from 'react';
import { Sparkline } from '../charts/Sparkline';
import type { RealtimeData } from '../types';

interface LiveBarProps {
  realtime: RealtimeData | null;
}

export function LiveBar({ realtime }: LiveBarProps) {
  if (!realtime) {
    return (
      <div className="live-bar">
        <div className="live-now">
          <span className="pulse"></span>
          <div>
            <div className="big an-sk" style={{ width: 60, height: 28, borderRadius: 4 }} />
            <div className="lbl" style={{ marginTop: 6 }}>active visitors right now</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-bar">
      <div className="live-now">
        <span className="pulse"></span>
        <div>
          <div className="big">{realtime.active}</div>
          <div className="lbl">active visitors right now</div>
        </div>
      </div>
      {realtime.spark.length > 0 && (
        <div className="lv-spark">
          <Sparkline data={realtime.spark} hue={150} up={true} height={36} fill={true} />
        </div>
      )}
      <div className="live-locs">
        {realtime.locations.map(l => (
          <span className="live-loc" key={l.city}>
            <span className="fl">{l.country}</span>
            {l.city}
            <span className="ct">{l.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
