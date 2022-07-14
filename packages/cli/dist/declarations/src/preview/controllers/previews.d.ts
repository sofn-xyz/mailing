/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export declare function showPreviewIndex(req: IncomingMessage, res: ServerResponse): void;
export declare function showPreview(req: IncomingMessage, res: ServerResponse): void;
export declare function sendPreview(req: IncomingMessage, res: ServerResponse): Promise<void>;
