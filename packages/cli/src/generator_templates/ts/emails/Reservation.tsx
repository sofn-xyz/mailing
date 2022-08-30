import { ReactElement } from "react";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonPrimary from "./components/ButtonPrimary";
import {
  leadingTight,
  leadingRelaxed,
  textBase,
  textLg,
} from "./components/theme";

import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlSpacer,
} from "mjml-react";

type TextEmailProps = {
  name: string;
  headline?: string;
  body: ReactElement;
  bulletedList?: ReactElement;
  ctaText?: string;
};

const TextEmail: React.FC<TextEmailProps> = ({
  name,
  headline,
  body,
  bulletedList,
  ctaText,
}) => {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header />
        <MjmlSection padding="0 24px 0" cssClass="smooth">
          <MjmlColumn>
            <MjmlText
              padding="24px 0"
              fontSize={textLg}
              lineHeight={leadingTight}
              cssClass="paragraph"
            >
              {headline}
            </MjmlText>
            {bulletedList}
            <MjmlSpacer height="16px" />
            {ctaText && (
              <>
                <MjmlSpacer height="8px" />
                <ButtonPrimary link={"#"} uiText={ctaText} />
                <MjmlSpacer height="24px" />
              </>
            )}
            <MjmlText
              cssClass="paragraph"
              padding="0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
            >
              <>{body}</>
            </MjmlText>
            <MjmlText
              padding="16px 0"
              fontSize={textBase}
              lineHeight={leadingRelaxed}
              cssClass="paragraph"
            >
              ♥,
              <br />
              The BookBook Team
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default TextEmail;
