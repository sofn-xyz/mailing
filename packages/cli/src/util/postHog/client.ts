import { PostHog } from "posthog-node";

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

let client: PostHog | undefined;

export function postHogClient(): PostHog | undefined {
  if ("test" === process.env.NODE_ENV) return;

  if (undefined === POSTHOG_API_KEY) {
    throw new Error("POSTHOG_API_KEY is undefined");
  }

  if (undefined === client) {
    client = new PostHog(POSTHOG_API_KEY, {
      host: "https://app.posthog.com",
    });
  }

  return client;
}

// readonly version of postHogClient
export function getPostHogClient(): PostHog | undefined {
  return client;
}
