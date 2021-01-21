import { HearManager } from "@vk-io/hear";
import { MessageContext, VK } from "vk-io";
import CMD from "../cmd";

export default interface iCommand {
    name: String;
    description: String;
    handler: Function;
    manager?: HearManager<MessageContext>;
    cmd?: CMD;
    vk?: VK;
}
