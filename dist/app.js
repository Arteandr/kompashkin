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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Модули
var logger_1 = __importDefault(require("./logger"));
var cmd_1 = __importDefault(require("./cmd"));
var vk_1 = require("./vk");
var error_1 = __importDefault(require("./middlewares/error"));
var db_1 = __importDefault(require("./db/db"));
var event_1 = __importDefault(require("./event"));
var Main = /** @class */ (function () {
    function Main() {
        var _this = this;
        this.ID = -201992571;
        // Модули
        this.logger = new logger_1.default();
        this.vkWorker = new vk_1.VKWorker(this);
        // Аллиасы
        this.info = function (msg) { return _this.logger.info(msg); };
        this.log = function (msg) { return _this.logger.log(msg); };
        this.warning = function (msg) { return _this.logger.warning(msg); };
        this.error = function (msg) { return _this.logger.error(msg); };
        this.db = new db_1.default(this);
    }
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        this.info("\u0411\u043E\u0442 \u043A\u043E\u043C\u043F\u0430\u0448\u043A\u0438 beta 1.");
                        _a = this;
                        return [4 /*yield*/, this.vkWorker.init()];
                    case 1:
                        _a.vk = _b.sent();
                        this.errorMiddleware = new error_1.default(this.vk);
                        this.cmd = new cmd_1.default(this, this.vk);
                        this.event = new event_1.default(this.vk, this);
                        return [4 /*yield*/, this.cmd.init()];
                    case 2:
                        _b.sent();
                        process.on('SIGINT', function () { return _this.shutdown(); });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        this.error("Bot init: " + error_2.stack);
                        this.shutdown(1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.vkWorker.start()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.errorMiddleware.start()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.cmd.start()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.event.loadAll()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.db.start()];
                    case 5:
                        _a.sent();
                        process.on('uncaughtException', function (error) {
                            _this.error("Runtime error: " + error.stack);
                        });
                        this.log("\u0411\u043E\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0449\u0435\u043D.");
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        this.error("Bot start: " + error_3.stack);
                        this.shutdown(1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.shutdown = function (code) {
        if (code === void 0) { code = 0; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.log("\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0431\u043E\u0442\u0430..");
                this.log('Выход.');
                process.exit(code);
                return [2 /*return*/];
            });
        });
    };
    return Main;
}());
exports.Main = Main;
