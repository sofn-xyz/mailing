import { disconnectDatabases, truncateDatabases } from "./testUtilIntegration";
import chalk from "chalk";

if (!process.env.MAILING_INTEGRATION_TEST) {
  throw new Error(
    chalk.red(
      "Refusing to run outside of CI mode! WARNING: running the integration tests against your development server will cause test data to be inserted into your development database.  To run these tests locally, use `yarn ci:test:integration` instead."
    )
  );
}

if (
  !process.env.MAILING_DATABASE_URL?.match(/test$/) ||
  !process.env.WEB_DATABASE_URL?.match(/test$/)
)
  throw new Error(
    `refusing to run against non-test databases process.env.MAILING_DATABASE_URL: ${process.env.MAILING_DATABASE_URL} process.env.WEB_DATABASE_URL: ${process.env.WEB_DATABASE_URL}`
  );

beforeAll(async () => {
  await truncateDatabases();
});

afterAll(async () => {
  await disconnectDatabases();
});

afterEach(() => {
  jest.resetAllMocks();
});

export default {};
