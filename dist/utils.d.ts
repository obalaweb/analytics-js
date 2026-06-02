export declare function fmtNum(n: number): string;
export declare function fmtFull(n: number): string;
export declare function fmtDur(sec: number): string;
export declare function fmtVal(v: number, kind: 'int' | 'pct' | 'dur'): string;
export declare function deltaPct(cur: number, prev: number): number;
export declare function sum(a: number[]): number;
export interface DeltaSpan {
    cls: 'up' | 'down' | 'flat';
    icon: 'trendUp' | 'trendDown';
    txt: string;
}
export declare function deltaSpan(pct: number, goodDir?: 'up' | 'down'): DeltaSpan;
export declare const ANALYTICS_RANGES: readonly [{
    readonly key: "24h";
    readonly label: "24 hours";
    readonly short: "24H";
    readonly points: 24;
    readonly compareLabel: "yesterday";
    readonly axisEvery: 4;
    readonly fmt: (i: number) => string;
}, {
    readonly key: "7d";
    readonly label: "7 days";
    readonly short: "7D";
    readonly points: 7;
    readonly compareLabel: "previous 7 days";
    readonly axisEvery: 1;
    readonly fmt: (i: number) => string;
}, {
    readonly key: "30d";
    readonly label: "30 days";
    readonly short: "30D";
    readonly points: 30;
    readonly compareLabel: "previous 30 days";
    readonly axisEvery: 5;
    readonly fmt: (i: number) => string;
}, {
    readonly key: "90d";
    readonly label: "90 days";
    readonly short: "90D";
    readonly points: 90;
    readonly compareLabel: "previous 90 days";
    readonly axisEvery: 15;
    readonly fmt: (i: number) => string;
}, {
    readonly key: "1y";
    readonly label: "12 months";
    readonly short: "1Y";
    readonly points: 12;
    readonly compareLabel: "previous year";
    readonly axisEvery: 2;
    readonly fmt: (i: number) => string;
}];
export type AnalyticsRange = (typeof ANALYTICS_RANGES)[number];
