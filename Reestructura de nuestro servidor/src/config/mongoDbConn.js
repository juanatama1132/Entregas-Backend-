import MongoStore from "connect-mongo";
import { connect } from "mongoose";
const url =
  "mongodb+srv://fegysin:Atlas2903db@cluster0.nx5ys0f.mongodb.net/ecommerce?retryWrites=true&w=majority";
//"mongodb://localhost:27017/ecommerce";
let mongoCfgObject = {
  dbConnection: async () => {
    try {
      console.log("Conecting to " + url);
      await connect(url);
      console.log("DB Connexion Ok");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  },
  session: {
    store: MongoStore.create({
      mongoUrl: url,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 150000000,
    }),
    secret: "S3Cr3t",
    resave: false,
    saveUninitialized: false,
  },
};

// module.exports = { startConnection };
module.exports = { mongoCfgObject };