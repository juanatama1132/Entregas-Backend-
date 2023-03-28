import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import logger from "morgan";
import mongoCfgObject from "./config/mongoDbConn.js";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

import { Server } from "socket.io";
import useRouter from "./routes/routes.js";
import __dirname from "./dirname.js";
import msgManager from "./Dao/msgMannager.js";
import MsgManager from "./Dao/msgMannager.js";
import passport from "passport";
import { initializePassport } from "./middleware/initialPassport.js";

const app = express();
const PORT = 8080 || process.env.PORT;
const httpServer = app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});

const io = new Server(httpServer);
//console.log(__dirname);
mongoCfgObject.dbConnection();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(session(mongoCfgObject.session));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/virtual", express.static(__dirname + "/public"));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(useRouter);

const chatMessages = async () => {
  try {
    await MsgManager.getMgs();
  } catch (error) {}
};
let connectedClients = [];
io.on("connection", (socket) => {
  connectedClients.push(socket);
  //   console.log("Conexion Establecida");
  //   socket.emit("refreshData", PM.getProducts());

  //   socket.on("addProduct", (msg) => {
  //     const { product, description, code, category, price, stock } = msg;
  //     const thumbs = [];
  //     PM.addProduct(product, description, code, category, price, stock, thumbs);
  //     socket.emit("refreshData", PM.getProducts());
  //   });
  io.on("chatMsg", (data) => {
    async () => {
      const { user, message } = data;
      await msgManager.addMsg(user, message);
    };
    chatMessages.push(data);
    io.emit("msgLog", chatMessages);
  });

  io.on("disconnect", () => {
    connectedClients = connectedClients.filter((client) => client !== socket);
  });
});