import { PostHog } from "posthog-node";
import { debug } from "../log";

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;

let client: PostHog | undefined;

export function postHogClient(): PostHog | undefined {
  if (process.env.MM_E2E || "test" === process.env.NODE_ENV) return;

  if (undefined === POSTHOG_API_KEY) {
    debug("POSTHOG_API_KEY is undefined");
    return;
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
