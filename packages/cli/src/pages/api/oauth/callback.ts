import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma/index";
import { host } from "../../../util/mailingApi";

type Cred = {
  client_id?: string;
  client_secret?: string;
  code?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { organizationId, userId, code } = req.query;

  if (
    typeof code !== "string" ||
    typeof organizationId !== "string" ||
    typeof userId !== "string"
  ) {
    return res.status(403).end("code, organizationId, userId required");
  }

  const response = await fetch(
    `${host}/api/oauth/client?code=${code}&userId=${userId}&organizationId=${organizationId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 201) {
    throw new Error("error fetching access token from web");
  }
  const json = await response.json();

  let org = await prisma.organization.findFirst({
    where: { id: organizationId },
  });
  if (!org) {
    // create the org locally if it doesn't exist
    org = {
      id: json.clientId,
      clientSecret: json.clientSecret,
    };
    await prisma.organization.create({ data: org });
  }

  req.session.user = { id: userId, accessToken: json.accessToken };

  res.status(200).json({ ok: true });
}
