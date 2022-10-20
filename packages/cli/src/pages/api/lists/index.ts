import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
import { User } from "prisma/generated/client";
import { withSessionAPIRoute } from "src/util/session";
import { validateLoggedIn } from "../../../util/api/validateLoggedIn";

interface Data {
  error?: string;
  list?: any;
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
  return res.json({ lists });
}

async function handleCreateList(
  user: User,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // validate name presence

  if (req.body.name) {
    const list = await prisma.list.create({
      data: { name: req.body.name, organizationId: user.organizationId },
    });
    return res.status(201).json({ list });
  } else {
    return res.status(422).json({ error: "name is required" });
  }
}

const ApiLists = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const validatedRequest = validateLoggedIn(req);

  if (validatedRequest.hasError) {
    const { status, error } = validatedRequest;
    return res.status(status).json({ error });
  }

  const { user } = validatedRequest;

  switch (req.method) {
    case "GET":
      handleGetLists(user, req, res);
      break;
    case "POST":
      handleCreateList(user, req, res);
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiLists;
