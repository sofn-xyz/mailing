import { MjmlSection, MjmlColumn, MjmlImage, MjmlWrapper } from "mjml-react";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Button from "./components/Button";
import Link from "./components/Link";
import Header from "./components/Header";
import Text from "./components/Text";
import { fontSize, colors } from "./theme";
import assetUrl from "./util/assetUrl";

const NewsletterSection = ({
  noBorder,
  children,
}: {
  noBorder?: boolean;
  children: React.ReactNode;
}) => (
  <MjmlSection cssClass="gutter" backgroundColor={colors.black}>
    <MjmlColumn
      paddingBottom={32}
      paddingTop={32}
      borderBottom={noBorder ? "" : `1px dotted ${colors.gray500}`}
    >
      {children}
    </MjmlColumn>
  </MjmlSection>
);

export default function Newsletter() {
  return (
    <Layout>
      <Header />
      <MjmlWrapper padding="32px 0" backgroundColor={colors.black}>
        <NewsletterSection>
          <Heading fontSize={fontSize.xl} paddingBottom={4}>
            New in Mailing 0.9
          </Heading>
          <Text fontSize={fontSize.xs} color={colors.slate400}>
            You&rsquo;re receiving this email because you asked for occasional
            updates about Mailing.
          </Text>
        </NewsletterSection>

        <NewsletterSection>
          <Heading fontSize={fontSize.lg} paddingBottom={24}>
            Mailing Lists{" "}
            <Text
              style={{
                color: colors.green300,
                textTransform: "uppercase",
                fontSize: fontSize.sm,
              }}
            >
              Free Beta
            </Text>
          </Heading>
          <MjmlImage
            width={540}
            paddingBottom={24}
            src={assetUrl("/assets/mailing-lists.png")}
          />
          <Text paddingBottom={32}>
            Mailing Lists is now in Beta! Beta testers can now use Mailing to
            track send, click, and open analytics and to give your users the
            ability to unsubscribe from individual email lists that
            they&rsquo;re subscribed to.
          </Text>
          <Text paddingBottom={32}>
            This feature is part of the forthcoming Mailing Platform.
            We&rsquo;re dogfooding it ourselves (this email is sent via Mailing
            Platform!) and welcome other brave testers as we iron out the kinks.
            It requires a PostgreSQL database to be connected to Mailing, so
            please{" "}
            <Link href="mailto:peter@campsh.com?subject=Help getting Mailing List setup">
              get in touch
            </Link>{" "}
            if you need help getting set up with your own db or a db in our
            cloud. In the future we plan to charge for this feature set and
            offer a hosted version.
          </Text>
          <Button
            href="https://www.mailing.run/docs/lists"
            fontSize={fontSize.sm}
            width="100%"
          >
            Check out the Docs&nbsp;&nbsp;&rarr;
          </Button>
        </NewsletterSection>

        <NewsletterSection>
          <Heading fontSize={fontSize.lg} paddingBottom={24}>
            HTML Linter
          </Heading>
          <MjmlImage
            width={540}
            paddingBottom={24}
            src={assetUrl("/assets/html-linter.png")}
          />
          <Text paddingBottom={8}>
            It&rsquo;s common to use locally hosted images or relative links in
            development, but you never want to send a production email with
            those. The linter helps you catch these errors.
          </Text>
        </NewsletterSection>

        <NewsletterSection>
          <Heading fontSize={fontSize.lg} paddingBottom={24}>
            Force Deliver
          </Heading>
          <MjmlImage
            width={540}
            paddingBottom={24}
            src={assetUrl("/assets/force-deliver.png")}
          />
          <Text paddingBottom={8}>
            Mailing automatically catches emails that you send locally, but
            sometimes you really want to send an intercepted email. Now you can.
          </Text>
        </NewsletterSection>

        <NewsletterSection noBorder>
          <Heading fontSize={fontSize.lg} paddingBottom={24}>
            Thanks!
          </Heading>
          <MjmlImage
            width={540}
            paddingBottom={24}
            src={assetUrl("/assets/thanks.png")}
          />
          <Text paddingBottom={8}>
            We couldn&rsquo;t accomplish any of this without our awesome
            community of early users. We appreciate y&rsquo;all trying Mailing
            early. Each and every GitHub issue has been tremendously helpful in
            refining the tool and motivates us to keep going.
            <br />
            <br />
            All best,
            <br />
            Peter
          </Text>
        </NewsletterSection>
      </MjmlWrapper>
      <Footer />
    </Layout>
  );
}
