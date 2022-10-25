import { NextApiRequest, NextApiResponse } from "next";
import {
  ResError,
  validate,
  validationErrorResponse,
} from "src/util/api/validate";
import { validateMemberStatusInList } from "src/util/api/validateMemberStatusInList";
import { withSessionAPIRoute } from "src/util/session";
import prisma from "../../../../../../prisma";

interface Data {
  error?: any;
  member?: any;
}

async function handlePatchListMember(
  memberId: string,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const status = req.body.status;

  const validatedMemberStatusInList = validateMemberStatusInList(status);

  if (validatedMemberStatusInList.hasError) {
    return validationErrorResponse(validatedMemberStatusInList, res);
  }

  await prisma.member.updateMany({
    where: { id: memberId },
    data: { status: req.body.status },
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

type ValidatedRequest = {
  hasError: false;
  validated: any;
};

function customValidation(req: NextApiRequest): ValidatedRequest | ResError {
  const listId = req.query.id;
  const memberId = req.query.memberId;

  // todo: validate that this list belongs to the user's organization

  if (typeof listId !== "string") {
    return {
      hasError: true,
      status: 422,
      error: "expected list id to be a string",
    };
  }

  if (typeof memberId !== "string") {
    return {
      hasError: true,
      status: 422,
      error: "expected member id to be a string",
    };
  }

  return {
    hasError: false,
    validated: {
      listId,
      memberId,
    },
  };
}

const ApiListMember = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const validatedRequest = validate(req, { loggedIn: true }, customValidation);

  if (validatedRequest.hasError)
    return validationErrorResponse(validatedRequest, res);

  const { listId, memberId } = validatedRequest.validated;

  switch (req.method) {
    case "PATCH":
      await handlePatchListMember(memberId, req, res);
      break;
    case "GET":
      await handleGetListMember(listId, memberId, res);
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiListMember;
