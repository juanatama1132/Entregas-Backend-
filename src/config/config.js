import MongoStore from "connect-mongo";
// import { connect, set } from "mongoose";
import { dotenv } from "dotenv";
import { commander } from "../utils/commander";
import { MongoSingleton } from "./mongoSingleton";

const { mode } = commander.opts();

const enviroment = mode || "developement";
dotenv.config({
  path:
    enviroment === "developement" ? "./env.developement" : "./env.production",
});
const url =
  process.env.MONGO_URL ||
  "mongodb+srv://fegysin:Atlas2903db@cluster0.nx5ys0f.mongodb.net/ecommerce?retryWrites=true&w=majority";

let CfgObject = {
  PORT: process.env.PORT || 8080,
  MONGO_URL: url,
  adminName: process.env.ADMIN_NAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin",
  persistence: process.env.PERSISTENCE,
  dbConnection: () => MongoSingleton.getInstance(),
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
};
export { CfgObject };
