export function jsonStringifyError(err: any) {
  if (err instanceof Error) {
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
  } else {
    console.error("jsonStringifyError called with non-Error", err);
    return JSON.stringify(err);
  }
}
