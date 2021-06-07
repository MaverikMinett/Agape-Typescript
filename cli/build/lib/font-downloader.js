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
exports.FontDownloader = void 0;
const fetch = require("node-fetch");
/* Use for downloading fonts from google fonts api */
class FontDownloader {
    retrieveFont(url) {
        return __awaiter(this, void 0, void 0, function* () {
            /* get truetype */
            const css = yield this.retrieveFontStylesheet(url, "truetype");
            const sources = yield this.parseFontSourcesFromStylesheet(css, "truetype");
        });
    }
    downloadFont() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    parseFontSourcesFromStylesheet(css, format) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(css, format);
        });
    }
    retrieveFontStylesheet(sourceUrl, format) {
        return __awaiter(this, void 0, void 0, function* () {
            let response, css;
            let options = {
                'headers': { 'User-Agent': this.getUserAgentForFormat(format) }
            };
            // get the trutype font definition
            response = yield fetch(sourceUrl, options);
            if (response.status != 200)
                throw new Error("Error retrieving " + sourceUrl);
            return yield response.text();
        });
    }
    getUserAgentForFormat(format) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (format) {
                case "truetype":
                    return 'Mozilla/5.0 (compatible; MSIE 9.0; InfoChannel RNSafeBrowser/v.1.1.0G)';
                case "woff":
                    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240';
                case "woff2":
                    return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36';
                default:
                    throw new Error(`Unsupported font type ${format}`);
            }
        });
    }
}
exports.FontDownloader = FontDownloader;
