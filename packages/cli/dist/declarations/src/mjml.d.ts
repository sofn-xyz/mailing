import { JSXElementConstructor, ReactElement } from "react";
export declare function render(component: ReactElement<any, string | JSXElementConstructor<any>>): {
    html: string;
    errors: import("mjml-react").MjmlError[];
};
