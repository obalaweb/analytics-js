'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

function AnalyticsTracker({ endpoint }: { endpoint: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

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
    } else {
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

export function AnalyticsProvider({ endpoint = '/api/v1/analytics/track' }: { endpoint?: string }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker endpoint={endpoint} />
    </Suspense>
  );
}
