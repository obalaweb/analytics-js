'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../primitives/Icon';
import type { RealtimeData, RealtimePage, RealtimeEvent } from '../types';

const EVENT_ICON: Record<string, string> = {
  lead: 'leads', quote: 'file', phone: 'bell', email: 'inbox', whatsapp: 'external', view: 'media',
};

function ago(t: number): string {
  const s = Math.max(1, Math.round((Date.now() - t) / 1000));
  return s < 60 ? `${s}s ago` : `${Math.round(s / 60)}m ago`;
}

function ActivePagesCard({ pages }: { pages: RealtimePage[] }) {
  const maxCount = Math.max(...pages.map(p => p.count), 1);
  return (
    <div className="card">
      <div className="panel-head">
        <h3>Active pages</h3>
        <span className="badge ok live" style={{ marginLeft: 'auto' }}><span className="dot"></span>Live</span>
      </div>
      <div className="rt-pages">
        {pages.map(p => (
          <div className="rt-page" key={p.path}>
            <div className="pt">
              <div className="tt">{p.title}</div>
              <div className="pp">{p.path}</div>
            </div>
            <span className="pbar"><span style={{ width: (p.count / maxCount * 100) + '%' }}></span></span>
            <span className="pc">{p.count}</span>
          </div>
        ))}
        {pages.length === 0 && <div className="an-empty"><p>No active pages</p></div>}
      </div>
    </div>
  );
}

function EventFeedCard({ events }: { events: RealtimeEvent[] }) {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const id = setInterval(() => forceUpdate(n => n + 1), 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card">
      <div className="panel-head">
        <h3>Recent events</h3>
        <span className="badge ok live" style={{ marginLeft: 'auto' }}><span className="dot"></span>Streaming</span>
      </div>
      <div className="feed">
        {events.map(e => (
          <div className="feed-item" key={e.id}>
            <span className={'feed-ic ' + e.type}>
              <Icon name={EVENT_ICON[e.type] || 'activity'} />
            </span>
            <div className="feed-tx">
              <div className="ft">{e.label}</div>
              <div className="fm">{e.page} · {e.city}</div>
            </div>
            <span className="feed-when">{ago(e.t)}</span>
          </div>
        ))}
        {events.length === 0 && <div className="an-empty"><p>No events yet</p></div>}
      </div>
    </div>
  );
}

interface RealtimeCardsProps {
  realtime: RealtimeData | null;
}

export function RealtimeCards({ realtime }: RealtimeCardsProps) {
  if (!realtime) {
    return (
      <div className="an-row an-2">
        <div className="card"><div className="an-sk" style={{ height: 280 }} /></div>
        <div className="card"><div className="an-sk" style={{ height: 280 }} /></div>
      </div>
    );
  }
  return (
    <div className="an-row an-2">
      <ActivePagesCard pages={realtime.pages} />
      <EventFeedCard events={realtime.events} />
    </div>
  );
}
