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
var BanModel_1 = require("./models/BanModel");
var ChatModel_1 = require("./models/ChatModel");
var date_fns_1 = require("date-fns");
var kickController_1 = __importDefault(require("../commandControllers/kickController"));
var lodash_1 = __importDefault(require("lodash"));
var BanController = /** @class */ (function () {
    function BanController() {
    }
    BanController.inBan = function (userId, chatId) {
        return __awaiter(this, void 0, void 0, function () {
            var ban, chat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, BanModel_1.BanModel.findOne({
                            userId: userId
                        })];
                    case 1:
                        ban = _a.sent();
                        return [4 /*yield*/, ChatModel_1.ChatModel.findOne({
                                chatId: chatId
                            })];
                    case 2:
                        chat = _a.sent();
                        if (ban !== null && chat.bans.includes(ban._id)) {
                            return [2 /*return*/, true];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BanController.unban = function (userId, chatId, vk, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var ban_1, chat, newArray, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.inBan(userId, chatId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 7];
                        return [4 /*yield*/, BanModel_1.BanModel.findOneAndDelete({
                                userId: userId
                            })];
                    case 2:
                        ban_1 = _a.sent();
                        return [4 /*yield*/, ChatModel_1.ChatModel.findOne({
                                chatId: chatId
                            })];
                    case 3:
                        chat = _a.sent();
                        newArray = lodash_1.default.filter(function (obj) { return Number(obj) !== Number(ban_1._id); });
                        chat.bans = newArray;
                        return [4 /*yield*/, chat.save()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, vk.api.users.get({
                                user_ids: "id" + userId
                            })];
                    case 5:
                        user = _a.sent();
                        return [4 /*yield*/, ctx.send("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C [id" + user[0].id + "|" + user[0].first_name + "] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0440\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D.")];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BanController.ban = function (userId, chatId, ctx, vk) {
        return __awaiter(this, void 0, void 0, function () {
            var currentChat, data, ban, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ChatModel_1.ChatModel.findOne({
                            chatId: chatId
                        })];
                    case 1:
                        currentChat = _a.sent();
                        return [4 /*yield*/, BanController.inBan(userId, chatId)];
                    case 2:
                        if (!_a.sent()) return [3 /*break*/, 4];
                        return [4 /*yield*/, ctx.send("Пользователь уже в бане!")];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        ;
                        data = {
                            userId: userId,
                            time: date_fns_1.add(new Date(), {
                                days: 30
                            }),
                        };
                        ban = new BanModel_1.BanModel(data);
                        return [4 /*yield*/, ban.save()];
                    case 5:
                        _a.sent();
                        currentChat.bans.push(ban);
                        return [4 /*yield*/, currentChat.save()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, kickController_1.default.kick(userId, chatId, vk)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, vk.api.users.get({
                                user_ids: "id" + userId
                            })];
                    case 8:
                        user = _a.sent();
                        // await ctx.send(`Пользователь [id${user[0].id}|${user[0].first_name}] успешно заблокирован на 30 дней.`);
                        return [4 /*yield*/, ctx.send({
                                message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C [id" + user[0].id + "|" + user[0].first_name + "] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 30 \u0434\u043D\u0435\u0439.",
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
                    case 9:
                        // await ctx.send(`Пользователь [id${user[0].id}|${user[0].first_name}] успешно заблокирован на 30 дней.`);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BanController;
}());
exports.default = BanController;
;
