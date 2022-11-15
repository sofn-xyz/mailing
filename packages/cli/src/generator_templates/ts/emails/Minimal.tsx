import Head from "./components/Head";
import { Mjml, MjmlBody } from "mjml-react";

const Minimal: React.FC<{ text: string }> = ({ text }) => (
  <Mjml>
    <Head />
    <MjmlBody width={600}>{text}</MjmlBody>
  </Mjml>
);

export default Minimal;
