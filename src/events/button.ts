import { VK } from "vk-io";
import { Main } from "../app";
import BanController from "../db/banController";
import iEvent from "../interfaces/iEvent";


export default class ButtonPressEvent implements iEvent {
    vk: VK;
    main: Main;

    constructor(vk: VK,main: Main){
        this.vk = vk;
        this.main = main;
    }

    async start() {
        this.vk.updates.on("message_new",async (ctx) => {
            if(ctx.hasMessagePayload){
               switch (ctx.messagePayload.command) {
                   case "unban":
                       await BanController.unban(ctx.messagePayload.data.userId,ctx.messagePayload.data.chatId,this.vk,ctx);
                       break;
               
                   default:
                       break;
               }
            }
        })
    }
        
}   