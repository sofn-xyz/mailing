import { sep } from "path";
import { getNodeModulesDirsFrom } from "../getNodeModulesDirsFrom";

describe("getNodeModulesDirsFrom", () => {
  it("should return an array with all the node_modules folders", () => {
    const output = getNodeModulesDirsFrom(".");
    expect(output.length).toBeGreaterThan(0);

    // for esbuild to look in the right place, it must end in "/*"
    const regexp = new RegExp(`${sep}node_modules${sep}\\*$`);
    expect(output[0]).toMatch(regexp);
  });
});
