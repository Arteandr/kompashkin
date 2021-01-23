import { VK } from "vk-io";


export default class KickControllerCMD {
    static async kick(userId: number, chatId: number,vk: VK){
        await vk.api.messages.removeChatUser({
            chat_id: chatId,
            user_id: userId
        })
    }
}