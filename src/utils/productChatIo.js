import MsgManager from "./Dao/msgMannager.js";

initProductChatIo = (io) => {
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
        await MsgManager.addMsg(user, message);
      };
      chatMessages.push(data);
      io.emit("msgLog", chatMessages);
    });

    io.on("disconnect", () => {
      connectedClients = connectedClients.filter((client) => client !== socket);
    });
  });
};
export { initProductChatIo };
