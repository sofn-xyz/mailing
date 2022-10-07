import { truncateCliDatabase, truncateWebDatabase } from "./e2eUtil";
import chalk from "chalk";

if (!process.env.MAILING_CI) {
  throw new Error(
    chalk.red(
      "Refusing to run outside of CI mode! WARNING: running the e2e tests against your development server will cause test data to be inserted into your development database.  To run these tests locally, use `yarn ci:e2e` instead."
    )
  );
}

if (
  !process.env.DATABASE_URL?.match(/test$/) ||
  !process.env.WEB_DATABASE_URL?.match(/test$/)
)
  throw new Error(
    `refusing to run against non-test databases process.env.DATABASE_URL: ${process.env.DATABASE_URL} process.env.WEB_DATABASE_URL: ${process.env.WEB_DATABASE_URL}`
  );

beforeAll(() => {
  truncateCliDatabase();
  truncateWebDatabase();
});

afterEach(() => {
  jest.resetAllMocks();
});

export default {};
