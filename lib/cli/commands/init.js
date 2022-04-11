"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const prompts_1 = __importDefault(require("prompts"));
const LIBRARY_REGEX = /emails\.(tsx|jsx)/;
const pathHasExistingEmailsDir = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contents = yield (0, promises_1.readdir)(path);
        if (contents.some((i) => LIBRARY_REGEX.test(i))) {
            return true;
        }
    }
    catch (_a) { }
    return false;
});
const getExistingEmailsDir = () => __awaiter(void 0, void 0, void 0, function* () {
    const appRoot = require("app-root-path");
    if (yield pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
        return appRoot.resolve("src/emails");
    }
    if (yield pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
        return appRoot.resolve("emails");
    }
    return null;
});
const confirm = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, prompts_1.default)({
        type: "confirm",
        name: "value",
        message: question,
        initial: true,
    });
    return response.value;
});
exports.command = ["$0", "init"];
exports.describe = "initialize by generating the emails directory";
exports.handler = () => __awaiter(void 0, void 0, void 0, function* () {
    // check if emails directory already exists
    const existingEmailsPath = yield getExistingEmailsDir();
    if (existingEmailsPath) {
        // if it does abort
        console.log("Emails directory found at", existingEmailsPath);
        return;
    }
    const shouldGenerate = yield confirm(`Emails directory not found. Generate emails directory at emailsPath?`);
    if (shouldGenerate) {
        console.log("cool, copying");
    }
    const shouldStartPreviewMode = yield confirm(`OK, you're all set. Start preview mode?`);
    if (shouldStartPreviewMode) {
        console.log("TODO: starting...");
    }
    else {
        console.log("Bye!");
    }
});
