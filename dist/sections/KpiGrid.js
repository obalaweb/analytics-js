"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiGrid = KpiGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const Sparkline_1 = require("../charts/Sparkline");
const Icon_1 = require("../primitives/Icon");
const utils_1 = require("../utils");
function KpiCard({ k }) {
    const pct = (0, utils_1.deltaPct)(k.value, k.prev);
    const d = (0, utils_1.deltaSpan)(pct, k.good);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card kpi-a", children: [(0, jsx_runtime_1.jsxs)("div", { className: "head", children: [(0, jsx_runtime_1.jsx)("span", { className: "ic", style: { background: `linear-gradient(140deg, oklch(62% 0.17 ${k.hue}), oklch(50% 0.16 ${k.hue + 24}))` }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: k.icon }) }), (0, jsx_runtime_1.jsx)("span", { className: "label", children: k.label })] }), (0, jsx_runtime_1.jsx)("div", { className: "val", children: (0, utils_1.fmtVal)(k.value, k.fmt) }), (0, jsx_runtime_1.jsxs)("div", { className: "meta", children: [(0, jsx_runtime_1.jsxs)("span", { className: 'chg ' + d.cls, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: d.icon }), d.txt] }), (0, jsx_runtime_1.jsx)("span", { className: "vs", children: "vs prev" })] }), (0, jsx_runtime_1.jsx)("div", { className: "spark-slot", children: (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: k.spark, hue: k.hue, up: d.cls === 'up', height: 38 }) })] }));
}
function KpiGrid({ kpis }) {
    if (!kpis || kpis.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "kpi-grid-8", children: Array.from({ length: 8 }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "card kpi-a", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 140 } }) }, i))) }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "kpi-grid-8", children: kpis.map(k => (0, jsx_runtime_1.jsx)(KpiCard, { k: k }, k.key)) }));
}
