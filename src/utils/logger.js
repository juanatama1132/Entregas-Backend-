import winston from "winston";
import { CfgObject } from "../config/config.js";
const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },

  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

const logger = winston.createLogger({
  transports: [
    CfgObject.appEnv === "developement"
      ? new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.colorize({ colors: customLevelOptions.colors }),
            winston.format.simple()
          ),
        })
      : new winston.transports.File({
          filename: "./error.log",
          level: "info",
          format: winston.format.simple(),
        }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = logger;
  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`
  );
  next();
};