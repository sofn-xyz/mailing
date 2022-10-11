import { withSessionAPIRoute } from "../../util/session";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  ok?: boolean;
};

const Logout = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.session.destroy();
  res.send({ ok: true });
});

export default Logout;
