// You should use this like so in any helper that uses prisma to manipulate the test database:
//
// import "path/to/assertIntegrationTestEnv";

if (
  !process.env.MAILING_DATABASE_URL?.match(/test$/) ||
  !process.env.WEB_DATABASE_URL?.match(/test$/)
)
  throw new Error(
    `refusing to run against non-test databases process.env.MAILING_DATABASE_URL: ${process.env.MAILING_DATABASE_URL} process.env.WEB_DATABASE_URL: ${process.env.WEB_DATABASE_URL}`
  );
