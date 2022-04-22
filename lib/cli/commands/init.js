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
const log_1 = __importDefault(require("../log"));
const paths_1 = require("../../paths");
const generators_1 = require("../generators");
function looksLikeTypescriptProject() {
    var _a, _b;
    if ((0, fs_extra_1.existsSync)("./tsconfig.json")) {
        return true;
    }
    const pkg = (0, paths_1.getPackageJSON)();
    return !!(((_a = pkg.devDependencies) === null || _a === void 0 ? void 0 : _a.typescript) || ((_b = pkg.dependencies) === null || _b === void 0 ? void 0 : _b.typescript));
}
const looksLikeNextJSProject = () => {
    var _a;
    const hasNextDependency = !!((_a = (0, paths_1.getPackageJSON)().dependencies) === null || _a === void 0 ? void 0 : _a.next);
    return hasNextDependency && !!(0, generators_1.getPagesDirPath)();
};
exports.command = ["$0", "init"];
exports.describe = "initialize mailing in your app";
const handler = () => __awaiter(void 0, void 0, void 0, function* () {
    // add preview to pages dir
    // add emails dir
    // open preview page??
    // check if emails directory already exists
    if (!(0, fs_extra_1.existsSync)("./package.json")) {
        (0, log_1.default)("No package.json found. Please run from the project root.");
        return;
    }
    if (!looksLikeNextJSProject()) {
        (0, log_1.default)("Please run from the root directory of a next.js project.");
        return;
    }
    const ts = yield (0, prompts_1.default)({
        type: "confirm",
        name: "value",
        message: "Are you using typescript?",
        initial: looksLikeTypescriptProject(),
    });
    const options = { isTypescript: ts.value };
    yield (0, generators_1.generateEmailsDirectory)(options);
    yield (0, generators_1.generateNextPages)(options);
    (0, log_1.default)("Looks good. Start your app and visit /mailing to see previews. Bye!");
});
exports.handler = handler;
