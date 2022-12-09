import type { Components } from "@mdx-js/react/lib";

import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import A from "./A";
import P from "./P";
import Li from "./Li";
import Ul from "./Ul";
import Code from "./Code";
import Pre from "./Pre";

const MDXComponents: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  a: A,
  p: P,
  li: Li,
  ul: Ul,
  code: Code,
  pre: Pre,
};

export default MDXComponents;
