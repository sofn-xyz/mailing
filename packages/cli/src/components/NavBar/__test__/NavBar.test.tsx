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
  it("render with correct current page", () => {
    process.env.NEXT_PUBLIC_STATIC = "true";
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

  it("does not render navigation if not static", () => {
    delete process.env.NEXT_PUBLIC_STATIC;
    const { queryByRole } = setup(<NavBar>test</NavBar>);
    const nav = queryByRole("navigation");
    expect(nav).toBeNull();
  });
});
