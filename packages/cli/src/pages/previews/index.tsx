import React from "react";
import { GetStaticProps, NextPage } from "next";

import { previewTree } from "../../util/moduleManifestUtil";
import PreviewViewer, {
  PreviewViewerProps,
} from "../../components/PreviewViewer";

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
