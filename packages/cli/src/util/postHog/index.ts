import { debug } from "../log";
import { getConfig } from "../moduleManifestUtil";
import { getGeneratedAnonymousId } from "../config/anonymousId";

import { postHogClient, getPostHogClient } from "./client";

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
export function capture(options: EventMessageV1) {
  const config = getConfig();

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

  return postHogClient()?.capture(captureOpts);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function shutdown() {
  const client = getPostHogClient();
  if (client) {
    debug("calling postHog shutdown");
    await client.shutdownAsync();
  } else {
    debug("skipping postHog client shutdown because it was never instantiated");
  }
}
