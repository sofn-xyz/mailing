import { NextApiRequest, NextApiResponse } from "next";
import { withSessionAPIRoute } from "src/util/session";
import prisma from "../../../../../../prisma";

interface Data {
  error?: any;
  member?: any;
}

async function handlePatchListMember(
  listId: string,
  memberId: string,
  res: NextApiResponse<Data>
) {
  // todo: fix me, does this need to be updateMany?
  // todo: should take status from req
  await prisma.member.updateMany({
    where: { listId, email: memberId },
    data: { status: "unsubscribed" },
  });

  res.status(200).end();
}

async function handleGetListMember(
  listId: string,
  memberId: string,
  res: NextApiResponse<Data>
) {
  const member = await prisma.member.findFirst({
    where: {
      listId,
      email: memberId,
    },
  });

  // todo: update the member info

  res.json({ member });
}

type ValidatedRequestOrError =
  | { hasError: false; listId: string; memberId: string }
  | { hasError: true; status: number; error: string };

function validateRequest(req: NextApiRequest): ValidatedRequestOrError {
  // require login
  if (!req.session.user) {
    return { hasError: true, status: 401, error: "you must be logged in" };
  }

  // todo: validate that this list belongs to the user's organization
  if (typeof req.query.id !== "string") {
    return {
      hasError: true,
      status: 422,
      error: "expected list id to be a string",
    };
  }

  if (typeof req.query.memberId !== "string") {
    return {
      hasError: true,
      status: 422,
      error: "expected member id to be a string",
    };
  }

  return {
    hasError: false,
    listId: req.query.id,
    memberId: req.query.memberId,
  };
}

const ApiListMember = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const validatedRequest = validateRequest(req);

  if (validatedRequest.hasError) {
    const { status, error } = validatedRequest;
    return res.status(status).json({ error });
  }

  const { listId, memberId } = validatedRequest;

  switch (req.method) {
    case "PATCH":
      await handlePatchListMember(listId, memberId, res);
      break;
    case "GET":
      await handleGetListMember(listId, memberId, res);
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiListMember;
