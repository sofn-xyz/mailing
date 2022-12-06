import { MAILING_CORE_VERSION } from "../../const/mailingCoreVersion";
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
  const distinctId = options.distinctId;

  const captureOpts = {
    ...options,
    distinctId,
    properties: {
      mailing_version: MAILING_CORE_VERSION,
      ...options.properties,
    },
  };

  debug(`calling capture with ${JSON.stringify(captureOpts)}`);

  if (process.env.MM_DEV) {
    debug("returning early from capture because MM_DEV is set");
    return;
  }

  try {
    const client = postHogClient();
    if (!client) return;

    const capture = client.capture as any;

    switch (process.env.NODE_ENV) {
      case "production":
        capture(captureOpts);
        break;
      case "test":
        // call capture if it has been mocked
        if (capture.mock) capture(captureOpts);
        break;
      default:
        debug(
          `returning early from capture because NODE_ENV is ${process.env.NODE_ENV}`
        );
        break;
    }

    await client.shutdownAsync();
  } catch (e) {
    debug("posthog capture error", e);
  }
}
