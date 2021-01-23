import { VK } from "vk-io";
import { Main } from "../app";
import {ChatModel} from "../db/models/ChatModel";
import iEvent from "../interfaces/iEvent";
import {iChat} from "../db/models/ChatModel";
import BanController from "../db/banController";
import { UsersUserFull } from "vk-io/lib/api/schemas/objects";
import KickControllerCMD from "../commandControllers/kickController";

export default class ChatJoinEvent implements iEvent {
    vk: VK;
    main: Main;

    constructor(vk: VK,main: Main){
        this.vk = vk;
        this.main = main;
    }

    async start() {
        this.vk.updates.on("chat_invite_user", async (ctx) => {
            // Проверка, что пригласили бота
            if (ctx.eventMemberId === this.main.ID && ctx.chatId) {
                const response = await ChatModel.findOne({
                    chatId: ctx.chatId
                });
                if(!response){
                    const data: iChat = {
                        chatId: ctx.chatId,
                        bans: [],
                        warns: [],
                    };

                    const chat = new ChatModel(data);
                    await chat.save();
                }
                await ctx.send("Здарова я бот - долбоеб!")
            }else{
                  // Пригласили кого-либо
                if(ctx.eventMemberId && ctx.chatId){
                    const user: UsersUserFull[] = await this.vk.api.users.get({
                       user_ids: `id${ctx.eventMemberId}`
                    });

                    if(await BanController.inBan(ctx.eventMemberId,ctx.chatId)){
                        await ctx.send(`Пользователь [id${user[0].id}|${user[0].first_name}] заблокирован в этой беседе.`);
                        return await KickControllerCMD.kick(ctx.eventMemberId,ctx.chatId,this.vk);
                    };
                };
            };
        });
    };
};
