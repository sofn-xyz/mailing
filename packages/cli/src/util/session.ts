import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

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

export function withSessionAPIRoute(fn: any) {
  if ("string" !== typeof password)
    throw new Error("process.env.MAILING_SESSION_PASSWORD is missing");
  return withIronSessionApiRoute(fn, ironSessionConfig);
}

export function withSession(fn: any) {
  if ("string" !== typeof password)
    throw new Error("process.env.MAILING_SESSION_PASSWORD is missing");
  return withIronSessionSsr(fn, ironSessionConfig);
}
