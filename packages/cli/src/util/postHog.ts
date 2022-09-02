import { debug } from "./log";
import { PostHog } from "posthog-node";
import { config } from "../moduleManifest";
import { getGeneratedAnonymousId } from "./config";

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

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY;
let client: undefined | PostHog;

function postHogClient() {
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

export function capture(options: EventMessageV1) {
  debug(
    `options.distinctId was ${options.distinctId} and config.anonymousId was ${
      config.anonymousId
    } and getGeneratedAnonymousId() returned ${getGeneratedAnonymousId()}`
  );

  const distinctId =
    options.distinctId || config.anonymousId || getGeneratedAnonymousId();

  if (!distinctId) {
    debug(`capture is returning early because distinctId was ${distinctId}`);
    return;
  }

  const captureOpts = {
    ...options,
    distinctId,
  };

  debug(`calling capture with ${JSON.stringify(captureOpts)}`);

  if (process.env.MM_DEV) {
    debug("returning early from capture because MM_DEV is set");
    return;
  }

  return postHogClient().capture(captureOpts);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function shutdown() {
  if (client) {
    debug("calling postHog shutdown");
    postHogClient().shutdown();

    // unfortunately, calling posthog-node's shutdown in a `finally` does not work without this, 1000ms is a guess
    await sleep(1000);
  } else {
    debug("skipping postHog client shutdown because it was never instantiated");
  }
}
