import { Children, useState } from "react";
import Code from "../mdx/Code";
import Pre from "../mdx/Pre";

export default function CodeBlocks({ children }) {
  const languages: string[] = Children.map(children, (child) => {
    return child.props?.language;
  });

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const content = children.find(
    (child) => child.props?.language === selectedLanguage
  );

  return (
    <div>
      <div className="w-full bg-slate-500 p-2">
        {languages.map((language) => (
          <button
            className="bg-cyan-500 py-2 px-3 mr-2 text-sm uppercase"
            key={`button-key-${language}`}
            onClick={() => setSelectedLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
      <Pre>
        <Code>{content}</Code>
      </Pre>
    </div>
  );
}
