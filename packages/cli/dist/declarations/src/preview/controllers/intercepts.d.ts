/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
export declare function createIntercept(req: IncomingMessage, res: ServerResponse): void;
export declare function showIntercept(req: IncomingMessage, res: ServerResponse): void;
