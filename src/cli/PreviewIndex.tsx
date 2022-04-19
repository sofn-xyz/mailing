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
  MjmlFont,
  MjmlHead,
  MjmlAll,
  MjmlAttributes,
  MjmlTitle,
  MjmlButton,
} from "mjml-react";

const PreviewIndex: React.FC = () => {
  const previewsDir = getPreviewsDirectory();

  if (!previewsDir) {
    return <h1>emails/previews not found</h1>;
  }

  const previewCollections = readdirSync(previewsDir);
  const previews: [string, object][] = previewCollections.map((p) => {
    return [p, require(resolve(previewsDir, p))];
  });

  return (
    <Mjml>
      <MjmlHead>
        <MjmlTitle>Mailing Previews</MjmlTitle>
        <MjmlFont
          name="Inter"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;600;900"
        />
        <MjmlAttributes>
          <MjmlAll font-family="Inter" />
        </MjmlAttributes>
      </MjmlHead>
      <MjmlBody width={900}>
        <MjmlSection>
          <MjmlColumn>
            <MjmlText fontSize={32}>Previews</MjmlText>
            {previews.map((p) => (
              <MjmlText key={p[0]}>
                <>
                  <MjmlText>{p[0]}</MjmlText>
                  {Object.keys(p[1]).map((previewFunction) => (
                    <MjmlText key={previewFunction}>
                      <br />-{" "}
                      <a href={`/${p[0]}/${previewFunction}`}>
                        {previewFunction}
                      </a>
                    </MjmlText>
                  ))}
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
