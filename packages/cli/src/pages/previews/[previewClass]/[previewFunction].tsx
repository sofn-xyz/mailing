import React from "react";
import { GetStaticProps, NextPage } from "next";

import { render } from "../../../util/mjml";
import {
  getPreviewComponent,
  previewTree,
} from "../../../util/moduleManifestUtil";
import PreviewViewer, {
  PreviewViewerProps,
} from "../../../components/PreviewViewer";

type Params = { previewClass: string; previewFunction: string };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  const previews: [string, string[]][] = previewTree();

  previews.forEach((previewClass) => {
    paths = paths.concat(
      previewClass[1].map((previewFunction) => ({
        params: {
          previewClass: previewClass[0],
          previewFunction,
        },
      }))
    );
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { previewFunction, previewClass } = context.params as Params;
  const component = getPreviewComponent(previewClass, previewFunction);

  const preview = render(component);

  return {
    props: { initialData: { preview, previews: previewTree() } },
    revalidate: 1,
  };
};

const Preview: NextPage<PreviewViewerProps> = ({ initialData }) => {
  return <PreviewViewer initialData={initialData} />;
};

export default Preview;
