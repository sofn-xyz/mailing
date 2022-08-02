import { ReactElement, JSXElementConstructor } from "react";
import nodemailer from "nodemailer";
import { render } from "./mjml";
export declare type ComponentMail = nodemailer.SendMailOptions & {
    component: ReactElement<any, string | JSXElementConstructor<any>>;
    forceDeliver?: boolean;
    forcePreview?: boolean;
};
export declare type BuildSendMailOptions = {
    transport: nodemailer.Transporter;
    defaultFrom: string;
};
export declare function getTestMailQueue(): Promise<any>;
export declare function clearTestMailQueue(): Promise<void>;
export declare function buildSendMail(options: BuildSendMailOptions): (mail: ComponentMail) => Promise<any>;
export { buildSendMail as default, render };
