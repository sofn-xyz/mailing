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
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewIndexLoader = void 0;
const paths_1 = require("../paths");
const fs_extra_1 = require("fs-extra");
function previewIndexLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        const previewsDir = (0, paths_1.getPreviewsDirectory)();
        if (!previewsDir) {
            return { previews: [] };
        }
        require.context("../../../../../emails", true, /\.tsx$/);
        // console.log(previewModules);
        // const previews = previewModules.map((m) => {
        //   return [m.]
        // })
        const previewCollections = (0, fs_extra_1.readdirSync)(previewsDir).filter((path) => !/^\./.test(path));
        const previews = previewCollections.map((p) => {
            const previewModule = require("/Users/petersugihara/test-app-ts/emails/previews/MyFirstEmail");
            return [p, Object.keys(previewModule)];
        });
        return { previews };
    });
}
exports.previewIndexLoader = previewIndexLoader;
