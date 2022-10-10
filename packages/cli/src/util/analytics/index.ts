import { Axiom, Mailing, Posthog } from "./providers";

class Analytics {
  providers: IAnalyticsProvider[];

  constructor() {
    let axiom, mailing, posthog;
    if (process.env.AXIOM_API_TOKEN && process.env.AXIOM_DATASET_NAME) {
      axiom = new Axiom(
        process.env.AXIOM_API_TOKEN,
        process.env.AXIOM_DATASET_NAME
      );
    }
    if (process.env.MAILING_API_TOKEN) {
      mailing = new Mailing(process.env.MAILING_API_TOKEN);
    }
    if (process.env.POSTHOG_API_TOKEN) {
      posthog = new Posthog(process.env.POSTHOG_API_TOKEN);
    }

    this.providers = [axiom, mailing, posthog].filter(
      (p) => p
    ) as IAnalyticsProvider[];
  }

  track(event: string, properties: Record<string, unknown>) {
    this.providers.forEach((provider) => {
      provider.track(event, properties);
    });
  }
}

export { Analytics };

// default export a singleton
export default new Analytics();
