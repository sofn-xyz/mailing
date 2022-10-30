import { JSXElementConstructor, ReactElement } from "react";
import { previews, config } from "../moduleManifest";

export function previewTree(): [string, string[]][] {
  return Object.entries(previews).map(([name, preview]) => {
    return [
      name,
      typeof preview === "object"
        ? Object.keys(preview).filter((k) => k !== "default")
        : [],
    ];
  });
}

export function getPreviewModule(name: string) {
  return previews[name as keyof typeof previews];
}

export function getPreviewComponent(
  name: string,
  functionName: string
): ReactElement<any, string | JSXElementConstructor<any>> | undefined {
  const previewModule:
    | {
        [key: string]: () => ReactElement | undefined;
      }
    | undefined = previews[name as keyof typeof previews] as any;
  const previewComponent = previewModule?.[functionName];
  return typeof previewComponent === "function"
    ? previewComponent()
    : undefined;
}

export function getConfig(): MailingConfig {
  return config;
}
