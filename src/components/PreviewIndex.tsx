import React from "react";

export type PreviewIndexProps = {
  previews: [string, string[]][];
};

export function PreviewIndex({ previews }: PreviewIndexProps) {
  const firstTest = previews.length === 1 && previews[0][0] === "MyFirstEmail";

  console.log(previews);
  return (
    <div>
      <h1>Previews</h1>
      {previews.map((p) => (
        <>
          <h4>{p[0]}</h4>
          {p[1].map((previewFunction) => (
            <div key={previewFunction}>
              - <a href={`/${p[0]}/${previewFunction}`}>{previewFunction}</a>
            </div>
          ))}
        </>
      ))}
      {firstTest && (
        <h3>Add a preview to emails/previews and it will apprear here.</h3>
      )}
    </div>
  );
}
