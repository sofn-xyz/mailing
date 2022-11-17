// useful if you want to add some context to an error, e.g. if the same error could have been thrown in multiple places
export function wrapError(e: any, name: string) {
  e.name = `${name} (originally '${e.name}')`;
  return e;
}
