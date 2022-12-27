import { eliminarProductoCarrito } from "./accionesCarrito.js";

// MODAL CARRITO

const modalContenedorCarrito = document.getElementById("modal-container-carrito");
const abrirCarrito = document.getElementById("open-carrito");
const cerrarCarrito = document.getElementById("close-carrito");
const modalCarrito = document.querySelector(".modal_carrito");

abrirCarrito.addEventListener("click", () => {
    modalContenedorCarrito.classList.toggle("modal_active")
});

cerrarCarrito.addEventListener("click", () => {
    modalContenedorCarrito.classList.toggle("modal_active");
});

modalContenedorCarrito.addEventListener("click", () => {
    cerrarCarrito.click()
});

modalCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("boton_eliminar")) {
        eliminarProductoCarrito(e.target.value);
        Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "Producto eliminado con éxito",
            showConfirmButton: false,
            timer: 2100
        })
    }
});

// MODAL FORMULARIO CUENTA

const modalContenedorCuenta = document.getElementById("modal-container-cuenta");
const abrirForm = document.getElementById("open-form");
const cerrarForm = document.getElementById("close-form");
const modalCuenta = document.querySelector(".modal_cuenta");

abrirForm.addEventListener("click", () => {
    modalContenedorCuenta.classList.toggle("modal_active");
});

cerrarForm.addEventListener("click", () => {
    modalContenedorCuenta.classList.toggle("modal_active");
});

modalContenedorCuenta.addEventListener("click", () => {
    cerrarForm.click()
});

modalCuenta.addEventListener("click", (e) => {
    e.stopPropagation();
});

const formCuenta = document.getElementById("formulario-cuenta");
const usuario = document.getElementById("user");
const password = document.getElementById("pass");

const validarFormulario = (e) => {
    e.preventDefault();

    const usuarioValue = usuario.value;
    const passwordValue = password.value;

    Swal.fire({
      position: "top",
      text: `¡Bienvenid@ ${usuarioValue}!`,
      showConfirmButton: false,
      timer: 2100
    })
    cerrarForm.click()
};

formCuenta.addEventListener("submit", validarFormulario);