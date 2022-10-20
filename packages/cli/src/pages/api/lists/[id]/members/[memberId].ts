import { NextApiRequest, NextApiResponse } from "next";
import { withSessionAPIRoute } from "src/util/session";

interface Data {
  error?: any;
  member?: any;
}

async function handlePatchListMember(
  listId: string,
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).end();
}

const ApiListMember = withSessionAPIRoute(async function (
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
    case "PATCH":
      await handlePatchListMember(listId, req, res);
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiListMember;
