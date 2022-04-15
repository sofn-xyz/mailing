import { resolve } from "path";
import React from "react";
import { getPreviewsDirectory } from "./paths";
import { readdirSync } from "fs-extra";
import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlTitle,
} from "mjml-react";
import Head from "./init_template/emails/components/Head";

const PreviewIndex: React.FC = () => {
  const previewsDir = getPreviewsDirectory();

  if (!previewsDir) {
    return <h1>emails/previews not found</h1>;
  }

  const previewCollections = readdirSync(previewsDir);
  const previews = previewCollections.map((p) => {
    return [p, require(resolve(previewsDir, p))];
  });

  return (
    <Mjml>
      <Head>
        <MjmlTitle>My very first email</MjmlTitle>
      </Head>
      <MjmlBody width={500}>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText fontSize={32}>Previews</MjmlText>
            {previews.map((p) => (
              <MjmlText key={p[0]}>
                <>
                  <MjmlText>{p[0]}</MjmlText>
                  {Object.keys(p[1]).map((previewFunction) => {
                    <MjmlText key={previewFunction}>
                      {previewFunction}
                    </MjmlText>;
                  })}
                </>
              </MjmlText>
            ))}
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};

export default PreviewIndex;
