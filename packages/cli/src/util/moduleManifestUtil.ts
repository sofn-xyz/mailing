import { JSXElementConstructor, ReactElement } from "react";
import { Template } from "mailing-core";
import moduleManifest, { config } from "../moduleManifest";

export function previewTree(): [string, string[]][] {
  return Object.entries(moduleManifest.previews).map(([name, preview]) => {
    return [
      name,
      typeof preview === "object"
        ? Object.keys(preview).filter(
            (k) => k !== "default" && k !== "__esModule"
          )
        : [],
    ];
  });
}

export function getTemplateModule(name?: string) {
  if (!name) return null;

  return moduleManifest.templates[
    name as keyof typeof moduleManifest.templates
  ] as unknown as Template<any>;
}

export function getPreviewModule(name: string) {
  return moduleManifest.previews[name as keyof typeof moduleManifest.previews];
}

export async function getPreviewComponent(
  name: string,
  functionName: string
): Promise<ReactElement<any, string | JSXElementConstructor<any>> | undefined> {
  const { previews } = moduleManifest;
  const previewModule:
    | {
        [key: string]: () => ReactElement | undefined;
      }
    | undefined = previews[name as keyof typeof previews] as any;
  const previewComponent = previewModule?.[functionName];

  return typeof previewComponent === "function"
    ? await previewComponent()
    : undefined;
}

export function getConfig(): MailingConfig {
  return config;
}
