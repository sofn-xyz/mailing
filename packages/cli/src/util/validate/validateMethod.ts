import { NextApiRequest, NextApiResponse } from "next";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function validateMethod(
  validMethods: HttpMethod[],
  req: NextApiRequest,
  res: NextApiResponse
): boolean {
  if (0 === validMethods.length)
    throw new Error("must include at least one valid method");

  if (validMethods.includes(req.method as HttpMethod)) {
    return true;
  } else {
    res.status(405).end();
    return false;
  }
}
