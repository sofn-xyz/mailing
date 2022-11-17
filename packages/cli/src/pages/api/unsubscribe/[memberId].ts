import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../prisma";
import { LIST_MEMBER_STATUSES } from "../../../util/api/validateMemberStatusInList";

export default async function unsubscribeMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ("PATCH" === req.method) {
    const data = req.body.data;

    // validate statuses are in the list
    const statuses = Object.keys(data).reduce((acc: string[], key) => {
      acc.push(data[key].status);
      return acc;
    }, []);

    if (
      statuses.find((status: any) => !LIST_MEMBER_STATUSES.includes(status))
    ) {
      return res
        .status(422)
        .json("status should be one of: " + LIST_MEMBER_STATUSES.join(", "));
    }

    for (const key in data) {
      const memberId = key;
      const status = data[key].status;
      await prisma.member.update({ where: { id: memberId }, data: { status } });
    }

    return res.status(200).end();
  } else {
    return res.status(404).end();
  }
}
