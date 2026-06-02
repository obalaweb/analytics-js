"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudienceSection = AudienceSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const Donut_1 = require("../charts/Donut");
const utils_1 = require("../utils");
function GeoCard({ geo }) {
    const max = Math.max(...geo.map(g => g.visitors));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Visitors by geography" }), (0, jsx_runtime_1.jsxs)("span", { className: "badge neutral mono", style: { marginLeft: 'auto' }, children: [geo.length, " countries"] })] }), (0, jsx_runtime_1.jsx)("div", { children: geo.map(g => {
                    const dl = (0, utils_1.deltaSpan)(g.delta, 'up');
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "geo-row", children: [(0, jsx_runtime_1.jsx)("span", { className: "geo-flag", children: g.code }), (0, jsx_runtime_1.jsxs)("div", { className: "geo-mid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "geo-cn", children: [g.country, g.city !== '—' && (0, jsx_runtime_1.jsx)("span", { className: "city", children: g.city })] }), (0, jsx_runtime_1.jsx)("div", { className: "geo-bar", children: (0, jsx_runtime_1.jsx)("span", { style: { width: (g.visitors / max * 100) + '%' } }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "geo-right", children: [(0, jsx_runtime_1.jsx)("div", { className: "geo-vis", children: (0, utils_1.fmtNum)(g.visitors) }), (0, jsx_runtime_1.jsx)("div", { className: 'geo-dl ' + dl.cls, children: dl.txt })] })] }, g.code));
                }) })] }));
}
function DevicesCard({ devices }) {
    const topSplit = devices.split[0];
    const segs = devices.split.map(d => ({ value: d.share, color: `oklch(64% 0.17 ${d.hue})` }));
    const cols = [
        { h: 'Browser', items: devices.browsers },
        { h: 'OS', items: devices.os },
        { h: 'Screen size', items: devices.screens },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsx)("div", { className: "panel-head", children: (0, jsx_runtime_1.jsx)("h3", { children: "Devices & tech" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "dev-top", children: [(0, jsx_runtime_1.jsx)(Donut_1.Donut, { segments: segs, size: 128, thickness: 15, centerLabel: topSplit ? topSplit.share + '%' : '', centerSub: topSplit ? topSplit.name.toLowerCase() : '' }), (0, jsx_runtime_1.jsx)("div", { className: "dev-legend", children: devices.split.map(d => ((0, jsx_runtime_1.jsxs)("div", { className: "dev-leg", children: [(0, jsx_runtime_1.jsx)("span", { className: "sw", style: { background: `oklch(64% 0.17 ${d.hue})` } }), (0, jsx_runtime_1.jsx)("span", { className: "nm", children: d.name }), (0, jsx_runtime_1.jsxs)("span", { className: "sh", children: [d.share, "%"] }), (0, jsx_runtime_1.jsxs)("span", { className: "bn", children: [d.bounce, "% bounce"] })] }, d.name))) })] }), (0, jsx_runtime_1.jsx)("div", { className: "dev-break", children: cols.map(col => {
                    const mx = Math.max(...col.items.map(x => x.share));
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "dev-col", children: [(0, jsx_runtime_1.jsx)("h5", { children: col.h }), col.items.map(it => ((0, jsx_runtime_1.jsxs)("div", { className: "dev-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "dn", children: it.name }), (0, jsx_runtime_1.jsx)("span", { className: "dbar", children: (0, jsx_runtime_1.jsx)("span", { style: { width: (it.share / mx * 100) + '%' } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "dp", children: [it.share, "%"] })] }, it.name)))] }, col.h));
                }) })] }));
}
function AudienceSection({ geo, devices }) {
    if (!geo && !devices) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2e", children: [(0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 320 } }) }), (0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 320 } }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2e", children: [geo && geo.length > 0 ? (0, jsx_runtime_1.jsx)(GeoCard, { geo: geo }) : (0, jsx_runtime_1.jsx)("div", { className: "card an-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No geography data yet" }) }), devices ? (0, jsx_runtime_1.jsx)(DevicesCard, { devices: devices }) : (0, jsx_runtime_1.jsx)("div", { className: "card an-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No device data yet" }) })] }));
}
