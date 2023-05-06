const socket = io();

socket.on("refreshData", (data) => {
  let prodList = document.getElementById("prodList");
  let list = "";
  data.forEach((prod) => {
    list += `<li>Producto : ${prod.title} Categoria : ${prod.category} Descripcion : ${prod.description} Precio : $ ${prod.price}  Disponible : ${prod.stock} unidades</li>`;
  });
  prodList.innerHTML = list;
});

function sendForm(form) {
  const title = form.title.value;
  const description = form.description.value;
  const code = form.code.value;
  const category = form.category.value;
  const price = form.price.value;
  const stock = form.stock.value;

  const nwProd = {
    title,
    description,
    code,
    category,
    price,
    stock,
  };
  socket.emit("addProduct", nwProd);
}
