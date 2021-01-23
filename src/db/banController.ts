import { ButtonColor, Keyboard, KeyboardBuilder, MessageContext, VK } from "vk-io";
import { BanModel, iBan } from "./models/BanModel";
import {ChatModel} from "./models/ChatModel";
import { add } from "date-fns";
import KickControllerCMD from "../commandControllers/kickController";
import { UsersUserFull } from "vk-io/lib/api/schemas/objects";

import _ from "lodash";


export default class BanController {

    static async inBan(userId: number,chatId: number){
        const ban = await BanModel.findOne({
            userId
        });

        const chat = await ChatModel.findOne({
            chatId
        });

        if(ban !== null && chat!.bans.includes(ban!._id)){
            return true;
        }else {
            return false;
        }
    }

    static async unban(userId: number, chatId: number, vk: VK, ctx: MessageContext){
        if(await this.inBan(userId,chatId)){
            const ban = await BanModel.findOneAndDelete({
                userId
            });
            const chat = await ChatModel.findOne({
                chatId
            });
            const newArray = _.filter((obj: number) => Number(obj) !== Number(ban!._id));
            chat!.bans = newArray;
            await chat!.save();
            const user: UsersUserFull[] = await vk.api.users.get({
                user_ids: `id${userId}`
            });
            await ctx.send(`Пользователь [id${user[0].id}|${user[0].first_name}] успешно разблокирован.`);
        }
    }
    

    static async ban(userId: number,chatId: number, ctx: MessageContext,vk:VK){
        const currentChat = await ChatModel.findOne({
            chatId
        });

        if(await BanController.inBan(userId,chatId)){
            return await ctx.send("Пользователь уже в бане!");
        };

        const data: iBan = {
            userId,
            time: add(new Date(),{
                days: 30
            }),
        };
        const ban = new BanModel(data);
        await ban.save();
        currentChat!.bans.push(ban);
        await currentChat!.save();
        await KickControllerCMD.kick(userId,chatId,vk);
        const user: UsersUserFull[] = await vk.api.users.get({
            user_ids: `id${userId}`
        });
        // await ctx.send(`Пользователь [id${user[0].id}|${user[0].first_name}] успешно заблокирован на 30 дней.`);
        await ctx.send({
            message: `Пользователь [id${user[0].id}|${user[0].first_name}] успешно заблокирован на 30 дней.`,
            keyboard: Keyboard.builder()
            .textButton({
                label: "Разблокировать",
                color: ButtonColor.POSITIVE,
                payload: {
                    command: "unban",
                    data: {
                        userId: user[0].id,
                        chatId: ctx.chatId,
                    }
                }
            })
            .oneTime(true)
            .inline()

        })
    }
};