function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

type H2Props = {
  children: string;
};

export default function H2({ children }: H2Props) {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;

  return (
    <h2 id={anchor} className="text-3xl">
      <a href={link} className="anchor-link no-underline">
        🔗 {children}
      </a>
    </h2>
  );
}
