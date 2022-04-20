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
exports.handler = exports.describe = exports.command = void 0;
const fs_extra_1 = require("fs-extra");
const prompts_1 = __importDefault(require("prompts"));
const path_1 = require("path");
const log_1 = __importDefault(require("../log"));
const paths_1 = require("../paths");
const getPotentialEmailsDirPath = () => {
    const appRoot = require("app-root-path");
    if ((0, fs_extra_1.existsSync)(appRoot.resolve("src"))) {
        return appRoot.resolve("src/emails");
    }
    else {
        return appRoot.resolve("emails");
    }
};
const looksLikeTypescriptProject = () => {
    var _a, _b;
    const appRoot = require("app-root-path");
    if ((0, fs_extra_1.existsSync)(appRoot.resolve("tsconfig.json"))) {
        return true;
    }
    const pkgPath = appRoot.resolve("package.json");
    if ((0, fs_extra_1.existsSync)(pkgPath)) {
        const pkg = require(pkgPath);
        return !!(((_a = pkg.devDependencies) === null || _a === void 0 ? void 0 : _a.typescript) || ((_b = pkg.dependencies) === null || _b === void 0 ? void 0 : _b.typescript));
    }
    return false;
};
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
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    // check if emails directory already exists
    const existingEmailsPath = (0, paths_1.getExistingEmailsDir)();
    if (existingEmailsPath) {
        // if it does abort
        (0, log_1.default)("Directory 'emails' found at", existingEmailsPath);
    }
    else {
        (0, log_1.default)("Emails directory not found.");
        const emailsPath = getPotentialEmailsDirPath();
        const response = yield (0, prompts_1.default)({
            type: "text",
            name: "path",
            message: "Where should we generate it?",
            initial: emailsPath,
        });
        if (response.path) {
            const ts = yield (0, prompts_1.default)({
                type: "confirm",
                name: "value",
                message: "Are you using typescript?",
                initial: looksLikeTypescriptProject(),
            });
            // copy the emails dir template in!
            console.warn(ts);
            const path = `../generator_templates/${ts.value ? "ts" : "js"}/emails`;
            yield (0, fs_extra_1.copySync)((0, path_1.resolve)(__dirname, path), response.path, {
                overwrite: false,
            });
            (0, log_1.default)(`Generated your emails dir at ${response.path}`);
        }
        else {
            (0, log_1.default)("OK, bye!");
            return;
        }
    }
    const shouldStartPreviewMode = yield confirm(`Looks good. Start preview mode?`);
    if (shouldStartPreviewMode) {
        (0, log_1.default)("mailing preview");
        require("./preview").handler();
    }
    else {
        (0, log_1.default)("Bye!");
    }
});
exports.handler = handler;
