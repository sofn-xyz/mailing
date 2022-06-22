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
} from "mjml-react";

const PreviewIndex: React.FC = () => {
  const previewsDir = getPreviewsDirectory();

  if (!previewsDir) {
    return <h1>emails/previews not found</h1>;
  }

  const previewCollections = readdirSync(previewsDir).filter(
    (path) => !/^\./.test(path)
  );
  const previews: [string, object][] = previewCollections.map((p) => {
    const previewPath = resolve(previewsDir, p);
    return [p, require(previewPath)];
  });

  const firstTest =
    previews.length === 1 && previews[0][0] === "MyFirstEmail.tsx";

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
            <MjmlText fontSize={32} fontWeight={900}>
              Previews
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        {previews.map((p) => (
          <MjmlSection key={p[0]}>
            <MjmlColumn>
              <MjmlText fontSize={16} fontWeight={600}>
                {p[0]}
              </MjmlText>
              {Object.keys(p[1]).map((previewFunction) => (
                <MjmlText key={previewFunction} fontSize={16}>
                  <a href={`/${p[0]}/${previewFunction}`}>{previewFunction}</a>
                </MjmlText>
              ))}
            </MjmlColumn>
          </MjmlSection>
        ))}
        {firstTest && (
          <MjmlSection>
            <MjmlColumn>
              <MjmlText fontSize={16}>
                Tip: add a preview to emails/previews and it will appear here.
              </MjmlText>
            </MjmlColumn>
          </MjmlSection>
        )}
      </MjmlBody>
    </Mjml>
  );
};

export default PreviewIndex;
