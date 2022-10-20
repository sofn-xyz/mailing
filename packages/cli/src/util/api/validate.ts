import { NextApiRequest, NextApiResponse } from "next";

export type ResError = { hasError: true; status: number; error: string };
export type ValidatedRequest = { hasError: false; validated: any };
export type ValidatedRequestOrError = ValidatedRequest | ResError;

interface ValidationOptions {
  loggedIn?: true;
}

export function validate(
  req: NextApiRequest,
  validationOptions: ValidationOptions,
  customValidation?: (req: NextApiRequest) => ValidatedRequest | ResError
): ValidatedRequestOrError {
  const hasCustomValidation = "function" === typeof customValidation;

  if (hasCustomValidation && validationOptions.loggedIn) {
    const validatedLoggedIn = validateLoggedIn(req);

    if (validatedLoggedIn.hasError) {
      return validatedLoggedIn;
    }

    return customValidation(req);
  } else if (hasCustomValidation) {
    return customValidation(req);
  } else if (validationOptions.loggedIn) {
    return validateLoggedIn(req);
  } else {
    throw new Error(
      "validate may be misconfigured, did you mean to validate something?"
    );
  }
}

export function validationErrorResponse(
  validatedRequest: ResError,
  res: NextApiResponse
) {
  const { status, error } = validatedRequest;
  return res.status(status).json({ error });
}

function validateLoggedIn(req: NextApiRequest): ValidatedRequestOrError {
  const user = req.session.user;

  if (!user) {
    return { hasError: true, status: 401, error: "you must be logged in" };
  }

  return { hasError: false, validated: { user } };
}

// Use this in your /api method to validate the user is logged in:

// import { ResError, validate, validationErrorResponse } from "THIS FILE";
// const MyApiMethod = withSessionAPIRoute(async function (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const validatedRequest = validate(req, { loggedIn: true });

//   if (validatedRequest.hasError)
//     return validationErrorResponse(validatedRequest, res);
//
//   ... your controller logic
//
// }

// You can also include additional custom validation as long as it returns the right types:
// ValidatedRequest | ResError

// Same thing as above but do:
//   const validatedRequest = validate(req, { loggedIn: true }, customValidation);
//
// And define a customValidation function:
//
// function customValidation(req: NextApiRequest): ValidatedRequest | ResError {
//   const listId = req.query.id;
//
//   if (typeof listId !== "string") {
//     return {
//       hasError: true,
//       status: 422,
//       error: "expected list id to be a string",
//     };
//   }
//
//   return {
//     hasError: false,
//     validated: {
//       listId,
//       memberId,
//     },
//   };
// }
