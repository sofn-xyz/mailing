interface IAnalyticsProvider {
  track: (event: string, properties: Record<string, unknown>) => void;
}
