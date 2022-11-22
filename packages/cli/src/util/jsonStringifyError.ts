export function jsonStringifyError(err: Error) {
  return JSON.stringify(err, Object.getOwnPropertyNames(err));
}
