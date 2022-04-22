// import { resolve } from "path";
import React from "react";
import { getPreviewsDirectory } from "../paths";
import { readdirSync } from "fs-extra";
import {
  render,
  Mjml,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlImage,
  MjmlText,
  MjmlFont,
  MjmlAttributes,
  MjmlAll,
} from "mjml-react";

const PreviewIndex: React.FC = () => {
  const previewsDir = getPreviewsDirectory();

  if (!previewsDir) {
    return <h1>emails/previews not found</h1>;
  }

  const previews = readdirSync(previewsDir).filter((path) => !/^\./.test(path));

  return (
    <Mjml>
      <MjmlHead>
        <MjmlFont
          name="Inter"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900"
        />
        <MjmlAttributes>
          <MjmlAll font-family="Inter" />
        </MjmlAttributes>
      </MjmlHead>
      <MjmlBody width={500}>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText fontSize={32}>Previews</MjmlText>
            {previews.map((p) => (
              <MjmlText key={p}>{p}</MjmlText>
            ))}
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};

export default PreviewIndex;
