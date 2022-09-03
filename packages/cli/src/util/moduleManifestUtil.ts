import { ReactElement } from "react";
import { previews, config } from "../moduleManifest";

export function previewTree(): [string, string[]][] {
  return Object.keys(previews).map((previewName: string) => {
    const m = previews[previewName as keyof typeof previews];
    return [previewName, Object.keys(m)];
  });
}

export function getPreviewModule(name: string) {
  return previews[name as keyof typeof previews];
}

export function getPreviewComponent(name: string, functionName: string) {
  const previewModule: {
    [key: string]: () => ReactElement;
  } = previews[name as keyof typeof previews] as any;
  return previewModule[functionName]();
}

export function getConfig(): MailingConfig {
  return config;
}
