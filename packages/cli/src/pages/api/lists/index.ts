import type { User } from "prisma/generated/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
import { withSessionAPIRoute } from "src/util/session";
import { validate, validationErrorResponse } from "../../../util/api/validate";

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
      data: {
        name: req.body.name,
        displayName: req.body.name.capitalize(),
        organizationId: user.organizationId,
        isDefault: false,
      },
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
  const validatedRequest = validate(req, { loggedIn: true });

  if (validatedRequest.hasError)
    return validationErrorResponse(validatedRequest, res);

  const { user } = validatedRequest.validated;

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
