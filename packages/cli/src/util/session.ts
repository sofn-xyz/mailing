import { debug } from "./serverLogger";

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { User } from "prisma/generated/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

function ironSessionConfig(password: string) {
  return {
    cookieName: "mailing",
    password,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    ttl: 0,
  };
}

export function withSessionAPIRoute(handler: NextApiHandler) {
  if (process.env.MAILING_SESSION_PASSWORD) {
    return withIronSessionApiRoute(
      handler,
      ironSessionConfig(process.env.MAILING_SESSION_PASSWORD)
    );
  } else {
    // 404
    return function (req: NextApiRequest, res: NextApiResponse<void>) {
      debug(
        "process.env.MAILING_SESSION_PASSWORD was falsy so not using iron-session"
      );
      res.status(404).end();
    };
  }
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  if (process.env.MAILING_SESSION_PASSWORD) {
    return withIronSessionSsr(
      handler,
      ironSessionConfig(process.env.MAILING_SESSION_PASSWORD)
    );
  } else {
    // 404
    return async function getServerSideProps() {
      debug(
        "process.env.MAILING_SESSION_PASSWORD was falsy so not using iron-session"
      );
      return { notFound: true };
    };
  }
}
