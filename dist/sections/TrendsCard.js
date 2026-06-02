"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendsCard = TrendsCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AreaChart_1 = require("../charts/AreaChart");
const Icon_1 = require("../primitives/Icon");
const Switch_1 = require("../primitives/Switch");
const utils_1 = require("../utils");
const METRICS = [
    { key: 'visitors', label: 'Visitors', hue: 262, fmt: (v) => (0, utils_1.fmtFull)(v) },
    { key: 'pageviews', label: 'Page views', hue: 200, fmt: (v) => (0, utils_1.fmtFull)(v) },
    { key: 'conversions', label: 'Conversions', hue: 150, fmt: (v) => (0, utils_1.fmtFull)(v) },
];
function TrendsCard({ trends }) {
    const [range, setRange] = (0, react_1.useState)(utils_1.ANALYTICS_RANGES[2]);
    const [metricKey, setMetricKey] = (0, react_1.useState)('visitors');
    const [compare, setCompare] = (0, react_1.useState)(true);
    const metric = METRICS.find(m => m.key === metricKey);
    const rangeData = trends === null || trends === void 0 ? void 0 : trends[range.key];
    const ser = rangeData === null || rangeData === void 0 ? void 0 : rangeData[metricKey];
    const total = ser ? (0, utils_1.sum)(ser.cur) : 0;
    const prevTotal = ser ? (0, utils_1.sum)(ser.cmp) : 0;
    const pct = (0, utils_1.deltaPct)(total, prevTotal);
    const d = (0, utils_1.deltaSpan)(pct, 'up');
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chart-head", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "Traffic trends" }), (0, jsx_runtime_1.jsxs)("span", { className: 'chg ' + d.cls, style: { fontFamily: 'var(--mono)', fontSize: '0.78rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: d.icon, size: 12 }), d.txt] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }, children: (0, utils_1.fmtFull)(total) }), (0, jsx_runtime_1.jsxs)("span", { className: "faint", style: { fontSize: '0.82rem', color: 'var(--ink-3)' }, children: [metric.label.toLowerCase(), " \u00B7 last ", range.label] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "chart-tabs", style: { marginLeft: 'auto' }, children: METRICS.map(m => ((0, jsx_runtime_1.jsx)("button", { className: metricKey === m.key ? 'on' : '', onClick: () => setMetricKey(m.key), children: m.label }, m.key))) }), (0, jsx_runtime_1.jsx)("div", { className: "seg-ctrl", role: "tablist", "aria-label": "Time range", children: utils_1.ANALYTICS_RANGES.map(r => ((0, jsx_runtime_1.jsx)("button", { className: range.key === r.key ? 'on' : '', "aria-selected": range.key === r.key, onClick: () => setRange(r), children: r.short }, r.key))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chart-head", style: { paddingTop: 0, paddingBottom: 8 }, children: [(0, jsx_runtime_1.jsxs)("label", { className: "cmp-toggle", children: [(0, jsx_runtime_1.jsx)(Switch_1.Switch, { on: compare, onChange: setCompare }), "Compare to ", range.compareLabel] }), (0, jsx_runtime_1.jsxs)("div", { className: "legend", children: [(0, jsx_runtime_1.jsxs)("span", { className: "lg-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "lg-swatch", style: { background: `oklch(68% 0.17 ${metric.hue})` } }), "Current"] }), compare && ((0, jsx_runtime_1.jsxs)("span", { className: "lg-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "lg-swatch ghost" }), range.compareLabel] }))] })] }), (0, jsx_runtime_1.jsx)("div", { className: "chart-body", children: ser ? ((0, jsx_runtime_1.jsx)(AreaChart_1.AreaChart, { cur: ser.cur, cmp: ser.cmp, range: range, hue: metric.hue, height: 272, valueFmt: metric.fmt, compareLabel: range.compareLabel, showCompare: compare })) : ((0, jsx_runtime_1.jsx)("div", { className: "an-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No trend data for this range yet" }) })) })] }));
}
