"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarnModel = void 0;
var mongoose_1 = require("mongoose");
;
;
var WarnSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
});
WarnSchema
    .virtual('url')
    .get(function () {
    // @ts-ignore
    return "/warn/" + this._id;
});
// export default mongoose.model('Warn', WarnSchema);
exports.WarnModel = mongoose_1.model('Warn', WarnSchema);
