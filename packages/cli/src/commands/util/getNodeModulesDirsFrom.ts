import { resolve, join, sep } from "path";

// traversing up from startPath to the root, for each directory append a "node_modules" directory
export function getNodeModulesDirsFrom(startPath: string) {
  const nodeModulesDirs = [];

  const pathDepth = resolve(startPath).split(sep).length;
  let i = pathDepth;

  do {
    nodeModulesDirs.push(
      resolve(join(startPath, `..${sep}`.repeat(i - 1), "node_modules", "*"))
    );
  } while (--i);

  return nodeModulesDirs;
}
