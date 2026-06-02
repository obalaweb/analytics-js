'use client';

import { useState, useEffect, useRef } from 'react';
import type { AnalyticsDashboardData, RealtimeData, AnalyticsEndpoints } from './types';

export interface UseAnalyticsDashboardOptions {
  endpoints: AnalyticsEndpoints;
  getToken: () => Promise<string | null>;
}

export interface UseAnalyticsDashboardResult {
  data: AnalyticsDashboardData | null;
  realtime: RealtimeData | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useAnalyticsDashboard({
  endpoints,
  getToken,
}: UseAnalyticsDashboardOptions): UseAnalyticsDashboardResult {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [realtime, setRealtime] = useState<RealtimeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch(endpoints.dashboard, { headers });
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err: unknown) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboard();
    return () => { cancelled = true; };
  }, [endpoints.dashboard, tick]);

  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function connectSSE() {
      try {
        const token = await getToken();
        const headers: Record<string, string> = { Accept: 'text/event-stream' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(endpoints.realtime, { headers });
        if (!res.ok || !res.body) return;

        const reader = res.body.getReader();
        readerRef.current = reader;
        const decoder = new TextDecoder();
        let buf = '';

        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split('\n');
          buf = lines.pop() ?? '';
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(line.slice(6)) as RealtimeData;
                if (!cancelled) setRealtime(parsed);
              } catch {
                // ignore parse errors from malformed SSE frames
              }
            }
          }
        }
      } catch {
        if (!cancelled) {
          setTimeout(() => { if (!cancelled) connectSSE(); }, 3000);
        }
      }
    }

    connectSSE();

    return () => {
      cancelled = true;
      readerRef.current?.cancel();
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
