"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourcesCard = SourcesCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icon_1 = require("../primitives/Icon");
const utils_1 = require("../utils");
function SourcesCard({ sources }) {
    if (!sources || sources.length === 0) {
        return (0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 240 } }) });
    }
    const maxVis = Math.max(...sources.map(s => s.visitors));
    const totalVis = (0, utils_1.sum)(sources.map(s => s.visitors));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Traffic sources" }), (0, jsx_runtime_1.jsxs)("span", { className: "badge neutral mono", style: { marginLeft: 'auto' }, children: [(0, utils_1.fmtNum)(totalVis), " visitors"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "src-list", children: sources.map(s => {
                    const dl = (0, utils_1.deltaSpan)(s.delta, 'up');
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "src-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "src-name", children: [(0, jsx_runtime_1.jsx)("span", { className: "swatch", style: { background: `oklch(64% 0.17 ${s.hue})` } }), (0, jsx_runtime_1.jsx)("span", { className: "nm", children: s.name })] }), (0, jsx_runtime_1.jsxs)("div", { className: "src-bar-wrap", children: [(0, jsx_runtime_1.jsx)("span", { className: "src-bar", children: (0, jsx_runtime_1.jsx)("span", { style: { width: (s.visitors / maxVis * 100) + '%', background: `linear-gradient(90deg, oklch(54% 0.15 ${s.hue}), oklch(66% 0.17 ${s.hue}))` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "src-vis", children: (0, utils_1.fmtNum)(s.visitors) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "src-stats", children: [(0, jsx_runtime_1.jsxs)("span", { className: "src-conv", title: "Conversion rate", children: [s.conv.toFixed(1), "%"] }), (0, jsx_runtime_1.jsxs)("span", { className: 'src-delta ' + dl.cls, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: dl.icon }), dl.txt] })] })] }, s.key));
                }) })] }));
}
