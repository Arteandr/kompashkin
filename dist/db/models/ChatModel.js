"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
var mongoose_1 = require("mongoose");
;
;
var ChatSchema = new mongoose_1.Schema({
    chatId: {
        type: Number,
        required: true,
    },
    bans: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Ban' }],
    warns: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Warn' }]
});
ChatSchema
    .virtual('url')
    .get(function () {
    // @ts-ignore
    return "/chat/" + this._id;
});
exports.ChatModel = mongoose_1.model('Chat', ChatSchema);
