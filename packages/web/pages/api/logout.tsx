import { withSessionAPIRoute } from "../../util";
import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";

const Logout = withSessionAPIRoute(async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.session.destroy();
  res.send({ ok: true });
});

export default Logout;
