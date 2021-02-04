"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var Logger = /** @class */ (function () {
    function Logger() {
        this.logFormat = chalk_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["{green [LOG] }"], ["{green [LOG] }"])));
        this.warningFormat = chalk_1.default(templateObject_2 || (templateObject_2 = __makeTemplateObject(["{yellow [WRN] }{yellow \u26A0} "], ["{yellow [WRN] }{yellow \u26A0} "])));
        this.errorFormat = chalk_1.default(templateObject_3 || (templateObject_3 = __makeTemplateObject(["{red [ERR] }{red \u2757}"], ["{red [ERR] }{red \u2757}"])));
        this.infoFormat = chalk_1.default(templateObject_4 || (templateObject_4 = __makeTemplateObject(["{blue [INF] }"], ["{blue [INF] }"])));
    }
    Logger.prototype.writeLine = function (str) {
        process.stdout.write(str + "\n");
    };
    Logger.prototype.log = function (message) {
        this.writeLine(this.logFormat + message);
    };
    Logger.prototype.warning = function (message) {
        this.writeLine(this.warningFormat + message);
    };
    Logger.prototype.error = function (message) {
        this.writeLine(this.errorFormat + message);
    };
    Logger.prototype.info = function (message) {
        this.writeLine(this.infoFormat + message);
    };
    return Logger;
}());
exports.default = Logger;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
