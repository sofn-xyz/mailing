import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const ironSessionConfig = {
  cookieName: "mailing",
  password: process.env.SESSION_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 0,
};

export function withSessionAPIRoute(fn) {
  return withIronSessionApiRoute(fn, ironSessionConfig);
}

export function withSession(fn) {
  return withIronSessionSsr(fn, ironSessionConfig);
}
