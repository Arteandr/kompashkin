import { VK } from "vk-io";
import { Main } from "./app";
import fs from "fs";
import iEvent from "./interfaces/iEvent";

export default class Event {
    vk: VK;
    main: Main;
    events: iEvent[] = [];

    constructor(vk: VK, main: Main){
        this.vk = vk;
        this.main = main;
    }

    async loadAll() {
        fs.readdir("./src/events", { encoding: "utf-8" }, (err, files) => {
            if (err) {
                this.main.error(err.message);
            } else {
                if (files.length > 0) {
                    files.forEach(async (fileName, index) => {
                        const { default: newClass } = await import(`./events/${fileName}`);
                        const classTest = newClass;
                        this.events[index] = new classTest(this.vk, this.main);
                        await this.events[index].start();
                    });
                } else {
                    this.main.warning('Эвентов не обнаружено.');
                }
            }
        });
        this.main.info(`Эвенты успешно загружены.`);
    }

}