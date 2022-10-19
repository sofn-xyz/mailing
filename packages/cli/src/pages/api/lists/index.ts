import { NextApiRequest, NextApiResponse } from "next";
import { withSessionAPIRoute } from "src/util/session";

// interface Data {}

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
      res.status(200).end();
      break;
    default:
      return res.status(404).end();
  }
});

export default ApiLists;
