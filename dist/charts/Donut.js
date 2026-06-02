"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donut = Donut;
const jsx_runtime_1 = require("react/jsx-runtime");
function Donut({ segments, size = 132, thickness = 16, centerLabel, centerSub }) {
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const total = segments.reduce((s, x) => s + x.value, 0) || 1;
    let off = 0;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "donut-wrap", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: [(0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: "var(--surface-3)", strokeWidth: thickness }), segments.map((s, i) => {
                        const frac = s.value / total;
                        const dash = frac * c;
                        const el = ((0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: s.color, strokeWidth: thickness, strokeDasharray: `${dash} ${c - dash}`, strokeDashoffset: -off, transform: `rotate(-90 ${size / 2} ${size / 2})`, strokeLinecap: "butt" }, i));
                        off += dash;
                        return el;
                    })] }), centerLabel != null && ((0, jsx_runtime_1.jsxs)("div", { className: "donut-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "dc-val", children: centerLabel }), centerSub && (0, jsx_runtime_1.jsx)("div", { className: "dc-sub", children: centerSub })] }))] }));
}
