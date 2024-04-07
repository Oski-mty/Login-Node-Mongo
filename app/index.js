import dotenv from "dotenv";
import mongoose from "mongoose";
import express from 'express';
import cookieParser from 'cookie-parser';

import { methods as authen } from "./controllers/auth.controller.js";
import { methods as author } from "./middlewares/authorization.js";

//Fix para __dirname
import path from "path";
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));


//Server config
const app = express();

dotenv.config();
const PORT = process.env.PORT || 4001;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Conexión con MongoDB exitosa");
    app.set("port",PORT);
    app.listen(app.get("port"));
    console.log("Server corriendo en puerto", app.get("port"));

}).catch((error)=>{
    console.log("Error al conectarse con MongoDB",error);
})


app.use(express.static(__dirname + "/public")); //Archivos en public
app.use(express.json()); //express pueda leer json
app.use(cookieParser()); //Para author methods


//Rutas FRONTEND con MIDLEWARES
app.get("/", author.logueado,  (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/home", author.noLogueado,  (req, res) => res.sendFile(__dirname + "/pages/home/home.html"));
//Rutas BACKEND (endpoints)
app.post("/api/register", authen.register);
app.post("/api/login", authen.login);