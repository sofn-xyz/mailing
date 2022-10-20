import { ValidatedRequestOrError } from "./validate";

export const LIST_MEMBER_STATUSES = [
  "pending",
  "subscribed",
  "unsubscribed",
  "cleaned",
  "transactional",
  "archived",
];

export function validateMemberStatusInList(
  status: string
): ValidatedRequestOrError {
  return LIST_MEMBER_STATUSES.includes(status)
    ? { hasError: false, validated: {} }
    : {
        hasError: true,
        status: 422,
        error: `expected status to be one of: ${LIST_MEMBER_STATUSES.join(
          ", "
        )}`,
      };
}
