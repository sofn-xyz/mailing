import { execSync } from "child_process";

const WEB_TABLE_NAMES = [
  "NewsletterSubscriber",
  "Organization",
  "User",
  "ApiKey",
  "OauthAccessToken",
  "OauthAuthorizationCode",
];

const TABLE_NAMES = ["Organization"];

beforeAll(() => {
  const truncateSql = TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  execSync(`echo '${truncateSql}' | psql ${process.env.DATABASE_URL_TEST}`, {
    stdio: "ignore",
  });

  const webTruncateSql = WEB_TABLE_NAMES.map(
    (tableName) => `TRUNCATE TABLE "${tableName}" CASCADE;`
  ).join(" ");
  execSync(
    `echo '${webTruncateSql}' | psql ${process.env.WEB_DATABASE_URL_TEST}`,
    { stdio: "ignore" }
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

export default {};
