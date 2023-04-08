import  express  from "express";
import { router } from "./router/router";
import * as dotenv from 'dotenv'
import ConectionDB from "./database/config";
import cors from 'cors'
async function bootStrap(){
    
    dotenv.config();
    
    const app = express();
    app.use(cors())
    await ConectionDB();

    app.use(express.json());
    app.use(router)

    const Door = 3000
    app.listen(Door, () =>{
        console.log("HTTP Server Running");
    })

}
bootStrap();


