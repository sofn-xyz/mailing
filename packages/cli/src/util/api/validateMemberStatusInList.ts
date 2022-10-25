import { ValidatedRequestOrError } from "./validate";

export const LIST_MEMBER_STATUSES = ["subscribed", "unsubscribed"] as const;

export type ListMemberStatus = typeof LIST_MEMBER_STATUSES[number];

export function validateMemberStatusInList(
  status: ListMemberStatus
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
