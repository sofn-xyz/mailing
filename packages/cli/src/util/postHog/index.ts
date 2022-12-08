import { debug } from "../serverLogger";
import { getConfig } from "../moduleManifestUtil";
import { getGeneratedAnonymousId } from "../config/anonymousId";

import { postHogClient, getPostHogClient } from "./client";
import { MAILING_VERSION } from "../../const/mailingVersion";

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
    properties: {
      mailing_version: MAILING_VERSION,
      ...options.properties,
    },
  };

  debug(`calling capture with ${JSON.stringify(captureOpts)}`);

  if (process.env.MM_DEV) {
    debug("returning early from capture because MM_DEV is set");
    return;
  }

  return postHogClient()?.capture(captureOpts);
}

export async function shutdown() {
  const client = getPostHogClient();
  if (client) {
    debug("calling postHog shutdown");
    try {
      await client.shutdownAsync();
    } catch (e) {
      debug(`error shutting down postHog client: ${e}`);
    }
  } else {
    debug("skipping postHog client shutdown because it was never instantiated");
  }
}
