import { previewTree } from "./src/util/moduleManifestUtil";

async function getRootRedirect() {
  let destination = "/previews";
  const tree = previewTree();
  const firstPreview = tree[0];
  if (firstPreview && firstPreview[1]?.length) {
    destination = `/previews/${firstPreview[0]}/${firstPreview[1][0]}`;
  }

  return {
    source: "/",
    destination,
    permanent: true,
  };
}

module.exports = {
  eslint: {
    ignoreDuringBuilds: !process.env.MM_DEV,
  },
  async redirects() {
    return [await getRootRedirect()];
  },
};
