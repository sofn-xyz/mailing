import { Children, useState } from "react";
import cx from "classnames";

export default function CodeBlocks({ children }) {
  const languages: string[] = Children.map(
    children,
    (child) => child.props?.language
  );
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <div className="not-prose bg-slate-900 rounded-3xl">
      <div className="flex">
        {languages.map((language, i) => (
          <button
            className={cx(
              "py-2 px-5 text-sm uppercase hover:bg-gray-700 active:translate-y-px transition-all border-b-2",
              {
                "border-green-200": language === currentLanguage,
                "border-transparent": language !== currentLanguage,
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
