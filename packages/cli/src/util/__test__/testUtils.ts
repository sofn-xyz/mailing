import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

export function setup(
  jsx: ReactElement
): ReturnType<typeof render> & { user: UserEvent } {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

export function triggerKey(key: string) {
  window.document.dispatchEvent(new KeyboardEvent("keydown", { key }));
}
