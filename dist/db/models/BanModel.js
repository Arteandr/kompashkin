"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanModel = void 0;
var mongoose_1 = require("mongoose");
;
;
var BanSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});
BanSchema
    .virtual('url')
    .get(function () {
    // @ts-ignore
    return "/ban/" + this._id;
});
exports.BanModel = mongoose_1.model('Ban', BanSchema);
