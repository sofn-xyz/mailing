import { Children, useState } from "react";

export default function CodeBlocks({ children }) {
  const languages: string[] = Children.map(
    children,
    (child) => child.props?.language
  );
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  return (
    <div>
      <div className="w-full bg-slate-500 p-2">
        {languages.map((language) => (
          <button
            className="bg-cyan-500 py-2 px-3 mr-2 text-sm uppercase"
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
