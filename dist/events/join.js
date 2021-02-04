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
var vk_io_1 = require("vk-io");
var ChatModel_1 = require("../db/models/ChatModel");
var banController_1 = __importDefault(require("../db/banController"));
var kickController_1 = __importDefault(require("../commandControllers/kickController"));
var ChatJoinEvent = /** @class */ (function () {
    function ChatJoinEvent(vk, main) {
        this.vk = vk;
        this.main = main;
    }
    ChatJoinEvent.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.vk.updates.on("chat_invite_user", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                    var response, data, chat, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(ctx.eventMemberId === this.main.ID && ctx.chatId)) return [3 /*break*/, 5];
                                return [4 /*yield*/, ChatModel_1.ChatModel.findOne({
                                        chatId: ctx.chatId
                                    })];
                            case 1:
                                response = _a.sent();
                                if (!!response) return [3 /*break*/, 3];
                                data = {
                                    chatId: ctx.chatId,
                                    bans: [],
                                    warns: [],
                                };
                                chat = new ChatModel_1.ChatModel(data);
                                return [4 /*yield*/, chat.save()];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [4 /*yield*/, ctx.send("Здарова я бот - долбоеб!")];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 12];
                            case 5:
                                if (!(ctx.eventMemberId && ctx.chatId)) return [3 /*break*/, 11];
                                return [4 /*yield*/, this.vk.api.users.get({
                                        user_ids: "id" + ctx.eventMemberId
                                    })];
                            case 6:
                                user = _a.sent();
                                return [4 /*yield*/, banController_1.default.inBan(ctx.eventMemberId, ctx.chatId)];
                            case 7:
                                if (!_a.sent()) return [3 /*break*/, 10];
                                return [4 /*yield*/, ctx.send({
                                        message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C [id" + user[0].id + "|" + user[0].first_name + "] \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u044D\u0442\u043E\u0439 \u0431\u0435\u0441\u0435\u0434\u0435.",
                                        keyboard: vk_io_1.Keyboard.builder()
                                            .textButton({
                                            label: "Разблокировать",
                                            color: vk_io_1.ButtonColor.POSITIVE,
                                            payload: {
                                                command: "unban",
                                                data: {
                                                    userId: user[0].id,
                                                    chatId: ctx.chatId,
                                                }
                                            }
                                        })
                                            .oneTime(true)
                                            .inline()
                                    })];
                            case 8:
                                _a.sent();
                                return [4 /*yield*/, kickController_1.default.kick(ctx.eventMemberId, ctx.chatId, this.vk)];
                            case 9: return [2 /*return*/, _a.sent()];
                            case 10:
                                ;
                                _a.label = 11;
                            case 11:
                                ;
                                _a.label = 12;
                            case 12:
                                ;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    ;
    return ChatJoinEvent;
}());
exports.default = ChatJoinEvent;
;
