import { Children, useState, useCallback } from "react";
import Code from "../mdx/Code";
import Pre from "../mdx/Pre";

export default function CodeBlocks({ children }) {
  const languages: string[] = useCallback(
    () =>
      Children.map(children, (child) => {
        return child.props?.language;
      }),
    []
  )();

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const selectedChild = children.find(
    (child) => child.props?.language === selectedLanguage
  );

  return (
    <div>
      <div className="w-full bg-slate-700 p-2">
        {languages.map((language) => (
          <button
            className="bg-green-800 py-2 px-3 mr-2 text-sm uppercase"
            key={`button-key-${language}`}
            onClick={() => setSelectedLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
      <Pre reducePadding>
        <Code>{selectedChild}</Code>
      </Pre>
    </div>
  );
}
