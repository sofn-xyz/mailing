import { truncateCliDatabase, truncateWebDatabase } from "./testUtil";

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
