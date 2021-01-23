import { model, Schema, Document } from "mongoose";

export interface iBan {
    userId: number;
    time: Date;
};

export interface iBanModel extends iBan, Document {};

const BanSchema = new Schema<iBanModel>({
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
    return `/ban/${this._id}`;
})

export const BanModel = model<iBanModel>('Ban',BanSchema);