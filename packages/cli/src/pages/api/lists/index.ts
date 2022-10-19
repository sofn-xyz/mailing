import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma";
import { User } from "prisma/generated/client";
import { withSessionAPIRoute } from "src/util/session";

interface Data {
  error?: string;
  lists?: any;
}

async function handleGetLists(
  user: User,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const lists = await prisma.list.findMany({
    where: { organizationId: user.organizationId },
  });
  res.json({ lists });
}

const ApiLists = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = req.session.user;

  // require login
  if (!user) {
    return res.status(404).end();
  }

  switch (req.method) {
    case "GET":
      handleGetLists(user, req, res);
      break;
    case "POST":
      res.status(201).end();
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiLists;
