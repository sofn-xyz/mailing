import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      accessToken: string;
    };
  }
}

const password = process.env.MAILING_SESSION_PASSWORD as string;

if (!password)
  throw new Error("process.env.MAILING_SESSION_PASSWORD must be set");

const ironSessionConfig = {
  cookieName: "mailing",
  password,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 0,
};

export function withSessionAPIRoute(handler: NextApiHandler) {
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

export function withSession(fn: any) {
  return withIronSessionSsr(fn, ironSessionConfig);
}
