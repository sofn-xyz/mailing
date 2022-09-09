import React from "react";
import { GetStaticProps, NextPage } from "next";

import { previewTree } from "../../../util/moduleManifestUtil";
import PreviewViewer, {
  PreviewViewerProps,
} from "../../../components/PreviewViewer";

type Params = { previewClass: string };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  const previews: [string, string[]][] = previewTree();

  previews.forEach((p) => {
    paths.push({ params: { previewClass: p[0] } });
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { initialData: { previews: previewTree() } },
    revalidate: 1,
  };
};

const PreviewIndex: NextPage<PreviewViewerProps> = ({ initialData }) => {
  return <PreviewViewer initialData={initialData} />;
};

export default PreviewIndex;
