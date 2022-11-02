import NavBar from "../NavBar";
import { setup } from "../../../util/__test__/testUtils";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/previews/[[...path]]",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("NavBar", () => {
  beforeAll(() => {
    (process.env as any).HOME_FEATURE_FLAG = "1";
    (process.env as any).AUDIENCE_FEATURE_FLAG = "1";
  });

  it("render with correct current page", () => {
    const { getByRole } = setup(<NavBar>test</NavBar>);
    const nav = getByRole("navigation");
    expect(nav).toBeVisible();
    const homeLink = getByRole("link", { name: "Home" });
    expect(homeLink).toBeVisible();
    expect(homeLink.ariaCurrent).toBe(undefined);
    const previewsLink = getByRole("link", {
      name: "Previews",
      current: "page",
    });
    expect(previewsLink).toBeVisible();
  });

  describe("development mode", () => {
    beforeAll(() => {
      (process.env as any).NODE_ENV = "development";
    });
    afterAll(() => {
      (process.env as any).NODE_ENV = "test";
    });
    it("does not render navigation in dev", () => {
      const { queryByRole } = setup(<NavBar>test</NavBar>);
      const nav = queryByRole("navigation");
      expect(nav).toBeNull();
    });
  });
});
