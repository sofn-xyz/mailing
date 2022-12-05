import { ReactNode } from "react";

type CodeBlockProps = {
  children: ReactNode | ReactNode[];
  language: "JavaScript" | "Ruby" | "yarn" | "npm";
};

export default function CodeBlock({ children }: CodeBlockProps) {
  return children;
}
