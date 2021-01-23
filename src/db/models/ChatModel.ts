import { Document, model, Schema } from "mongoose";
import { iBanModel } from "./BanModel";
import { iWarnModel } from  "./WarnModel";

export interface iChat {
    chatId: number;
    bans: iBanModel[];
    warns: iWarnModel[];
};

export interface iChatModel extends iChat, Document {};

const ChatSchema = new Schema<iChatModel>({
    chatId: {
        type: Number,
        required: true,
    },
    bans: [{type: Schema.Types.ObjectId, ref:'Ban'}],
    warns: [{type: Schema.Types.ObjectId, ref: 'Warn'}]
});

ChatSchema
.virtual('url')
.get(function () {
    // @ts-ignore
    return `/chat/${this._id}`;
})

export const ChatModel = model<iChatModel>('Chat',ChatSchema);