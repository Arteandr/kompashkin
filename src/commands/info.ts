import { HearManager } from "@vk-io/hear";
import { MessageContext } from "vk-io";
import CMD from "../cmd";
import iCommand from "../interfaces/iCommand";

export default class HelpCommand implements iCommand{
    name = "команды";
    description = "список всех команд";
    manager;
    cmd;

    constructor(manager: HearManager<MessageContext>,cmd: CMD ){
        this.manager = manager;
        this.cmd = cmd;
    }

    handler(): iCommand{
        this.manager.hear(/^команды/,async (ctx) => {
            const commands = await this.cmd.getAllCommands();
            await ctx.send(`Доступные комманды: \n`);
            commands.forEach(async (el) => {
                await ctx.send(`/${el.name} - ${el.description}`);
            })
          
        })

        return {
            name: this.name,
            description: this.description,
            handler: this.handler,
        }
    }
}
