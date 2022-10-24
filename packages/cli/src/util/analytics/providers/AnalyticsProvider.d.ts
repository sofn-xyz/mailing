type AnalyticsEvent = { event: string; properties?: Record<string, unknown> };

interface IAnalyticsProvider {
  track: (event: AnalyticsEvent) => Promise<T>;
  trackMany: (events: Array<AnalyticsEvent>) => Promise<T>;
}
