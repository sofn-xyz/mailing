type AnalyticsEvent = { event: string; properties?: Record<string, unknown> };

interface IAnalyticsProvider {
  track: (event: AnalyticsEvent) => void;
  trackMany: (events: Array<AnalyticsEvent>) => void;
}
