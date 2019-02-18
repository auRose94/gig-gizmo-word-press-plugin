"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function htmlToText(html) {
    var buffer = html || "";
    buffer = buffer.replace(/<br(\s+)?\/>/g, "\n");
    buffer = buffer.replace(/<\/?[^>]+(>|$)/g, "");
    buffer = buffer.replace(/&nbsp;/g, " ");
    buffer = buffer.replace(/&amp;/g, "&");
    buffer = buffer.replace(/&lt;/g, "<");
    buffer = buffer.replace(/&gt;/g, ">");
    buffer = buffer.replace(/&quot;/g, "\"");
    buffer = buffer.replace(/&apos;/g, "'");
    buffer = buffer.replace(/&cent;/g, "¢");
    buffer = buffer.replace(/&pound;/g, "£");
    buffer = buffer.replace(/&yen;/g, "¥");
    buffer = buffer.replace(/&euro;/g, "€");
    buffer = buffer.replace(/&copy;/g, "©");
    buffer = buffer.replace(/&reg;/g, "®");
    return buffer;
}
exports.htmlToText = htmlToText;
//# sourceMappingURL=shared.js.map