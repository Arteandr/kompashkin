import { HearManager } from "@vk-io/hear";
import { MessageContext } from "vk-io";
import CMD from "../cmd";
import iCommand from "../interfaces/iCommand";

export default class TitsCommand implements iCommand{
    name = "сиськи";
    description = "сервер совершенные сиськи";
    manager;
    cmd;

    constructor(manager: HearManager<MessageContext>,cmd: CMD ){
        this.manager = manager;
        this.cmd = cmd;
    }

    handler(): iCommand{
        this.manager.hear(/^сиськи/,async (ctx) => {
          ctx.send(`Добро пожаловать на паблик совершенные сиськи 18+, постоянный онлайн, общительные игроки горячая атмосфера и справедливые администраторы, микрофон можно использовать лицам старше 16-ти лет, заходи к нам на сервер чаще и просто получай удовольствие, главный админ Саша и Максим`); })

        return {
            name: this.name,
            description: this.description,
            handler: this.handler,
        }
    }
}
