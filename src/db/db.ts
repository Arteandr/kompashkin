import mongoose from "mongoose";
import { Main } from "../app";


export default class Database {
    private dbLink: string;
    main: Main;

    constructor(main: Main){
        this.main = main;

        if(process.env.DB){
            this.dbLink = process.env.DB;
        }else{
            this.dbLink = "";
            main.error("Заполните строку базы данных.")    
            main.shutdown(1);
        }
    }
    
    async start() {
        await mongoose.connect(this.dbLink,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => this.main.log("База данных успешно подключена!"))
        .catch(err => {
            this.main.error(err);
            this.main.shutdown(1);
        });
    }
}