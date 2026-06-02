"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ANALYTICS_RANGES = void 0;
exports.fmtNum = fmtNum;
exports.fmtFull = fmtFull;
exports.fmtDur = fmtDur;
exports.fmtVal = fmtVal;
exports.deltaPct = deltaPct;
exports.sum = sum;
exports.deltaSpan = deltaSpan;
function fmtNum(n) {
    if (n >= 1e6)
        return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace(/\.0$/, '') + 'M';
    if (n >= 1e4)
        return (n / 1e3).toFixed(0) + 'k';
    if (n >= 1000)
        return n.toLocaleString('en-US');
    return String(Math.round(n));
}
function fmtFull(n) {
    return Math.round(n).toLocaleString('en-US');
}
function fmtDur(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}m ${String(s).padStart(2, '0')}s`;
}
function fmtVal(v, kind) {
    if (kind === 'pct')
        return v.toFixed(1) + '%';
    if (kind === 'dur')
        return fmtDur(v);
    return fmtFull(v);
}
function deltaPct(cur, prev) {
    return prev ? ((cur - prev) / prev) * 100 : 0;
}
function sum(a) {
    return a.reduce((x, y) => x + y, 0);
}
function deltaSpan(pct, goodDir = 'up') {
    const positive = pct >= 0;
    const good = goodDir === 'up' ? positive : !positive;
    return {
        cls: pct === 0 ? 'flat' : (good ? 'up' : 'down'),
        icon: positive ? 'trendUp' : 'trendDown',
        txt: (positive ? '+' : '') + pct.toFixed(1) + '%',
    };
}
exports.ANALYTICS_RANGES = [
    {
        key: '24h', label: '24 hours', short: '24H', points: 24,
        compareLabel: 'yesterday', axisEvery: 4,
        fmt: (i) => `${i}:00`,
    },
    {
        key: '7d', label: '7 days', short: '7D', points: 7,
        compareLabel: 'previous 7 days', axisEvery: 1,
        fmt: (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][(i + 1) % 7],
    },
    {
        key: '30d', label: '30 days', short: '30D', points: 30,
        compareLabel: 'previous 30 days', axisEvery: 5,
        fmt: (i) => `Day ${i + 1}`,
    },
    {
        key: '90d', label: '90 days', short: '90D', points: 90,
        compareLabel: 'previous 90 days', axisEvery: 15,
        fmt: (i) => `W${Math.floor(i / 7) + 1}`,
    },
    {
        key: '1y', label: '12 months', short: '1Y', points: 12,
        compareLabel: 'previous year', axisEvery: 2,
        fmt: (i) => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    },
];
