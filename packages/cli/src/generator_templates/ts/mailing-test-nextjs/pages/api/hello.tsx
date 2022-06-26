// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../emails";
import MyFirstEmail from "../../emails/MyFirstEmail";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
  sendEmail({
    subject: "great subject",
    component: <MyFirstEmail name="bob" />,
  });
}
