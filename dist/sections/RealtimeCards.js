"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeCards = RealtimeCards;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Icon_1 = require("../primitives/Icon");
const EVENT_ICON = {
    lead: 'leads', quote: 'file', phone: 'bell', email: 'inbox', whatsapp: 'external', view: 'media',
};
function ago(t) {
    const s = Math.max(1, Math.round((Date.now() - t) / 1000));
    return s < 60 ? `${s}s ago` : `${Math.round(s / 60)}m ago`;
}
function ActivePagesCard({ pages }) {
    const maxCount = Math.max(...pages.map(p => p.count), 1);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Active pages" }), (0, jsx_runtime_1.jsxs)("span", { className: "badge ok live", style: { marginLeft: 'auto' }, children: [(0, jsx_runtime_1.jsx)("span", { className: "dot" }), "Live"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "rt-pages", children: [pages.map(p => ((0, jsx_runtime_1.jsxs)("div", { className: "rt-page", children: [(0, jsx_runtime_1.jsxs)("div", { className: "pt", children: [(0, jsx_runtime_1.jsx)("div", { className: "tt", children: p.title }), (0, jsx_runtime_1.jsx)("div", { className: "pp", children: p.path })] }), (0, jsx_runtime_1.jsx)("span", { className: "pbar", children: (0, jsx_runtime_1.jsx)("span", { style: { width: (p.count / maxCount * 100) + '%' } }) }), (0, jsx_runtime_1.jsx)("span", { className: "pc", children: p.count })] }, p.path))), pages.length === 0 && (0, jsx_runtime_1.jsx)("div", { className: "an-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No active pages" }) })] })] }));
}
function EventFeedCard({ events }) {
    const [, forceUpdate] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const id = setInterval(() => forceUpdate(n => n + 1), 15000);
        return () => clearInterval(id);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Recent events" }), (0, jsx_runtime_1.jsxs)("span", { className: "badge ok live", style: { marginLeft: 'auto' }, children: [(0, jsx_runtime_1.jsx)("span", { className: "dot" }), "Streaming"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "feed", children: [events.map(e => ((0, jsx_runtime_1.jsxs)("div", { className: "feed-item", children: [(0, jsx_runtime_1.jsx)("span", { className: 'feed-ic ' + e.type, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: EVENT_ICON[e.type] || 'activity' }) }), (0, jsx_runtime_1.jsxs)("div", { className: "feed-tx", children: [(0, jsx_runtime_1.jsx)("div", { className: "ft", children: e.label }), (0, jsx_runtime_1.jsxs)("div", { className: "fm", children: [e.page, " \u00B7 ", e.city] })] }), (0, jsx_runtime_1.jsx)("span", { className: "feed-when", children: ago(e.t) })] }, e.id))), events.length === 0 && (0, jsx_runtime_1.jsx)("div", { className: "an-empty", children: (0, jsx_runtime_1.jsx)("p", { children: "No events yet" }) })] })] }));
}
function RealtimeCards({ realtime }) {
    if (!realtime) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 280 } }) }), (0, jsx_runtime_1.jsx)("div", { className: "card", children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 280 } }) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "an-row an-2", children: [(0, jsx_runtime_1.jsx)(ActivePagesCard, { pages: realtime.pages }), (0, jsx_runtime_1.jsx)(EventFeedCard, { events: realtime.events })] }));
}
