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
// import { resolve } from "path";
const paths_1 = require("./paths");
const fs_extra_1 = require("fs-extra");
function PreviewIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        const previewsDir = yield (0, paths_1.getPreviewsDirectory)();
        if (!previewsDir) {
            return <h1>emails/previews not found</h1>;
        }
        const previews = yield (0, fs_extra_1.readdir)(previewsDir);
        return (<div>
      <h1>hi</h1>
      {previews}
    </div>);
    });
}
exports.default = PreviewIndex;
