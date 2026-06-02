"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = Switch;
const jsx_runtime_1 = require("react/jsx-runtime");
function Switch({ on, onChange }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: 'an-switch' + (on ? ' on' : ''), role: "switch", "aria-checked": on, onClick: () => onChange(!on) }));
}
