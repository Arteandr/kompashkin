import { HearManager } from "@vk-io/hear";
import { MessageContext } from "vk-io";
import CMD from "../cmd";
import iCommand from "../interfaces/iCommand";

import fetch from "node-fetch";

export default class StatusCommand implements iCommand{
    name = "статус";
    description = "выводит состояние бота.";
    manager;
    cmd;

    constructor(manager: HearManager<MessageContext>,cmd: CMD ){
        this.manager = manager;
        this.cmd = cmd;
    }

    private async getApiPing() {
        const startTime = Date.now();
        await fetch('https://api.vk.com');
        return Date.now() - startTime;
    }

    handler(): iCommand{
        this.manager.hear(/^статус/,async (ctx) => {
            const apiPing = await this.getApiPing();

            ctx.send(`
                ✅ Бот работает:
                -- Запрос api.vk.com: ${apiPing}мс\n
            `);

            ctx.sendPhotos({
                value: "https://sun9-15.userapi.com/impf/6wCmag0xpR0tyyhduU294XadkeDxhdT61v2fDA/F2ep5m3zkW4.jpg?size=1077x1080&quality=96&proxy=1&sign=0793879963ee920cd1948f2833b6fe44&type=album"
            });
        });
        return {
            name: this.name,
            description: this.description,
            handler: this.handler,
        }
    }
}
