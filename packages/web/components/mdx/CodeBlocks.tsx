import { Children, ReactElement, useState } from "react";
import cx from "classnames";

type CodeBlocksProps = {
  children: ReactElement | ReactElement[];
};

export default function CodeBlocks({ children }: CodeBlocksProps) {
  const languages: string[] = Children.map(
    children,
    (child) => child.props?.language
  );
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <div className="not-prose bg-slate-900 rounded-3xl mt-10 mb-12">
      <div className="flex">
        {languages.map((language, i) => (
          <button
            className={cx(
              "pt-3 pb-2 px-8 text-sm border-b-2 hover:bg-gray-700 active:translate-y-px transition-all",
              {
                "border-green-300": language === currentLanguage,
                "border-transparent text-gray-400":
                  language !== currentLanguage,
                "rounded-tl-3xl": i === 0,
              }
            )}
            key={`button-key-${language}`}
            onClick={() => setCurrentLanguage(language)}
          >
            {language}
          </button>
        ))}
      </div>
      {Children.map(
        children,
        (child) => child.props?.language === currentLanguage && child
      )}
    </div>
  );
}
