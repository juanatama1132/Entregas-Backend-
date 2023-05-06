import { Socket } from "socket.io";

const socket = io();
let user;
let chatBox = document.getElementById("chatBox");
Swal.fire({
  title: "Chat Room LogIn",
  input: "text",
  text: "Escriba Usuario para el Chat",
  icon: "info",
  inputValidator: (value) => {
    return !value && "Necesitas un Usuario para iniciar el Chat !!";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  socket.emit("autenticated", user);
});
const handleSocket = (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("chatMsg", { user, message: chatBox.value });
      chatBox.value = "";
    }
  }
};

chatBox.addEventListener("keyup", handleSocket);
socket.on("msgLog", (data) => {
  let log = document.getElementById("chatLog");
  let messages = "";
  data.forEach((msg) => {
    messages += messages + `<li>${msg.user} dice: ${msg.message}</li><br>`;
  });
  log.innerHTML = messages;
});

socket.on("newUserConected", (data) => {
  if (!user)
    return Swal.fire({
      toast: true,
      position: "button-end",
      showConfirmButton: false,
      timer: 5000,
      title: `${data} se ha unido al chat`,
      icon: "success",
    });
});
