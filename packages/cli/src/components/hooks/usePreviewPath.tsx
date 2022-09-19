import { NextRouter, useRouter } from "next/router";

export default function usePreviewPath(): {
  previewClass?: string;
  previewFunction?: string;
  router: NextRouter;
} {
  const router = useRouter();
  const path = router?.query.path as string[] | undefined;
  const [previewClass, previewFunction] = path || [];
  return { previewClass, previewFunction, router };
}
