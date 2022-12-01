import { debug } from "../serverLogger";

import { postHogClient } from "./client";

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
export async function capture(options: EventMessageV1) {
  if (process.env.NODE_ENV !== "production") return;

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

  try {
    postHogClient()?.capture(captureOpts);
    await postHogClient()?.shutdownAsync();
  } catch (e) {
    debug("posthog capture error", e);
  }
}
