import { VK } from "vk-io";

export default class errorMiddleware {
    vk: VK;
    
    
    constructor(vk: VK){
        this.vk = vk;
    };

    start() {
        this.vk.updates.use(async (context, next) => {
            try {
                await next();
            } catch (error) {
                context.send(`Отказано в доступе. Код ошибки: ${error.code}`);
            }
        })
    }
}