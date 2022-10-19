import { Axiom, Posthog } from "./providers";

class Analytics {
  providers: IAnalyticsProvider[];

  constructor() {
    let axiom, posthog;
    if (process.env.AXIOM_API_TOKEN && process.env.AXIOM_DATASET_NAME) {
      axiom = new Axiom(
        process.env.AXIOM_API_TOKEN,
        process.env.AXIOM_DATASET_NAME
      );
    }
    if (process.env.POSTHOG_API_TOKEN) {
      posthog = new Posthog(process.env.POSTHOG_API_TOKEN);
    }

    this.providers = [axiom, posthog].filter((p) => p) as IAnalyticsProvider[];
  }

  track(event: AnalyticsEvent) {
    this.providers.forEach((provider) => {
      provider.track(event);
    });
  }

  trackMany(events: AnalyticsEvent[]) {
    this.providers.forEach((provider) => {
      provider.trackMany(events);
    });
  }
}

export { Analytics };

// default export a singleton
export default new Analytics();
