import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
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

async function handleCreateList(
  user: User,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // validate name presence

  if (req.query.name) {
    await prisma.list.create({
      data: { name: "Testme", organizationId: user.organizationId },
    });
    res.status(201).end();
  } else {
    res.status(422).json({ error: "name is required" });
  }
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
      handleCreateList(user, req, res);
      res.status(201).end();
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiLists;
