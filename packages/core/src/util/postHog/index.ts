import { debug } from "../log";

import { postHogClient, getPostHogClient } from "./client";

// ** modified from posthog-node
interface IdentifyMessageV1 {
  distinctId: string;
  properties?: Record<string | number, any>;
}

interface EventMessageV1 extends IdentifyMessageV1 {
  event: string;
  groups?: Record<string, string | number>;
  sendFeatureFlags?: boolean;
}
export function capture(options: EventMessageV1) {
  const distinctId = options.distinctId;

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
    client.shutdown();

    // unfortunately, calling posthog-node's shutdown in a `finally` does not work without this, 1000ms is a guess
    await sleep(1000);
  } else {
    debug("skipping postHog client shutdown because it was never instantiated");
  }
}
