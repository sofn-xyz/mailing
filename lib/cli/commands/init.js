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
const fs_1 = require("fs");
const prompts_1 = __importDefault(require("prompts"));
const child_process_1 = require("child_process");
const path_1 = require("path");
const pathHasExistingEmailsDir = (path) => {
    // could do a better check of whether this exists
    return (0, fs_1.existsSync)(path);
};
const getExistingEmailsDir = () => __awaiter(void 0, void 0, void 0, function* () {
    const appRoot = require("app-root-path");
    if (pathHasExistingEmailsDir(appRoot.resolve("src/emails"))) {
        return appRoot.resolve("src/emails");
    }
    if (pathHasExistingEmailsDir(appRoot.resolve("emails"))) {
        return appRoot.resolve("emails");
    }
    return null;
});
const getPotentialEmailsDirPath = () => __awaiter(void 0, void 0, void 0, function* () {
    const appRoot = require("app-root-path");
    if ((0, fs_1.existsSync)(appRoot.resolve("src"))) {
        return appRoot.resolve("src/emails");
    }
    else {
        return appRoot.resolve("emails");
    }
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
        console.log("Directory 'emails' found at", existingEmailsPath);
        return;
    }
    else {
        console.log("Emails directory not found.");
        const emailsPath = yield getPotentialEmailsDirPath();
        const response = yield (0, prompts_1.default)({
            type: "text",
            name: "path",
            message: `Where should we generate it?`,
            initial: emailsPath,
        });
        if (response.path) {
            // copy the init_template in!
            (0, promises_1.cp)((0, path_1.resolve)(__dirname, "../init_template"), response.path, {
                recursive: true,
            });
            console.log(`Generated your emails dir at ${response.path}`);
        }
        else {
            console.log("OK, bye!");
            return;
        }
    }
    const shouldStartPreviewMode = yield confirm(`OK, you're all set. Start preview mode?`);
    if (shouldStartPreviewMode) {
        console.log("gb preview");
        (0, child_process_1.execSync)(`gb preview`);
    }
    else {
        console.log("Bye!");
    }
});
