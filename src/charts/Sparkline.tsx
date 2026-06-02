'use client';

import React from 'react';

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

interface SparklineProps {
  data: number[];
  hue?: number;
  up?: boolean;
  height?: number;
  fill?: boolean;
}

export function Sparkline({ data, hue = 262, up = true, height = 34, fill = true }: SparklineProps) {
  if (!data || data.length === 0) return null;
  const W = 120, H = 40, pad = { l: 2, r: 2, t: 4, b: 4 };
  const min = Math.min(...data);
  const max = Math.max(...data);
  const d = linePath(data, W, H, pad, min, max);
  const stroke = up ? `oklch(70% 0.16 ${hue})` : 'var(--danger)';
  const gid = `spk${hue}${up ? 'u' : 'd'}${Math.round(min)}${data.length}`;
  const area = `${d} L ${W - pad.r} ${H - pad.b} L ${pad.l} ${H - pad.b} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={height} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={d} fill="none" stroke={stroke} strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
