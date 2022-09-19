import { GetServerSideProps, NextPage } from "next";
import { previewTree } from "../util/moduleManifestUtil";

export const getServerSideProps: GetServerSideProps = async () => {
  let destination = "/previews";
  const tree = previewTree();
  const firstPreview = tree[0];
  if (firstPreview && firstPreview[1]?.length) {
    destination = `/previews/${firstPreview[0]}/${firstPreview[1][0]}`;
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};

const Home: NextPage = () => {
  return null;
};

export default Home;
