"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnalyticsDashboard = useAnalyticsDashboard;
const react_1 = require("react");
function useAnalyticsDashboard({ endpoints, getToken, }) {
    const [data, setData] = (0, react_1.useState)(null);
    const [realtime, setRealtime] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [tick, setTick] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        async function fetchDashboard() {
            setLoading(true);
            setError(null);
            try {
                const token = await getToken();
                const headers = { 'Content-Type': 'application/json' };
                if (token)
                    headers['Authorization'] = `Bearer ${token}`;
                const res = await fetch(endpoints.dashboard, { headers });
                if (!res.ok)
                    throw new Error(`${res.status}`);
                const json = await res.json();
                if (!cancelled)
                    setData(json);
            }
            catch (err) {
                if (!cancelled)
                    setError(err instanceof Error ? err.message : 'Failed to load analytics');
            }
            finally {
                if (!cancelled)
                    setLoading(false);
            }
        }
        fetchDashboard();
        return () => { cancelled = true; };
    }, [endpoints.dashboard, tick]);
    const readerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        let cancelled = false;
        async function connectSSE() {
            var _a;
            try {
                const token = await getToken();
                const headers = { Accept: 'text/event-stream' };
                if (token)
                    headers['Authorization'] = `Bearer ${token}`;
                const res = await fetch(endpoints.realtime, { headers });
                if (!res.ok || !res.body)
                    return;
                const reader = res.body.getReader();
                readerRef.current = reader;
                const decoder = new TextDecoder();
                let buf = '';
                while (!cancelled) {
                    const { done, value } = await reader.read();
                    if (done || cancelled)
                        break;
                    buf += decoder.decode(value, { stream: true });
                    const lines = buf.split('\n');
                    buf = (_a = lines.pop()) !== null && _a !== void 0 ? _a : '';
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            try {
                                const parsed = JSON.parse(line.slice(6));
                                if (!cancelled)
                                    setRealtime(parsed);
                            }
                            catch {
                                // ignore parse errors from malformed SSE frames
                            }
                        }
                    }
                }
            }
            catch {
                if (!cancelled) {
                    setTimeout(() => { if (!cancelled)
                        connectSSE(); }, 3000);
                }
            }
        }
        connectSSE();
        return () => {
            var _a;
            cancelled = true;
            (_a = readerRef.current) === null || _a === void 0 ? void 0 : _a.cancel();
            readerRef.current = null;
        };
    }, [endpoints.realtime]);
    return {
        data,
        realtime,
        loading,
        error,
        refresh: () => setTick(t => t + 1),
    };
}
