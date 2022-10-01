import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  PreviewData,
} from "next";
import { ParsedUrlQuery } from "querystring";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const password = process.env.MAILING_SESSION_PASSWORD as string;

const ironSessionConfig = {
  cookieName: "mailing",
  password,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 0,
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironSessionConfig);
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironSessionConfig);
}
