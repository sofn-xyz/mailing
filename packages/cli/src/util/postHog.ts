import { debug } from "./log";
import { PostHog } from "posthog-node";
import { config } from "../moduleManifest";
import { getGeneratedAnonymousId } from "./config";

// ** modified from posthog-node
interface IdentifyMessageV1 {
  distinctId?: string | boolean; // yarg will convert --no-anonymousId into argv.anonymousId === false which trickles through to here
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
  if (undefined === client) {
    client = new PostHog(POSTHOG_API_KEY, {
      host: "https://app.posthog.com",
    });
  }

  return client;
}

export function capture(options: EventMessageV1) {
  // return early if --no-anonymous-id flag is passed to command
  if (false === options.distinctId) {
    debug("capture is returning early because options.distinctId was false");
    return;
  }

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

  return postHogClient().capture(captureOpts);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function shutdown() {
  debug("calling postHog shutdown");
  postHogClient().shutdown();

  // unfortunately, calling posthog-node's shutdown in a `finally` does not work without this, 1000ms is a guess
  await sleep(1000);
}
