import prisma from "../../../../../prisma";
import { validate } from "email-validator";
import { error } from "../../../../util/serverLogger";
import type { NextApiRequest, NextApiResponse } from "next/types";
import type { Prisma } from "../../../../../prisma/generated/client";

type Data = {
  error?: string;
  member?: { id: string };
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

    if (validate(email)) {
      try {
        const member = await prisma.member.create({
          data: { listId, email, status: "subscribed" },
          select: { id: true },
        });

        return res.status(201).json({ member });
      } catch (e) {
        // having some trouble with the above, so just assuming it's a duplicate for now
        // the best practice code descired in the prisma docs doesn't work because typeof error is not Prisma.PrismaClientKnownRequestError
        if ((e as Prisma.PrismaClientKnownRequestError).code === "P2002") {
          return res
            .status(422)
            .json({ error: "You’re already subscribed to that list" });
        } else if (
          (e as Prisma.PrismaClientKnownRequestError).code === "P2003"
        ) {
          return res.status(422).json({ error: "Could not find that list" });
        } else {
          error("an unknown error occurred", e);
          return res.status(500).json({ error: "an unknown error occurred" });
        }
      }
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
