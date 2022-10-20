import { withSessionAPIRoute } from "src/util/session";
import prisma from "../../../../../prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  error?: string;
  members?: any;
}

async function handleGetListMembers(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // todo: validate that this list belongs to the user's organization
  const listId = req.query.id;

  if (typeof listId !== "string") {
    res.status(422).end("expected listId to be a string");
  }

  const members = await prisma.member.findMany({
    where: { id: listId as string },
  });

  res.json({ members });
}

const ApiListMembers = withSessionAPIRoute(async function (
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
      await handleGetListMembers(req, res);

      break;
    default:
      return res.status(404).end();
  }
});

export default ApiListMembers;
