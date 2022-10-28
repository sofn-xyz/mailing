import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../../prisma";

type Data = {
  error?: string;
};

const ApiSubscribe = async function (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const listId = req.query.id;

  if (typeof listId !== "string") {
    return res.status(422).json({ error: "expected listId to be a string" });
  }

  if (req.method === "POST") {
    const { email } = req.body;

    if (email) {
      const prismaResponse = await prisma.member.create({
        data: { listId, email, status: "subscribed" },
      });

      console.log(prismaResponse);

      return res.status(201).end();
    } else {
      return res
        .status(422)
        .json({ error: "please enter a valid email address" });
    }
  } else {
    return res.status(404).end();
  }
};

export default ApiSubscribe;
