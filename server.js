import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import logger from "morgan";

import session from "express-session";
import cors from "cors";

import { CfgObject } from "./config/config.js";

import { Server } from "socket.io";
import { HttpServer } from "http";
import { initProductChatIo } from "./utils/productChatIo.js";
import useRouter from "./routes/routes.js";
import __dirname from "./dirname.js";

import { initializePassport } from "./middleware/initialPassport.js";
import passport from "passport";

const app = express();
const httpServer = new HttpServer(app);
const io = new Server(httpServer);
CfgObject.dbConnection();

app.use("/virtual", express.static(__dirname + "/public"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

initializePassport();
app.use(passport.initialize());

app.use(logger("dev"));

app.use(session(CfgObject.session));

// app.use(passport.session());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(useRouter);

initProductChatIo(io);

export { httpServer };
