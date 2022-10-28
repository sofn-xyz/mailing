import type { NextApiRequest, NextApiResponse } from "next/types";
import prisma from "../../../../../prisma";
import { Prisma } from "../../../../../prisma/generated/client";

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
      try {
        await prisma.member.create({
          data: { listId, email, status: "subscribed" },
        });

        return res.status(201).end();
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            return res
              .status(422)
              .json({ error: "You're already subscribed to that list" });
          }
        }
        return res.status(500).json({ error: "an unknown error occurred" });
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
