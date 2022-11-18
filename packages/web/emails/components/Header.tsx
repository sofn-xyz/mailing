import {
  MjmlColumn,
  MjmlGroup,
  MjmlImage,
  MjmlSection,
  MjmlWrapper,
} from "mjml-react";
import { colors } from "../theme";
import assetUrl from "../util/assetUrl";

export default function Header() {
  return (
    <MjmlWrapper
      padding="48px 0 64px"
      backgroundColor={colors.amber200}
      backgroundUrl={assetUrl("/assets/header-background.png")}
      backgroundRepeat="no-repeat"
      backgroundSize={"100% 312"}
    >
      <MjmlSection cssClass="gutter" paddingBottom={92}>
        <MjmlGroup>
          <MjmlColumn>
            <MjmlImage
              width="110px"
              height="24px"
              align="left"
              src={assetUrl("/assets/logo-full.png")}
              href="https://mailing.run"
            />
          </MjmlColumn>
          <MjmlColumn>
            <MjmlImage
              width="170px"
              height="28px"
              align="right"
              src={assetUrl("/assets/header-side.png")}
            />
          </MjmlColumn>
        </MjmlGroup>
      </MjmlSection>
      <MjmlSection cssClass="gutter">
        <MjmlColumn>
          <MjmlImage
            width={202}
            align="left"
            src={assetUrl("/assets/zero-point-nine.gif")}
          />
        </MjmlColumn>
      </MjmlSection>
    </MjmlWrapper>
  );
}
