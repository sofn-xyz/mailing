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
exports.getTestMessageQueue = void 0;
const open_1 = __importDefault(require("open"));
const tmp_promise_1 = require("tmp-promise");
const fs_1 = __importDefault(require("fs"));
const mjml_react_1 = require("mjml-react");
// In test, we write the email queue to this file so that it can be read
// by the test process.
const TMP_TEST_FILE = "tmp-testMessageQueue.json";
function getTestMessageQueue() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.TEST || process.env.NODE_ENV === "test") {
            throw new Error("tried to get test message queue not in test mode");
        }
        try {
            const queue = yield fs_1.default.readFileSync(TMP_TEST_FILE);
            return JSON.parse(queue.toString());
        }
        catch (e) {
            return [];
        }
    });
}
exports.getTestMessageQueue = getTestMessageQueue;
function buildSendMail(options) {
    const forcePreview = options.forcePreview ||
        (process.env.NODE_ENV === "development" && !options.forceDeliver);
    const testMode = process.env.TEST || process.env.NODE_ENV === "test";
    return function sendMail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const renderedComponent = (0, mjml_react_1.render)(mail.component);
            // Create a mail for nodemailer with the component rendered to HTML.
            const htmlMail = Object.assign(mail, {
                html: renderedComponent.html,
                component: undefined,
            });
            if (testMode) {
                const testMessageQueue = yield getTestMessageQueue();
                testMessageQueue.push(htmlMail);
                fs_1.default.writeFileSync(TMP_TEST_FILE, JSON.stringify(testMessageQueue));
                return;
            }
            if (forcePreview) {
                const { path } = yield (0, tmp_promise_1.file)();
                console.log("writing to path", path);
                fs_1.default.writeFileSync(path, renderedComponent.html);
                (0, open_1.default)(path);
                return;
            }
            yield options.transport.sendMail(htmlMail);
        });
    };
}
exports.default = buildSendMail;
