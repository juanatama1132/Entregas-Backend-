import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import { commander } from "../utils/commander.js";
import { MongoSingleton } from "./mongoSingleton.js";

const { mode } = commander.opts();

const enviroment = mode || "developement";
dotenv.config({
  path:
    enviroment === "developement"
      ? "../.env.developement"
      : "../.env.production",
});
const url = process.env.MONGO_URL || "mongodb://localhost:27017";

let CfgObject = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: url,
  adminName: process.env.ADMIN_NAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  persistence: process.env.PERSISTENCE,
  appEnv: process.env.enviroment,
  dbConnection: () => MongoSingleton.getInstance(url),
  mail_service: process.env.MAIL_SERVICE,
  mail_port: process.env.MAIL_PORT,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
  session: {
    store: MongoStore.create({
      mongoUrl: url,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15000000000,
    }),
    secret: "s3cr3t0",
    resave: false,
    saveUninitialized: false,
  },
  jwt_Private_Key: process.env.JWT_PRIVATE_KEY,
};
export { CfgObject };