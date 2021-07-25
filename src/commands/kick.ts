import { HearManager } from "@vk-io/hear";
import { MessageContext, VK } from "vk-io";
import CMD from "../cmd";
import KickControllerCMD from "../commandControllers/kickController";
import iCommand from "../interfaces/iCommand";

export default class KickCommand implements iCommand {
    name = "кик";
    description = "удалить пользователя из беседы";
    manager;
    cmd;
    vk;

    constructor(manager: HearManager<MessageContext>, cmd: CMD, vk: VK) {
        this.manager = manager;
        this.cmd = cmd;
        this.vk = vk;
    }

    handler(): iCommand {
        this.manager.hear(/^кик(?:\s+(?<text>.+)|$)/i, async (ctx) => {
            if (ctx.chatId) {
                if (ctx.hasReplyMessage) {
                    await KickControllerCMD.kick(ctx.replyMessage!.senderId, ctx.chatId, this.vk);
                } else if (!ctx.hasReplyMessage) {
                    if (ctx.$match[1]) {
                        const userId = Number(ctx.$match[1].replace(/\D+/g, ""));
                        await KickControllerCMD.kick(userId, ctx.chatId, this.vk);
                    } else {
                        await ctx.send("Используйте: кик @user");
                    }
                }
            }
        })

        return {
            name: this.name,
            description: this.description,
            handler: this.handler,
        }
    }
}
