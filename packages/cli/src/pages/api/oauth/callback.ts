import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/index";
import { host } from "../../../util/mailingApi";
import { withSessionRoute } from "../../../util/session";

const handler = withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { code } = req.query;

    if (typeof code !== "string") return res.status(403).end("code required");

    const response = await fetch(`${host}/api/oauth/client?code=${code}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 201) {
      console.error("response", response.status, await response.text());
      throw new Error("error fetching access token from web");
    }
    const json = await response.json();

    let org = await prisma.organization.findFirst({
      where: { id: json.clientId },
    });
    if (!org) {
      // create the org locally if it doesn't exist
      org = {
        id: json.clientId,
        clientSecret: json.clientSecret,
      };
      await prisma.organization.create({ data: org });
    }

    req.session.user = { id: json.userId, accessToken: json.accessToken };

    // OK, all set
    res.redirect("/");
  }
);

export default handler;
