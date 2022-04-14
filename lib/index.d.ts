import { ReactElement, JSXElementConstructor } from "react";
import nodemailer from "nodemailer";
declare namespace mailing {
    type ComponentMail = {
        from: string;
        to: string | string[];
        cc?: string | string[];
        bcc?: string | string[];
        subject: string;
        component: ReactElement<any, string | JSXElementConstructor<any>>;
        text?: string;
        headers?: {
            [key: string]: string;
        };
    };
    type SendMailOptions = {
        transport: nodemailer.Transporter;
        defaulFrom?: string;
        forceDeliver?: boolean;
        forcePreview?: boolean;
    };
}
export declare function getTestMessageQueue(): Promise<any>;
export default function buildSendMail(options: mailing.SendMailOptions): (mail: mailing.ComponentMail) => Promise<void>;
export {};
