"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListState = useListState;
exports.DataTable = DataTable;
exports.TableToolbar = TableToolbar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Icon_1 = require("./Icon");
function useListState(initialItems, searchKeys) {
    const [rows, setRows] = (0, react_1.useState)(initialItems);
    const [query, setQuery] = (0, react_1.useState)('');
    const [sort, setSort] = (0, react_1.useState)({ key: null, dir: 'asc' });
    (0, react_1.useEffect)(() => { setRows(initialItems); }, [initialItems]);
    const toggleSort = (key) => setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
    let view = rows;
    if (query.trim()) {
        const q = query.toLowerCase();
        view = view.filter(r => searchKeys.some(k => { var _a; return String((_a = r[k]) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(q); }));
    }
    if (sort.key) {
        const sk = sort.key;
        view = [...view].sort((a, b) => {
            const av = a[sk];
            const bv = b[sk];
            if (typeof av === 'number' && typeof bv === 'number')
                return sort.dir === 'asc' ? av - bv : bv - av;
            const as = String(av !== null && av !== void 0 ? av : '').toLowerCase(), bs = String(bv !== null && bv !== void 0 ? bv : '').toLowerCase();
            return sort.dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
        });
    }
    return { rows, setRows, query, setQuery, sort, toggleSort, view, filtered: !!query.trim() };
}
function SkeletonRows({ cols }) {
    return ((0, jsx_runtime_1.jsx)("tbody", { children: Array.from({ length: 6 }).map((_, r) => ((0, jsx_runtime_1.jsx)("tr", { children: Array.from({ length: cols }).map((_, c) => ((0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("div", { className: "an-sk", style: { height: 14, width: c === 0 ? '70%' : (c === cols - 1 ? 40 : '50%') } }) }, c))) }, r))) }));
}
function DataTable({ columns, state, empty, emptySearch, rowKey }) {
    var _a, _b;
    const { view, sort, toggleSort, filtered, rows } = state;
    const loading = rows.length === 0 && !filtered;
    return ((0, jsx_runtime_1.jsx)("div", { className: "tbl-wrap", children: (0, jsx_runtime_1.jsxs)("table", { className: "tbl", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsx)("tr", { children: columns.map(c => {
                            const sorted = sort.key === c.key;
                            return ((0, jsx_runtime_1.jsx)("th", { className: (c.sortable ? 'sortable ' : '') + (sorted ? 'sorted ' : '') + (sorted && sort.dir === 'desc' ? 'desc' : ''), style: { width: c.width, textAlign: c.align }, onClick: c.sortable ? () => toggleSort(c.key) : undefined, children: (0, jsx_runtime_1.jsxs)("span", { className: "th-in", style: c.align === 'right' ? { flexDirection: 'row-reverse' } : undefined, children: [c.label, c.sortable && (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "chevronUp", className: "caret", size: 13 })] }) }, String(c.key)));
                        }) }) }), loading ? ((0, jsx_runtime_1.jsx)(SkeletonRows, { cols: columns.length })) : view.length === 0 ? ((0, jsx_runtime_1.jsx)("tbody", { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: columns.length, children: (0, jsx_runtime_1.jsxs)("div", { className: "an-empty", children: [(0, jsx_runtime_1.jsx)("p", { children: filtered ? ((_a = emptySearch === null || emptySearch === void 0 ? void 0 : emptySearch.title) !== null && _a !== void 0 ? _a : 'No matches') : ((_b = empty === null || empty === void 0 ? void 0 : empty.title) !== null && _b !== void 0 ? _b : 'No data yet') }), !filtered && (empty === null || empty === void 0 ? void 0 : empty.body) && (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.78rem' }, children: empty.body })] }) }) }) })) : ((0, jsx_runtime_1.jsx)("tbody", { children: view.map(row => ((0, jsx_runtime_1.jsx)("tr", { children: columns.map(c => {
                            var _a;
                            return ((0, jsx_runtime_1.jsx)("td", { style: { textAlign: c.align }, children: c.render ? c.render(row) : (0, jsx_runtime_1.jsx)("span", { className: "cell-strong", children: String((_a = row[c.key]) !== null && _a !== void 0 ? _a : '') }) }, String(c.key)));
                        }) }, rowKey(row)))) }))] }) }));
}
function TableToolbar({ state, placeholder, countLabel }) {
    const { query, setQuery, view } = state;
    return ((0, jsx_runtime_1.jsxs)("div", { className: "toolbar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "input-icon search", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "search" }), (0, jsx_runtime_1.jsx)("input", { className: "input", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : 'Search…', value: query, onChange: e => setQuery(e.target.value) }), query && ((0, jsx_runtime_1.jsx)("button", { className: "clear-x", onClick: () => setQuery(''), "aria-label": "Clear", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { name: "x", size: 15 }) }))] }), (0, jsx_runtime_1.jsxs)("span", { className: "count", children: [view.length, " ", countLabel !== null && countLabel !== void 0 ? countLabel : 'records'] })] }));
}
