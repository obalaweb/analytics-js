"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadGenSection = LeadGenSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icon_1 = require("../primitives/Icon");
const utils_1 = require("../utils");
function FunnelCard({ leadgen }) {
    var _a;
    const f = leadgen.funnel;
    const top = ((_a = f[0]) === null || _a === void 0 ? void 0 : _a.count) || 1;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Conversion funnel" }), (0, jsx_runtime_1.jsxs)("span", { className: "badge accent", style: { marginLeft: 'auto' }, children: [(0, jsx_runtime_1.jsx)("span", { className: "dot" }), leadgen.rate, "% overall"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "funnel", children: f.map((s, i) => {
                    const pctOfTop = (s.count / top) * 100;
                    const stepDrop = i > 0 ? (1 - s.count / f[i - 1].count) * 100 : 0;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "fn-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "fn-meta", children: [(0, jsx_runtime_1.jsx)("span", { className: "fn-stage", children: s.stage }), i > 0 && (0, jsx_runtime_1.jsxs)("span", { className: "fn-drop", children: ["\u2212", stepDrop.toFixed(0), "%"] }), (0, jsx_runtime_1.jsx)("span", { className: "fn-count", children: (0, utils_1.fmtFull)(s.count) }), (0, jsx_runtime_1.jsxs)("span", { className: "fn-pct", children: [pctOfTop.toFixed(1), "%"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fn-track", children: (0, jsx_runtime_1.jsx)("div", { className: "fn-fill", style: { width: Math.max(pctOfTop, 6) + '%', background: `linear-gradient(90deg, oklch(50% 0.15 ${s.hue}), oklch(64% 0.17 ${s.hue}))` } }) })] }, s.stage));
                }) })] }));
}
function ChannelsCard({ leadgen }) {
    const rateDelta = (0, utils_1.deltaPct)(leadgen.rate, leadgen.prevRate);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsx)("div", { className: "panel-head", children: (0, jsx_runtime_1.jsx)("h3", { children: "Conversion channels" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "card-pad", style: { padding: '16px 20px 14px', borderBottom: '1px solid var(--border)' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: 10 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }, children: (0, utils_1.fmtFull)(leadgen.total) }), (0, jsx_runtime_1.jsxs)("span", { className: "chg up", style: { fontFamily: 'var(--mono)', fontSize: '0.8rem', fontWeight: 600 }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "trendUp", size: 13 }), "+", rateDelta.toFixed(1), "%"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '0.82rem', color: 'var(--ink-3)', marginTop: 4 }, children: "total conversions this month" })] }), (0, jsx_runtime_1.jsx)("div", { className: "lc-grid", children: leadgen.channels.map(ch => {
                    const dl = (0, utils_1.deltaSpan)(ch.delta, 'up');
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "lc-row", children: [(0, jsx_runtime_1.jsx)("span", { className: "ic", style: { background: `linear-gradient(140deg, oklch(62% 0.16 ${ch.hue}), oklch(50% 0.15 ${ch.hue + 22}))` }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: ch.icon }) }), (0, jsx_runtime_1.jsx)("span", { className: "lc-nm", children: ch.name }), (0, jsx_runtime_1.jsx)("span", { className: "lc-ct", children: (0, utils_1.fmtFull)(ch.count) }), (0, jsx_runtime_1.jsxs)("span", { className: 'lc-dl ' + dl.cls, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: dl.icon }), dl.txt] })] }, ch.name));
                }) })] }));
}
function LeadGenSection({ leadgen }) {
    if (!leadgen) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2e", children: [(0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 280 } }) }), (0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 280 } }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2e", children: [(0, jsx_runtime_1.jsx)(FunnelCard, { leadgen: leadgen }), (0, jsx_runtime_1.jsx)(ChannelsCard, { leadgen: leadgen })] }));
}
