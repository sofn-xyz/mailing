import React from "react";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { previewClass, previewFunction } = router.query;

  return (
    <p>
      Hello! {previewClass} {previewFunction}
    </p>
  );
};

export default Post;
