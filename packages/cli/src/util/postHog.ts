import { debug } from "./log";
import { PostHog } from "posthog-node";
import { config } from "../moduleManifest";

// ** modified from posthog-node
interface IdentifyMessageV1 {
  distinctId?: string;
  properties?: Record<string | number, any>;
}
interface EventMessageV1 extends IdentifyMessageV1 {
  event: string;
  groups?: Record<string, string | number>;
  sendFeatureFlags?: boolean;
}
// ** end

let anonymousId = null;

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

export function setAnonymousId(id) {
  anonymousId = id;
}

export function capture(options: EventMessageV1) {
  const distinctId = options.distinctId || config.anonymousId || anonymousId;
  if (!distinctId) {
    debug(
      `options.distinctId was ${options.distinctId} and config.anonymousId was ${config.anonymousId} and anonymousId was ${anonymousId}, so capture is returning early`
    );
    return;
  }

  const captureOpts = {
    ...options,
    distinctId,
  };

  debug(`calling postHog capture with ${JSON.stringify(captureOpts)}`);

  return postHogClient().capture(captureOpts);
}

export function shutdown() {
  postHogClient().shutdown();
}
