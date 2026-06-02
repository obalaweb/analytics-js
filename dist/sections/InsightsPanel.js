"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsPanel = InsightsPanel;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icon_1 = require("../primitives/Icon");
function InsightCard({ d }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'card insight ' + d.tone, children: [(0, jsx_runtime_1.jsxs)("div", { className: "top", children: [(0, jsx_runtime_1.jsx)("span", { className: "ic", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: d.icon }) }), (0, jsx_runtime_1.jsx)("span", { className: "tag", children: d.tag }), (0, jsx_runtime_1.jsx)("span", { className: "metric", children: d.metric })] }), (0, jsx_runtime_1.jsx)("h4", { children: d.title }), (0, jsx_runtime_1.jsx)("p", { children: d.body })] }));
}
function InsightsPanel({ insights, updatedLabel = 'auto-generated' }) {
    if (!insights || insights.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "insights-head", children: [(0, jsx_runtime_1.jsxs)("span", { className: "ai-pill", children: [(0, jsx_runtime_1.jsx)("span", { style: { width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' } }), "Insights"] }), (0, jsx_runtime_1.jsx)("h2", { children: "What needs your attention" }), (0, jsx_runtime_1.jsx)("span", { className: "upd", children: updatedLabel })] }), (0, jsx_runtime_1.jsx)("div", { className: "insight-grid", children: insights.map((d, i) => (0, jsx_runtime_1.jsx)(InsightCard, { d: d }, i)) })] }));
}
