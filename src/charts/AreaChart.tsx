'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { fmtNum } from '../utils';
import type { AnalyticsRange } from '../utils';

function useWidth(): [React.RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver((ents) => {
      for (const e of ents) setW(e.contentRect.width);
    });
    ro.observe(ref.current);
    setW(ref.current.clientWidth);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function linePath(vals: number[], w: number, h: number, pad: { l: number; r: number; t: number; b: number }, min: number, max: number): string {
  const span = max - min || 1;
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  return vals.map((v, i) => {
    const x = pad.l + (vals.length === 1 ? innerW / 2 : (i / (vals.length - 1)) * innerW);
    const y = pad.t + innerH - ((v - min) / span) * innerH;
    return (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }).join(' ');
}

function pointAt(vals: number[], i: number, w: number, h: number, pad: { l: number; r: number; t: number; b: number }, min: number, max: number): [number, number] {
  const span = max - min || 1;
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const x = pad.l + (vals.length === 1 ? innerW / 2 : (i / (vals.length - 1)) * innerW);
  const y = pad.t + innerH - ((vals[i] - min) / span) * innerH;
  return [x, y];
}

interface AreaChartProps {
  cur: number[];
  cmp?: number[];
  range: AnalyticsRange;
  hue?: number;
  height?: number;
  valueFmt?: (v: number) => string;
  compareLabel?: string;
  showCompare?: boolean;
}

export function AreaChart({
  cur, cmp, range, hue = 262, height = 280,
  valueFmt = (v) => String(v),
  compareLabel = 'previous period',
  showCompare = true,
}: AreaChartProps) {
  const [wrapRef, w] = useWidth();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { l: 46, r: 16, t: 16, b: 28 };
  const H = height;
  const all = showCompare && cmp ? cur.concat(cmp) : cur.slice();
  const rawMax = Math.max(...all);
  const max = rawMax * 1.12;
  const min = 0;
  const color = `oklch(68% 0.17 ${hue})`;
  const gid = `area${hue}`;
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => min + ((max - min) * i) / ticks);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!w) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const innerW = w - pad.l - pad.r;
    let i = Math.round(((x - pad.l) / innerW) * (cur.length - 1));
    i = Math.max(0, Math.min(cur.length - 1, i));
    setHover(i);
  };

  const dCur = w ? linePath(cur, w, H, pad, min, max) : '';
  const dCmp = w && showCompare && cmp ? linePath(cmp, w, H, pad, min, max) : '';
  const areaCur = w ? `${dCur} L ${w - pad.r} ${H - pad.b} L ${pad.l} ${H - pad.b} Z` : '';
  const hp = hover != null && w ? pointAt(cur, hover, w, H, pad, min, max) : null;
  const hpc = hover != null && w && showCompare && cmp ? pointAt(cmp, hover, w, H, pad, min, max) : null;

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <svg width="100%" height={H} style={{ display: 'block' }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="92%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {w > 0 && yTicks.map((t, i) => {
          const y = pad.t + (H - pad.t - pad.b) * (1 - i / ticks);
          return (
            <g key={i}>
              <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="var(--grid-line)" strokeWidth="1" />
              <text x={pad.l - 10} y={y + 3.5} textAnchor="end" fontSize="10.5" fontFamily="var(--mono)" fill="var(--ink-faint)">
                {fmtNum(Math.round(t))}
              </text>
            </g>
          );
        })}

        {w > 0 && cur.map((_, i) => {
          if (i % range.axisEvery !== 0 && i !== cur.length - 1) return null;
          const [x] = pointAt(cur, i, w, H, pad, min, max);
          return (
            <text key={i} x={x} y={H - 9} textAnchor="middle" fontSize="10.5" fontFamily="var(--mono)" fill="var(--ink-faint)">
              {range.fmt(i)}
            </text>
          );
        })}

        {dCmp && <path d={dCmp} fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.7" />}
        {w > 0 && <path d={areaCur} fill={`url(#${gid})`} />}
        {w > 0 && <path d={dCur} fill="none" stroke={color} strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />}

        {hp && (
          <g>
            <line x1={hp[0]} x2={hp[0]} y1={pad.t} y2={H - pad.b} stroke="var(--border-strong)" strokeWidth="1" />
            {hpc && <circle cx={hpc[0]} cy={hpc[1]} r="3.5" fill="var(--bg)" stroke="var(--ink-faint)" strokeWidth="1.5" />}
            <circle cx={hp[0]} cy={hp[1]} r="5" fill={color} stroke="var(--bg)" strokeWidth="2.5" />
          </g>
        )}
      </svg>

      {hp && hover != null && (
        <div className="chart-tip" style={{
          left: Math.min(Math.max(hp[0], 70), (w || 0) - 70),
          top: Math.max(hp[1] - 14, 6),
        }}>
          <div className="tip-when">{range.fmt(hover)}</div>
          <div className="tip-row">
            <span className="tip-dot" style={{ background: color }}></span>
            {valueFmt(cur[hover])}
          </div>
          {showCompare && cmp && (
            <div className="tip-row cmp">
              <span className="tip-dot ghost"></span>
              {valueFmt(cmp[hover])}
              <span className="tip-cmp-lbl">{compareLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
