import React from "react";
import { GetStaticProps, NextPage } from "next";

import {
  getPreviewComponent,
  previewTree,
} from "../../util/moduleManifestUtil";
import PreviewViewer, {
  PreviewViewerProps,
} from "../../components/PreviewViewer";
import { flatten } from "lodash";
import { render } from "../../util/mjml";

type Params = { path: string[] };

export const getStaticPaths = async () => {
  let paths: {
    params: Params;
  }[] = [];

  const previews: [string, string[]][] = previewTree();

  paths = flatten([
    [], // /previews
    ...previews.map((p) => [
      [p[0]], // /previews/previewClass
      ...p[1].map((previewFunction) => [p[0], previewFunction]), // /previews/previewClass/previewFunction
    ]),
  ]).map((path) => ({
    params: { path },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  if (process.env.DISABLE_PREVIEWS) return { notFound: true };

  const { path } = context.params as Params;
  const [previewClass, previewFunction] = path || [];
  let preview = null;
  if (previewClass && previewFunction) {
    const component = await getPreviewComponent(previewClass, previewFunction);
    if (!component) {
      console.log(
        `${previewClass} or ${previewFunction} not found, redirecting to home`
      );
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    preview = render(component);
  } else if (!previewClass) {
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
  }

  return {
    props: { initialData: { previews: previewTree(), preview } },
    revalidate: 1,
  };
};

const PreviewIndex: NextPage<PreviewViewerProps> = ({ initialData }) => {
  return <PreviewViewer initialData={initialData} />;
};

export default PreviewIndex;
