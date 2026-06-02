"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentTable = ContentTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DataTable_1 = require("../primitives/DataTable");
const utils_1 = require("../utils");
function bounceColor(b) {
    if (b < 30)
        return 'var(--ok)';
    if (b < 42)
        return 'var(--warn)';
    return 'var(--danger)';
}
function ContentTable({ content }) {
    const rows = (0, react_1.useMemo)(() => (content !== null && content !== void 0 ? content : []).map((c, i) => ({ id: c.path + i, ...c })), [content]);
    const state = (0, DataTable_1.useListState)(rows, ['title', 'path']);
    const columns = [
        {
            key: 'title', label: 'Page', sortable: true,
            render: r => ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "cell-strong", children: r.title }), (0, jsx_runtime_1.jsx)("div", { className: "ct-path", children: r.path })] })),
        },
        { key: 'views', label: 'Views', sortable: true, align: 'right', render: r => (0, jsx_runtime_1.jsx)("span", { className: "num", children: (0, utils_1.fmtFull)(r.views) }) },
        { key: 'uniques', label: 'Unique', sortable: true, align: 'right', render: r => (0, jsx_runtime_1.jsx)("span", { className: "num", children: (0, utils_1.fmtFull)(r.uniques) }) },
        { key: 'avgTime', label: 'Avg. time', sortable: true, align: 'right', render: r => (0, jsx_runtime_1.jsx)("span", { className: "num", children: (0, utils_1.fmtDur)(r.avgTime) }) },
        {
            key: 'bounce', label: 'Bounce', sortable: true, align: 'right',
            render: r => ((0, jsx_runtime_1.jsxs)("span", { className: "bounce-cell", style: { justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)("span", { className: "bounce-pip", children: (0, jsx_runtime_1.jsx)("span", { style: { width: Math.min(r.bounce, 100) + '%', background: bounceColor(r.bounce) } }) }), (0, jsx_runtime_1.jsxs)("span", { className: "num", children: [r.bounce.toFixed(1), "%"] })] })),
        },
        {
            key: 'conv', label: 'Conv. rate', sortable: true, align: 'right',
            render: r => ((0, jsx_runtime_1.jsxs)("span", { className: "num", style: { color: r.conv >= 8 ? 'var(--ok)' : 'var(--ink)', fontWeight: 600 }, children: [r.conv.toFixed(1), "%"] })),
        },
    ];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "panel-head", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Top performing content" }), (0, jsx_runtime_1.jsx)("span", { className: "badge neutral mono", style: { marginLeft: 'auto' }, children: "by conversion impact" })] }), (0, jsx_runtime_1.jsx)(DataTable_1.TableToolbar, { state: state, placeholder: "Filter pages\u2026", countLabel: "pages" }), (0, jsx_runtime_1.jsx)(DataTable_1.DataTable, { columns: columns, state: state, rowKey: r => r.id, empty: { title: 'No page data yet' }, emptySearch: { title: 'No pages match' } })] }));
}
