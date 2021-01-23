import { Document, model, Schema } from "mongoose";

export interface iWarn {
    userId: number;
    count: number;
};

export interface iWarnModel extends iWarn, Document {};

const WarnSchema = new Schema<iWarnModel>({
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
    return `/warn/${this._id}`;
})

// export default mongoose.model('Warn', WarnSchema);
export const WarnModel = model<iWarnModel>('Warn',WarnSchema);