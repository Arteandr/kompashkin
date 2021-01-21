import {VK} from 'vk-io';
import { Main } from './app';


export class VKWorker {
    main: Main;

    constructor(main: Main){
        this.main = main;
    }

    init(){
        const vk = new VK({
            token: process.env.TOKEN!
        });

        this.checkToken(vk);

        return vk;
    }

    checkToken(vk: VK){
        vk.api.messages.getConversations({count:0}).catch((err:Error) => {
            throw new Error(`Вы неправильно указали токен группы в файле конфигурации (${err.message})`);
        })
    }

    async start() {
        this.main.log(`Запускается Longpoll...`);
        await this.main.vk.updates.startPolling();
        await this.main.vk.updates.start().catch((err) => this.main.error(err));
    }
}