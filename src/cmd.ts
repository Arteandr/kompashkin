import { MessageContext, VK } from "vk-io";
import { HearManager } from "@vk-io/hear";
import { Main } from "./app";
import iCommand from "./interfaces/iCommand";
import fs from 'fs';

export default class CMD {
    
    main: Main;
    hear: HearManager<MessageContext>;
    vk: VK;
    commands: iCommand[] =  [];

    constructor(main: Main,vk: VK){
        this.main = main;
        this.vk = vk;
        this.hear = new HearManager<MessageContext>();
    }

    async init() {
        await fs.readdir("./src/commands",{encoding:"utf-8"},(err,files) => {
            if(err){
                this.main.error(err.message);
            }else{
                if(files.length > 0){
                    files.forEach(async (fileName,index) => {
                        const {default : newClass} = await import(`./commands/${fileName}`);
                        const classTest = newClass;
                        this.commands[index] = new classTest(this.hear,this,this.vk);
                        await this.commands[index].handler();
                        await this.main.info(`Команда ${this.commands[index].name} успешно загружена.`)
                    });
                }else{ 
                    this.main.warning('Команд не обнаружено.');
                }
            }
        });
    }

    start() {
        this.vk.updates.on("message_new",this.hear.middleware);
    }

    getAllCommands(): iCommand[] {
        return this.commands;
    }

}