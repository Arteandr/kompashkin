import { Main } from "./app";

const main: Main = new Main();

async function run() {
    await main.init();
    await main.start();
}

// START :D
run();  
