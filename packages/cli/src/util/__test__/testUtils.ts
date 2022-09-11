import type { JSXElementConstructor, ReactElement } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function setup(
  jsx: ReactElement<any, string | JSXElementConstructor<any>>
) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

export function triggerKey(key: string) {
  window.document.dispatchEvent(new KeyboardEvent("keydown", { key }));
}
