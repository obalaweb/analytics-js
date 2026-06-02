"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiveBar = LiveBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const Sparkline_1 = require("../charts/Sparkline");
function LiveBar({ realtime }) {
    if (!realtime) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "live-bar", children: (0, jsx_runtime_1.jsxs)("div", { className: "live-now", children: [(0, jsx_runtime_1.jsx)("span", { className: "pulse" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "big an-sk", style: { width: 60, height: 28, borderRadius: 4 } }), (0, jsx_runtime_1.jsx)("div", { className: "lbl", style: { marginTop: 6 }, children: "active visitors right now" })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "live-bar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "live-now", children: [(0, jsx_runtime_1.jsx)("span", { className: "pulse" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "big", children: realtime.active }), (0, jsx_runtime_1.jsx)("div", { className: "lbl", children: "active visitors right now" })] })] }), realtime.spark.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "lv-spark", children: (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: realtime.spark, hue: 150, up: true, height: 36, fill: true }) })), (0, jsx_runtime_1.jsx)("div", { className: "live-locs", children: realtime.locations.map(l => ((0, jsx_runtime_1.jsxs)("span", { className: "live-loc", children: [(0, jsx_runtime_1.jsx)("span", { className: "fl", children: l.country }), l.city, (0, jsx_runtime_1.jsx)("span", { className: "ct", children: l.count })] }, l.city))) })] }));
}
