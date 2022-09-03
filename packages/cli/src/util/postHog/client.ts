import { PostHog } from "posthog-node";

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

let client: undefined | PostHog;

export function postHogClient() {
  if ("test" === process.env.NODE_ENV) return;

  if (undefined === POSTHOG_API_KEY) {
    throw new Error("POSTHOG_API_KEY is undefined");
  }

  if (undefined === client) {
    client = new PostHog(POSTHOG_API_KEY, {
      host: "https://app.posthog.com",
    });
  }

  return client as any;
}

// readonly version of postHogClient
export function getPostHogClient() {
  return client as any;
}
