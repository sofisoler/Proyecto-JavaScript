import { validarProductoRepetido } from "./accionesCarrito.js";

const mostrarProductos = (productos) => {
  const contenedorProductos = document.getElementById("producto-contenedor");

  contenedorProductos.innerHTML= "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML +=
    `
    <div class="card">
      <img src="${producto.img}" class="m-auto" alt="">
      <h3 class="card_titulo">${producto.nombre}</h3>
      <div class="card_content">
        <p>$${producto.precio}</p>
      </div>
      <button id=agregar${producto.id}>Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`);
    boton.addEventListener("click", () => {
      validarProductoRepetido(producto.id);
    });
  });
};

export { mostrarProductos };