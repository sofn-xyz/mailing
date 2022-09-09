import { randomUUID } from "crypto";

/*
  Functions for generating an anonymousId and get/set to a singleton
  this is necessary to report analytics the first time you run init,
  when you had no config and so argv has no anonymousId set
*/
let generatedAnonymousId: string | undefined;
// only call getOrSetGeneratedAnonymousId when an anonymousId is missing and *should be set*
// because otherwise setting generatedAnonymousId will create side effects.  The only time we do this
// is when we're generating an anonymousId for the first time
export function getOrSetGeneratedAnonymousId() {
  if (generatedAnonymousId) return generatedAnonymousId;

  const id = randomUUID();
  generatedAnonymousId = id;
  return id;
}

export function getGeneratedAnonymousId() {
  return generatedAnonymousId;
}
