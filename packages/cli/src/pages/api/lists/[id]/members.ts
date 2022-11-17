import { withSessionAPIRoute } from "src/util/session";
import prisma from "../../../../../prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { validationErrorResponse } from "src/util/api/validate";
import { validateMemberStatusInList } from "src/util/api/validateMemberStatusInList";
import { validate } from "email-validator";

interface Data {
  error?: string;
  member?: any;
  members?: any;
}

async function handleCreateListMember(
  listId: string,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, status } = req.body;

  if (!validate(email)) {
    return res.status(422).json({ error: "expected an 'email' field" });
  }

  const validatedMemberStatusInList = validateMemberStatusInList(status);

  if (validatedMemberStatusInList.hasError) {
    return validationErrorResponse(validatedMemberStatusInList, res);
  }

  const member = await prisma.member.create({
    data: {
      listId,
      email,
      status,
    },
  });

  return res.status(201).json({ member });
}

async function handleGetListMembers(
  listId: string,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const members = await prisma.member.findMany({
    where: { id: listId as string },
  });

  return res.json({ members });
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

  // todo: validate that this list belongs to the user's organization
  const listId = req.query.id;

  if (typeof listId !== "string") {
    return res.status(422).json({ error: "expected listId to be a string" });
  }

  switch (req.method) {
    case "GET":
      await handleGetListMembers(listId, req, res);
      break;
    case "POST":
      await handleCreateListMember(listId, req, res);
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiListMembers;
