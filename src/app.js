import CfgObject from "./config/config.js";
import { httpServer } from "./server.js";
const PORT = CfgObject.PORT;
httpServer.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Servidor activo y escuchando por puerto: ${PORT}`);
});
