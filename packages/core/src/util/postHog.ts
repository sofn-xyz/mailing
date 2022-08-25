import { PostHog } from "posthog-node";

const POSTHOG_API_KEY = "{POSTHOG_API_KEY}";
let client: undefined | PostHog;

function postHogClient() {
  if (undefined === client) {
    client = new PostHog(POSTHOG_API_KEY, {
      host: "https://app.posthog.com",
    });
  }

  return client;
}

export default postHogClient;
