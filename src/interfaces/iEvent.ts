import { VK } from "vk-io";
import { Main } from "../app";


export default interface iEvent {
    vk: VK;
    main: Main;
    start: Function;
}