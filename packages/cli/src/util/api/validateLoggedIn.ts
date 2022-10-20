import { NextApiRequest } from "next";
import { User } from "prisma/generated/client";

type ValidatedRequestOrError =
  | { hasError: false; user: User }
  | { hasError: true; status: number; error: string };

export function validateLoggedIn(req: NextApiRequest): ValidatedRequestOrError {
  const user = req.session.user;

  if (!user) {
    return { hasError: true, status: 401, error: "you must be logged in" };
  }

  return { hasError: false, user };
}

// Use this in your /api method like so:
//
// const MyApiMethod = withSessionAPIRoute(async function (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const validatedRequest = validateLoggedIn(req);
//
//   if (validatedRequest.hasError) {
//     const { status, error } = validatedRequest;
//     return res.status(status).json({ error });
//   }
//
//   const { user } = validatedRequest;
//
//   ... your controller logic goes here
//
// });
