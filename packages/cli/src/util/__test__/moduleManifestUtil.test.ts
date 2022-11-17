jest.mock("../../moduleManifest");

import moduleManifest from "../../moduleManifest";
import { previewTree } from "../moduleManifestUtil";

describe("moduleManifestUtil", () => {
  const ogPreviews = moduleManifest.previews;

  afterEach(() => {
    moduleManifest.previews = ogPreviews;
  });

  it("the original module manifest has a tree of preview components", () => {
    const previews = previewTree();
    expect(previews).toMatchSnapshot();
  });

  it("does not error on empty preview files", () => {
    moduleManifest.previews = { AccountCreated: {} } as any;
    expect(previewTree()[0]).toEqual(["AccountCreated", []]);

    moduleManifest.previews = { AccountCreated: false } as any;
    expect(previewTree()[0]).toEqual(["AccountCreated", []]);

    moduleManifest.previews = { AccountCreated: { default: jest.fn() } } as any;
    expect(previewTree()[0]).toEqual(["AccountCreated", []]);

    moduleManifest.previews = { AccountCreated: { __esModule: true } } as any;
    expect(previewTree()[0]).toEqual(["AccountCreated", []]);
  });
});
