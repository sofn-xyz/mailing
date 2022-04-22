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
exports.generateEmailsDirectory = exports.generateNextPages = exports.getPagesDirPath = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const prompts_1 = __importDefault(require("prompts"));
const paths_1 = require("../paths");
const log_1 = __importDefault(require("./log"));
function getPagesDirPath() {
    if ((0, fs_extra_1.existsSync)("./pages")) {
        return (0, path_1.resolve)("./pages");
    }
    else if ((0, fs_extra_1.existsSync)("./src/pages")) {
        return (0, path_1.resolve)("./src/pages");
    }
    return null;
}
exports.getPagesDirPath = getPagesDirPath;
function getPotentialEmailsDirPath() {
    if ((0, fs_extra_1.existsSync)("./src")) {
        return (0, path_1.resolve)("./src/emails");
    }
    else {
        return (0, path_1.resolve)("./emails");
    }
}
function generateNextPages({ isTypescript, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pagesPath = getPagesDirPath();
        if (!pagesPath) {
            (0, log_1.default)("Could not find pages directory. Aborting");
            return false;
        }
        if ((0, fs_extra_1.existsSync)((0, path_1.resolve)(pagesPath, "mailing"))) {
            (0, log_1.default)(`Pages for mailing found at ${(0, path_1.resolve)(pagesPath, "mailing")}`);
            return false;
        }
        const response = yield (0, prompts_1.default)({
            type: "text",
            name: "path",
            message: "Where should we generate your pages?",
            initial: pagesPath,
        });
        if (response.path) {
            // copy the emails dir template in!
            const path = `generator_templates/${isTypescript ? "ts" : "js"}/pages`;
            yield (0, fs_extra_1.copySync)((0, path_1.resolve)(__dirname, path), response.path, {
                overwrite: false,
            });
            (0, log_1.default)(`Generated your pages at ${response.path}`);
            return true;
        }
        else {
            (0, log_1.default)("OK, bye!");
            return false;
        }
    });
}
exports.generateNextPages = generateNextPages;
function generateEmailsDirectory({ isTypescript, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingEmailsPath = (0, paths_1.getExistingEmailsDir)();
        if (existingEmailsPath) {
            // if it does abort
            (0, log_1.default)(`Emails directory found at ${existingEmailsPath}`);
            return false;
        }
        (0, log_1.default)("Emails directory not found.");
        const emailsPath = getPotentialEmailsDirPath();
        const response = yield (0, prompts_1.default)({
            type: "text",
            name: "path",
            message: "Where should we generate it?",
            initial: emailsPath,
        });
        if (response.path) {
            // copy the emails dir template in!
            const path = `generator_templates/${isTypescript ? "ts" : "js"}/emails`;
            yield (0, fs_extra_1.copySync)((0, path_1.resolve)(__dirname, path), response.path, {
                overwrite: false,
            });
            (0, log_1.default)(`Generated your emails dir at ${response.path}`);
            return true;
        }
        else {
            (0, log_1.default)("OK, bye!");
            return false;
        }
    });
}
exports.generateEmailsDirectory = generateEmailsDirectory;
