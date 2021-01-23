import { HearManager } from "@vk-io/hear";
import {  MessageContext, VK } from "vk-io";
import CMD from "../cmd";
import BanController from "../db/banController";
import iCommand from "../interfaces/iCommand";

export default class BanCommand implements iCommand{
    name = "бан";
    description = "забанить пользователя";
    manager;
    cmd;
    vk;

    constructor(manager: HearManager<MessageContext>,cmd: CMD, vk: VK){
        this.manager = manager;
        this.cmd = cmd;
        this.vk = vk;
    }

    handler(): iCommand{
        this.manager.hear(/^бан(?:\s+(?<text>.+)|$)/i,async (ctx) => { 
            if(ctx.chatId){
                if(ctx.hasReplyMessage ){
                        await BanController.ban(ctx.replyMessage!.senderId,ctx.chatId,ctx,this.vk);
                }else if(!ctx.hasReplyMessage){
                    if(ctx.$match[1]){
                        const userId = Number(ctx.$match[1].replace(/\D+/g,""));
                        await BanController.ban(userId,ctx.chatId,ctx,this.vk);
                    }else {
                        await ctx.send("Используйте: бан @user");
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
