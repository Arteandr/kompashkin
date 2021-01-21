import { HearManager } from "@vk-io/hear";
import {  MessageContext, VK } from "vk-io";
import CMD from "../cmd";
import iCommand from "../interfaces/iCommand";

export default class KickCommand implements iCommand{
    name = "кик";
    description = "удалить пользователя из беседы";
    manager;
    cmd;
    vk;

    constructor(manager: HearManager<MessageContext>,cmd: CMD, vk: VK){
        this.manager = manager;
        this.cmd = cmd;
        this.vk = vk;
    }

    handler(): iCommand{
        this.manager.hear(/^кик(?:\s+(?<text>.+)|$)/i,async (ctx) => { 
            if(ctx.chatId){
                if(ctx.hasReplyMessage ){
                    await this.vk.api.messages.removeChatUser({
                        chat_id: ctx.chatId,
                        user_id: ctx.replyMessage?.senderId
                    })
                }else if(!ctx.hasReplyMessage){
                    if(ctx.$match[1]){
                         await this.vk.api.messages.removeChatUser({
                        chat_id: ctx.chatId,
                        user_id: Number(ctx.$match[1].replace(/\D+/g,"")),
                    });
                    }else {
                        await ctx.send("/kick [user]");
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
