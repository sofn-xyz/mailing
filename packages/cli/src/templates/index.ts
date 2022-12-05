export function getTemplatePath() {
  if (process.env.MAILING_INTEGRATION_TEST || process.env.NODE_ENV === "test") {
    return "templates/test";
  }
  return "templates/default";
}
