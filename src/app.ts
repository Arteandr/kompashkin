import dotenv from "dotenv";
dotenv.config();


// Модули
import Logger from "./logger";
import Cmd from "./cmd";
import { VKWorker } from "./vk";
import { VK } from "vk-io";
import errorMiddleware from "./middlewares/error";
import Database from "./db/db";
import ChatJoinEvent from "./events/join";
import Event from "./event";


export class Main {

    ID: number = -201992571;

    // Модули
    logger: Logger = new Logger();
    cmd!: Cmd;
    vkWorker: VKWorker = new VKWorker(this);
    event!: Event;

    // Аллиасы
    info = (msg: string) => this.logger.info(msg);
    log = (msg: string) => this.logger.log(msg);
    warning = (msg: string) => this.logger.warning(msg);
    error = (msg: string) => this.logger.error(msg);

    db: Database = new Database(this);

    vk!: VK;

    // Middlewares
    errorMiddleware!: errorMiddleware;

    async init() {
        try {
            this.info(`Бот компашки beta 1.`);
            this.vk = await this.vkWorker.init();
            this.errorMiddleware = new errorMiddleware(this.vk);
            this.cmd = new Cmd(this,this.vk);
            this.event = new Event(this.vk,this);

            await this.cmd.init();

            process.on('SIGINT',() => this.shutdown());
        } catch (error: any) {
            this.error(`Bot init: ${error.stack}`);
            this.shutdown(1);
        }
    }

    async start() {
        try{
            await this.vkWorker.start();
            await this.errorMiddleware.start();
            await this.cmd.start();
            await this.event.loadAll();
            await this.db.start();


            process.on('uncaughtException', error => {
                this.error(`Runtime error: ${error.stack}`);
            })

            this.log(`Бот успешно запущен.`);
        }catch(error: any){
            this.error(`Bot start: ${error.stack}`);
            this.shutdown(1);
        }
    }

    async shutdown(code: number = 0) {
        this.log(`Выключение бота..`);
        this.log('Выход.');
        process.exit(code);
    }
}