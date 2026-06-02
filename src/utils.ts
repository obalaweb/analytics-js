export function fmtNum(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
  if (n >= 1e4) return (n / 1e3).toFixed(0) + 'k';
  if (n >= 1000) return n.toLocaleString('en-US');
  return String(Math.round(n));
}

export function fmtFull(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

export function fmtDur(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

export function fmtVal(v: number, kind: 'int' | 'pct' | 'dur'): string {
  if (kind === 'pct') return v.toFixed(1) + '%';
  if (kind === 'dur') return fmtDur(v);
  return fmtFull(v);
}

export function deltaPct(cur: number, prev: number): number {
  return prev ? ((cur - prev) / prev) * 100 : 0;
}

export function sum(a: number[]): number {
  return a.reduce((x, y) => x + y, 0);
}

export interface DeltaSpan {
  cls: 'up' | 'down' | 'flat';
  icon: 'trendUp' | 'trendDown';
  txt: string;
}

export function deltaSpan(pct: number, goodDir: 'up' | 'down' = 'up'): DeltaSpan {
  const positive = pct >= 0;
  const good = goodDir === 'up' ? positive : !positive;
  return {
    cls: pct === 0 ? 'flat' : (good ? 'up' : 'down'),
    icon: positive ? 'trendUp' : 'trendDown',
    txt: (positive ? '+' : '') + pct.toFixed(1) + '%',
  };
}

export const ANALYTICS_RANGES = [
  {
    key: '24h' as const, label: '24 hours', short: '24H', points: 24,
    compareLabel: 'yesterday', axisEvery: 4,
    fmt: (i: number) => `${i}:00`,
  },
  {
    key: '7d' as const, label: '7 days', short: '7D', points: 7,
    compareLabel: 'previous 7 days', axisEvery: 1,
    fmt: (i: number) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(i + 1) % 7],
  },
  {
    key: '30d' as const, label: '30 days', short: '30D', points: 30,
    compareLabel: 'previous 30 days', axisEvery: 5,
    fmt: (i: number) => `Day ${i + 1}`,
  },
  {
    key: '90d' as const, label: '90 days', short: '90D', points: 90,
    compareLabel: 'previous 90 days', axisEvery: 15,
    fmt: (i: number) => `W${Math.floor(i / 7) + 1}`,
  },
  {
    key: '1y' as const, label: '12 months', short: '1Y', points: 12,
    compareLabel: 'previous year', axisEvery: 2,
    fmt: (i: number) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  },
] as const;

export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];
