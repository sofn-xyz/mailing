import React, { useState } from "react";
import { useRouter } from "next/router";

type Props = {
  html: string;
};

const Preview: React.FC<Props> = ({ html }) => {
  const router = useRouter();
  const { previewClass, previewFunction } = router.query;
  const [isMobile, setIsMobile] = useState(false);

  return (
    <p onClick={() => setIsMobile(!isMobile)}>
      {JSON.stringify(isMobile)}
      hmm Hello! {previewClass} {previewFunction}
      <iframe
        title="email-preview-frame"
        srcDoc={html as string}
        style={{
          marginTop: "8px",
          height: "calc(100vh - 50px)",
          width: "100vw",
          border: "0",
        }}
      />
    </p>
  );
};

export default Preview;
