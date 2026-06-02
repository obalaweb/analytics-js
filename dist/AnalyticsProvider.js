"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsProvider = AnalyticsProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
function AnalyticsTracker({ endpoint }) {
    const pathname = (0, navigation_1.usePathname)();
    const searchParams = (0, navigation_1.useSearchParams)();
    (0, react_1.useEffect)(() => {
        if (!pathname)
            return;
        // Track page view
        const path = pathname;
        const payload = JSON.stringify({
            path: path,
            title: document.title,
        });
        const url = endpoint;
        // Use navigator.sendBeacon for non-blocking tracking, fallback to fetch
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
            navigator.sendBeacon(url, payload);
        }
        else {
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: payload,
                keepalive: true,
            }).catch((err) => console.error('Analytics tracking failed:', err));
        }
    }, [pathname, searchParams]);
    return null;
}
function AnalyticsProvider({ endpoint = '/api/v1/analytics/track' }) {
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: null, children: (0, jsx_runtime_1.jsx)(AnalyticsTracker, { endpoint: endpoint }) }));
}
